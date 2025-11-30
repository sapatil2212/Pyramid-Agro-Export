import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { section } = await params;
    const body = await request.json();
    const { buttonText, buttonLink, button2Text, button2Link, title, subtitle, description, imageUrl } = body;

    const homeContent = await prisma.homePageContent.upsert({
      where: { section },
      update: {
        title,
        subtitle,
        description,
        imageUrl,
        buttonText,
        buttonLink,
        button2Text,
        button2Link,
        updatedAt: new Date()
      },
      create: {
        section,
        title,
        subtitle,
        description,
        imageUrl,
        buttonText,
        buttonLink,
        button2Text,
        button2Link
      }
    });

    return NextResponse.json(homeContent);
  } catch (error) {
    console.error('Error updating home content section:', error);
    return NextResponse.json(
      { error: 'Failed to update home content section' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    
    const homeContent = await prisma.homePageContent.findUnique({
      where: { section }
    });

    if (!homeContent) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(homeContent);
  } catch (error) {
    console.error('Error fetching home content section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home content section' },
      { status: 500 }
    );
  }
}
