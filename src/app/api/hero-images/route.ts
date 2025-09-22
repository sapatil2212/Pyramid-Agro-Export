import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // If user is authenticated (dashboard), return all images
    // If not authenticated (public), return only active images
    const heroImages = await prisma.heroImage.findMany({
      where: session ? {} : { isActive: true },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(heroImages);
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { imageUrl, altText, title, subtitle, order, isActive } = body;

    const heroImage = await prisma.heroImage.create({
      data: {
        imageUrl,
        altText,
        title,
        subtitle,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    return NextResponse.json(heroImage);
  } catch (error) {
    console.error('Error creating hero image:', error);
    return NextResponse.json(
      { error: 'Failed to create hero image' },
      { status: 500 }
    );
  }
}
