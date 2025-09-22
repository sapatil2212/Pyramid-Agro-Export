import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const homeContent = await prisma.homePageContent.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(homeContent);
  } catch (error) {
    console.error('Error fetching home content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home content' },
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
    const { section, title, subtitle, description, imageUrl, buttonText, buttonLink } = body;

    const homeContent = await prisma.homePageContent.upsert({
      where: { section },
      update: {
        title,
        subtitle,
        description,
        imageUrl,
        buttonText,
        buttonLink,
        updatedAt: new Date()
      },
      create: {
        section,
        title,
        subtitle,
        description,
        imageUrl,
        buttonText,
        buttonLink
      }
    });

    return NextResponse.json(homeContent);
  } catch (error) {
    console.error('Error updating home content:', error);
    return NextResponse.json(
      { error: 'Failed to update home content' },
      { status: 500 }
    );
  }
}
