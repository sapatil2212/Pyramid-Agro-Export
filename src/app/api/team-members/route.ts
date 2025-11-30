import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface TeamMemberPayload {
  name: string;
  position: string;
  bio?: string;
  expertise?: string[] | null;
  email?: string;
  linkedin?: string;
  imageUrl?: string;
  order?: number;
  isActive?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const where: Prisma.TeamMemberWhereInput = {};
    if (active === 'true') where.isActive = true;

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TeamMemberPayload;
    const { name, position, bio, expertise, email, linkedin, imageUrl, order, isActive } = body;

    // Validate required fields
    if (!name || !position) {
      return NextResponse.json(
        { error: 'Name and position are required' },
        { status: 400 }
      );
    }

    // Get the next order number if not provided
    let nextOrder = order;
    if (nextOrder === undefined) {
      const lastMember = await prisma.teamMember.findFirst({
        orderBy: { order: 'desc' }
      });
      nextOrder = lastMember ? lastMember.order + 1 : 0;
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        position,
        bio,
        expertise: Array.isArray(expertise) ? JSON.stringify(expertise) : expertise,
        email,
        linkedin,
        imageUrl,
        order: nextOrder,
        isActive: isActive ?? true
      }
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}