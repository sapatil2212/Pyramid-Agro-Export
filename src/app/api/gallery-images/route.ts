import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') || 'facilities';

    const galleryImages = await prisma.galleryImage.findMany({
      where: { section },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(galleryImages);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

// POST - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, altText, title, description, section = 'facilities' } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Validate section
    if (typeof section !== 'string' || section.trim() === '') {
      return NextResponse.json(
        { error: 'Valid section is required' },
        { status: 400 }
      );
    }

    // Get the highest order number for this section
    const lastImage = await prisma.galleryImage.findFirst({
      where: { section },
      orderBy: { order: 'desc' }
    });

    const newOrder = lastImage ? lastImage.order + 1 : 0;

    const galleryImage = await prisma.galleryImage.create({
      data: {
        imageUrl,
        altText: altText || null,
        title: title || null,
        description: description || null,
        section,
        order: newOrder
      }
    });

    return NextResponse.json(galleryImage, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create gallery image';
    return NextResponse.json(
      { error: errorMessage, details: error },
      { status: 500 }
    );
  }
}
