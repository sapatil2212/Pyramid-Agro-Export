import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding hero key features...');
  
  try {
    // Clear existing key features
    await prisma.heroKeyFeature.deleteMany({});
    
    // Create default key features
    const keyFeatures = [
      {
        text: 'International Quality Standards',
        icon: 'shield',
        order: 0
      },
      {
        text: 'Sustainable Sourcing',
        icon: 'leaf',
        order: 1
      },
      {
        text: 'Global Distribution',
        icon: 'globe',
        order: 2
      },
      {
        text: 'Farm-to-Table Freshness',
        icon: 'truck',
        order: 3
      }
    ];

    for (const feature of keyFeatures) {
      await prisma.heroKeyFeature.create({
        data: feature
      });
    }

    console.log('✅ Hero key features seeded successfully!');
    console.log('Created features:', keyFeatures);
  } catch (error) {
    console.error('❌ Error seeding hero key features:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
