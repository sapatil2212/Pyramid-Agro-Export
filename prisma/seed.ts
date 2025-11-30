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
      section: 'products-preview',
      title: '',
      subtitle: '',
      description: '',
      imageUrl: null,
      buttonText: '',
      buttonLink: '',
      isActive: true
    },
    {
      section: 'interactive-gallery',
      title: 'Interactive Gallery',
      subtitle: 'Visual Showcase of Our Excellence',
      description: 'Explore our interactive gallery showcasing our facilities, products, and processes through stunning visuals',
      imageUrl: null,
      buttonText: '',
      buttonLink: '',
      isActive: true
    },
    {
      section: 'testimonials',
      title: 'Customer Reviews',
      subtitle: 'What Our Valued Clients Say About Us',
      description: 'Real experiences from our international clients who trust us for premium agricultural exports',
      imageUrl: null,
      buttonText: '',
      buttonLink: '',
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

  // Seed products and categories
  console.log('🌱 Seeding product categories and products...');
  
  // Import and run product seeding
  const { exec } = require('child_process');
  const { promisify } = require('util');
  const execAsync = promisify(exec);
  
  try {
    await execAsync('npx tsx prisma/seed-products.ts');
    console.log('✅ Product seeding completed');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }

  // Seed product previews
  try {
    await execAsync('npx tsx prisma/seed-product-previews.ts');
    console.log('✅ Product previews seeding completed');
  } catch (error) {
    console.error('❌ Error seeding product previews:', error);
  }

  // Seed facilities section
  try {
    await execAsync('npx tsx prisma/seed-facilities-section.ts');
    console.log('✅ Facilities section seeding completed');
  } catch (error) {
    console.error('❌ Error seeding facilities section:', error);
  }

  // Seed testimonials
  try {
  await execAsync('npx tsx prisma/seed-testimonials.ts');
  console.log('✅ Testimonials seeding completed');

  // Run about content seed
  await execAsync('npx tsx prisma/seed-about-content.ts');
  console.log('✅ About content seeding completed');
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
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
