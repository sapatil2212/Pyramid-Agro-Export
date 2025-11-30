import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productPreviews = [
  {
    title: "Premium Onions",
    description: "Fresh, high-quality onions sourced directly from India's finest farms, perfect for export and culinary excellence.",
    benefits: ["Export Quality", "Fresh Harvest", "Long Shelf Life", "Premium Grade"],
    imageUrl: "/products/onion.png",
    link: "/products/onions",
    order: 0,
    isActive: true
  },
  {
    title: "Fresh Grapes",
    description: "Sweet, juicy grapes grown in optimal conditions, carefully selected and packed for international markets.",
    benefits: ["Sweet & Juicy", "Export Ready", "Premium Quality", "Fresh Packed"],
    imageUrl: "/products/grapes.png",
    link: "/products/grapes",
    order: 1,
    isActive: true
  },
  {
    title: "Green Bananas",
    description: "Premium green bananas perfect for cooking and export, maintaining freshness and nutritional value.",
    benefits: ["Nutritious", "Export Grade", "Fresh Harvest", "Quality Assured"],
    imageUrl: "/products/green-banana.png",
    link: "/products/banana",
    order: 2,
    isActive: true
  },
  {
    title: "Green Chillies",
    description: "Spicy, fresh green chillies with perfect heat levels, ideal for culinary applications and export markets.",
    benefits: ["Perfect Heat", "Fresh Quality", "Export Ready", "Premium Grade"],
    imageUrl: "/products/green-chillies.png",
    link: "/products/green-chillis",
    order: 3,
    isActive: true
  }
];

async function seedProductPreviews() {
  console.log('🌱 Seeding product previews...');

  try {
    // Clear existing product previews
    await prisma.productPreview.deleteMany({});
    console.log('✅ Cleared existing product previews');

    // Create new product previews
    for (const productPreview of productPreviews) {
      await prisma.productPreview.create({
        data: {
          ...productPreview,
          benefits: JSON.stringify(productPreview.benefits)
        }
      });
    }

    console.log(`✅ Created ${productPreviews.length} product previews`);
  } catch (error) {
    console.error('❌ Error seeding product previews:', error);
    throw error;
  }
}

export { seedProductPreviews };

// Run if called directly
if (require.main === module) {
  seedProductPreviews()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
