import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'Test upload API is working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Test upload API called');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    console.log('File received:', file?.name, file?.size, file?.type);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test upload successful',
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type
    });
  } catch (error) {
    console.error('Test upload error:', error);
    return NextResponse.json(
      { 
        error: 'Test upload failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
