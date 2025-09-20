"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Leaf } from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"

// Product images
const OnionImage = "/products/onion.png"
const GrapesImage = "/products/grapes.png"
const GreenBananaImage = "/products/green-banana.png"
const GreenChilliesImage = "/products/green-chillies.png"

const featuredProducts = [
  {
    id: "premium-onions",
    title: "Premium Onions",
    description: "Fresh, high-quality onions sourced directly from India's finest farms, perfect for export and culinary excellence.",
    benefits: ["Export Quality", "Fresh Harvest", "Long Shelf Life", "Premium Grade"],
    image: OnionImage,
    link: "/products/onions"
  },
  {
    id: "fresh-grapes",
    title: "Fresh Grapes",
    description: "Sweet, juicy grapes grown in optimal conditions, carefully selected and packed for international markets.",
    benefits: ["Sweet & Juicy", "Export Ready", "Premium Quality", "Fresh Packed"],
    image: GrapesImage,
    link: "/products/grapes"
  },
  {
    id: "green-bananas",
    title: "Green Bananas",
    description: "Premium green bananas perfect for cooking and export, maintaining freshness and nutritional value.",
    benefits: ["Nutritious", "Export Grade", "Fresh Harvest", "Quality Assured"],
    image: GreenBananaImage,
    link: "/products/banana"
  },
  {
    id: "green-chillies",
    title: "Green Chillies",
    description: "Spicy, fresh green chillies with perfect heat levels, ideal for culinary applications and export markets.",
    benefits: ["Perfect Heat", "Fresh Quality", "Export Ready", "Premium Grade"],
    image: GreenChilliesImage,
    link: "/products/green-chillis"
  }
]

export function ProductsPreview() {
  const { openModal } = useAppointmentModal()

  return (
    <section className="py-5 md:py-5 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-32 pt-4 pb-4 md:pt-8 md:pb-20 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Leaf className="h-4 w-4" />
            <span>Our Products</span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4"
          >
            Premium{" "}
            <span className="text-emerald-600">Agricultural Products</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm md:text-md text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Discover our comprehensive range of premium agricultural products, carefully sourced and exported to meet international quality standards
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
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
                <div className="relative overflow-hidden order-1 md:order-1">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-48 md:h-full object-cover"
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
                      <Leaf className="h-12 w-12 mx-auto mb-2 text-emerald-500" />
                      <p className="text-sm font-semibold">{product.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between order-2 md:order-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-emerald-600">Key Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {product.benefits.slice(0, 3).map((benefit, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Link href={product.link} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs px-3 py-1 group border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        >
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={openModal}
                        className="flex-1 text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/products">
            <Button
              variant="default"
              size="lg"
              className="group bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
