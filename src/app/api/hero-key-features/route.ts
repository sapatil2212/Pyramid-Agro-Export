import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const features = await prisma.heroKeyFeature.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    
    return NextResponse.json(features);
  } catch (error) {
    console.error('Error fetching hero key features:', error);
    return NextResponse.json({ error: 'Failed to fetch hero key features' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text, icon, order } = await request.json();
    
    const feature = await prisma.heroKeyFeature.create({
      data: {
        text,
        icon,
        order: order || 0
      }
    });
    
    return NextResponse.json(feature);
  } catch (error) {
    console.error('Error creating hero key feature:', error);
    return NextResponse.json({ error: 'Failed to create hero key feature' }, { status: 500 });
  }
}
