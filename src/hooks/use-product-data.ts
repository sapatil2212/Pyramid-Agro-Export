import { useState, useEffect, useCallback } from 'react'

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  imageUrl?: string
  images?: string[]
  category: {
    id: string
    name: string
    slug: string
    color?: string
  }
  // Hero section fields
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroImageUrl?: string
  heroButtonText?: string
  heroButtonLink?: string
  heroButton2Text?: string
  heroButton2Link?: string
  // Features section fields
  featuresTitle?: string
  featuresSubtitle?: string
  features?: Array<{
    icon: string
    title: string
    description: string
  }>
  // CTA section fields
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  // Table fields
  tableTitle?: string
  tableDescription?: string
  tableVarieties?: string
  tableSpecs?: string
  tableAdvantages?: string
}

export function useProductData(slug: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError(null)
      
      // Add cache busting to ensure fresh data
      const timestamp = forceRefresh ? Date.now() : Math.floor(Date.now() / 30000) * 30000 // Refresh every 30 seconds
      const response = await fetch(`/api/products?slug=${slug}&t=${timestamp}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.products && data.products.length > 0) {
        const productData = data.products[0]
        
        // Parse features if it's a string
        if (productData.features && typeof productData.features === 'string') {
          try {
            productData.features = JSON.parse(productData.features)
          } catch (e) {
            console.error('Error parsing features:', e)
            productData.features = []
          }
        }
        
        setProduct(productData)
      } else {
        setError('Product not found')
      }
    } catch (err) {
      console.error("Error fetching product:", err)
      setError(err instanceof Error ? err.message : 'Failed to fetch product')
    } finally {
      setLoading(false)
    }
  }, [slug])

  // Initial fetch
  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  // Auto-refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchProduct(true) // Force refresh when page becomes visible
      }
    }

    const handleFocus = () => {
      fetchProduct(true) // Force refresh when window gains focus
    }

    // Refresh every 2 minutes when page is visible
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchProduct(true)
      }
    }, 120000) // 2 minutes

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      clearInterval(interval)
    }
  }, [fetchProduct])

  return {
    product,
    loading,
    error,
    refetch: () => fetchProduct(true)
  }
}
