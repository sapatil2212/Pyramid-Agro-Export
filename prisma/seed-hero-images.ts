import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedHeroImages() {
  console.log('🌱 Seeding hero images...');

  const heroImagesData = [
    {
      imageUrl: '/hero/hero-1.png',
      altText: 'Fresh Agricultural Products',
      title: 'Premium Quality',
      subtitle: 'Fresh Fruits & Vegetables',
      order: 0
    },
    {
      imageUrl: '/hero/hero-2.png',
      altText: 'Global Export Network',
      title: 'Worldwide Distribution',
      subtitle: 'International Standards',
      order: 1
    },
    {
      imageUrl: '/hero/hero-3.png',
      altText: 'Sustainable Farming',
      title: 'Farm-to-Table',
      subtitle: 'Sustainable Sourcing',
      order: 2
    }
  ];

  // Clear existing hero images
  await prisma.heroImage.deleteMany({});

  // Insert new hero images
  for (const image of heroImagesData) {
    await prisma.heroImage.create({
      data: image
    });
    console.log(`✅ Created hero image: ${image.altText}`);
  }

  console.log('🎉 Hero images seeding completed successfully!');
}

seedHeroImages()
  .catch((e) => {
    console.error('❌ Error during hero images seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
