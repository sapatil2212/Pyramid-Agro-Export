"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight,
  Star, 
  CheckCircle, 
  Leaf,
  Truck,
  Shield,
  Heart,
  Award,
  Zap,
  Globe,
  Clock,
  Users,
  Target,
  Lock,
  TrendingUp,
  Sparkles,
  RefreshCw,
  type LucideIcon,
} from "lucide-react"

interface Feature {
  icon: string
  title: string
  description: string
}

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  imageUrl?: string
  category: {
    id: string
    name: string
    slug: string
    color?: string
  }
  specifications?: Record<string, string>
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroImageUrl?: string
  heroButtonText?: string
  heroButtonLink?: string
  heroButton2Text?: string
  heroButton2Link?: string
  featuresTitle?: string
  featuresSubtitle?: string
  features?: Feature[]
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

// Icon mapping for feature cards
const iconMap: Record<string, LucideIcon> = {
  Star, CheckCircle, Leaf, Truck, Shield, Heart, Award, Zap,
  Globe, Clock, Users, Target, Lock, TrendingUp, Sparkles
}

// Default features if not provided
const defaultFeatures: Feature[] = [
  { icon: "Star", title: "Premium Quality", description: "Hand-picked from finest sources" },
  { icon: "CheckCircle", title: "International Standards", description: "Meets all quality standards" },
  { icon: "Leaf", title: "Fresh & Natural", description: "100% natural, no preservatives" },
  { icon: "Truck", title: "Fast Delivery", description: "Quick worldwide delivery" },
  { icon: "Shield", title: "Quality Assurance", description: "Rigorous quality checks" }
]

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products?slug=${slug}&t=${Date.now()}`)
      const data = await response.json()
      
      if (data.products && data.products.length > 0) {
        const productData = data.products[0] as Product & {
          features?: Feature[] | string
          specifications?: Record<string, string> | string
        }
        
        // Parse features if it's a string
        if (productData.features && typeof productData.features === 'string') {
          try {
            productData.features = JSON.parse(productData.features)
          } catch (e) {
            productData.features = []
          }
        }
        
        // Parse specifications if it's a string
        if (productData.specifications && typeof productData.specifications === 'string') {
          try {
            productData.specifications = JSON.parse(productData.specifications)
          } catch (e) {
            productData.specifications = {}
          }
        }
        
        setProduct(productData)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }, [slug])

  const refetch = () => {
    void fetchProduct()
  }

  useEffect(() => {
    void fetchProduct()
  }, [fetchProduct])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => window.location.href = '/products'} className="flex items-center gap-2">
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  // Get features from product or use defaults
  const features: Feature[] = (product.features && Array.isArray(product.features) && product.features.length > 0) 
    ? product.features 
    : defaultFeatures

  return (
    <div className="min-h-screen">
      {/* Hero Section - Same as Grapes Page */}
      <section className="pt-32 sm:pt-42 pb-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.heroTitle || `Premium Quality ${product.name}`}
                {product.heroSubtitle && (
                  <span className="text-emerald-600"> {product.heroSubtitle}</span>
                )}
              </h1>
              <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-relaxed">
                {product.heroDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: product.heroDescription.replace(/\n/g, '<br />') }} />
                ) : (
                  <p>
                    Experience the finest {product.name.toLowerCase()} from India&apos;s premier farms. 
                    Our premium quality products are carefully selected, packed, 
                    and exported to meet the highest international standards.
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  onClick={() => window.location.href = product.heroButtonLink || '/contact'}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
                >
                  {product.heroButtonText || 'Get Quote'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                {product.heroButton2Text && (
                  <Button
                    onClick={() => window.location.href = product.heroButton2Link || '#features'}
                    variant="outline"
                    size="lg"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
                  >
                    {product.heroButton2Text}
                  </Button>
                )}
                <Button
                  onClick={refetch}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2"
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-lg mx-auto">
                <Image
                  src={product.heroImageUrl || product.imageUrl || "/products/placeholder.png"}
                  alt={product.heroTitle || product.name}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-xl flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-center text-gray-600">
                    <Leaf className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-sm">Export Quality</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Same as Grapes Page */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {product.featuresTitle || `Why Choose Our ${product.name}?`}
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {product.featuresSubtitle || `Premium quality ${product.name.toLowerCase()} with exceptional taste and freshness`}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 min-w-[200px] flex-1 max-w-[250px]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                    {(() => {
                      const IconComponent = iconMap[feature.icon] || Star
                      return <IconComponent className="h-5 w-5 text-emerald-600" />
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Table Section */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Product Specifications
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                Detailed specifications for {product.name}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-emerald-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Specification</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <motion.tr
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="hover:bg-emerald-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{key}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{value}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section - Same as Grapes Page */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {product.ctaTitle || `Ready to Order Premium ${product.name}?`}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {product.ctaDescription || `Contact us today for the finest quality ${product.name.toLowerCase()} delivered to your doorstep with our proven export process`}
              </p>
              <Button
                onClick={() => window.location.href = product.ctaButtonLink || '/contact'}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
              >
                {product.ctaButtonText || "Get Quote Now"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
