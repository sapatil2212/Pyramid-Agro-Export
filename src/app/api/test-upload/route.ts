import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Test upload API called');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    console.log('File received:', file?.name, file?.size, file?.type);
    console.log('Folder:', folder);

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // For testing, just return a mock URL
    const mockUrl = `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(file.name)}`;
    
    return NextResponse.json({ 
      url: mockUrl,
      message: 'Test upload successful (mock URL)',
      fileInfo: {
        name: file.name,
        size: file.size,
        type: file.type,
        folder: folder
      }
    });
  } catch (error) {
    console.error('Error in test upload:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process test upload',
        details: error instanceof Error ? error.stack : 'Unknown error'
      },
      { status: 500 }
    );
  }
}