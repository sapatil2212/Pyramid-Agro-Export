import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/product-categories - Get all product categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"
    const admin = searchParams.get("admin") === "true"

    const categories = await prisma.productCategory.findMany({
      where: admin && includeInactive ? {} : { isActive: true },
      include: {
        products: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
            isFeatured: true,
            isActive: true
          }
        },
        _count: {
          select: {
            products: admin && includeInactive ? {} : { where: { isActive: true } }
          }
        }
      },
      orderBy: { order: "asc" }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching product categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch product categories" },
      { status: 500 }
    )
  }
}

// POST /api/product-categories - Create a new product category
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description, imageUrl, icon, color, order, isActive } = body

    // Check if slug already exists
    const existingCategory = await prisma.productCategory.findUnique({
      where: { slug }
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category with this slug already exists" },
        { status: 400 }
      )
    }

    const category = await prisma.productCategory.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
        icon,
        color,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating product category:", error)
    return NextResponse.json(
      { error: "Failed to create product category" },
      { status: 500 }
    )
  }
}
