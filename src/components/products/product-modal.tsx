"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Package, 
  Award, 
  Leaf, 
  Heart,
  ShoppingCart,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle,
  Clock,
  Thermometer
} from "lucide-react"
import Image from "next/image"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart?: (product: Product) => void
  onToggleFavorite?: (product: Product) => void
  isFavorite?: boolean
}

export function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}: ProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'nutrition' | 'certifications'>('overview')

  if (!product) return null

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'specifications', label: 'Specifications', icon: Package },
    { id: 'nutrition', label: 'Nutrition', icon: Leaf },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {product.isFeatured && (
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                  {product.isPremium && (
                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Premium
                    </span>
                  )}
                  {product.isOrganic && (
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      Organic
                    </span>
                  )}
                </div>
                <div className={`${getAvailabilityColor(product.availability)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  {getAvailabilityText(product.availability)}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {onToggleFavorite && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(product)}
                    className="p-2"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`} 
                    />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="p-2">
                  <Share2 className="h-5 w-5 text-gray-400" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Download className="h-5 w-5 text-gray-400" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
                  <X className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
              {/* Image Gallery */}
              <div className="lg:w-1/2 p-6">
                <div className="relative aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={product.images[activeImageIndex] || product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={() => setActiveImageIndex((prev) => 
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={() => setActiveImageIndex((prev) => 
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                          activeImageIndex === index 
                            ? 'border-emerald-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-6 overflow-y-auto">
                {/* Product Title */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {product.description}
                  </p>
                  
                  {/* Rating and Reviews */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating!) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  {product.price && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-emerald-600">
                          ${product.price.min}
                        </span>
                        {product.price.min !== product.price.max && (
                          <>
                            <span className="text-gray-400">-</span>
                            <span className="text-3xl font-bold text-emerald-600">
                              ${product.price.max}
                            </span>
                          </>
                        )}
                        <span className="text-lg text-gray-500">/kg</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-500">Origin</p>
                      <p className="font-medium">{product.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-500">Min Order</p>
                      <p className="font-medium">{product.minOrderQuantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-500">Season</p>
                      <p className="font-medium">{product.seasons.slice(0, 2).join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-500">Shelf Life</p>
                      <p className="font-medium">{product.shelfLife}</p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => {
                      const IconComponent = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as 'overview' | 'specifications' | 'nutrition' | 'certifications')}
                          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                            activeTab === tab.id
                              ? 'border-emerald-500 text-emerald-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          {tab.label}
                        </button>
                      )
                    })}
                  </div>

                  {/* Tab Content */}
                  <div className="mt-6">
                    <AnimatePresence mode="wait">
                      {activeTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                              <div className="grid grid-cols-1 gap-2">
                                {product.features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm text-gray-700">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Export Markets</h3>
                              <div className="flex flex-wrap gap-2">
                                {product.exportMarkets.map((market, index) => (
                                  <span
                                    key={index}
                                    className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm"
                                  >
                                    {market}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'specifications' && (
                        <motion.div
                          key="specifications"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="space-y-4">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700">{key}</span>
                                <span className="text-gray-600">{value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'nutrition' && product.nutritionalInfo && (
                        <motion.div
                          key="nutrition"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="space-y-4">
                            {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700">{key}</span>
                                <span className="text-gray-600">{value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'certifications' && (
                        <motion.div
                          key="certifications"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                              <div className="grid grid-cols-1 gap-2">
                                {product.certifications.map((cert, index) => (
                                  <div key={index} className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                                    <Award className="h-5 w-5 text-emerald-500" />
                                    <span className="text-sm font-medium text-emerald-700">{cert}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Storage Conditions</h3>
                              <div className="space-y-2">
                                {product.storageConditions.map((condition, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Thermometer className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm text-gray-700">{condition}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  {onAddToCart && (
                    <Button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={product.availability === 'out-of-stock'}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
