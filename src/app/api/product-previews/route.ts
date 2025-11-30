import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const productPreviews = await prisma.productPreview.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(productPreviews);
  } catch (error) {
    console.error('Error fetching product previews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product previews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, benefits, imageUrl, link, order, isActive } = body;

    // Validate required fields
    if (!title || !imageUrl || !link) {
      return NextResponse.json(
        { error: 'Title, image URL, and link are required' },
        { status: 400 }
      );
    }

    // Parse benefits if it's a string
    let parsedBenefits = benefits;
    if (typeof benefits === 'string') {
      try {
        parsedBenefits = JSON.parse(benefits);
      } catch {
        parsedBenefits = benefits.split(',').map(b => b.trim());
      }
    }

    const productPreview = await prisma.productPreview.create({
      data: {
        title,
        description,
        benefits: parsedBenefits ? JSON.stringify(parsedBenefits) : null,
        imageUrl,
        link,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    return NextResponse.json(productPreview);
  } catch (error) {
    console.error('Error creating product preview:', error);
    return NextResponse.json(
      { error: 'Failed to create product preview' },
      { status: 500 }
    );
  }
}
