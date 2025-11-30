import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAboutFeatures() {
  console.log('🌱 Seeding about features (Why Choose Us)...');

  // Clear existing about features
  await prisma.homePageFeature.deleteMany({
    where: { section: 'about' }
  });

  const features = [
    {
      section: 'about',
      title: 'Quality First',
      description: 'Every product undergoes rigorous quality testing to meet international standards',
      icon: 'Award',
      order: 0,
      isActive: true
    },
    {
      section: 'about',
      title: 'Sustainable Farming',
      description: 'Supporting eco-friendly practices that benefit farmers and the environment',
      icon: 'Leaf',
      order: 1,
      isActive: true
    },
    {
      section: 'about',
      title: 'Farmer Partnership',
      description: 'Direct relationships with farmers ensuring fair prices and premium quality',
      icon: 'Users',
      order: 2,
      isActive: true
    },
    {
      section: 'about',
      title: 'Innovation',
      description: 'Leveraging technology for better supply chain management and traceability',
      icon: 'Lightbulb',
      order: 3,
      isActive: true
    }
  ];

  for (const feature of features) {
    await prisma.homePageFeature.create({ data: feature });
    console.log(`✅ Created feature: ${feature.title}`);
  }

  console.log('🎉 About features seeded successfully!');
}

seedAboutFeatures()
  .catch((e) => {
    console.error('❌ Error seeding about features:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
