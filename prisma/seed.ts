import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed home page content with existing content from the hero component
  const homeContentData = [
    {
      section: 'hero',
      title: 'Delivering Nature\'s Best to Your Table.',
      subtitle: 'From Indian Farms to Global Markets.',
      description: 'At Pyramid Agro Exports, we bring the finest fruits, vegetables, grains, and spices from Indian farms to your table with unmatched quality and freshness. With decades of expertise in agricultural exports, we ensure every product meets the highest international standards for quality and nutrition.',
      imageUrl: '/hero/hero-1.png', // Using existing hero image
      buttonText: 'Explore Products',
      buttonLink: '/products',
      isActive: true
    },
    {
      section: 'about-preview',
      title: 'About Pyramid Agro Export',
      subtitle: 'Decades of Excellence in Agricultural Export',
      description: 'With over two decades of experience in agricultural export, we have built a reputation for delivering premium quality products to markets worldwide. Our commitment to sustainable farming practices and direct partnerships with local farmers guarantees premium produce that exceeds expectations.',
      imageUrl: '/hero/home-about.png', // Using existing about image
      buttonText: 'Learn More',
      buttonLink: '/about',
      isActive: true
    },
    {
      section: 'services-preview',
      title: 'Our Services',
      subtitle: 'Comprehensive Export Solutions',
      description: 'From farm to port, we provide end-to-end export solutions ensuring your products reach global markets in perfect condition. Our services include quality control, packaging, logistics, and compliance with international standards.',
      imageUrl: null,
      buttonText: 'View Services',
      buttonLink: '/services',
      isActive: true
    },
    {
      section: 'products-preview',
      title: 'Premium Agricultural Products',
      subtitle: 'Fresh from Indian Farms',
      description: 'Discover our wide range of premium agricultural products including fresh fruits, vegetables, grains, and spices. Each product is carefully selected and processed to meet the highest international quality standards.',
      imageUrl: null,
      buttonText: 'View Products',
      buttonLink: '/products',
      isActive: true
    }
  ];

  // Clear existing home content
  await prisma.homePageContent.deleteMany({});

  // Insert new home content
  for (const content of homeContentData) {
    await prisma.homePageContent.create({
      data: content
    });
    console.log(`✅ Created content for section: ${content.section}`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
