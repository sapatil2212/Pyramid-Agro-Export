import { Product } from "@/types"

export const products: Product[] = [
  {
    id: "premium-grapes",
    name: "Premium Fresh Grapes",
    category: "Fresh Fruits",
    description: "Premium quality fresh grapes sourced from the finest vineyards of Nashik region. These grapes are carefully selected for their superior taste, texture, and appearance, making them perfect for both domestic and international markets.",
    image: "/hero/hero-1.png",
    images: [
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png"
    ],
    specifications: {
      "Variety": "Thompson Seedless, Red Globe, Black Seedless",
      "Size": "18-22mm diameter",
      "Color": "Green, Red, Black",
      "Sugar Content": "16-18 Brix",
      "Acidity": "0.6-0.8%",
      "Firmness": "Crisp and firm",
      "Bunch Weight": "300-500g"
    },
    origin: "Nashik, Maharashtra",
    seasons: ["March", "April", "May", "June", "July", "August", "September"],
    minOrderQuantity: "1000 kg",
    packaging: ["5kg cartons", "10kg cartons", "15kg cartons", "Bulk packaging"],
    price: {
      min: 120,
      max: 180,
      currency: "USD"
    },
    availability: "in-stock",
    rating: 4.8,
    reviews: 156,
    features: [
      "Premium table grade quality",
      "Export standard packaging",
      "Cold chain maintained",
      "Quality certified",
      "Custom packaging available",
      "Direct from farm"
    ],
    nutritionalInfo: {
      "Calories": "62 kcal per 100g",
      "Carbohydrates": "16g",
      "Fiber": "0.9g",
      "Vitamin C": "27% DV",
      "Vitamin K": "18% DV",
      "Potassium": "6% DV"
    },
    certifications: ["FSSAI", "APEDA", "Organic Certified", "GlobalGAP"],
    shelfLife: "2-3 weeks under proper storage",
    storageConditions: ["Temperature: 0-2°C", "Humidity: 90-95%", "Ventilation required"],
    exportMarkets: ["UAE", "UK", "Germany", "Netherlands", "Russia", "Bangladesh"],
    isFeatured: true,
    isOrganic: false,
    isPremium: true
  },
  {
    id: "fresh-onions",
    name: "Fresh Red Onions",
    category: "Fresh Vegetables",
    description: "High-quality fresh red onions with excellent storage life and superior taste. Grown in the fertile soils of Nashik region, these onions are known for their pungent flavor and long shelf life, making them ideal for export markets.",
    image: "/hero/hero-1.png",
    images: [
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png"
    ],
    specifications: {
      "Variety": "Nashik Red, Pusa Red",
      "Size": "Medium to Large (50-80mm)",
      "Color": "Deep Red",
      "Dry Matter": "12-14%",
      "Pungency": "Medium to High",
      "Shape": "Globular to slightly flat",
      "Weight": "80-150g per piece"
    },
    origin: "Nashik, Maharashtra",
    seasons: ["January", "February", "March", "April", "May", "October", "November", "December"],
    minOrderQuantity: "2000 kg",
    packaging: ["25kg mesh bags", "50kg jute bags", "Bulk packaging"],
    price: {
      min: 0.8,
      max: 1.2,
      currency: "USD"
    },
    availability: "in-stock",
    rating: 4.6,
    reviews: 89,
    features: [
      "Long shelf life",
      "Export quality",
      "Uniform size",
      "Minimal damage",
      "Proper curing",
      "Quality sorting"
    ],
    nutritionalInfo: {
      "Calories": "40 kcal per 100g",
      "Carbohydrates": "9.3g",
      "Fiber": "1.7g",
      "Vitamin C": "7.4mg",
      "Folate": "19μg",
      "Potassium": "146mg"
    },
    certifications: ["FSSAI", "APEDA", "GlobalGAP"],
    shelfLife: "3-6 months under proper storage",
    storageConditions: ["Temperature: 0-4°C", "Humidity: 65-70%", "Well ventilated"],
    exportMarkets: ["UAE", "Malaysia", "Bangladesh", "Sri Lanka", "Nepal"],
    isFeatured: true,
    isOrganic: false,
    isPremium: false
  },
  {
    id: "cavendish-bananas",
    name: "Cavendish Bananas",
    category: "Fresh Fruits",
    description: "Premium Cavendish bananas harvested at optimal ripeness for export markets. These bananas are hand-selected for their uniform size, perfect ripeness, and superior quality, ensuring they reach customers in perfect condition.",
    image: "/hero/hero-1.png",
    images: [
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png"
    ],
    specifications: {
      "Variety": "Cavendish (Grand Naine)",
      "Size": "Grade A (18-20cm)",
      "Color": "Green to Yellow",
      "Firmness": "Firm and consistent",
      "Brix": "20-22",
      "Finger Count": "6-8 fingers per hand",
      "Hand Weight": "15-20kg"
    },
    origin: "Maharashtra, India",
    seasons: ["Year Round"],
    minOrderQuantity: "500 kg",
    packaging: ["13kg cartons", "18kg cartons", "Bulk packaging"],
    price: {
      min: 0.6,
      max: 0.9,
      currency: "USD"
    },
    availability: "in-stock",
    rating: 4.7,
    reviews: 124,
    features: [
      "Hand selected premium grade",
      "Controlled ripening",
      "Export standard packaging",
      "Quality controlled",
      "Fresh harvest",
      "Uniform size"
    ],
    nutritionalInfo: {
      "Calories": "89 kcal per 100g",
      "Carbohydrates": "23g",
      "Fiber": "2.6g",
      "Vitamin C": "8.7mg",
      "Vitamin B6": "0.4mg",
      "Potassium": "358mg"
    },
    certifications: ["FSSAI", "APEDA", "GlobalGAP"],
    shelfLife: "2-3 weeks under proper storage",
    storageConditions: ["Temperature: 13-15°C", "Humidity: 85-90%", "Ethylene controlled"],
    exportMarkets: ["UAE", "Saudi Arabia", "Kuwait", "Qatar", "Oman"],
    isFeatured: true,
    isOrganic: false,
    isPremium: true
  },
  {
    id: "green-chilli",
    name: "Fresh Green Chilli",
    category: "Fresh Vegetables",
    description: "Fresh, spicy green chillies with vibrant color and authentic Indian flavor. These chillies are carefully harvested and packed to maintain their freshness and pungency, perfect for culinary applications worldwide.",
    image: "/hero/hero-1.png",
    images: [
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png",
      "/hero/hero-1.png"
    ],
    specifications: {
      "Variety": "Long Green, Bullet, Hot",
      "Length": "8-12cm",
      "Color": "Bright Green",
      "Heat Level": "Medium to Hot (30,000-50,000 SHU)",
      "Shape": "Elongated, tapering",
      "Weight": "5-8g per piece",
      "Moisture": "85-90%"
    },
    origin: "Nashik, Maharashtra",
    seasons: ["Year Round"],
    minOrderQuantity: "500 kg",
    packaging: ["5kg cartons", "10kg cartons", "Bulk packaging"],
    price: {
      min: 2.5,
      max: 4.0,
      currency: "USD"
    },
    availability: "in-stock",
    rating: 4.5,
    reviews: 67,
    features: [
      "Fresh harvest",
      "Vibrant color",
      "Consistent heat level",
      "Export quality",
      "Careful handling",
      "Quality sorting"
    ],
    nutritionalInfo: {
      "Calories": "40 kcal per 100g",
      "Carbohydrates": "9g",
      "Fiber": "1.5g",
      "Vitamin C": "242mg",
      "Vitamin A": "952 IU",
      "Capsaicin": "0.1-1%"
    },
    certifications: ["FSSAI", "APEDA", "GlobalGAP"],
    shelfLife: "1-2 weeks under proper storage",
    storageConditions: ["Temperature: 7-10°C", "Humidity: 90-95%", "Well ventilated"],
    exportMarkets: ["UAE", "UK", "USA", "Canada", "Australia"],
    isFeatured: false,
    isOrganic: false,
    isPremium: false
  }
]

export const productCategories = [
  {
    id: "grapes",
    name: "Fresh Grapes",
    description: "Premium quality fresh grapes sourced from the best vineyards of Nashik region",
    image: "grapes",
    products: products.filter(p => p.category === "Fresh Fruits" && p.name.includes("Grapes"))
  },
  {
    id: "onions",
    name: "Fresh Onions", 
    description: "High-quality fresh onions with excellent storage life and superior taste",
    image: "onions",
    products: products.filter(p => p.category === "Fresh Vegetables" && p.name.includes("Onions"))
  },
  {
    id: "bananas",
    name: "Bananas",
    description: "Fresh, nutritious bananas harvested at optimal ripeness for export markets",
    image: "bananas", 
    products: products.filter(p => p.category === "Fresh Fruits" && p.name.includes("Bananas"))
  },
  {
    id: "green-chilli",
    name: "Green Chilli",
    description: "Fresh, spicy green chillies with vibrant color and authentic Indian flavor",
    image: "green-chilli",
    products: products.filter(p => p.category === "Fresh Vegetables" && p.name.includes("Chilli"))
  }
]
