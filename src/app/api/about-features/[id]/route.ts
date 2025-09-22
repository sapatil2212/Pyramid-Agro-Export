import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { section, title, description, icon, order, isActive } = body;

    const aboutFeature = await prisma.aboutFeature.update({
      where: { id },
      data: {
        section,
        title,
        description,
        icon,
        order,
        isActive,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(aboutFeature);
  } catch (error) {
    console.error('Error updating about feature:', error);
    return NextResponse.json(
      { error: 'Failed to update about feature' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await prisma.aboutFeature.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting about feature:', error);
    return NextResponse.json(
      { error: 'Failed to delete about feature' },
      { status: 500 }
    );
  }
}
