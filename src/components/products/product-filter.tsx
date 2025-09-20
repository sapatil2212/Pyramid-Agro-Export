"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp,
  SlidersHorizontal,
  Star,
  MapPin,
  Calendar,
  Package,
  Award,
  Leaf,
  TrendingUp,
  RotateCcw
} from "lucide-react"

interface ProductFilterProps {
  products: Product[]
  onFilteredProducts: (products: Product[]) => void
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  search: string
  category: string[]
  availability: string[]
  priceRange: { min: number; max: number }
  origin: string[]
  season: string[]
  certifications: string[]
  features: string[]
  isFeatured: boolean | null
  isPremium: boolean | null
  isOrganic: boolean | null
  sortBy: 'name' | 'price' | 'rating' | 'newest'
  sortOrder: 'asc' | 'desc'
}

const initialFilters: FilterState = {
  search: '',
  category: [],
  availability: [],
  priceRange: { min: 0, max: 1000 },
  origin: [],
  season: [],
  certifications: [],
  features: [],
  isFeatured: null,
  isPremium: null,
  isOrganic: null,
  sortBy: 'name',
  sortOrder: 'asc'
}

export function ProductFilter({ products, onFilteredProducts, onFilterChange }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Get unique values for filter options
  const categories = [...new Set(products.map(p => p.category))]
  const origins = [...new Set(products.map(p => p.origin))]
  const seasons = [...new Set(products.flatMap(p => p.seasons))]
  const certifications = [...new Set(products.flatMap(p => p.certifications))]
  const features = [...new Set(products.flatMap(p => p.features))]
  const maxPrice = Math.max(...products.filter(p => p.price).map(p => p.price!.max))

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.origin.toLowerCase().includes(searchLower) ||
        product.features.some(feature => feature.toLowerCase().includes(searchLower))
      )
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => filters.category.includes(product.category))
    }

    // Availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => filters.availability.includes(product.availability))
    }

    // Price range filter
    filtered = filtered.filter(product => {
      if (!product.price) return true
      return product.price.min >= filters.priceRange.min && product.price.max <= filters.priceRange.max
    })

    // Origin filter
    if (filters.origin.length > 0) {
      filtered = filtered.filter(product => filters.origin.includes(product.origin))
    }

    // Season filter
    if (filters.season.length > 0) {
      filtered = filtered.filter(product => 
        product.seasons.some(season => filters.season.includes(season))
      )
    }

    // Certifications filter
    if (filters.certifications.length > 0) {
      filtered = filtered.filter(product =>
        filters.certifications.some(cert => product.certifications.includes(cert))
      )
    }

    // Features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(product =>
        filters.features.some(feature => product.features.includes(feature))
      )
    }

    // Boolean filters
    if (filters.isFeatured !== null) {
      filtered = filtered.filter(product => product.isFeatured === filters.isFeatured)
    }
    if (filters.isPremium !== null) {
      filtered = filtered.filter(product => product.isPremium === filters.isPremium)
    }
    if (filters.isOrganic !== null) {
      filtered = filtered.filter(product => product.isOrganic === filters.isOrganic)
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'price':
          aValue = a.price?.min || 0
          bValue = b.price?.min || 0
          break
        case 'rating':
          aValue = a.rating || 0
          bValue = b.rating || 0
          break
        case 'newest':
          // Assuming newer products have higher IDs or we could add a date field
          aValue = parseInt(a.id.split('-').pop() || '0')
          bValue = parseInt(b.id.split('-').pop() || '0')
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    onFilteredProducts(filtered)
    onFilterChange(filters)
  }, [filters, products, onFilteredProducts, onFilterChange])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [key]: newArray }
    })
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.category.length > 0) count++
    if (filters.availability.length > 0) count++
    if (filters.priceRange.min > 0 || filters.priceRange.max < maxPrice) count++
    if (filters.origin.length > 0) count++
    if (filters.season.length > 0) count++
    if (filters.certifications.length > 0) count++
    if (filters.features.length > 0) count++
    if (filters.isFeatured !== null) count++
    if (filters.isPremium !== null) count++
    if (filters.isOrganic !== null) count++
    return count
  }

  const FilterSection = ({ title, children, filterKey }: { title: string; children: React.ReactNode; filterKey: string }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setActiveFilter(activeFilter === filterKey ? null : filterKey)}
        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-emerald-600 transition-colors"
      >
        <span>{title}</span>
        {activeFilter === filterKey ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      <AnimatePresence>
        {activeFilter === filterKey && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 space-y-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {isExpanded ? 'Collapse' : 'Expand'} All
            </Button>
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Filter Sections */}
        <div className="space-y-4">
          {/* Category Filter */}
          <FilterSection title="Category" filterKey="category">
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() => toggleArrayFilter('category', category)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Availability Filter */}
          <FilterSection title="Availability" filterKey="availability">
            <div className="grid grid-cols-1 gap-2">
              {['in-stock', 'limited', 'out-of-stock'].map((availability) => (
                <label key={availability} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(availability)}
                    onChange={() => toggleArrayFilter('availability', availability)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {availability.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection title="Price Range" filterKey="priceRange">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => updateFilter('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => updateFilter('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="text-xs text-gray-500">
                Range: $0 - ${maxPrice}
              </div>
            </div>
          </FilterSection>

          {/* Origin Filter */}
          <FilterSection title="Origin" filterKey="origin">
            <div className="grid grid-cols-1 gap-2">
              {origins.map((origin) => (
                <label key={origin} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.origin.includes(origin)}
                    onChange={() => toggleArrayFilter('origin', origin)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{origin}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Season Filter */}
          <FilterSection title="Season" filterKey="season">
            <div className="grid grid-cols-2 gap-2">
              {seasons.map((season) => (
                <label key={season} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.season.includes(season)}
                    onChange={() => toggleArrayFilter('season', season)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{season}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Special Features */}
          <FilterSection title="Special Features" filterKey="special">
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.isFeatured === true}
                  onChange={(e) => updateFilter('isFeatured', e.target.checked ? true : null)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Award className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.isPremium === true}
                  onChange={(e) => updateFilter('isPremium', e.target.checked ? true : null)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Star className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-700">Premium</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.isOrganic === true}
                  onChange={(e) => updateFilter('isOrganic', e.target.checked ? true : null)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Leaf className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Organic</span>
              </label>
            </div>
          </FilterSection>

          {/* Sort Options */}
          <FilterSection title="Sort By" filterKey="sort">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3"
                >
                  {filters.sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              </div>
            </div>
          </FilterSection>
        </div>
      </CardContent>
    </Card>
  )
}
