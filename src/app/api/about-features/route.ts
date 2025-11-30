import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface AboutFeaturePayload {
  section: string;
  title: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const active = searchParams.get('active');

    const where: Prisma.AboutFeatureWhereInput = {};
    if (section) where.section = section;
    if (active === 'true') where.isActive = true;

    const features = await prisma.aboutFeature.findMany({
      where,
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(features);
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
    const body = (await request.json()) as AboutFeaturePayload;
    const { section, title, description, icon, order, isActive } = body;

    // Validate required fields
    if (!section || !title) {
      return NextResponse.json(
        { error: 'Section and title are required' },
        { status: 400 }
      );
    }

    // Get the next order number if not provided
    let nextOrder = order;
    if (nextOrder === undefined) {
      const lastFeature = await prisma.aboutFeature.findFirst({
        where: { section },
        orderBy: { order: 'desc' }
      });
      nextOrder = lastFeature ? lastFeature.order + 1 : 0;
    }

    const feature = await prisma.aboutFeature.create({
      data: {
        section,
        title,
        description,
        icon,
        order: nextOrder,
        isActive: isActive ?? true
      }
    });

    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error('Error creating about feature:', error);
    return NextResponse.json(
      { error: 'Failed to create about feature' },
      { status: 500 }
    );
  }
}