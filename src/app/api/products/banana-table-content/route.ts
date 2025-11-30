import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// PUT /api/products/banana-table-content - Update table content for banana product
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { tableTitle, tableDescription, tableVarieties, tableSpecs, tableAdvantages } = body

    // Find the banana product
    const bananaProduct = await prisma.product.findFirst({
      where: { slug: "banana" }
    })

    if (!bananaProduct) {
      return NextResponse.json({ error: "Banana product not found" }, { status: 404 })
    }

    // Update the product with new table content
    const updatedProduct = await prisma.product.update({
      where: { id: bananaProduct.id },
      data: {
        tableTitle: tableTitle || null,
        tableDescription: tableDescription || null,
        tableVarieties: tableVarieties || null,
        tableSpecs: tableSpecs || null,
        tableAdvantages: tableAdvantages || null,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: "Table content updated successfully",
      product: updatedProduct
    })

  } catch (error) {
    console.error("Error updating table content:", error)
    return NextResponse.json(
      { error: "Failed to update table content" },
      { status: 500 }
    )
  }
}
