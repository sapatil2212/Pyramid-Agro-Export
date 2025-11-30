import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/testimonials - Get all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const testimonials = await prisma.testimonial.findMany({
      where: activeOnly ? { isActive: true } : {},
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Create a new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, company, location, quote, rating, avatar, imageUrl, verified, order } = body;

    // Validate required fields
    if (!name || !position || !company || !quote) {
      return NextResponse.json(
        { error: 'Missing required fields: name, position, company, quote' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Get the next order number if not provided
    let nextOrder = order;
    if (nextOrder === undefined) {
      const lastTestimonial = await prisma.testimonial.findFirst({
        orderBy: { order: 'desc' }
      });
      nextOrder = lastTestimonial ? lastTestimonial.order + 1 : 0;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        position,
        company,
        location: location || null,
        quote,
        rating: rating || 5,
        avatar: avatar || name.charAt(0).toUpperCase(),
        imageUrl: imageUrl || null,
        verified: verified !== undefined ? verified : true,
        order: nextOrder
      }
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
