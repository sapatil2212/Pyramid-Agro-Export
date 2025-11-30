import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/enquiries/[id] - Get single enquiry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const enquiry = await prisma.contactEnquiry.findUnique({
      where: { id },
    })

    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 })
    }

    // Mark as read
    if (!enquiry.isRead) {
      await prisma.contactEnquiry.update({
        where: { id },
        data: { isRead: true },
      })
    }

    return NextResponse.json(enquiry)
  } catch (error) {
    console.error("Error fetching enquiry:", error)
    return NextResponse.json(
      { error: "Failed to fetch enquiry" },
      { status: 500 }
    )
  }
}

// PATCH /api/enquiries/[id] - Update enquiry status/notes
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status, notes, isRead } = body

    const updateData: Record<string, unknown> = {}
    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (isRead !== undefined) updateData.isRead = isRead

    const enquiry = await prisma.contactEnquiry.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(enquiry)
  } catch (error) {
    console.error("Error updating enquiry:", error)
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    )
  }
}

// DELETE /api/enquiries/[id] - Delete enquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    await prisma.contactEnquiry.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Enquiry deleted successfully" })
  } catch (error) {
    console.error("Error deleting enquiry:", error)
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    )
  }
}
