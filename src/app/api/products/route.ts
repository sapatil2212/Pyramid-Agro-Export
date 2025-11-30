import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Prisma } from "@prisma/client"

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"
    const admin = searchParams.get("admin") === "true"
    const categoryId = searchParams.get("categoryId")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const slug = searchParams.get("slug")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const where: Prisma.ProductWhereInput = {}
    
    if (!admin || !includeInactive) {
      where.isActive = true
    }
    
    if (categoryId) {
      where.categoryId = categoryId
    }
    
    if (featured === "true") {
      where.isFeatured = true
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { shortDescription: { contains: search } }
      ]
    }
    
    if (slug) {
      where.slug = slug
    }

    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              color: true
            }
          }
        },
        orderBy: [
          { isFeatured: "desc" },
          { order: "asc" },
          { createdAt: "desc" }
        ],
        skip,
        take: limit
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      slug,
      description,
      shortDescription,
      imageUrl,
      images,
      categoryId,
      specifications,
      origin,
      seasons,
      minOrderQuantity,
      packaging,
      price,
      availability,
      features,
      nutritionalInfo,
      certifications,
      shelfLife,
      storageConditions,
      exportMarkets,
      rating,
      reviews,
      isFeatured,
      isOrganic,
      isPremium,
      isActive,
      order,
      // Hero section fields
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroImageUrl,
      heroButtonText,
      heroButtonLink,
      heroButton2Text,
      heroButton2Link
    } = body

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 400 }
      )
    }

    // Check if category exists
    const category = await prisma.productCategory.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        imageUrl,
        images: images ? JSON.stringify(images) : null,
        categoryId,
        specifications: specifications ? JSON.stringify(specifications) : null,
        origin,
        seasons: seasons ? JSON.stringify(seasons) : null,
        minOrderQuantity,
        packaging: packaging ? JSON.stringify(packaging) : null,
        price: price ? JSON.stringify(price) : null,
        availability: availability || "in-stock",
        features: features ? JSON.stringify(features) : null,
        nutritionalInfo: nutritionalInfo ? JSON.stringify(nutritionalInfo) : null,
        certifications: certifications ? JSON.stringify(certifications) : null,
        shelfLife,
        storageConditions: storageConditions ? JSON.stringify(storageConditions) : null,
        exportMarkets: exportMarkets ? JSON.stringify(exportMarkets) : null,
        rating: rating || 0,
        reviews: reviews || 0,
        isFeatured: isFeatured || false,
        isOrganic: isOrganic || false,
        isPremium: isPremium || false,
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0,
        // Hero section fields
        heroTitle,
        heroSubtitle,
        heroDescription,
        heroImageUrl,
        heroButtonText,
        heroButtonLink,
        heroButton2Text,
        heroButton2Link
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true
          }
        }
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}
