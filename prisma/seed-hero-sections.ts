import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding hero sections for existing products...')

  // Hero section data for each product
  const heroData = {
    'grapes': {
      heroTitle: 'Premium Quality Grapes',
      heroSubtitle: 'From India\'s Premier Vineyards',
      heroDescription: `Experience the finest grapes from India's premier vineyards. 
Our premium quality grapes are carefully selected, packed, 
and exported to meet the highest international standards.

From Nashik, the grape capital of India, we bring you world-class grapes 
known for their natural sweetness, crunchy texture, and rich antioxidant content.`,
      heroImageUrl: '/products/grapes-2.png',
      heroButtonText: 'Get Quote',
      heroButtonLink: '/contact',
      heroButton2Text: 'Learn More',
      heroButton2Link: '#features'
    },
    'onions': {
      heroTitle: 'Fresh Onions',
      heroSubtitle: 'Premium Quality from Indian Farms',
      heroDescription: `Discover our premium quality onions sourced directly from India's finest farms. 
These fresh, crisp onions are perfect for both domestic and international markets.

Our onions are carefully selected, cleaned, and packed to maintain their natural 
freshness and nutritional value throughout the supply chain.`,
      heroImageUrl: '/products/onion.png',
      heroButtonText: 'Get Quote',
      heroButtonLink: '/contact',
      heroButton2Text: 'View Details',
      heroButton2Link: '#specifications'
    },
    'tomatoes': {
      heroTitle: 'Fresh Tomatoes',
      heroSubtitle: 'Farm-Fresh & Export Quality',
      heroDescription: `Indulge in our premium fresh tomatoes, handpicked from the best farms across India. 
These vibrant, juicy tomatoes are perfect for culinary excellence.

Our tomatoes are carefully selected for their perfect ripeness, 
rich color, and exceptional taste that meets international standards.`,
      heroImageUrl: '/products/tomatoes.jpg',
      heroButtonText: 'Order Now',
      heroButtonLink: '/contact',
      heroButton2Text: 'Learn More',
      heroButton2Link: '#features'
    },
    'potatoes': {
      heroTitle: 'Premium Potatoes',
      heroSubtitle: 'Fresh from Indian Fields',
      heroDescription: `Experience the finest potatoes from India's agricultural heartland. 
Our premium quality potatoes are perfect for all culinary needs.

These fresh, firm potatoes are carefully selected and packed 
to maintain their natural texture and nutritional value.`,
      heroImageUrl: '/products/potatoes.png',
      heroButtonText: 'Get Quote',
      heroButtonLink: '/contact',
      heroButton2Text: 'View Quality',
      heroButton2Link: '#quality'
    },
    'green-banana': {
      heroTitle: 'Fresh Green Bananas',
      heroSubtitle: 'Premium Quality & Export Ready',
      heroDescription: `Discover our premium green bananas, perfect for cooking and export markets. 
These fresh, firm bananas are ideal for various culinary applications.

Our green bananas are carefully selected and packed to ensure 
they reach your destination in perfect condition.`,
      heroImageUrl: '/products/green-banana.png',
      heroButtonText: 'Order Now',
      heroButtonLink: '/contact',
      heroButton2Text: 'Learn More',
      heroButton2Link: '#benefits'
    },
    'green-chillis': {
      heroTitle: 'Fresh Green Chilies',
      heroSubtitle: 'Spicy & Flavorful',
      heroDescription: `Add heat and flavor to your dishes with our premium green chilies. 
These fresh, vibrant chilies are perfect for spice lovers worldwide.

Our green chilies are carefully selected for their perfect heat level 
and fresh taste that enhances any culinary creation.`,
      heroImageUrl: '/products/green-chillies.png',
      heroButtonText: 'Get Quote',
      heroButtonLink: '/contact',
      heroButton2Text: 'View Spice Level',
      heroButton2Link: '#specifications'
    },
    'guava': {
      heroTitle: 'Fresh Guava',
      heroSubtitle: 'Tropical Sweetness',
      heroDescription: `Experience the tropical sweetness of our premium fresh guava. 
These delicious fruits are perfect for health-conscious consumers.

Our guavas are carefully selected for their perfect ripeness, 
sweet taste, and high nutritional value.`,
      heroImageUrl: '/products/guava.png',
      heroButtonText: 'Order Now',
      heroButtonLink: '/contact',
      heroButton2Text: 'Health Benefits',
      heroButton2Link: '#nutrition'
    },
    'pomegranates': {
      heroTitle: 'Premium Pomegranates',
      heroSubtitle: 'Ruby Red & Juicy',
      heroDescription: `Indulge in our premium pomegranates, known for their ruby red arils and sweet taste. 
These antioxidant-rich fruits are perfect for health enthusiasts.

Our pomegranates are carefully selected for their perfect ripeness, 
juicy arils, and exceptional nutritional benefits.`,
      heroImageUrl: '/products/pomogranate.png',
      heroButtonText: 'Get Quote',
      heroButtonLink: '/contact',
      heroButton2Text: 'Health Benefits',
      heroButton2Link: '#nutrition'
    },
    'dry-turmeric': {
      heroTitle: 'Premium Dry Turmeric',
      heroSubtitle: 'Golden Spice of India',
      heroDescription: `Discover our premium dry turmeric, the golden spice that adds flavor and health benefits. 
This authentic Indian spice is perfect for culinary and medicinal use.

Our turmeric is carefully processed and dried to maintain its 
natural color, aroma, and curcumin content.`,
      heroImageUrl: '/products/dry-turmeric.png',
      heroButtonText: 'Order Now',
      heroButtonLink: '/contact',
      heroButton2Text: 'Health Benefits',
      heroButton2Link: '#benefits'
    },
    'garlics': {
      heroTitle: 'Fresh Garlic',
      heroSubtitle: 'Aromatic & Flavorful',
      heroDescription: `Enhance your dishes with our premium fresh garlic. 
These aromatic bulbs are perfect for adding depth and flavor to any cuisine.

Our garlic is carefully selected and packed to maintain its 
natural aroma and flavor throughout the supply chain.`,
      heroImageUrl: '/products/garlics.png',
      heroButtonText: 'Get Quote',
      heroButtonLink: '/contact',
      heroButton2Text: 'Culinary Uses',
      heroButton2Link: '#uses'
    },
    'groundnuts': {
      heroTitle: 'Premium Groundnuts',
      heroSubtitle: 'Nutty & Nutritious',
      heroDescription: `Enjoy our premium groundnuts, perfect for snacking and culinary use. 
These nutritious nuts are rich in protein and healthy fats.

Our groundnuts are carefully selected and processed to ensure 
maximum freshness and nutritional value.`,
      heroImageUrl: '/products/groundnuts.png',
      heroButtonText: 'Order Now',
      heroButtonLink: '/contact',
      heroButton2Text: 'Nutrition Facts',
      heroButton2Link: '#nutrition'
    },
    'rice': {
      heroTitle: 'Premium Basmati Rice',
      heroSubtitle: 'Aromatic & Long Grain',
      heroDescription: `Experience the finest Basmati rice from India's rice bowl. 
This aromatic, long-grain rice is perfect for gourmet cooking.

Our Basmati rice is carefully selected and processed to maintain 
its natural aroma, texture, and cooking quality.`,
      heroImageUrl: '/products/rice.png',
      heroButtonText: 'Get Quote',
      heroButtonLink: '/contact',
      heroButton2Text: 'Cooking Guide',
      heroButton2Link: '#cooking'
    }
  }

  // Update each product with hero section data
  for (const [slug, heroSection] of Object.entries(heroData)) {
    try {
      const product = await prisma.product.findUnique({
        where: { slug }
      })

      if (product) {
        await prisma.product.update({
          where: { slug },
          data: {
            heroTitle: heroSection.heroTitle,
            heroSubtitle: heroSection.heroSubtitle,
            heroDescription: heroSection.heroDescription,
            heroImageUrl: heroSection.heroImageUrl,
            heroButtonText: heroSection.heroButtonText,
            heroButtonLink: heroSection.heroButtonLink,
            heroButton2Text: heroSection.heroButton2Text,
            heroButton2Link: heroSection.heroButton2Link
          }
        })
        console.log(`✅ Updated hero section for ${slug}`)
      } else {
        console.log(`❌ Product with slug '${slug}' not found`)
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error)
    }
  }

  console.log('🎉 Hero sections seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding hero sections:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
