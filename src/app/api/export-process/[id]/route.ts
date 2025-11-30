import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/export-process/[id]
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const step = await prisma.exportProcess.findUnique({ where: { id } })
    if (!step) return NextResponse.json({ error: "Step not found" }, { status: 404 })
    return NextResponse.json(step)
  } catch (error) {
    console.error("Error fetching step:", error)
    return NextResponse.json({ error: "Failed to fetch step" }, { status: 500 })
  }
}

// PUT /api/export-process/[id]
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { step, title, description, icon, color, order, isActive } = body

    const existing = await prisma.exportProcess.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "Step not found" }, { status: 404 })

    const updated = await prisma.exportProcess.update({
      where: { id },
      data: {
        ...(step !== undefined && { step }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(color !== undefined && { color }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating step:", error)
    return NextResponse.json({ error: "Failed to update step" }, { status: 500 })
  }
}

// DELETE /api/export-process/[id]
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existing = await prisma.exportProcess.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "Step not found" }, { status: 404 })

    await prisma.exportProcess.delete({ where: { id } })
    return NextResponse.json({ message: "Step deleted successfully" })
  } catch (error) {
    console.error("Error deleting step:", error)
    return NextResponse.json({ error: "Failed to delete step" }, { status: 500 })
  }
}
