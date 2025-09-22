import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding complete home page content...');

  // Clear existing data
  await prisma.homePageContent.deleteMany();
  await prisma.homePageFeature.deleteMany();
  await prisma.heroImage.deleteMany();

  // Seed Home Page Content
  const homeContent = [
    {
      section: 'hero',
      title: 'Delivering Nature\'s Best to Your Table.',
      subtitle: 'From Indian Farms to Global Markets.',
      description: 'International Quality Standards\nSustainable Sourcing\nGlobal Distribution\nFarm-to-Table Freshness',
      buttonText: 'Explore Products',
      buttonLink: '/products',
      button2Text: 'Get Quote',
      button2Link: '/contact',
      isActive: true
    },
    {
      section: 'about',
      title: 'About Pyramid Agro Export',
      subtitle: 'Bridging Tradition with Innovation',
      description: 'With decades of expertise in agricultural exports, Pyramid Agro Exports has been a trusted name in the export of premium-quality fresh fruits and vegetables. We take pride in delivering the finest agricultural produce to customers worldwide from our base in Nashik, Maharashtra.\n\nOur commitment extends beyond business – we work closely with local farmers, promoting sustainable farming practices and ensuring that every product undergoes rigorous quality checks to meet the highest international standards for freshness and nutrition.',
      buttonText: 'Learn More About Us',
      buttonLink: '/about',
      imageUrl: '/hero/home-about.png',
      isActive: true
    },
    {
      section: 'services-preview',
      title: 'Our Services',
      subtitle: 'Comprehensive Export Solutions',
      description: 'From farm to port, we provide end-to-end export solutions ensuring your products reach global markets in perfect condition.',
      buttonText: 'View Services',
      buttonLink: '/services',
      imageUrl: '/services/services-hero.jpg',
      isActive: true
    },
    {
      section: 'products-preview',
      title: 'Our Products',
      subtitle: 'Premium Quality Agricultural Produce',
      description: 'Discover our wide range of fresh fruits, vegetables, grains, and spices sourced directly from Indian farms.',
      buttonText: 'Browse Products',
      buttonLink: '/products',
      imageUrl: '/products/products-hero.jpg',
      isActive: true
    }
  ];

  for (const content of homeContent) {
    await prisma.homePageContent.upsert({
      where: { section: content.section },
      update: content,
      create: content
    });
  }

  // Seed About Section Features
  const aboutFeatures = [
    {
      section: 'about',
      title: 'Quality First',
      description: 'Every product undergoes rigorous quality testing to meet international standards',
      icon: 'Shield',
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
      icon: 'Cpu',
      order: 3,
      isActive: true
    }
  ];

  for (const feature of aboutFeatures) {
    await prisma.homePageFeature.create({
      data: feature
    });
  }

  // Seed Hero Images
  const heroImages = [
    {
      imageUrl: '/hero/hero-1.png',
      altText: 'Fresh Agricultural Products',
      title: 'Premium Quality',
      subtitle: 'Fresh Fruits & Vegetables',
      order: 0,
      isActive: true
    },
    {
      imageUrl: '/hero/hero-2.png',
      altText: 'Global Export Network',
      title: 'Worldwide Distribution',
      subtitle: 'International Standards',
      order: 1,
      isActive: true
    },
    {
      imageUrl: '/hero/hero-3.png',
      altText: 'Sustainable Farming',
      title: 'Farm-to-Table',
      subtitle: 'Sustainable Sourcing',
      order: 2,
      isActive: true
    }
  ];

  for (const image of heroImages) {
    await prisma.heroImage.create({
      data: image
    });
  }

  console.log('✅ Complete home page content seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding complete home page content:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
