import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/enquiries - Get all enquiries
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const where: Record<string, unknown> = {}
    
    if (status && status !== "all") {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { productInterested: { contains: search, mode: "insensitive" } },
      ]
    }

    const skip = (page - 1) * limit

    const [enquiries, total, unreadCount] = await Promise.all([
      prisma.contactEnquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactEnquiry.count({ where }),
      prisma.contactEnquiry.count({ where: { isRead: false } }),
    ])

    return NextResponse.json({
      enquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      unreadCount,
    })
  } catch (error) {
    console.error("Error fetching enquiries:", error)
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    )
  }
}
