import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all site settings or specific keys
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keys = searchParams.get("keys")?.split(",");

    if (keys && keys.length > 0) {
      const settings = await prisma.siteSettings.findMany({
        where: {
          key: { in: keys }
        }
      });
      
      // Convert to key-value object
      const settingsObj: Record<string, string> = {};
      settings.forEach((s: { key: string; value: string }) => {
        settingsObj[s.key] = s.value;
      });
      
      return NextResponse.json(settingsObj);
    }

    const settings = await prisma.siteSettings.findMany({
      orderBy: { key: "asc" }
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
      { status: 500 }
    );
  }
}

// POST - Create or update site settings (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { key, value, type = "text", description } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: { value, type, description },
      create: { key, value, type, description }
    });

    // Create notification for settings update
    await prisma.notification.create({
      data: {
        type: "SETTINGS_UPDATE",
        title: "Settings Updated",
        message: `Site setting "${key}" has been updated.`,
        data: JSON.stringify({ key, type })
      }
    });

    return NextResponse.json(setting);
  } catch (error) {
    console.error("Error updating site settings:", error);
    return NextResponse.json(
      { error: "Failed to update site settings" },
      { status: 500 }
    );
  }
}

// PUT - Bulk update site settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { settings } = body; // Array of { key, value, type?, description? }

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: "Settings must be an array" },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      settings.map(async (s: { key: string; value: string; type?: string; description?: string }) => {
        return prisma.siteSettings.upsert({
          where: { key: s.key },
          update: { value: s.value, type: s.type || "text", description: s.description },
          create: { key: s.key, value: s.value, type: s.type || "text", description: s.description }
        });
      })
    );

    // Create notification for bulk settings update
    await prisma.notification.create({
      data: {
        type: "SETTINGS_UPDATE",
        title: "Multiple Settings Updated",
        message: `${settings.length} site settings have been updated.`,
        data: JSON.stringify({ keys: settings.map((s: { key: string }) => s.key) })
      }
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error bulk updating site settings:", error);
    return NextResponse.json(
      { error: "Failed to bulk update site settings" },
      { status: 500 }
    );
  }
}
