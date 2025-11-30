import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAboutContent() {
  console.log('🌱 Seeding about content...');

  // Clear existing about content
  await prisma.aboutPageContent.deleteMany();
  await prisma.aboutFeature.deleteMany();

  // Seed about page content
  const aboutContentData = [
    {
      section: 'story',
      title: 'About us',
      subtitle: 'About Pyramid Agro Export',
      description: "At Pyramid Agro Exports, we are committed to delivering the finest, freshest, and most nutritious produce from India's fertile lands to tables across the world. Headquartered in Nashik, Maharashtra—India's agricultural heartland—we specialize in the export of premium-quality onions, grapes, and green chilies.\n\nWith a seamless farm-to-market approach, we take pride in our sourcing, grading, packaging, and timely delivery, ensuring that every shipment meets global quality and safety standards. Our strength lies in combining modern agri-export expertise with ethical farming practices, thereby building long-term trust with both farmers and customers.\n\nAt Pyramid Agro Exports, we don't just export produce—we export freshness, trust, and long-lasting partnerships.",
      imageUrl: '/hero/home-about.png',
      isActive: true
    },
    {
      section: 'vision',
      title: 'Vision',
      subtitle: 'Our Vision',
      description: "To become a globally admired leader in agricultural exports, renowned for delivering the authentic freshness and richness of Indian produce to households and businesses across the world. We aspire to build a future where sustainable farming practices preserve nature's balance, where farmers are empowered with fair opportunities and growth, and where our commitment to quality, innovation, and trust sets new benchmarks in the agri-export industry.",
      isActive: true
    },
    {
      section: 'mission',
      title: 'Mission',
      subtitle: 'Our Mission',
      description: "To consistently supply premium-quality, farm-fresh produce that meets international benchmarks. To create a sustainable, transparent, and efficient supply chain that benefits farmers, partners, and consumers alike. To uphold the values of trust, quality, and responsibility in every export.",
      isActive: true
    },
    {
      section: 'team',
      title: 'Our Directors',
      subtitle: 'Meet the visionary leaders behind Pyramid Agro Exports',
      description: "Our experienced leadership team brings together decades of expertise in agricultural exports, quality management, and international business development.",
      isActive: true
    },
    {
      section: 'certifications',
      title: 'Certifications & Standards',
      subtitle: 'Our commitment to quality and international standards',
      description: "We maintain the highest standards of quality and safety in all our operations. Our certifications include ISO 22000 for food safety management, HACCP for hazard analysis, and various international quality standards that ensure our products meet global requirements.",
      isActive: false
    }
  ];

  for (const content of aboutContentData) {
    await prisma.aboutPageContent.create({
      data: content
    });
  }

  // Seed about features
  const aboutFeaturesData = [
    {
      section: 'values',
      title: 'Global Export Expertise',
      description: 'Years of successful exports backed by strong logistics and compliance with international standards.',
      icon: 'Globe',
      order: 0,
      isActive: true
    },
    {
      section: 'values',
      title: 'Premium-Quality Produce',
      description: 'Freshly harvested onions, grapes, and green chilies directly from India\'s best farmlands.',
      icon: 'Leaf',
      order: 1,
      isActive: true
    },
    {
      section: 'values',
      title: 'Seamless Supply Chain',
      description: 'Assured freshness with timely delivery and customized export-friendly packaging.',
      icon: 'Truck',
      order: 2,
      isActive: true
    },
    {
      section: 'values',
      title: 'Sustainability & Ethical Sourcing',
      description: 'Supporting farmers with fair practices while delivering responsibly grown produce.',
      icon: 'Heart',
      order: 3,
      isActive: true
    },
    {
      section: 'values',
      title: 'Trust & Reliability',
      description: 'Every shipment is a promise of quality, freshness, and care.',
      icon: 'Shield',
      order: 4,
      isActive: true
    },
    {
      section: 'values',
      title: 'Commitment to Consistency',
      description: 'We ensure uniform quality, size, and taste in every batch, meeting the most demanding international standards.',
      icon: 'CheckCircle',
      order: 5,
      isActive: true
    }
  ];

  for (const feature of aboutFeaturesData) {
    await prisma.aboutFeature.create({
      data: feature
    });
  }

  console.log('✅ About content seeded successfully!');
}

export default seedAboutContent;

// Run if called directly
if (require.main === module) {
  seedAboutContent()
    .catch((e) => {
      console.error('❌ Error seeding about content:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}