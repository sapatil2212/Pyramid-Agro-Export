"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  Eye, 
  Heart, 
  ShoppingCart, 
  MapPin, 
  Calendar,
  Package,
  Award,
  TrendingUp,
  Leaf,
  ChevronRight,
  Info
} from "lucide-react"
import Image from "next/image"

interface InteractiveProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
  onAddToCart?: (product: Product) => void
  onToggleFavorite?: (product: Product) => void
  isFavorite?: boolean
  index?: number
}

export function InteractiveProductCard({ 
  product, 
  onViewDetails, 
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  index = 0
}: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'bg-green-500'
      case 'limited': return 'bg-yellow-500'
      case 'out-of-stock': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'In Stock'
      case 'limited': return 'Limited Stock'
      case 'out-of-stock': return 'Out of Stock'
      default: return 'Unknown'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white relative">
        {/* Badge Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isFeatured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            >
              <Award className="h-3 w-3" />
              Featured
            </motion.div>
          )}
          {product.isPremium && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            >
              <Star className="h-3 w-3" />
              Premium
            </motion.div>
          )}
          {product.isOrganic && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            >
              <Leaf className="h-3 w-3" />
              Organic
            </motion.div>
          )}
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            onClick={() => onToggleFavorite(product)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart 
              className={`h-5 w-5 transition-colors duration-200 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
              }`} 
            />
          </motion.button>
        )}

        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Image Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <div className="flex gap-3">
                <motion.button
                  onClick={() => onViewDetails(product)}
                  className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="h-5 w-5 text-gray-700" />
                </motion.button>
                {onAddToCart && (
                  <motion.button
                    onClick={() => onAddToCart(product)}
                    className="bg-emerald-500 p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Availability Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className={`${getAvailabilityColor(product.availability)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              {getAvailabilityText(product.availability)}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Category and Rating */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Key Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 + idx * 0.05 }}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {feature}
                </motion.span>
              ))}
              {product.features.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{product.features.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>Origin:</span>
              </div>
              <span className="font-medium">{product.origin}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4 text-emerald-500" />
                <span>Min Order:</span>
              </div>
              <span className="font-medium">{product.minOrderQuantity}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-emerald-500" />
                <span>Season:</span>
              </div>
              <span className="font-medium">{product.seasons.slice(0, 2).join(", ")}</span>
            </div>
          </div>

          {/* Price */}
          {product.price && (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-emerald-600">
                  ${product.price.min}
                </span>
                {product.price.min !== product.price.max && (
                  <>
                    <span className="text-gray-400">-</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${product.price.max}
                    </span>
                  </>
                )}
                <span className="text-sm text-gray-500">/kg</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => onViewDetails(product)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              View Details
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Button>
            
            {onAddToCart && (
              <Button
                variant="outline"
                onClick={() => onAddToCart(product)}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                disabled={product.availability === 'out-of-stock'}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 mb-2">
                <Award className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-gray-700">Certifications:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.certifications.slice(0, 3).map((cert, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded"
                  >
                    {cert}
                  </span>
                ))}
                {product.certifications.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{product.certifications.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
