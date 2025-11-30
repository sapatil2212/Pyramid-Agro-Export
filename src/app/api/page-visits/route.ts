import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET analytics data (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "today"; // today, week, month, all
    const type = searchParams.get("type") || "summary"; // summary, detailed, realtime

    let startDate: Date;
    const now = new Date();

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    if (type === "realtime") {
      // Get visits in the last 5 minutes
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const realtimeVisits = await prisma.pageVisit.count({
        where: {
          createdAt: { gte: fiveMinutesAgo }
        }
      });

      const uniqueVisitors = await prisma.pageVisit.groupBy({
        by: ["visitorId"],
        where: {
          createdAt: { gte: fiveMinutesAgo },
          visitorId: { not: null }
        }
      });

      return NextResponse.json({
        activeVisitors: uniqueVisitors.length,
        recentPageViews: realtimeVisits
      });
    }

    // Total visits
    const totalVisits = await prisma.pageVisit.count({
      where: {
        createdAt: { gte: startDate }
      }
    });

    // Unique visitors
    const uniqueVisitors = await prisma.pageVisit.groupBy({
      by: ["visitorId"],
      where: {
        createdAt: { gte: startDate },
        visitorId: { not: null }
      }
    });

    // Visits by page
    const visitsByPage = await prisma.pageVisit.groupBy({
      by: ["page"],
      where: {
        createdAt: { gte: startDate }
      },
      _count: { page: true },
      orderBy: { _count: { page: "desc" } },
      take: 10
    });

    // Visits by device
    const visitsByDevice = await prisma.pageVisit.groupBy({
      by: ["device"],
      where: {
        createdAt: { gte: startDate },
        device: { not: null }
      },
      _count: { device: true }
    });

    // Visits by browser
    const visitsByBrowser = await prisma.pageVisit.groupBy({
      by: ["browser"],
      where: {
        createdAt: { gte: startDate },
        browser: { not: null }
      },
      _count: { browser: true }
    });

    // Visits by country
    const visitsByCountry = await prisma.pageVisit.groupBy({
      by: ["country"],
      where: {
        createdAt: { gte: startDate },
        country: { not: null }
      },
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
      take: 10
    });

    // Daily visits for chart (last 7 days)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailyVisits = await prisma.$queryRaw`
      SELECT DATE(createdAt) as date, COUNT(*) as count
      FROM PageVisit
      WHERE createdAt >= ${sevenDaysAgo}
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    ` as Array<{ date: Date; count: bigint }>;

    // Get previous period for comparison
    const previousPeriodStart = new Date(startDate.getTime() - (now.getTime() - startDate.getTime()));
    const previousVisits = await prisma.pageVisit.count({
      where: {
        createdAt: {
          gte: previousPeriodStart,
          lt: startDate
        }
      }
    });

    const previousUniqueVisitors = await prisma.pageVisit.groupBy({
      by: ["visitorId"],
      where: {
        createdAt: {
          gte: previousPeriodStart,
          lt: startDate
        },
        visitorId: { not: null }
      }
    });

    // Calculate percentage changes
    const visitsChange = previousVisits > 0 
      ? ((totalVisits - previousVisits) / previousVisits * 100).toFixed(1)
      : "0";
    
    const visitorsChange = previousUniqueVisitors.length > 0
      ? ((uniqueVisitors.length - previousUniqueVisitors.length) / previousUniqueVisitors.length * 100).toFixed(1)
      : "0";

    return NextResponse.json({
      totalVisits,
      uniqueVisitors: uniqueVisitors.length,
      visitsChange: `${Number(visitsChange) >= 0 ? "+" : ""}${visitsChange}%`,
      visitorsChange: `${Number(visitorsChange) >= 0 ? "+" : ""}${visitorsChange}%`,
      visitsByPage: visitsByPage.map(v => ({ page: v.page, count: v._count.page })),
      visitsByDevice: visitsByDevice.map(v => ({ device: v.device, count: v._count.device })),
      visitsByBrowser: visitsByBrowser.map(v => ({ browser: v.browser, count: v._count.browser })),
      visitsByCountry: visitsByCountry.map(v => ({ country: v.country, count: v._count.country })),
      dailyVisits: dailyVisits.map(v => ({ date: v.date, count: Number(v.count) })),
      period
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

// POST - Track a page visit (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, visitorId, referrer, sessionId } = body;

    if (!page) {
      return NextResponse.json(
        { error: "Page is required" },
        { status: 400 }
      );
    }

    // Get user agent info
    const userAgent = request.headers.get("user-agent") || "";
    
    // Parse device type from user agent
    let device = "desktop";
    if (/mobile/i.test(userAgent)) {
      device = "mobile";
    } else if (/tablet|ipad/i.test(userAgent)) {
      device = "tablet";
    }

    // Parse browser from user agent
    let browser = "unknown";
    if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) {
      browser = "Chrome";
    } else if (/firefox/i.test(userAgent)) {
      browser = "Firefox";
    } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
      browser = "Safari";
    } else if (/edge/i.test(userAgent)) {
      browser = "Edge";
    } else if (/opera|opr/i.test(userAgent)) {
      browser = "Opera";
    }

    const visit = await prisma.pageVisit.create({
      data: {
        page,
        visitorId,
        userAgent,
        referrer,
        device,
        browser,
        sessionId
      }
    });

    return NextResponse.json({ success: true, id: visit.id });
  } catch (error) {
    console.error("Error tracking page visit:", error);
    return NextResponse.json(
      { error: "Failed to track page visit" },
      { status: 500 }
    );
  }
}
