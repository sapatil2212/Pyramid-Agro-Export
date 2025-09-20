"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Search, 
  Filter, 
  Star, 
  ArrowRight, 
  Leaf, 
  Droplets,
  Sun,
  Shield,
  Truck,
  Clock,
  CheckCircle
} from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"
import { useState } from "react"
import { Product } from "@/types"

// Product categories
const productCategories = [
  {
    id: "fruits",
    name: "Fresh Fruits",
    description: "Premium quality fresh fruits from Indian farms",
    icon: Leaf,
    color: "emerald"
  },
  {
    id: "vegetables", 
    name: "Fresh Vegetables",
    description: "Farm-fresh vegetables with international standards",
    icon: Droplets,
    color: "blue"
  },
  {
    id: "grains",
    name: "Grains & Spices",
    description: "Premium grains and authentic Indian spices",
    icon: Sun,
    color: "amber"
  }
]

// Product data
const products: Product[] = [
  // Fruits
  {
    id: "grapes",
    name: "Fresh Grapes",
    category: "fruits",
    description: "Premium quality table grapes, perfect for export",
    image: "/hero/hero-1.png",
    images: ["/hero/hero-1.png"],
    specifications: { "Variety": "Table Grapes", "Color": "Green/Red" },
    origin: "Nashik, Maharashtra",
    seasons: ["March", "April", "May"],
    minOrderQuantity: "1000 kg",
    packaging: ["Carton Box"],
    price: { min: 2.5, max: 4.0, currency: "USD" },
    availability: "in-stock" as const,
    rating: 4.9,
    reviews: 150,
    features: ["High Sugar Content", "Long Shelf Life", "Premium Grade"],
    nutritionalInfo: { "Calories": "62 per 100g" },
    certifications: ["FSSAI"],
    shelfLife: "2-3 weeks",
    storageConditions: ["Cool Temperature"],
    exportMarkets: ["UAE", "UK"],
    isFeatured: true,
    isOrganic: true,
    isPremium: true
  },
  {
    id: "banana",
    name: "Banana",
    category: "fruits", 
    description: "Fresh bananas with excellent nutritional value",
    image: "/hero/hero-1.png",
    images: ["/hero/hero-1.png"],
    specifications: { "Variety": "Cavendish", "Size": "Medium-Large" },
    origin: "Tamil Nadu",
    seasons: ["Year Round"],
    minOrderQuantity: "500 kg",
    packaging: ["Carton Box"],
    price: { min: 1.5, max: 2.5, currency: "USD" },
    availability: "in-stock" as const,
    rating: 4.8,
    reviews: 120,
    features: ["Rich in Potassium", "Natural Ripening", "Export Quality"],
    nutritionalInfo: { "Potassium": "358mg per 100g" },
    certifications: ["FSSAI"],
    shelfLife: "1-2 weeks",
    storageConditions: ["Room Temperature"],
    exportMarkets: ["UAE", "Saudi Arabia"],
    isFeatured: false,
    isOrganic: false,
    isPremium: false
  },
  // Vegetables
  {
    id: "onions",
    name: "Fresh Onions",
    category: "vegetables",
    description: "Premium quality onions suitable for global markets",
    image: "/hero/hero-1.png",
    images: ["/hero/hero-1.png"],
    specifications: { "Variety": "Red Onions", "Size": "Medium-Large" },
    origin: "Maharashtra",
    seasons: ["October", "November", "December"],
    minOrderQuantity: "1000 kg",
    packaging: ["Mesh Bags", "Carton Box"],
    price: { min: 0.8, max: 1.5, currency: "USD" },
    availability: "in-stock" as const,
    rating: 4.7,
    reviews: 200,
    features: ["High Dry Matter", "Long Storage Life", "Uniform Size"],
    nutritionalInfo: { "Vitamin C": "7.4mg per 100g" },
    certifications: ["FSSAI"],
    shelfLife: "2-3 months",
    storageConditions: ["Cool Dry Place"],
    exportMarkets: ["UAE", "Bangladesh"],
    isFeatured: true,
    isOrganic: false,
    isPremium: true
  },
  {
    id: "green-chilli",
    name: "Green Chilli",
    category: "vegetables",
    description: "Fresh green chillies with perfect spice level",
    image: "/hero/hero-1.png",
    images: ["/hero/hero-1.png"],
    specifications: { "Variety": "Green Chillies", "Heat Level": "Medium" },
    origin: "Andhra Pradesh",
    seasons: ["Year Round"],
    minOrderQuantity: "500 kg",
    packaging: ["Carton Box"],
    price: { min: 2.0, max: 3.5, currency: "USD" },
    availability: "in-stock" as const,
    rating: 4.6,
    reviews: 180,
    features: ["Consistent Heat", "Fresh Harvest", "Export Ready"],
    nutritionalInfo: { "Vitamin C": "143.7mg per 100g" },
    certifications: ["FSSAI"],
    shelfLife: "1-2 weeks",
    storageConditions: ["Cool Temperature"],
    exportMarkets: ["UAE", "Qatar"],
    isFeatured: false,
    isOrganic: false,
    isPremium: false
  },
  // Grains & Spices
  {
    id: "rice",
    name: "Basmati Rice",
    category: "grains",
    description: "Premium basmati rice with authentic aroma",
    image: "/hero/hero-1.png",
    images: ["/hero/hero-1.png"],
    specifications: { "Variety": "Basmati", "Grain Length": "Long" },
    origin: "Punjab",
    seasons: ["October", "November"],
    minOrderQuantity: "1000 kg",
    packaging: ["Jute Bags", "Plastic Bags"],
    price: { min: 3.0, max: 5.0, currency: "USD" },
    availability: "in-stock" as const,
    rating: 4.9,
    reviews: 300,
    features: ["Long Grain", "Aromatic", "Premium Grade"],
    nutritionalInfo: { "Carbohydrates": "78g per 100g" },
    certifications: ["FSSAI", "APEDA"],
    shelfLife: "2 years",
    storageConditions: ["Dry Place", "Cool Temperature"],
    exportMarkets: ["UAE", "UK", "USA"],
    isFeatured: true,
    isOrganic: false,
    isPremium: true
  },
  {
    id: "turmeric",
    name: "Turmeric Powder",
    category: "grains",
    description: "Pure turmeric powder with high curcumin content",
    image: "/hero/hero-1.png",
    images: ["/hero/hero-1.png"],
    specifications: { "Type": "Powder", "Purity": "99%" },
    origin: "Tamil Nadu",
    seasons: ["Year Round"],
    minOrderQuantity: "100 kg",
    packaging: ["Plastic Bags", "Carton Box"],
    price: { min: 4.0, max: 6.0, currency: "USD" },
    availability: "in-stock" as const,
    rating: 4.8,
    reviews: 250,
    features: ["High Curcumin", "Pure Form", "Medicinal Grade"],
    nutritionalInfo: { "Curcumin": "3-5%" },
    certifications: ["FSSAI", "Organic"],
    shelfLife: "2 years",
    storageConditions: ["Dry Place", "Airtight Container"],
    exportMarkets: ["UAE", "USA", "Germany"],
    isFeatured: false,
    isOrganic: true,
    isPremium: true
  }
]

// Product Card Component
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { openModal } = useAppointmentModal()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjUuNDY0IDE4Ny4zMjQgMTc4IDE3MCAxNzhDMTUyLjY3NiAxNzggMTQwIDE2NS40NjQgMTQwIDE1MEMxNDAgMTM0LjUzNiAxNTIuNjc2IDEyMiAxNzAgMTIyQzE4Ny4zMjQgMTIyIDIwMCAxMzQuNTM2IDIwMCAxNTBaIiBmaWxsPSIjOUI5QkE1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIExvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPgo="
            }}
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="space-y-2 mb-4">
            {product.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              {product.reviews} reviews
            </div>
            <div className="text-lg font-semibold text-emerald-600">
              {product.price ? `${product.price.currency} ${product.price.min}-${product.price.max}` : 'Contact for price'}
            </div>
          </div>
          
          <Button
            onClick={openModal}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white group"
          >
            Get Quote
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

// Filter Component
function ProductFilter({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === "all"
            ? "bg-emerald-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Products
      </button>
      {productCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { openModal } = useAppointmentModal()

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Discover our premium range of agricultural products, carefully sourced and exported worldwide
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Product Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of agricultural products across different categories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}>
                  <div className={`w-16 h-16 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${category.color}-200 transition-colors`}>
                    <category.icon className={`h-8 w-8 text-${category.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className={`border-${category.color}-600 text-${category.color}-600 hover:bg-${category.color}-50`}
                  >
                    View Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                All Products
              </h2>
              <p className="text-lg text-gray-600">
                {filteredProducts.length} products found
              </p>
            </div>
            <ProductFilter 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quality Assurance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every product undergoes rigorous quality checks to ensure international standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Testing",
                description: "Comprehensive testing for freshness, nutrition, and safety standards"
              },
              {
                icon: Truck,
                title: "Cold Chain Logistics",
                description: "Maintained temperature control throughout the supply chain"
              },
              {
                icon: Clock,
                title: "Fresh Harvest",
                description: "Products harvested at optimal ripeness for maximum quality"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in Our Products?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Get a customized quote for your specific requirements and volume needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={openModal}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3"
              >
                Get Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contact'}
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}