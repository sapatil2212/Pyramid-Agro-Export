"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, Wheat, Leaf, Droplets, Apple, Eye } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const productCategories = [
  {
    id: "grapes",
    name: "Fresh Grapes",
    icon: Apple,
    description: "Premium quality fresh grapes sourced from the best vineyards of Nashik region",
    image: "grapes",
    products: ["Table Grapes", "Wine Grapes", "Red Grapes", "Green Grapes", "Black Grapes", "Seedless Varieties"],
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100"
  },
  {
    id: "onions",
    name: "Fresh Onions",
    icon: Droplets,
    description: "High-quality fresh onions with excellent storage life and superior taste",
    image: "onions",
    products: ["Red Onions", "White Onions", "Yellow Onions", "Shallots", "Big Onions", "Small Onions"],
    color: "from-amber-500 to-amber-600",
    bgColor: "from-amber-50 to-amber-100"
  },
  {
    id: "bananas",
    name: "Bananas",
    icon: Apple,
    description: "Fresh, nutritious bananas harvested at optimal ripeness for export markets",
    image: "bananas",
    products: ["Cavendish Bananas", "Robusta Bananas", "Red Bananas", "Plantains", "Baby Bananas", "Organic Bananas"],
    color: "from-yellow-500 to-yellow-600",
    bgColor: "from-yellow-50 to-yellow-100"
  },
  {
    id: "green-chilli",
    name: "Green Chilli",
    icon: Leaf,
    description: "Fresh, spicy green chillies with vibrant color and authentic Indian flavor",
    image: "green-chilli",
    products: ["Long Green Chilli", "Short Green Chilli", "Bullet Chilli", "Hot Chilli", "Mild Chilli", "Organic Chilli"],
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100"
  }
]

const featuredProducts = [
  {
    name: "Premium Fresh Grapes",
    category: "Fresh Fruits",
    origin: "Nashik, Maharashtra",
    quality: "Table Grade, Export Quality",
    image: "grapes"
  },
  {
    name: "Fresh Red Onions",
    category: "Fresh Vegetables",
    origin: "Nashik, Maharashtra", 
    quality: "Medium to Large Size",
    image: "onions"
  },
  {
    name: "Cavendish Bananas",
    category: "Fresh Fruits",
    origin: "Maharashtra, India",
    quality: "Premium Grade, Hand Selected",
    image: "bananas"
  }
]

export function ProductsShowcase() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6"
          >
            <Wheat className="h-4 w-4 mr-2" />
            Our Product Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Premium Agricultural Products
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our premium range of fresh fruits and vegetables, 
            sourced directly from the fertile farms of Nashik and processed 
            with decades of expertise to meet international standards.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {productCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {(() => {
                const IconComponent = category.icon
                return <IconComponent className="h-5 w-5" />
              })()}
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Category Display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className={`bg-gradient-to-br ${productCategories[activeCategory].bgColor} rounded-2xl p-8 lg:p-16`}>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              {/* Category Info */}
              <div>
                <div className={`w-16 h-16 bg-gradient-to-br ${productCategories[activeCategory].color} rounded-xl flex items-center justify-center mb-6`}>
                  {(() => {
                    const IconComponent = productCategories[activeCategory].icon
                    return <IconComponent className="h-8 w-8 text-white" />
                  })()}
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {productCategories[activeCategory].name}
                </h3>
                
                <p className="text-lg text-gray-600 mb-6">
                  {productCategories[activeCategory].description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {productCategories[activeCategory].products.map((product, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm font-medium">{product}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton asChild>
                  <Link href={`/products#${productCategories[activeCategory].id}`} className="group">
                    View All Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </AnimatedButton>
              </div>

              {/* Category Image Placeholder */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-white/50 to-white/20 rounded-2xl border border-white/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    {(() => {
                      const IconComponent = productCategories[activeCategory].icon
                      return <IconComponent className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                    })()}
                    <p className="text-gray-500 font-medium">
                      {productCategories[activeCategory].name}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      High-quality product images would be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular and in-demand products that have earned the trust of global partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {/* Product Image Placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center relative overflow-hidden">
                    <Wheat className="h-16 w-16 text-emerald-400" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full">
                        <Eye className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">In Stock</span>
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h4>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Origin:</span>
                        <span className="font-medium">{product.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality:</span>
                        <span className="font-medium">{product.quality}</span>
                      </div>
                    </div>

                    <AnimatedButton variant="outline" size="sm" className="w-full">
                      View Details
                    </AnimatedButton>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Can&rsquo;t Find What You&rsquo;re Looking For?
            </h3>
            <p className="text-lg mb-8 text-emerald-100 max-w-2xl mx-auto">
              We source a wide variety of agricultural products. Contact us for custom requirements 
              and we&rsquo;ll help you find exactly what you need.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                variant="secondary" 
                size="lg" 
                asChild
                className="bg-white text-emerald-700 hover:bg-gray-100"
              >
                <Link href="/products">Browse All Products</Link>
              </AnimatedButton>
              
              <AnimatedButton 
                variant="outline" 
                size="lg" 
                asChild
                className="border-white text-white hover:bg-white hover:text-emerald-700"
              >
                <Link href="/contact">Request Custom Quote</Link>
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
