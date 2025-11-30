import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productPreview = await prisma.productPreview.findUnique({
      where: { id }
    });

    if (!productPreview) {
      return NextResponse.json(
        { error: 'Product preview not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(productPreview);
  } catch (error) {
    console.error('Error fetching product preview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product preview' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json();
    const { title, description, benefits, imageUrl, link, order, isActive } = body;

    // Parse benefits if it's a string
    let parsedBenefits = benefits;
    if (typeof benefits === 'string') {
      try {
        parsedBenefits = JSON.parse(benefits);
      } catch {
        parsedBenefits = benefits.split(',').map(b => b.trim());
      }
    }

    const productPreview = await prisma.productPreview.update({
      where: { id },
      data: {
        title,
        description,
        benefits: parsedBenefits ? JSON.stringify(parsedBenefits) : null,
        imageUrl,
        link,
        order: order !== undefined ? order : 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    return NextResponse.json(productPreview);
  } catch (error) {
    console.error('Error updating product preview:', error);
    return NextResponse.json(
      { error: 'Failed to update product preview' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.productPreview.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product preview:', error);
    return NextResponse.json(
      { error: 'Failed to delete product preview' },
      { status: 500 }
    );
  }
}
