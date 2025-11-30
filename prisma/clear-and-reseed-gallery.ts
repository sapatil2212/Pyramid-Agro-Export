import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAndReseedGallery() {
  try {
    console.log('🧹 Clearing existing gallery images...');

    // Clear existing gallery images
    await prisma.galleryImage.deleteMany({
      where: { section: 'facilities' }
    });

    console.log('✅ Gallery images cleared');

    // Add sample gallery images with local images
    const sampleImages = [
      {
        imageUrl: '/facilities/facility-1.png',
        altText: 'Modern agricultural processing facility',
        title: 'Processing Facility',
        description: 'Our state-of-the-art processing facility equipped with the latest technology',
        section: 'facilities',
        order: 0,
        isActive: true
      },
      {
        imageUrl: '/facilities/facility-2.png',
        altText: 'Quality control laboratory',
        title: 'Quality Control Lab',
        description: 'Advanced quality control laboratory ensuring the highest standards',
        section: 'facilities',
        order: 1,
        isActive: true
      },
      {
        imageUrl: '/facilities/facility-3.png',
        altText: 'Storage and packaging area',
        title: 'Storage & Packaging',
        description: 'Climate-controlled storage and automated packaging systems',
        section: 'facilities',
        order: 2,
        isActive: true
      }
    ];

    for (const imageData of sampleImages) {
      const image = await prisma.galleryImage.create({
        data: imageData
      });
      console.log('✅ Sample gallery image created:', image.title);
    }

    console.log('🎉 Gallery reseeding completed!');
  } catch (error) {
    console.error('❌ Error reseeding gallery:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
clearAndReseedGallery()
  .catch((error) => {
    console.error('Reseed failed:', error);
    process.exit(1);
  });
