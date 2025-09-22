import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const aboutFeatures = await prisma.aboutFeature.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(aboutFeatures);
  } catch (error) {
    console.error('Error fetching about features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about features' },
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
    const { section, title, description, icon, order } = body;

    const aboutFeature = await prisma.aboutFeature.create({
      data: {
        section,
        title,
        description,
        icon,
        order: order || 0
      }
    });

    return NextResponse.json(aboutFeature);
  } catch (error) {
    console.error('Error creating about feature:', error);
    return NextResponse.json(
      { error: 'Failed to create about feature' },
      { status: 500 }
    );
  }
}
