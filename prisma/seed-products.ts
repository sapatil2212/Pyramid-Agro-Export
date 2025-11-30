import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding product categories and products...')

  // Create product categories
  const categories = await Promise.all([
    prisma.productCategory.upsert({
      where: { slug: 'fresh-fruits' },
      update: {},
      create: {
        name: 'Fresh Fruits',
        slug: 'fresh-fruits',
        description: 'Premium quality fresh fruits from Indian farms',
        color: '#10b981',
        icon: 'Leaf',
        order: 1,
        isActive: true
      }
    }),
    prisma.productCategory.upsert({
      where: { slug: 'fresh-vegetables' },
      update: {},
      create: {
        name: 'Fresh Vegetables',
        slug: 'fresh-vegetables',
        description: 'Farm-fresh vegetables with international standards',
        color: '#3b82f6',
        icon: 'Droplets',
        order: 2,
        isActive: true
      }
    }),
    prisma.productCategory.upsert({
      where: { slug: 'grains-spices' },
      update: {},
      create: {
        name: 'Grains & Spices',
        slug: 'grains-spices',
        description: 'Premium grains and authentic Indian spices',
        color: '#f59e0b',
        icon: 'Sun',
        order: 3,
        isActive: true
      }
    })
  ])

  console.log('✅ Product categories created')

  // Create products
  const products = [
    // Fresh Fruits
    {
      name: 'Fresh Grapes',
      slug: 'grapes',
      description: 'Premium quality Nashik grapes with natural sweetness and crunchy texture. These grapes are carefully selected for their superior taste, texture, and appearance, making them perfect for both domestic and international markets.',
      shortDescription: 'Premium quality Nashik grapes with natural sweetness and crunchy texture',
      imageUrl: '/products/grapes-2.png',
      images: ['/products/grapes-2.png', '/products/grapes.png'],
      categorySlug: 'fresh-fruits',
      specifications: {
        'Variety': 'Thompson Seedless, Red Globe, Black Seedless',
        'Size': '18-22mm diameter',
        'Color': 'Green, Red, Black',
        'Sugar Content': '16-18 Brix',
        'Acidity': '0.6-0.8%',
        'Firmness': 'Crisp and firm',
        'Bunch Weight': '300-500g'
      },
      origin: 'Nashik, Maharashtra',
      seasons: ['March', 'April', 'May', 'June', 'July', 'August', 'September'],
      minOrderQuantity: '1000 kg',
      packaging: ['5kg cartons', '10kg cartons', '15kg cartons', 'Bulk packaging'],
      price: { min: 120, max: 180, currency: 'USD' },
      availability: 'in-stock',
      features: [
        {
          icon: "Star",
          title: "Premium Quality",
          description: "Hand-picked from finest vineyards"
        },
        {
          icon: "CheckCircle", 
          title: "International Standards",
          description: "Meets all quality standards"
        },
        {
          icon: "Leaf",
          title: "Fresh & Natural", 
          description: "100% natural, no preservatives"
        },
        {
          icon: "Truck",
          title: "Fast Delivery",
          description: "Quick worldwide delivery"
        },
        {
          icon: "Shield",
          title: "Quality Assurance",
          description: "Rigorous quality checks"
        }
      ],
      nutritionalInfo: {
        'Calories': '62 kcal per 100g',
        'Carbohydrates': '16g',
        'Fiber': '0.9g',
        'Vitamin C': '27% DV',
        'Vitamin K': '18% DV',
        'Potassium': '6% DV'
      },
      certifications: ['FSSAI', 'APEDA', 'Organic Certified', 'GlobalGAP'],
      shelfLife: '2-3 weeks under proper storage',
      storageConditions: ['Temperature: 0-2°C', 'Humidity: 90-95%', 'Ventilation required'],
      exportMarkets: ['UAE', 'UK', 'Germany', 'Netherlands', 'Russia', 'Bangladesh'],
      rating: 4.8,
      reviews: 156,
      isFeatured: true,
      isOrganic: false,
      isPremium: true,
      isActive: true,
      order: 1,
      // Hero section content
      heroTitle: "Premium Nashik Grapes",
      heroSubtitle: "Export Quality Fresh Grapes",
      heroDescription: "Discover the finest quality Nashik grapes, hand-picked from the grape capital of India. Our grapes are known for their natural sweetness, crunchy texture, and rich antioxidant content.",
      heroImageUrl: "/products/grapes-hero.jpg",
      heroButtonText: "View Products",
      heroButtonLink: "/products/grapes",
      heroButton2Text: "Get Quote",
      heroButton2Link: "/contact",
      // Features section content
      featuresTitle: "Why Choose Our Grapes?",
      featuresSubtitle: "Premium quality grapes with exceptional taste and freshness"
    },
    {
      name: 'Pomegranates',
      slug: 'pomegranates',
      description: 'Bhagwa variety with deep red arils, high juice content and long storage capacity. These pomegranates are known for their superior quality and are perfect for export markets.',
      shortDescription: 'Bhagwa variety with deep red arils, high juice content and long storage capacity',
      imageUrl: '/products/pomogranate.png',
      images: ['/products/pomogranate.png'],
      categorySlug: 'fresh-fruits',
      specifications: {
        'Variety': 'Bhagwa, Ganesh, Arakta',
        'Size': '200-300g per fruit',
        'Color': 'Deep Red',
        'Juice Content': '60-65%',
        'TSS': '16-18 Brix',
        'Acidity': '0.3-0.5%',
        'Aril Color': 'Deep Red'
      },
      origin: 'Nashik, Maharashtra',
      seasons: ['September', 'October', 'November', 'December', 'January'],
      minOrderQuantity: '500 kg',
      packaging: ['5kg cartons', '10kg cartons', 'Bulk packaging'],
      price: { min: 2.5, max: 4.0, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Deep Red Arils',
        'High Juice Content',
        'APEDA Certified',
        'Export Ready',
        'Long Shelf Life',
        'Premium Quality'
      ],
      nutritionalInfo: {
        'Calories': '83 kcal per 100g',
        'Carbohydrates': '19g',
        'Fiber': '4g',
        'Vitamin C': '17% DV',
        'Vitamin K': '16% DV',
        'Folate': '10% DV'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '2-3 months under proper storage',
      storageConditions: ['Temperature: 5-7°C', 'Humidity: 90-95%', 'Well ventilated'],
      exportMarkets: ['UAE', 'UK', 'Germany', 'Netherlands', 'Russia'],
      rating: 4.7,
      reviews: 89,
      isFeatured: true,
      isOrganic: false,
      isPremium: true,
      isActive: true,
      order: 2
    },
    {
      name: 'Green Bananas',
      slug: 'banana',
      description: 'Premium green bananas perfect for cooking and export, maintaining freshness and nutritional value. Harvested at the right maturity stage to ensure firm texture, longer shelf life, and excellent transport resilience.',
      shortDescription: 'Premium green bananas perfect for cooking and export, maintaining freshness and nutritional value',
      imageUrl: '/products/green-banana.png',
      images: ['/products/green-banana.png'],
      categorySlug: 'fresh-fruits',
      specifications: {
        'Variety': 'Nendran, Robusta, Grand Nain',
        'Size': '15-20cm length',
        'Color': 'Green',
        'Maturity': 'Pre-ripening stage',
        'Texture': 'Firm and starchy',
        'Weight': '150-200g per piece',
        'Shelf Life': '2-3 weeks'
      },
      origin: 'Kerala, Tamil Nadu',
      seasons: ['Year Round'],
      minOrderQuantity: '1000 kg',
      packaging: ['15kg cartons', '20kg cartons', 'Bulk packaging'],
      price: { min: 0.8, max: 1.2, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Rich in nutrients',
        'Export grade quality',
        'Fresh harvest',
        'Quality assured',
        'Long shelf life',
        'Transport resilient'
      ],
      nutritionalInfo: {
        'Calories': '89 kcal per 100g',
        'Carbohydrates': '23g',
        'Fiber': '2.6g',
        'Potassium': '358mg',
        'Vitamin C': '8.7mg',
        'Vitamin B6': '0.4mg'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '2-3 weeks under proper storage',
      storageConditions: ['Temperature: 13-15°C', 'Humidity: 85-90%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait'],
      rating: 4.6,
      reviews: 78,
      isFeatured: true,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 3
    },
    {
      name: 'Guavas',
      slug: 'guava',
      description: 'Premium quality guavas from India\'s premier orchards. Rich in Vitamin C, fiber, and antioxidants, offering exceptional taste and health benefits with both white and pink flesh varieties.',
      shortDescription: 'Premium quality guavas with exceptional taste and health benefits',
      imageUrl: '/products/guava.png',
      images: ['/products/guava.png'],
      categorySlug: 'fresh-fruits',
      specifications: {
        'Variety': 'Allahabad Safeda, Lucknow 49, Apple Guava',
        'Size': '8-12cm diameter',
        'Color': 'Green to Yellow',
        'Flesh Color': 'White and Pink varieties',
        'Weight': '150-300g per piece',
        'TSS': '10-12 Brix',
        'Texture': 'Firm and crisp'
      },
      origin: 'Uttar Pradesh, Maharashtra',
      seasons: ['August', 'September', 'October', 'November', 'December'],
      minOrderQuantity: '500 kg',
      packaging: ['5kg cartons', '10kg cartons', 'Bulk packaging'],
      price: { min: 1.5, max: 2.5, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Rich in Vitamin C',
        'High nutritional value',
        'Two varieties available',
        'Tropical freshness',
        'Health benefits',
        'Premium quality'
      ],
      nutritionalInfo: {
        'Calories': '68 kcal per 100g',
        'Carbohydrates': '14g',
        'Fiber': '5.4g',
        'Vitamin C': '228mg',
        'Vitamin A': '31μg',
        'Potassium': '417mg'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '1-2 weeks under proper storage',
      storageConditions: ['Temperature: 8-10°C', 'Humidity: 85-90%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait'],
      rating: 4.5,
      reviews: 65,
      isFeatured: false,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 4
    },
    // Fresh Vegetables
    {
      name: 'Nashik Onions',
      slug: 'onions',
      description: 'Red and pink onions with strong flavor, firm texture and uniform grading. These onions are known for their pungent flavor and long shelf life, making them ideal for export markets.',
      shortDescription: 'Red and pink onions with strong flavor, firm texture and uniform grading',
      imageUrl: '/products/onion.png',
      images: ['/products/onion.png'],
      categorySlug: 'fresh-vegetables',
      specifications: {
        'Variety': 'Nashik Red, Pusa Red',
        'Size': 'Medium to Large (50-80mm)',
        'Color': 'Deep Red',
        'Dry Matter': '12-14%',
        'Pungency': 'Medium to High',
        'Shape': 'Globular to slightly flat',
        'Weight': '80-150g per piece'
      },
      origin: 'Nashik, Maharashtra',
      seasons: ['January', 'February', 'March', 'April', 'May', 'October', 'November', 'December'],
      minOrderQuantity: '2000 kg',
      packaging: ['25kg mesh bags', '50kg jute bags', 'Bulk packaging'],
      price: { min: 0.8, max: 1.2, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Long shelf life',
        'Export quality',
        'Uniform size',
        'Minimal damage',
        'Proper curing',
        'Quality sorting'
      ],
      nutritionalInfo: {
        'Calories': '40 kcal per 100g',
        'Carbohydrates': '9.3g',
        'Fiber': '1.7g',
        'Vitamin C': '7.4mg',
        'Folate': '19μg',
        'Potassium': '146mg'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '3-6 months under proper storage',
      storageConditions: ['Temperature: 0-4°C', 'Humidity: 65-70%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Malaysia', 'Bangladesh', 'Sri Lanka', 'Nepal'],
      rating: 4.6,
      reviews: 89,
      isFeatured: true,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 1
    },
    {
      name: 'Green Chilies',
      slug: 'green-chillis',
      description: 'G4, Bullet, and Byadgi varieties with high pungency and longer shelf life. These chillies are carefully harvested and packed to maintain their freshness and pungency.',
      shortDescription: 'G4, Bullet, and Byadgi varieties with high pungency and longer shelf life',
      imageUrl: '/products/green-chillies.png',
      images: ['/products/green-chillies.png'],
      categorySlug: 'fresh-vegetables',
      specifications: {
        'Variety': 'Long Green, Bullet, Hot',
        'Length': '8-12cm',
        'Color': 'Bright Green',
        'Heat Level': 'Medium to Hot (30,000-50,000 SHU)',
        'Shape': 'Elongated, tapering',
        'Weight': '5-8g per piece',
        'Moisture': '85-90%'
      },
      origin: 'Nashik, Maharashtra',
      seasons: ['Year Round'],
      minOrderQuantity: '500 kg',
      packaging: ['5kg cartons', '10kg cartons', 'Bulk packaging'],
      price: { min: 2.5, max: 4.0, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Fresh harvest',
        'Vibrant color',
        'Consistent heat level',
        'Export quality',
        'Careful handling',
        'Quality sorting'
      ],
      nutritionalInfo: {
        'Calories': '40 kcal per 100g',
        'Carbohydrates': '9g',
        'Fiber': '1.5g',
        'Vitamin C': '242mg',
        'Vitamin A': '952 IU',
        'Capsaicin': '0.1-1%'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '1-2 weeks under proper storage',
      storageConditions: ['Temperature: 7-10°C', 'Humidity: 90-95%', 'Well ventilated'],
      exportMarkets: ['UAE', 'UK', 'USA', 'Canada', 'Australia'],
      rating: 4.5,
      reviews: 67,
      isFeatured: false,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 2
    },
    {
      name: 'Tomatoes',
      slug: 'tomatoes',
      description: 'Fresh and juicy tomatoes grown in India\'s fertile lands and carefully selected for the perfect ripeness, color, and flavor that meets international standards.',
      shortDescription: 'Fresh and juicy tomatoes with perfect ripeness and taste',
      imageUrl: '/products/tomatoes.jpg',
      images: ['/products/tomatoes.jpg'],
      categorySlug: 'fresh-vegetables',
      specifications: {
        'Variety': 'Hybrid, Cherry, Roma',
        'Size': 'Medium to Large',
        'Color': 'Deep Red',
        'Firmness': 'Firm and juicy',
        'Weight': '80-150g per piece',
        'TSS': '4-6 Brix',
        'Shape': 'Round to oval'
      },
      origin: 'Maharashtra, Karnataka',
      seasons: ['Year Round'],
      minOrderQuantity: '1000 kg',
      packaging: ['10kg cartons', '15kg cartons', 'Bulk packaging'],
      price: { min: 1.2, max: 2.0, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Perfect ripeness',
        'Quality assured',
        'Fresh harvest',
        'Fast delivery',
        'Safe and clean',
        'Export quality'
      ],
      nutritionalInfo: {
        'Calories': '18 kcal per 100g',
        'Carbohydrates': '3.9g',
        'Fiber': '1.2g',
        'Vitamin C': '13.7mg',
        'Lycopene': '2573μg',
        'Potassium': '237mg'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '1-2 weeks under proper storage',
      storageConditions: ['Temperature: 10-13°C', 'Humidity: 85-90%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait'],
      rating: 4.4,
      reviews: 92,
      isFeatured: false,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 3
    },
    {
      name: 'Potatoes',
      slug: 'potatoes',
      description: 'Starch-rich, damage-free, and well-graded potatoes perfect for chips, fries, and culinary cooking with excellent industrial and retail applications.',
      shortDescription: 'Starch-rich, damage-free, and well-graded potatoes perfect for chips and fries',
      imageUrl: '/products/potatoes.png',
      images: ['/products/potatoes.png'],
      categorySlug: 'fresh-vegetables',
      specifications: {
        'Variety': 'Kufri Jyoti, Kufri Pukhraj, Atlantic',
        'Size': 'Medium to Large (50-80mm)',
        'Color': 'Light Yellow',
        'Dry Matter': '18-22%',
        'Starch Content': 'High',
        'Shape': 'Oval to round',
        'Weight': '100-200g per piece'
      },
      origin: 'Punjab, Uttar Pradesh',
      seasons: ['October', 'November', 'December', 'January', 'February', 'March'],
      minOrderQuantity: '2000 kg',
      packaging: ['25kg mesh bags', '50kg jute bags', 'Bulk packaging'],
      price: { min: 0.6, max: 1.0, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'High dry matter',
        'Starch-rich',
        'Well-graded',
        'Bulk supply',
        'Cooking quality',
        'Export ready'
      ],
      nutritionalInfo: {
        'Calories': '77 kcal per 100g',
        'Carbohydrates': '17.5g',
        'Fiber': '2.2g',
        'Vitamin C': '19.7mg',
        'Potassium': '421mg',
        'Protein': '2g'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '3-6 months under proper storage',
      storageConditions: ['Temperature: 2-4°C', 'Humidity: 85-90%', 'Dark storage'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait'],
      rating: 4.5,
      reviews: 78,
      isFeatured: false,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 4
    },
    {
      name: 'Garlics',
      slug: 'garlics',
      description: 'Premium quality garlic with robust flavor and health benefits. Grown in India\'s fertile regions and carefully selected for the best quality, aroma, and taste.',
      shortDescription: 'Premium quality garlic with robust flavor and health benefits',
      imageUrl: '/products/garlics.jpg',
      images: ['/products/garlics.jpg'],
      categorySlug: 'fresh-vegetables',
      specifications: {
        'Variety': 'Gujarat White, Agrifound White',
        'Size': 'Medium to Large',
        'Color': 'White',
        'Cloves per Bulb': '8-12',
        'Weight': '20-30g per bulb',
        'Aroma': 'Strong and pungent',
        'Moisture': '65-70%'
      },
      origin: 'Gujarat, Madhya Pradesh',
      seasons: ['December', 'January', 'February', 'March', 'April'],
      minOrderQuantity: '1000 kg',
      packaging: ['10kg mesh bags', '25kg jute bags', 'Bulk packaging'],
      price: { min: 2.0, max: 3.5, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Robust flavor',
        'Quality assured',
        'Fresh harvest',
        'Fast delivery',
        'Safe and clean',
        'Export quality'
      ],
      nutritionalInfo: {
        'Calories': '149 kcal per 100g',
        'Carbohydrates': '33g',
        'Fiber': '2.1g',
        'Vitamin C': '31.2mg',
        'Allicin': 'High',
        'Potassium': '401mg'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '3-6 months under proper storage',
      storageConditions: ['Temperature: 0-2°C', 'Humidity: 65-70%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait'],
      rating: 4.3,
      reviews: 56,
      isFeatured: false,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 5
    },
    // Grains & Spices
    {
      name: 'Basmati Rice',
      slug: 'rice',
      description: 'Premium Basmati rice with authentic aroma and fluffy texture. This long-grain rice is known for its distinctive fragrance and superior cooking quality.',
      shortDescription: 'Premium Basmati rice with authentic aroma and fluffy texture',
      imageUrl: '/products/rice.png',
      images: ['/products/rice.png'],
      categorySlug: 'grains-spices',
      specifications: {
        'Variety': 'Basmati 370, Pusa Basmati',
        'Grain Length': '7-8mm',
        'Aroma': 'Distinctive Basmati',
        'Moisture': '12-14%',
        'Broken Grains': 'Less than 5%',
        'Color': 'Creamy White',
        'Texture': 'Non-sticky'
      },
      origin: 'Punjab, Haryana',
      seasons: ['Year Round'],
      minOrderQuantity: '1000 kg',
      packaging: ['25kg bags', '50kg bags', 'Bulk packaging'],
      price: { min: 3.5, max: 5.0, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'Aromatic Basmati',
        'Cost-effective Options',
        'Customized Packaging',
        'Export Grade',
        'Premium Quality',
        'Long Grain'
      ],
      nutritionalInfo: {
        'Calories': '130 kcal per 100g',
        'Carbohydrates': '28g',
        'Protein': '2.7g',
        'Fiber': '0.4g',
        'Iron': '0.8mg',
        'Thiamine': '0.07mg'
      },
      certifications: ['FSSAI', 'APEDA', 'Basmati Export Development Foundation'],
      shelfLife: '2-3 years under proper storage',
      storageConditions: ['Temperature: 15-20°C', 'Humidity: 60-65%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'UK', 'USA', 'Canada'],
      rating: 4.8,
      reviews: 234,
      isFeatured: true,
      isOrganic: false,
      isPremium: true,
      isActive: true,
      order: 1
    },
    {
      name: 'Groundnuts',
      slug: 'groundnuts',
      description: 'Available in raw, roasted, and blanched forms with high oil content and protein, perfect for snacks, oil extraction, and confectionery applications.',
      shortDescription: 'High oil content and protein groundnuts for diverse applications',
      imageUrl: '/products/groundnuts.png',
      images: ['/products/groundnuts.png'],
      categorySlug: 'grains-spices',
      specifications: {
        'Variety': 'Bold, Java, Spanish',
        'Size': 'Medium to Large',
        'Color': 'Light Brown',
        'Oil Content': '45-50%',
        'Protein': '25-30%',
        'Moisture': '8-10%',
        'Forms': 'Raw, Roasted, Blanched'
      },
      origin: 'Gujarat, Andhra Pradesh',
      seasons: ['October', 'November', 'December', 'January', 'February'],
      minOrderQuantity: '1000 kg',
      packaging: ['25kg PP bags', '50kg jute bags', 'Bulk packaging'],
      price: { min: 2.5, max: 4.0, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'High oil content',
        'Multiple forms',
        'High protein',
        'Bulk exports',
        'Multiple uses',
        'Export quality'
      ],
      nutritionalInfo: {
        'Calories': '567 kcal per 100g',
        'Carbohydrates': '16g',
        'Protein': '26g',
        'Fiber': '8.5g',
        'Fat': '49g',
        'Vitamin E': '8.3mg'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '6-12 months under proper storage',
      storageConditions: ['Temperature: 15-20°C', 'Humidity: 60-65%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait'],
      rating: 4.6,
      reviews: 89,
      isFeatured: false,
      isOrganic: false,
      isPremium: false,
      isActive: true,
      order: 2
    },
    {
      name: 'Dry Turmeric',
      slug: 'dry-turmeric',
      description: 'With high curcumin content (2-5%) and available in both sun-dried and mechanically dried forms, our turmeric is perfect for food, pharmaceutical, and dye industry applications.',
      shortDescription: 'High curcumin content turmeric for food, pharmaceutical, and dye industry',
      imageUrl: '/products/dry-turmeric.png',
      images: ['/products/dry-turmeric.png'],
      categorySlug: 'grains-spices',
      specifications: {
        'Variety': 'Salem, Nizamabad, Rajapuri',
        'Color': 'Deep Yellow to Orange',
        'Curcumin Content': '2-5%',
        'Moisture': '10-12%',
        'Drying Method': 'Sun-dried & Mechanically dried',
        'Form': 'Fingers, Powder',
        'Aroma': 'Strong and earthy'
      },
      origin: 'Tamil Nadu, Andhra Pradesh',
      seasons: ['February', 'March', 'April', 'May', 'June'],
      minOrderQuantity: '500 kg',
      packaging: ['25kg PP bags', '50kg jute bags', 'Bulk packaging'],
      price: { min: 4.0, max: 6.0, currency: 'USD' },
      availability: 'in-stock',
      features: [
        'High curcumin',
        'Multiple varieties',
        'Drying methods',
        'Pharmaceutical grade',
        'Multiple applications',
        'Export quality'
      ],
      nutritionalInfo: {
        'Calories': '354 kcal per 100g',
        'Carbohydrates': '65g',
        'Protein': '8g',
        'Fiber': '21g',
        'Curcumin': '2-5%',
        'Iron': '41.4mg'
      },
      certifications: ['FSSAI', 'APEDA', 'GlobalGAP'],
      shelfLife: '2-3 years under proper storage',
      storageConditions: ['Temperature: 15-20°C', 'Humidity: 60-65%', 'Well ventilated'],
      exportMarkets: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait'],
      rating: 4.7,
      reviews: 112,
      isFeatured: true,
      isOrganic: false,
      isPremium: true,
      isActive: true,
      order: 3
    }
  ]

  for (const productData of products) {
    const category = categories.find(cat => cat.slug === productData.categorySlug)
    if (!category) continue

    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        shortDescription: productData.shortDescription,
        imageUrl: productData.imageUrl,
        images: JSON.stringify(productData.images),
        categoryId: category.id,
        specifications: JSON.stringify(productData.specifications),
        origin: productData.origin,
        seasons: JSON.stringify(productData.seasons),
        minOrderQuantity: productData.minOrderQuantity,
        packaging: JSON.stringify(productData.packaging),
        price: JSON.stringify(productData.price),
        availability: productData.availability,
        features: JSON.stringify(productData.features),
        nutritionalInfo: JSON.stringify(productData.nutritionalInfo),
        certifications: JSON.stringify(productData.certifications),
        shelfLife: productData.shelfLife,
        storageConditions: JSON.stringify(productData.storageConditions),
        exportMarkets: JSON.stringify(productData.exportMarkets),
        rating: productData.rating,
        reviews: productData.reviews,
        isFeatured: productData.isFeatured,
        isOrganic: productData.isOrganic,
        isPremium: productData.isPremium,
        isActive: productData.isActive,
        order: productData.order,
        // Hero section content
        heroTitle: productData.heroTitle,
        heroSubtitle: productData.heroSubtitle,
        heroDescription: productData.heroDescription,
        heroImageUrl: productData.heroImageUrl,
        heroButtonText: productData.heroButtonText,
        heroButtonLink: productData.heroButtonLink,
        heroButton2Text: productData.heroButton2Text,
        heroButton2Link: productData.heroButton2Link,
        // Features section content
        featuresTitle: productData.featuresTitle,
        featuresSubtitle: productData.featuresSubtitle
      }
    })
  }

  console.log('✅ Products created')
  console.log('🎉 Product seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding products:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
