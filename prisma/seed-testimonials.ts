import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testimonials = [
  {
    name: "Fahad Al Mansoori",
    position: "Procurement Head",
    company: "Fresh Harvest LLC",
    location: "Dubai, UAE",
    quote: "Pyramid Agro Exports has been our go-to partner for fresh grapes. Every consignment is delivered with exceptional care, ensuring freshness and flavor remain intact. Their consistency gives us complete confidence in building long-term business together.",
    rating: 5,
    avatar: "F",
    verified: true,
    order: 0,
    isActive: true
  },
  {
    name: "Mohammed Al Rashid",
    position: "Director",
    company: "Al Noor Foods",
    location: "UAE",
    quote: "The onions we import from Pyramid Agro Exports stand out for their quality and shelf life. Their packaging is export-friendly and tailored to our needs, making the logistics process smooth and hassle-free.",
    rating: 5,
    avatar: "M",
    verified: true,
    order: 1,
    isActive: true
  },
  {
    name: "Abdullah Al Harthy",
    position: "Import Manager",
    company: "Gulf Agro Traders",
    location: "Oman",
    quote: "We've been sourcing chilies from Pyramid Agro Exports for over a year, and the taste, spice level, and freshness are consistently excellent. Their professionalism and commitment to deadlines make them a reliable partner.",
    rating: 5,
    avatar: "A",
    verified: true,
    order: 2,
    isActive: true
  },
  {
    name: "Saeed Al Qasimi",
    position: "CEO",
    company: "Emirates Fresh Produce",
    location: "Dubai, UAE",
    quote: "What sets Pyramid Agro Exports apart is their honesty and transparency. They deliver exactly what they promise—no compromises on quality. It's rare to find exporters who prioritize trust as much as they do.",
    rating: 5,
    avatar: "S",
    verified: true,
    order: 3,
    isActive: true
  },
  {
    name: "Khalid Bin Hamdan",
    position: "Senior Buyer",
    company: "Oasis Food Distributors",
    location: "Oman",
    quote: "Their grapes and onions have helped us cater to premium clients who demand the very best. Pyramid Agro Exports ensures international standards are met every time, making them one of the most dependable suppliers in the region.",
    rating: 5,
    avatar: "K",
    verified: true,
    order: 4,
    isActive: true
  },
  {
    name: "Ahmed Al Zahra",
    position: "Quality Manager",
    company: "Gulf Fresh Imports",
    location: "Kuwait",
    quote: "The quality control standards at Pyramid Agro Exports are exceptional. Every batch undergoes rigorous testing, and their documentation is always complete and accurate. This level of professionalism is exactly what we need for our business.",
    rating: 5,
    avatar: "A",
    verified: true,
    order: 5,
    isActive: true
  },
  {
    name: "Fatima Al Mansouri",
    position: "Procurement Director",
    company: "Arabian Food Trading",
    location: "Saudi Arabia",
    quote: "Working with Pyramid Agro Exports has been a game-changer for our business. Their products consistently meet our high standards, and their customer service is outstanding. They truly understand the export market requirements.",
    rating: 5,
    avatar: "F",
    verified: true,
    order: 6,
    isActive: true
  },
  {
    name: "Omar Al Rashid",
    position: "Operations Manager",
    company: "Desert Fresh Co.",
    location: "Qatar",
    quote: "The packaging and logistics solutions provided by Pyramid Agro Exports are top-notch. Our products arrive in perfect condition every time, which is crucial for maintaining our reputation with our customers.",
    rating: 5,
    avatar: "O",
    verified: true,
    order: 7,
    isActive: true
  }
];

export async function seedTestimonials() {
  console.log('🌱 Seeding testimonials...');

  try {
    // Clear existing testimonials
    await prisma.testimonial.deleteMany({});
    console.log('✅ Cleared existing testimonials');

    // Create new testimonials
    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: testimonial
      });
    }

    console.log(`✅ Created ${testimonials.length} testimonials`);
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedTestimonials()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
