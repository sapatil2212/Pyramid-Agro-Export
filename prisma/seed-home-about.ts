import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedHomeAbout() {
  console.log('🌱 Seeding home page about section...');

  // Upsert the about section in HomePageContent
  await prisma.homePageContent.upsert({
    where: { section: 'about' },
    update: {
      title: 'About Pyramid Agro Export',
      subtitle: 'Your Trusted Partner in Agricultural Excellence',
      description: "At Pyramid Agro Exports, we are committed to delivering the finest, freshest, and most nutritious produce from India's fertile lands to tables across the world. Headquartered in Nashik, Maharashtra—India's agricultural heartland—we specialize in the export of premium-quality onions, grapes, and green chilies.",
      imageUrl: '/hero/home-about.png',
      buttonText: 'Learn More',
      buttonLink: '/about',
      isActive: true,
      updatedAt: new Date()
    },
    create: {
      section: 'about',
      title: 'About Pyramid Agro Export',
      subtitle: 'Your Trusted Partner in Agricultural Excellence',
      description: "At Pyramid Agro Exports, we are committed to delivering the finest, freshest, and most nutritious produce from India's fertile lands to tables across the world. Headquartered in Nashik, Maharashtra—India's agricultural heartland—we specialize in the export of premium-quality onions, grapes, and green chilies.",
      imageUrl: '/hero/home-about.png',
      buttonText: 'Learn More',
      buttonLink: '/about',
      isActive: true
    }
  });

  console.log('✅ Home about section seeded successfully!');
}

seedHomeAbout()
  .catch((e) => {
    console.error('❌ Error seeding home about:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
