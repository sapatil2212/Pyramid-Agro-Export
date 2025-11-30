import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedFacilitiesSection() {
  try {
    console.log('🌱 Seeding facilities section...');

    // Create facilities-preview section
    const facilitiesSection = await prisma.homePageContent.upsert({
      where: { section: 'facilities-preview' },
      update: {},
      create: {
        section: 'facilities-preview',
        title: 'Explore Our Modern Facilities',
        subtitle: 'State-of-the-art Agricultural Processing',
        description: 'Take a virtual tour of our state-of-the-art agricultural processing facilities and discover the advanced technology and quality standards we maintain for your produce',
        isActive: true
      }
    });

    console.log('✅ Facilities section created:', facilitiesSection);

    // Add some sample gallery images with Cloudinary URLs
    const sampleImages = [
      {
        imageUrl: 'https://res.cloudinary.com/drctoxvtl/image/upload/v1758700805/pyramid-agro-export/oo28og1pmull4xfknpqi.png',
        altText: 'Modern agricultural processing facility',
        title: 'Processing Facility',
        description: 'Our state-of-the-art processing facility equipped with the latest technology',
        section: 'facilities',
        order: 0,
        isActive: true
      },
      {
        imageUrl: 'https://res.cloudinary.com/drctoxvtl/image/upload/v1758700805/pyramid-agro-export/oo28og1pmull4xfknpqi.png',
        altText: 'Quality control laboratory',
        title: 'Quality Control Lab',
        description: 'Advanced quality control laboratory ensuring the highest standards',
        section: 'facilities',
        order: 1,
        isActive: true
      },
      {
        imageUrl: 'https://res.cloudinary.com/drctoxvtl/image/upload/v1758700805/pyramid-agro-export/oo28og1pmull4xfknpqi.png',
        altText: 'Storage and packaging area',
        title: 'Storage & Packaging',
        description: 'Climate-controlled storage and automated packaging systems',
        section: 'facilities',
        order: 2,
        isActive: true
      }
    ];

    for (const imageData of sampleImages) {
      const image = await prisma.galleryImage.upsert({
        where: { 
          id: `sample-${imageData.order}` // Using a custom ID for sample data
        },
        update: imageData,
        create: {
          ...imageData,
          id: `sample-${imageData.order}`
        }
      });
      console.log('✅ Sample gallery image created:', image.title);
    }

    console.log('🎉 Facilities section seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding facilities section:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedFacilitiesSection()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
