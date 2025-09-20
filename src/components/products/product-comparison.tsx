"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  X, 
  Plus, 
  Star, 
  MapPin, 
  Package, 
  Calendar, 
  Award, 
  Leaf,
  TrendingUp,
  CheckCircle,
  XCircle,
  Minus,
  BarChart3
} from "lucide-react"
import Image from "next/image"

interface ProductComparisonProps {
  products: Product[]
  onClose: () => void
  onAddProduct: (product: Product) => void
  onRemoveProduct: (productId: string) => void
  selectedProducts: Product[]
  maxCompare: number
}

export function ProductComparison({
  products,
  onClose,
  onAddProduct,
  onRemoveProduct,
  selectedProducts,
  maxCompare = 3
}: ProductComparisonProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'pricing' | 'features'>('overview')

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'text-green-600 bg-green-100'
      case 'limited': return 'text-yellow-600 bg-yellow-100'
      case 'out-of-stock': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'In Stock'
      case 'limited': return 'Limited'
      case 'out-of-stock': return 'Out of Stock'
      default: return 'Unknown'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'specifications', label: 'Specifications', icon: Package },
    { id: 'pricing', label: 'Pricing', icon: TrendingUp },
    { id: 'features', label: 'Features', icon: CheckCircle }
  ]

  const renderOverviewComparison = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedProducts.map((product) => (
            <div key={product.id} className="space-y-3">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(product.availability)}`}>
                    {getAvailabilityText(product.availability)}
                  </span>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Metric</th>
                {selectedProducts.map((product) => (
                  <th key={product.id} className="text-center py-3 px-4 font-medium text-gray-700">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">Origin</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center text-sm text-gray-600">
                    {product.origin}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">Min Order</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center text-sm text-gray-600">
                    {product.minOrderQuantity}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">Shelf Life</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center text-sm text-gray-600">
                    {product.shelfLife}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">Certifications</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center text-sm text-gray-600">
                    {product.certifications.length}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderSpecificationsComparison = () => {
    // Get all unique specification keys
    const allSpecs = new Set<string>()
    selectedProducts.forEach(product => {
      Object.keys(product.specifications).forEach(key => allSpecs.add(key))
    })

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Specification</th>
              {selectedProducts.map((product) => (
                <th key={product.id} className="text-center py-3 px-4 font-medium text-gray-700">
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(allSpecs).map((spec) => (
              <tr key={spec} className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">{spec}</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center text-sm text-gray-600">
                    {product.specifications[spec] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderPricingComparison = () => (
    <div className="space-y-6">
      {/* Price Comparison */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedProducts.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                {product.price ? (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-emerald-600">
                      ${product.price.min}
                      {product.price.min !== product.price.max && ` - $${product.price.max}`}
                    </div>
                    <div className="text-sm text-gray-500">per kg</div>
                  </div>
                ) : (
                  <div className="text-lg text-gray-500">Contact for pricing</div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Value Proposition</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Feature</th>
                {selectedProducts.map((product) => (
                  <th key={product.id} className="text-center py-3 px-4 font-medium text-gray-700">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">Premium Quality</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center">
                    {product.isPremium ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">Organic</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center">
                    {product.isOrganic ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-700">Featured</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-center">
                    {product.isFeatured ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderFeaturesComparison = () => (
    <div className="space-y-6">
      {selectedProducts.map((product) => (
        <Card key={product.id} className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">{product.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Key Features</h5>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Export Markets</h5>
              <div className="flex flex-wrap gap-1">
                {product.exportMarkets.map((market, index) => (
                  <span
                    key={index}
                    className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  return (
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
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
            <p className="text-gray-600">Compare {selectedProducts.length} of {maxCompare} products</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Product Selection */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Selected Products</h3>
            <div className="text-sm text-gray-500">
              {selectedProducts.length} / {maxCompare} selected
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedProducts.map((product) => (
              <Card key={product.id} className="p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 p-1"
                  onClick={() => onRemoveProduct(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
              </Card>
            ))}
            
            {selectedProducts.length < maxCompare && (
              <Card className="p-4 border-dashed border-2 border-gray-300">
                <div className="text-center">
                  <Button
                    variant="ghost"
                    className="w-full h-full p-4"
                    onClick={() => {
                      // This would open a product selector modal
                      console.log('Add product to comparison')
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="h-6 w-6 text-gray-400" />
                      <span className="text-sm text-gray-500">Add Product</span>
                    </div>
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
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
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderOverviewComparison()}
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
                {renderSpecificationsComparison()}
              </motion.div>
            )}
            {activeTab === 'pricing' && (
              <motion.div
                key="pricing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderPricingComparison()}
              </motion.div>
            )}
            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderFeaturesComparison()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Compare up to {maxCompare} products at once
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Request Quote
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
