import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/product-categories/[id] - Get a specific product category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await prisma.productCategory.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { order: "asc" }
        },
        _count: {
          select: {
            products: { where: { isActive: true } }
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching product category:", error)
    return NextResponse.json(
      { error: "Failed to fetch product category" },
      { status: 500 }
    )
  }
}

// PUT /api/product-categories/[id] - Update a product category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description, imageUrl, icon, color, order, isActive } = body

    // Check if category exists
    const existingCategory = await prisma.productCategory.findUnique({
      where: { id }
    })

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    // Check if slug already exists (excluding current category)
    if (slug && slug !== existingCategory.slug) {
      const slugExists = await prisma.productCategory.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: "Category with this slug already exists" },
          { status: 400 }
        )
      }
    }

    const category = await prisma.productCategory.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        imageUrl,
        icon,
        color,
        order,
        isActive
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error updating product category:", error)
    return NextResponse.json(
      { error: "Failed to update product category" },
      { status: 500 }
    )
  }
}

// PATCH /api/product-categories/[id] - Partial update (e.g., toggle isActive)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Check if category exists
    const existingCategory = await prisma.productCategory.findUnique({
      where: { id }
    })

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    const category = await prisma.productCategory.update({
      where: { id },
      data: body
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error updating product category:", error)
    return NextResponse.json(
      { error: "Failed to update product category" },
      { status: 500 }
    )
  }
}

// DELETE /api/product-categories/[id] - Delete a product category and its products
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if category exists
    const existingCategory = await prisma.productCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    // Delete all products in this category first
    if (existingCategory._count.products > 0) {
      await prisma.product.deleteMany({
        where: { categoryId: id }
      })
    }

    // Then delete the category
    await prisma.productCategory.delete({
      where: { id }
    })

    return NextResponse.json({ 
      message: "Category deleted successfully",
      productsDeleted: existingCategory._count.products
    })
  } catch (error) {
    console.error("Error deleting product category:", error)
    return NextResponse.json(
      { error: "Failed to delete product category" },
      { status: 500 }
    )
  }
}
