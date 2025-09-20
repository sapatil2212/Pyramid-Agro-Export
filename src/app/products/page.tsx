"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Search, 
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

// Product data with proper navigation links
const products = [
  {
    id: "grapes",
    name: "Fresh Grapes",
    category: "fruits",
    description: "Premium quality Nashik grapes with natural sweetness and crunchy texture",
    image: "/products/grapes-2.png",
    benefits: ["Natural Sweetness", "Long Shelf Life", "Export Grade", "Premium Quality"],
    link: "/products/grapes"
  },
  {
    id: "pomegranates",
    name: "Pomegranates",
    category: "fruits",
    description: "Bhagwa variety with deep red arils, high juice content and long storage capacity",
    image: "/products/pomogranate.png",
    benefits: ["Deep Red Arils", "High Juice Content", "APEDA Certified", "Export Ready"],
    link: "/products/pomegranates"
  },
  {
    id: "guava",
    name: "Guavas",
    category: "fruits",
    description: "Allahabad Safeda and Pink Guava varieties rich in Vitamin C and antioxidants",
    image: "/products/guava.png",
    benefits: ["Rich in Vitamin C", "Two Varieties", "High Antioxidants", "Health Benefits"],
    link: "/products/guava"
  },
  {
    id: "banana",
    name: "Green Bananas",
    category: "fruits",
    description: "Cavendish and Robusta varieties with firm texture and long shelf life",
    image: "/products/green-banana.png",
    benefits: ["Year-round Available", "Long Shelf Life", "High Nutrients", "Export Grade"],
    link: "/products/banana"
  },
  {
    id: "onions",
    name: "Nashik Onions",
    category: "vegetables",
    description: "Red and pink onions with strong flavor, firm texture and uniform grading",
    image: "/products/onion.png",
    benefits: ["Strong Flavor", "Year-round Available", "Extended Shelf Life", "Uniform Grading"],
    link: "/products/onions"
  },
  {
    id: "green-chillis",
    name: "Green Chilies",
    category: "vegetables",
    description: "G4, Bullet, and Byadgi varieties with high pungency and longer shelf life",
    image: "/products/green-chillies.png",
    benefits: ["High Pungency", "Fresh & Dried", "Long Shelf Life", "Authentic Flavors"],
    link: "/products/green-chillis"
  },
  {
    id: "potatoes",
    name: "Potatoes",
    category: "vegetables",
    description: "Jyoti, Kufri Bahar, and Kufri Pukhraj varieties perfect for chips and fries",
    image: "/products/potatoes.png",
    benefits: ["High Dry Matter", "Starch-rich", "Bulk Supply", "Cooking Quality"],
    link: "/products/potatoes"
  },
  {
    id: "rice",
    name: "Rice",
    category: "grains",
    description: "Basmati and Non-Basmati varieties with authentic aroma and fluffy texture",
    image: "/products/rice.png",
    benefits: ["Aromatic Basmati", "Cost-effective Options", "Customized Packaging", "Export Grade"],
    link: "/products/rice"
  },
  {
    id: "dry-turmeric",
    name: "Dry Turmeric",
    category: "grains",
    description: "Salem, Nizamabad, and Rajapuri varieties with high curcumin content",
    image: "/products/dry-turmeric.png",
    benefits: ["High Curcumin", "Multiple Varieties", "Pharmaceutical Grade", "Export Ready"],
    link: "/products/dry-turmeric"
  },
  {
    id: "groundnuts",
    name: "Groundnuts",
    category: "grains",
    description: "Raw, roasted, and blanched forms with high oil content and protein",
    image: "/products/groundnuts.png",
    benefits: ["High Oil Content", "Multiple Forms", "High Protein", "Bulk Exports"],
    link: "/products/groundnuts"
  }
]

// Product Card Component
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const handleViewDetails = () => {
    window.location.href = product.link
  }

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Image Section */}
        <div className="relative h-64 sm:h-72 md:h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center"
            style={{ display: 'none' }}
          >
            <div className="text-center text-gray-600">
              <Leaf className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-sm">Export Quality</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleViewDetails}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white group"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// Filter Component
function ProductFilter({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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
  const [searchQuery] = useState("")
  const { openModal } = useAppointmentModal()

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
     

      {/* Products Grid */}
      <section className="py-16 bg-gray-50  pt-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                All Products
              </h2>
            </div>
            <div className="flex justify-center md:justify-end">
              <ProductFilter 
                selectedCategory={selectedCategory} 
                onCategoryChange={setSelectedCategory} 
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
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