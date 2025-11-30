"use client"

import { useState, useEffect } from "react"

interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  isActive: boolean
  products: {
    id: string
    name: string
    slug: string
    isActive: boolean
  }[]
}

interface NavigationItem {
  name: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: Array<{ id?: string; name: string; href?: string; description?: string; hasSubDropdown?: boolean; subItems?: Array<{ id: string; name: string; href: string }> }>
}

export function useNavigation() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/product-categories")
        const data = await response.json()
        
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error("Invalid data format received from API:", data)
          setCategories([])
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const getNavigationItems = (): NavigationItem[] => {
    // Ensure categories is always an array
    const safeCategories = Array.isArray(categories) ? categories : []
    
    const baseNavigation = [
      { name: "Home", href: "/" },
      { 
        name: "About Us", 
        href: "/about",
        hasDropdown: false
      },
      { 
        name: "Our Products", 
        href: "/products",
        hasDropdown: true,
        dropdownItems: safeCategories
          .filter(category => category.isActive)
          .map(category => ({
            id: category.id,
            name: category.name,
            description: category.description,
            hasSubDropdown: Array.isArray(category.products) && category.products.length > 0,
            subItems: Array.isArray(category.products) 
              ? category.products
                  .filter(product => product.isActive)
                  .map(product => ({
                    id: product.id,
                    name: product.name,
                    href: `/products/${product.slug}`
                  }))
              : []
          }))
      },
      { name: "Contact", href: "/contact", hasDropdown: false }
    ]

    return baseNavigation
  }

  return {
    categories,
    loading,
    navigationItems: getNavigationItems()
  }
}
