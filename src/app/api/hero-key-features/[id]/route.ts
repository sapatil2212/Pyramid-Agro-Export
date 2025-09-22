import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { text, icon, order, isActive } = await request.json();
    
    const feature = await prisma.heroKeyFeature.update({
      where: { id },
      data: {
        text,
        icon,
        order,
        isActive
      }
    });
    
    return NextResponse.json(feature);
  } catch (error) {
    console.error('Error updating hero key feature:', error);
    return NextResponse.json({ error: 'Failed to update hero key feature' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.heroKeyFeature.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero key feature:', error);
    return NextResponse.json({ error: 'Failed to delete hero key feature' }, { status: 500 });
  }
}
