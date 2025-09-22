import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const aboutContent = await prisma.aboutPageContent.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(aboutContent);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
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

    const aboutContent = await prisma.aboutPageContent.upsert({
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

    return NextResponse.json(aboutContent);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { error: 'Failed to update about content' },
      { status: 500 }
    );
  }
}
