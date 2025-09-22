import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const aboutImages = await prisma.aboutImage.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(aboutImages);
  } catch (error) {
    console.error('Error fetching about images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about images' },
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
    const { imageUrl, altText, title, subtitle, section, order } = body;

    const aboutImage = await prisma.aboutImage.create({
      data: {
        imageUrl,
        altText,
        title,
        subtitle,
        section,
        order: order || 0
      }
    });

    return NextResponse.json(aboutImage);
  } catch (error) {
    console.error('Error creating about image:', error);
    return NextResponse.json(
      { error: 'Failed to create about image' },
      { status: 500 }
    );
  }
}
