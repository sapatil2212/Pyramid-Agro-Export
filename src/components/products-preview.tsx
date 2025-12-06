"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Package } from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"
import { useState, useEffect } from "react"

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  imageUrl?: string;
  heroImageUrl?: string;
  heroDescription?: string;
  features?: string[] | Array<{ icon?: string; title?: string; description?: string }>;
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  isActive: boolean;
  isFeatured: boolean;
  updatedAt?: string;
}

// Helper to parse features
function parseFeatures(features: string[] | Array<{ icon?: string; title?: string; description?: string }> | undefined): string[] {
  if (!features) return []
  if (Array.isArray(features)) {
    if (features.length > 0 && typeof features[0] === 'object' && 'title' in features[0]) {
      return features.map((f) => (typeof f === 'object' && 'title' in f ? f.title : String(f)) || '')
    }
    return features.map(String)
  }
  if (typeof features === 'string') {
    try {
      const parsed = JSON.parse(features)
      if (Array.isArray(parsed)) {
        if (parsed.length > 0 && typeof parsed[0] === 'object' && 'title' in parsed[0]) {
          return parsed.map((f: unknown) => (typeof f === 'object' && f !== null && 'title' in f ? (f as { title: string }).title : String(f)))
        }
        return parsed.map(String)
      }
    } catch {
      return []
    }
  }
  return []
}

export function ProductsPreview() {
  const { openModal } = useAppointmentModal()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      
      if (response.ok && data.products) {
        // Filter only active products and shuffle randomly
        const activeProducts = data.products.filter((p: Product) => p.isActive)
        const shuffled = [...activeProducts].sort(() => Math.random() - 0.5)
        // Take first 6 products
        setProducts(shuffled.slice(0, 6))
      } else {
        console.error('Failed to fetch products:', data.error)
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <section className="py-5 md:py-5 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32 pt-4 pb-4 md:pt-8 md:pb-20 relative z-10">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    )
  }

  // Don't render if no products
  if (products.length === 0) {
    return null
  }

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
            className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Discover our comprehensive range of premium agricultural products, carefully sourced and exported to meet international quality standards
          </motion.p>
        </motion.div>

        {/* Products Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {products.map((product: Product, index: number) => {
            const imageUrl = product.imageUrl || product.heroImageUrl
            const cacheBuster = product.updatedAt ? `?t=${new Date(product.updatedAt).getTime()}` : ''
            const features = parseFeatures(product.features)
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative h-[300px] overflow-hidden">
                  {imageUrl ? (
                    <Image 
                      src={`${imageUrl}${cacheBuster}`} 
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.parentElement?.querySelector('.placeholder') as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`placeholder absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center ${imageUrl ? 'hidden' : 'flex'}`}
                  >
                    <div className="text-center text-gray-600">
                      <Package className="h-10 w-10 mx-auto mb-2 text-emerald-500" />
                      <p className="text-sm font-medium">{product.name}</p>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  {product.category && (
                    <div className="absolute top-2 left-2">
                      <span 
                        className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: product.category.color || '#10b981' }}
                      >
                        {product.category.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.shortDescription || product.description || product.heroDescription || 'Premium quality agricultural product for export.'}
                  </p>
                  
                  {features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {features.slice(0, 2).map((feature: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/products/${product.slug}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs h-8 group border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={openModal}
                      className="flex-1 text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Get Quote
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
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
