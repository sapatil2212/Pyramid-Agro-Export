import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Simple test API called');
  return NextResponse.json({ 
    success: true, 
    message: 'Simple test API is working',
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  console.log('Simple test POST API called');
  return NextResponse.json({ 
    success: true, 
    message: 'Simple test POST API is working',
    timestamp: new Date().toISOString()
  });
}
