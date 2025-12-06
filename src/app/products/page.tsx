"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  ArrowRight, 
  Star,
  Package
} from "lucide-react"
import { useState, useEffect } from "react"

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  imageUrl?: string
  images?: string[]
  heroImageUrl?: string | null
  heroDescription?: string | null
  category: {
    id: string
    name: string
    slug: string
    color?: string
  }
  isFeatured: boolean
  isOrganic: boolean
  isPremium: boolean
  isActive: boolean
  rating?: number
  reviews: number
  availability: string
  features?: string[]
  price?: {
    min: number
    max: number
    currency: string
  }
  updatedAt?: string
}

interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  color?: string
  isActive: boolean
  _count: {
    products: number
  }
}

// Product Card Component - Compact Vertical Layout
function ProductCard({ product, index }: { product: Product; index: number }) {
  const handleViewDetails = () => {
    window.location.href = `/products/${product.slug}`
  }

  // Get the best available image
  const imageUrl = product.imageUrl || product.heroImageUrl || (product.images && product.images[0])
  const cacheBuster = product.updatedAt ? `?t=${new Date(product.updatedAt).getTime()}` : ''

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
          className="placeholder absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center"
          style={{ display: imageUrl ? 'none' : 'flex' }}
        >
          <div className="text-center text-gray-600">
            <Package className="h-10 w-10 mx-auto mb-2 text-emerald-500" />
            <p className="text-sm font-medium">{product.name}</p>
          </div>
        </div>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.isFeatured && (
            <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
              <Star className="h-2.5 w-2.5" />
              Featured
            </div>
          )}
          {product.isPremium && (
            <div className="bg-amber-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
              Premium
            </div>
          )}
          {product.isOrganic && (
            <div className="bg-green-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
              Organic
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center gap-1.5 mb-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: product.category?.color || '#10b981' }}
          />
          <span className="text-xs text-gray-500">{product.category?.name || 'Uncategorized'}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.shortDescription || product.description || product.heroDescription || 'Premium quality agricultural product for export.'}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleViewDetails}
            size="sm"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 group"
          >
            View Details
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => window.location.href = '/contact'}
            size="sm"
            variant="outline"
            className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-xs h-8 group"
          >
            Get Quote
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}


// Default categories for fallback
const defaultCategories: ProductCategory[] = [
  {
    id: "fresh-fruits",
    name: "Fresh Fruits",
    slug: "fresh-fruits",
    description: "Premium quality fresh fruits from Indian farms",
    color: "#10b981",
    isActive: true,
    _count: { products: 0 }
  },
  {
    id: "fresh-vegetables", 
    name: "Fresh Vegetables",
    slug: "fresh-vegetables",
    description: "Farm-fresh vegetables with international standards",
    color: "#3b82f6",
    isActive: true,
    _count: { products: 0 }
  },
  {
    id: "grains-spices",
    name: "Grains & Spices",
    slug: "grains-spices", 
    description: "Premium grains and authentic Indian spices",
    color: "#f59e0b",
    isActive: true,
    _count: { products: 0 }
  }
]

// Default products for fallback
const defaultProducts: Product[] = [
  {
    id: "sample-grapes",
    name: "Fresh Grapes",
    slug: "fresh-grapes",
    description: "Premium quality Nashik grapes with natural sweetness and crunchy texture",
    shortDescription: "Premium quality Nashik grapes with natural sweetness",
    imageUrl: "/products/grapes-2.png",
    category: {
      id: "fresh-fruits",
      name: "Fresh Fruits",
      slug: "fresh-fruits",
      color: "#10b981"
    },
    isFeatured: true,
    isOrganic: false,
    isPremium: true,
    isActive: true,
    rating: 4.8,
    reviews: 156,
    availability: "in-stock",
    features: ["Natural Sweetness", "Long Shelf Life", "Export Grade", "Premium Quality"],
    price: { min: 120, max: 180, currency: "USD" }
  },
  {
    id: "sample-onions",
    name: "Nashik Onions",
    slug: "nashik-onions",
    description: "Red and pink onions with strong flavor, firm texture and uniform grading",
    shortDescription: "Red and pink onions with strong flavor",
    imageUrl: "/products/onion.png",
    category: {
      id: "fresh-vegetables",
      name: "Fresh Vegetables", 
      slug: "fresh-vegetables",
      color: "#3b82f6"
    },
    isFeatured: true,
    isOrganic: false,
    isPremium: false,
    isActive: true,
    rating: 4.6,
    reviews: 89,
    availability: "in-stock",
    features: ["Strong Flavor", "Year-round Available", "Extended Shelf Life", "Uniform Grading"],
    price: { min: 0.8, max: 1.2, currency: "USD" }
  }
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [categories, setCategories] = useState<ProductCategory[]>(defaultCategories)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/product-categories")
        ])
        
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()
        
        console.log("Products data:", productsData)
        console.log("Categories data:", categoriesData)
        
        setProducts(Array.isArray(productsData.products) && productsData.products.length > 0 ? productsData.products : defaultProducts)
        setCategories(Array.isArray(categoriesData) && categoriesData.length > 0 ? categoriesData : defaultCategories)
      } catch (error) {
        console.error("Error fetching data:", error)
        setProducts(defaultProducts)
        setCategories(defaultCategories)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category.id === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (product.shortDescription && product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-24">
      {/* Products Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* Header with Title and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                All Products
              </h1>
              <p className="text-gray-600 text-sm">
                {loading ? "Loading..." : `${filteredProducts.length} products available`}
              </p>
            </div>
            
            {/* Search and Category Filter - Side by Side */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
              
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
              >
                <option value="all">All Categories</option>
                {Array.isArray(categories) && categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <>
              {/* Products Grid - 3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
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
            </>
          )}
        </div>
      </section>
    </div>
  )
}