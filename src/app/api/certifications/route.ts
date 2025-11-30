import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const certifications = await prisma.certification.findMany({
      where: activeOnly ? { isActive: true } : {},
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
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
    const { name, fullName, issuer, validUntil, description, imageUrl, icon, color, features, order } = body;

    const certification = await prisma.certification.create({
      data: {
        name,
        fullName,
        issuer,
        validUntil,
        description,
        imageUrl,
        icon,
        color,
        features: features ? JSON.stringify(features) : null,
        order: order || 0
      }
    });

    return NextResponse.json(certification);
  } catch (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json(
      { error: 'Failed to create certification' },
      { status: 500 }
    );
  }
}
