import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/export-process - Get all export process steps
export async function GET() {
  try {
    const steps = await prisma.exportProcess.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(steps)
  } catch (error) {
    console.error("Error fetching export process:", error)
    return NextResponse.json({ error: "Failed to fetch export process" }, { status: 500 })
  }
}

// POST /api/export-process - Create a new step
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { step, title, description, icon, color, order, isActive } = body

    const maxOrder = await prisma.exportProcess.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const newStep = await prisma.exportProcess.create({
      data: {
        step: step || String((maxOrder?.order ?? 0) + 1).padStart(2, '0'),
        title,
        description,
        icon: icon || 'message-circle',
        color: color || 'emerald',
        order: order ?? (maxOrder?.order ?? 0) + 1,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json(newStep)
  } catch (error) {
    console.error("Error creating export process step:", error)
    return NextResponse.json({ error: "Failed to create step" }, { status: 500 })
  }
}
