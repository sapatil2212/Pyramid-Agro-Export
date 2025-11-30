import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const content = await prisma.aboutPageContent.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(content);
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
    const body = await request.json();
    const { section, title, subtitle, description, imageUrl, buttonText, buttonLink, isActive } = body;

    // Validate required fields
    if (!section) {
      return NextResponse.json(
        { error: 'Section is required' },
        { status: 400 }
      );
    }

    // Check if section already exists (only for single-content sections)
    const singleContentSections = ['story', 'team'];
    if (singleContentSections.includes(section)) {
      const existingContent = await prisma.aboutPageContent.findFirst({
        where: { section }
      });

      if (existingContent) {
        return NextResponse.json(
          { error: 'Content for this section already exists' },
          { status: 400 }
        );
      }
    }

    const content = await prisma.aboutPageContent.create({
      data: {
        section,
        title,
        subtitle,
        description,
        imageUrl,
        buttonText,
        buttonLink,
        isActive: isActive ?? true
      }
    });

    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    console.error('Error creating about content:', error);
    return NextResponse.json(
      { error: 'Failed to create about content' },
      { status: 500 }
    );
  }
}