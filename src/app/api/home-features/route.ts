import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const features = await prisma.homePageFeature.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(features);
  } catch (error) {
    console.error('Error fetching home features:', error);
    return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const feature = await prisma.homePageFeature.create({
      data: {
        section: data.section,
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: data.order || 0,
        isActive: data.isActive !== false
      }
    });

    return NextResponse.json(feature);
  } catch (error) {
    console.error('Error creating home feature:', error);
    return NextResponse.json({ error: 'Failed to create feature' }, { status: 500 });
  }
}
