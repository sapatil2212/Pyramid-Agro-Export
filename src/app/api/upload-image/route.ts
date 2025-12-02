import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload image API called');
    
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.log('No session found, returning 401');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Session found:', session.user?.email);
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('File received:', file.name, file.size, file.type);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size);
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    console.log('Starting Cloudinary upload...');
    
    try {
      const folder = formData.get('folder') as string || 'pyramid-agro-export';
      const imageUrl = await uploadImage(file, folder);
      console.log('Upload successful, URL:', imageUrl);
      return NextResponse.json({ url: imageUrl });
    } catch (cloudinaryError) {
      console.log('Cloudinary upload failed:', cloudinaryError);
      
      // Return error instead of placeholder since placeholders don't work on Vercel
      return NextResponse.json(
        { 
          error: 'Image upload failed. Please configure Cloudinary credentials in Vercel environment variables.',
          details: cloudinaryError instanceof Error ? cloudinaryError.message : 'Unknown error',
          cloudinaryConfigured: false
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to upload image',
        details: error instanceof Error ? error.stack : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
