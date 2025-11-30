import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/services - Get all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })

    // Parse features from JSON strings
    const parsedServices = services.map(service => ({
      ...service,
      features: service.features ? JSON.parse(service.features) : []
    }))

    return NextResponse.json(parsedServices)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, icon, color, features, order, isActive } = body

    // Get the highest order number
    const maxOrder = await prisma.service.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon: icon || 'shield',
        color: color || 'from-emerald-500 to-emerald-600',
        features: features ? JSON.stringify(features) : null,
        order: order ?? (maxOrder?.order ?? 0) + 1,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json({
      ...service,
      features: service.features ? JSON.parse(service.features) : []
    })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    )
  }
}
