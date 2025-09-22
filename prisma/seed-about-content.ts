import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAboutContent() {
  console.log('🌱 Seeding About content...');

  try {
    // Seed About Page Content
    const aboutSections = [
      {
        section: 'story',
        title: 'About Pyramid Agro Export',
        subtitle: 'Bridging Tradition with Innovation',
        description: 'With decades of expertise in agricultural exports, Pyramid Agro Exports has been a trusted name in the export of premium-quality fresh fruits and vegetables. We take pride in delivering the finest agricultural produce to customers worldwide from our base in Nashik, Maharashtra.\n\nOur commitment extends beyond business – we work closely with local farmers, promoting sustainable farming practices and ensuring that every product undergoes rigorous quality checks to meet the highest international standards for freshness and nutrition.',
        buttonText: 'Learn More About Us',
        buttonLink: '/about'
      },
      {
        section: 'values',
        title: 'Our Core Values',
        subtitle: 'Values That Define Us',
        description: 'Our values are not just words on a wall – they are the foundation of every decision we make and every relationship we build in our journey to connect farms with global markets.',
        buttonText: 'View Our Values',
        buttonLink: '/about#values'
      },
      {
        section: 'team',
        title: 'Meet Our Team',
        subtitle: 'The People Behind Our Success',
        description: 'Our diverse team combines deep agricultural knowledge with international business expertise to deliver exceptional results for our partners worldwide.',
        buttonText: 'Meet the Team',
        buttonLink: '/about#team'
      },
      {
        section: 'certifications',
        title: 'Quality You Can Trust',
        subtitle: 'Certifications & Compliance',
        description: 'Our commitment to excellence is backed by comprehensive certifications and compliance with international standards, ensuring the highest quality and safety of our products.',
        buttonText: 'View Certifications',
        buttonLink: '/about#certifications'
      }
    ];

    for (const section of aboutSections) {
      await prisma.aboutPageContent.upsert({
        where: { section: section.section },
        update: section,
        create: section
      });
      console.log(`✅ Seeded ${section.section} section`);
    }

    // Seed Team Members
    const teamMembers = [
      {
        name: 'Rajesh Kumar Sharma',
        position: 'Founder & CEO',
        bio: 'With over 20 years in agricultural trade, Rajesh founded Pyramid Agro with a vision to connect Indian farms to global markets. His expertise in international trade and passion for supporting farmers drives our company\'s mission.',
        expertise: JSON.stringify(['International Trade', 'Agricultural Markets', 'Strategic Planning', 'Farmer Relations']),
        email: 'rajesh@pyramidagro.com',
        linkedin: 'https://linkedin.com/in/rajesh-sharma',
        order: 0,
        isActive: true
      },
      {
        name: 'Priya Patel',
        position: 'Head of Quality Assurance',
        bio: 'Priya brings 15+ years of experience in food safety and quality management. She ensures that every product meets international standards while maintaining the authentic quality of Indian agriculture.',
        expertise: JSON.stringify(['Food Safety', 'Quality Management', 'ISO Standards', 'Product Testing']),
        email: 'priya@pyramidagro.com',
        linkedin: 'https://linkedin.com/in/priya-patel',
        order: 1,
        isActive: true
      },
      {
        name: 'Arjun Singh',
        position: 'Director of Operations',
        bio: 'Arjun oversees our global supply chain operations, ensuring efficient logistics and timely delivery. His background in supply chain management has been crucial to our international expansion.',
        expertise: JSON.stringify(['Supply Chain', 'Logistics', 'Operations Management', 'Process Optimization']),
        email: 'arjun@pyramidagro.com',
        linkedin: 'https://linkedin.com/in/arjun-singh',
        order: 2,
        isActive: true
      },
      {
        name: 'Dr. Meera Joshi',
        position: 'Head of Farmer Relations',
        bio: 'Dr. Joshi leads our farmer partnership programs, working directly with agricultural communities to promote sustainable practices and ensure fair trade. Her PhD in Agricultural Sciences guides our farming initiatives.',
        expertise: JSON.stringify(['Agricultural Sciences', 'Sustainable Farming', 'Community Development', 'Training Programs']),
        email: 'meera@pyramidagro.com',
        linkedin: 'https://linkedin.com/in/meera-joshi',
        order: 3,
        isActive: true
      }
    ];

    for (const member of teamMembers) {
      await prisma.teamMember.create({
        data: member
      });
      console.log(`✅ Seeded team member: ${member.name}`);
    }

    // Seed Certifications
    const certifications = [
      {
        name: 'ISO 22000:2018',
        fullName: 'Food Safety Management Systems',
        issuer: 'International Organization for Standardization',
        validUntil: '2025-12-31',
        description: 'Demonstrates our commitment to food safety management throughout the supply chain',
        icon: 'shield',
        color: 'from-blue-500 to-blue-600',
        features: JSON.stringify([
          'Hazard Analysis and Critical Control Points (HACCP)',
          'Prerequisite Programs',
          'Management System Requirements',
          'Continuous Improvement'
        ]),
        order: 0,
        isActive: true
      },
      {
        name: 'FSSAI License',
        fullName: 'Food Safety and Standards Authority of India',
        issuer: 'Government of India',
        validUntil: '2025-08-15',
        description: 'Official license for food business operations in India, ensuring compliance with national standards',
        icon: 'check-circle',
        color: 'from-green-500 to-green-600',
        features: JSON.stringify([
          'Food Business Operation License',
          'Quality Control Systems',
          'Hygiene Standards',
          'Regulatory Compliance'
        ]),
        order: 1,
        isActive: true
      },
      {
        name: 'Organic Certification',
        fullName: 'NPOP & NOP Certified Organic',
        issuer: 'Control Union Certifications',
        validUntil: '2025-10-20',
        description: 'Certification for organic products meeting international organic standards',
        icon: 'leaf',
        color: 'from-emerald-500 to-emerald-600',
        features: JSON.stringify([
          'NPOP (India) Compliance',
          'NOP (USA) Standards',
          'EU Organic Regulation',
          'Traceability Systems'
        ]),
        order: 2,
        isActive: true
      },
      {
        name: 'Export License',
        fullName: 'Import Export Code (IEC)',
        issuer: 'Directorate General of Foreign Trade',
        validUntil: 'Permanent',
        description: 'Government authorization for international trade operations',
        icon: 'globe',
        color: 'from-purple-500 to-purple-600',
        features: JSON.stringify([
          'International Trade Authorization',
          'Customs Clearance Rights',
          'Export Documentation',
          'Global Market Access'
        ]),
        order: 3,
        isActive: true
      }
    ];

    for (const cert of certifications) {
      await prisma.certification.create({
        data: cert
      });
      console.log(`✅ Seeded certification: ${cert.name}`);
    }

    // Seed About Features
    const aboutFeatures = [
      {
        section: 'values',
        title: 'Uncompromising Quality',
        description: 'We maintain the highest standards in every aspect of our operations, from sourcing to delivery',
        icon: 'shield',
        order: 0,
        isActive: true
      },
      {
        section: 'values',
        title: 'Ethical Business Practices',
        description: 'Our business is built on trust, transparency, and fair treatment of all stakeholders',
        icon: 'heart',
        order: 1,
        isActive: true
      },
      {
        section: 'values',
        title: 'Environmental Responsibility',
        description: 'We are committed to sustainable practices that protect our planet for future generations',
        icon: 'leaf',
        order: 2,
        isActive: true
      },
      {
        section: 'values',
        title: 'Community Development',
        description: 'We believe in empowering farming communities and contributing to rural development',
        icon: 'users',
        order: 3,
        isActive: true
      }
    ];

    for (const feature of aboutFeatures) {
      await prisma.aboutFeature.create({
        data: feature
      });
      console.log(`✅ Seeded feature: ${feature.title}`);
    }

    console.log('🎉 About content seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding about content:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedAboutContent()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
