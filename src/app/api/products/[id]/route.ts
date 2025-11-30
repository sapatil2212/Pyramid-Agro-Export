import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/products/[id] - Get a specific product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
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

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const parsedProduct = {
      ...product,
      images: product.images ? JSON.parse(product.images) : null,
      specifications: product.specifications ? JSON.parse(product.specifications) : null,
      seasons: product.seasons ? JSON.parse(product.seasons) : null,
      packaging: product.packaging ? JSON.parse(product.packaging) : null,
      price: product.price ? JSON.parse(product.price) : null,
      features: product.features ? JSON.parse(product.features) : null,
      nutritionalInfo: product.nutritionalInfo ? JSON.parse(product.nutritionalInfo) : null,
      certifications: product.certifications ? JSON.parse(product.certifications) : null,
      storageConditions: product.storageConditions ? JSON.parse(product.storageConditions) : null,
      exportMarkets: product.exportMarkets ? JSON.parse(product.exportMarkets) : null
    }

    return NextResponse.json(parsedProduct)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      heroButton2Link,
      // Features section fields
      featuresTitle,
      featuresSubtitle,
      // CTA section fields
      ctaTitle,
      ctaDescription,
      ctaButtonText,
      ctaButtonLink,
      // Nashik Grapes Table fields
      tableTitle,
      tableDescription,
      tableVarieties,
      tableSpecs,
      tableAdvantages
    } = body

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Check if slug already exists (excluding current product)
    if (slug && slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: "Product with this slug already exists" },
          { status: 400 }
        )
      }
    }

    // Check if category exists
    if (categoryId) {
      const category = await prisma.productCategory.findUnique({
        where: { id: categoryId }
      })

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 400 }
        )
      }
    }

    const product = await prisma.product.update({
      where: { id },
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
        availability,
        features: features ? JSON.stringify(features) : null,
        nutritionalInfo: nutritionalInfo ? JSON.stringify(nutritionalInfo) : null,
        certifications: certifications ? JSON.stringify(certifications) : null,
        shelfLife,
        storageConditions: storageConditions ? JSON.stringify(storageConditions) : null,
        exportMarkets: exportMarkets ? JSON.stringify(exportMarkets) : null,
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
        heroButton2Link,
        // Features section fields
        featuresTitle,
        featuresSubtitle,
        // CTA section fields
        ctaTitle,
        ctaDescription,
        ctaButtonText,
        ctaButtonLink,
        // Nashik Grapes Table fields
        tableTitle,
        tableDescription,
        tableVarieties,
        tableSpecs,
        tableAdvantages
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

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}
