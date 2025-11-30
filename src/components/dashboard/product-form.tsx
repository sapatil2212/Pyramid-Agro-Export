"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { HeroSectionEditor } from "./hero-section-editor"
import { FeaturesSectionEditor } from "./features-section-editor"
import { GrapesPageEditor } from "./grapes-page-editor"
import { NashikGrapesTableManager } from "./nashik-grapes-table-manager"
import { NashikOnionsTableManager } from "./nashik-onions-table-manager"
import { PomegranatesTableManager } from "./pomegranates-table-manager"
import { BananaTableManager } from "./banana-table-manager"
import { GuavaTableManager } from "./guava-table-manager"
import { GreenChillisTableManager } from "./green-chillis-table-manager"
import { TomatoesTableManager } from "./tomatoes-table-manager"
import { PotatoesTableManager } from "./potatoes-table-manager"
import { GarlicsTableManager } from "./garlics-table-manager"
import { RiceTableManager } from "./rice-table-manager"
import { GroundnutsTableManager } from "./groundnuts-table-manager"
import { DryTurmericTableManager } from "./dry-turmeric-table-manager"

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  imageUrl?: string
  images?: string[]
  categoryId: string
  specifications?: Record<string, string>
  origin?: string
  seasons?: string[]
  minOrderQuantity?: string
  packaging?: string[]
  price?: {
    min: number
    max: number
    currency: string
  }
  availability: string
  features?: string[] | Array<{ icon?: string; title?: string; description?: string }>
  nutritionalInfo?: Record<string, string>
  certifications?: string[]
  shelfLife?: string
  storageConditions?: string[]
  exportMarkets?: string[]
  rating?: number
  reviews: number
  isFeatured: boolean
  isOrganic: boolean
  isPremium: boolean
  isActive: boolean
  order: number
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
  // CTA section fields
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  // Nashik Grapes Table fields
  tableTitle?: string
  tableDescription?: string
  tableVarieties?: string
  tableSpecs?: string
  tableAdvantages?: string
}

interface ProductCategory {
  id: string
  name: string
  slug: string
  color?: string
}

interface ProductFormProps {
  product?: Product | null
  categories: ProductCategory[]
  onSave: (productData: Partial<Product> & { name: string; categoryId: string }) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function ProductForm({ product, categories, onSave, onCancel, loading = false }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    imageUrl: "",
    images: [] as string[],
    categoryId: "",
    specifications: {} as Record<string, string>,
    origin: "",
    seasons: [] as string[],
    minOrderQuantity: "",
    packaging: [] as string[],
    price: {
      min: 0,
      max: 0,
      currency: "USD"
    },
    availability: "in-stock",
    features: [] as Array<{ icon?: string; title?: string; description?: string }>,
    nutritionalInfo: {} as Record<string, string>,
    certifications: [] as string[],
    shelfLife: "",
    storageConditions: [] as string[],
    exportMarkets: [] as string[],
    rating: 0,
    reviews: 0,
    isFeatured: false,
    isOrganic: false,
    isPremium: false,
    isActive: true,
    order: 0,
    // Hero section fields
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    heroImageUrl: "",
    heroButtonText: "",
    heroButtonLink: "",
    heroButton2Text: "",
    heroButton2Link: "",
    // Features section fields
    featuresTitle: "",
    featuresSubtitle: "",
    // CTA section fields
    ctaTitle: "",
    ctaDescription: "",
    ctaButtonText: "",
    ctaButtonLink: "",
    // Nashik Grapes Table fields
    tableTitle: "",
    tableDescription: "",
    tableVarieties: "",
    tableSpecs: "",
    tableAdvantages: ""
  })

  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [newSeason, setNewSeason] = useState("")
  const [newPackaging, setNewPackaging] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [newCertification, setNewCertification] = useState("")
  const [newStorageCondition, setNewStorageCondition] = useState("")
  const [newExportMarket, setNewExportMarket] = useState("")
  const [newNutritionKey, setNewNutritionKey] = useState("")
  const [newNutritionValue, setNewNutritionValue] = useState("")
  const [newImage, setNewImage] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        imageUrl: product.imageUrl || "",
        images: product.images || [],
        categoryId: product.categoryId || "",
        specifications: product.specifications || {},
        origin: product.origin || "",
        seasons: product.seasons || [],
        minOrderQuantity: product.minOrderQuantity || "",
        packaging: product.packaging || [],
        price: product.price || { min: 0, max: 0, currency: "USD" },
        availability: product.availability || "in-stock",
        features: product.features ? (typeof product.features === 'string' ? JSON.parse(product.features) : product.features) : [],
        nutritionalInfo: product.nutritionalInfo || {},
        certifications: product.certifications || [],
        shelfLife: product.shelfLife || "",
        storageConditions: product.storageConditions || [],
        exportMarkets: product.exportMarkets || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        isFeatured: product.isFeatured || false,
        isOrganic: product.isOrganic || false,
        isPremium: product.isPremium || false,
        isActive: product.isActive !== undefined ? product.isActive : true,
        order: product.order || 0,
        // Hero section fields
        heroTitle: product.heroTitle || "",
        heroSubtitle: product.heroSubtitle || "",
        heroDescription: product.heroDescription || "",
        heroImageUrl: product.heroImageUrl || "",
        heroButtonText: product.heroButtonText || "",
        heroButtonLink: product.heroButtonLink || "",
        heroButton2Text: product.heroButton2Text || "",
        heroButton2Link: product.heroButton2Link || "",
        // Features section fields
        featuresTitle: product.featuresTitle || "",
        featuresSubtitle: product.featuresSubtitle || "",
        // CTA section fields
        ctaTitle: product.ctaTitle || "",
        ctaDescription: product.ctaDescription || "",
        ctaButtonText: product.ctaButtonText || "",
        ctaButtonLink: product.ctaButtonLink || "",
        // Nashik Grapes Table fields
        tableTitle: product.tableTitle || "",
        tableDescription: product.tableDescription || "",
        tableVarieties: product.tableVarieties || "",
        tableSpecs: product.tableSpecs || "",
        tableAdvantages: product.tableAdvantages || ""
      })
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        imageUrl: "",
        images: [],
        categoryId: "",
        specifications: {},
        origin: "",
        seasons: [],
        minOrderQuantity: "",
        packaging: [],
        price: { min: 0, max: 0, currency: "USD" },
        availability: "in-stock",
        features: [],
        nutritionalInfo: {},
        certifications: [],
        shelfLife: "",
        storageConditions: [],
        exportMarkets: [],
        rating: 0,
        reviews: 0,
        isFeatured: false,
        isOrganic: false,
        isPremium: false,
        isActive: true,
        order: 0,
        // Hero section fields
        heroTitle: "",
        heroSubtitle: "",
        heroDescription: "",
        heroImageUrl: "",
        heroButtonText: "",
        heroButtonLink: "",
        heroButton2Text: "",
        heroButton2Link: "",
        // Features section fields
        featuresTitle: "",
        featuresSubtitle: "",
        // CTA section fields
        ctaTitle: "",
        ctaDescription: "",
        ctaButtonText: "",
        ctaButtonLink: "",
        // Nashik Grapes Table fields
        tableTitle: "",
        tableDescription: "",
        tableVarieties: "",
        tableSpecs: "",
        tableAdvantages: ""
      })
    }
  }, [product])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: !product ? generateSlug(name) : prev.slug
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Don't submit the main form for products with table managers - they use individual section saves
    const productsWithTableManagers = ['grapes', 'onions', 'pomegranates', 'banana', 'guava', 'green-chillis', 'tomatoes', 'potatoes', 'garlics', 'rice', 'groundnuts', 'dry-turmeric']
    if (product?.slug && productsWithTableManagers.includes(product.slug)) {
      console.log('Main form submission prevented for product with table manager - using individual section saves')
      return
    }
    
    try {
      await onSave(formData)
    } catch (error) {
      console.error("Error saving product:", error)
      toast.error("Failed to save product")
    }
  }

  const addArrayItem = (field: string, value: string) => {
    if (!value.trim()) return
    
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), value.trim()]
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return
    
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newSpecKey.trim()]: newSpecValue.trim()
      }
    }))
    setNewSpecKey("")
    setNewSpecValue("")
  }

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return { ...prev, specifications: newSpecs }
    })
  }

  const addNutritionInfo = () => {
    if (!newNutritionKey.trim() || !newNutritionValue.trim()) return
    
    setFormData(prev => ({
      ...prev,
      nutritionalInfo: {
        ...prev.nutritionalInfo,
        [newNutritionKey.trim()]: newNutritionValue.trim()
      }
    }))
    setNewNutritionKey("")
    setNewNutritionValue("")
  }

  const removeNutritionInfo = (key: string) => {
    setFormData(prev => {
      const newNutrition = { ...prev.nutritionalInfo }
      delete newNutrition[key]
      return { ...prev, nutritionalInfo: newNutrition }
    })
  }

  const handleMainImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'products')

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        const imageUrl = result.url
        setFormData(prev => ({ ...prev, imageUrl }))
        toast.success('Main image uploaded successfully')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleAdditionalImagesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Validate all files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select valid image files only')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }
    }

    setIsUploading(true)
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'products')

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          return result.url
        } else {
          throw new Error('Upload failed')
        }
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }))
      toast.success(`${uploadedUrls.length} images uploaded successfully`)
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h2 className="text-xl font-semibold text-gray-900">
          {product?.id ? "Edit Product" : "Add New Product"}
        </h2>
        <div></div> {/* Empty div for spacing */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information - Only show for products without table managers */}
        {product?.slug && !['grapes', 'onions', 'pomegranates', 'banana', 'guava', 'green-chillis', 'tomatoes', 'potatoes', 'garlics', 'rice', 'groundnuts', 'dry-turmeric'].includes(product.slug) && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Images - Only show for products without table managers */}
        {product?.slug && !['grapes', 'onions', 'pomegranates', 'banana', 'guava', 'green-chillis', 'tomatoes', 'potatoes', 'garlics', 'rice', 'groundnuts', 'dry-turmeric'].includes(product.slug) && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Images</h4>
            
            {/* Main Image Upload */}
            <div>
              <Label htmlFor="mainImageUpload">Main Image</Label>
              <div className="mt-2">
                <input
                  id="mainImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={formData.imageUrl} 
                      alt="Main product image" 
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: "" }))}
                      className="mt-2"
                    >
                      Remove Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Additional Images Upload */}
            <div>
              <Label htmlFor="additionalImagesUpload">Additional Images</Label>
              <div className="mt-2">
                <input
                  id="additionalImagesUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Additional image ${index + 1}`} 
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("images", index)}
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing - Only show for products without table managers */}
        {product?.slug && !['grapes', 'onions', 'pomegranates', 'banana', 'guava', 'green-chillis', 'tomatoes', 'potatoes', 'garlics', 'rice', 'groundnuts', 'dry-turmeric'].includes(product.slug) && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Pricing</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="priceMin">Min Price</Label>
              <Input
                id="priceMin"
                type="number"
                value={formData.price.min}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  price: { ...prev.price, min: parseFloat(e.target.value) || 0 }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="priceMax">Max Price</Label>
              <Input
                id="priceMax"
                type="number"
                value={formData.price.max}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  price: { ...prev.price, max: parseFloat(e.target.value) || 0 }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.price.currency}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  price: { ...prev.price, currency: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        )}

        {/* Specifications - Only show for products without table managers */}
        {product?.slug && !['grapes', 'onions', 'pomegranates', 'banana', 'guava', 'green-chillis', 'tomatoes', 'potatoes', 'garlics', 'rice', 'groundnuts', 'dry-turmeric'].includes(product.slug) && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              placeholder="Specification name"
            />
            <Input
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              placeholder="Specification value"
            />
          </div>
          <Button
            type="button"
            onClick={addSpecification}
            disabled={!newSpecKey.trim() || !newSpecValue.trim()}
            size="sm"
          >
            Add Specification
          </Button>
          <div className="space-y-2">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 p-2 border rounded">
                <span className="font-medium">{key}:</span>
                <span className="flex-1">{value}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpecification(key)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Features - Only show for products without table managers */}
        {product?.slug && !['grapes', 'onions', 'pomegranates', 'banana', 'guava', 'green-chillis', 'tomatoes', 'potatoes', 'garlics', 'rice', 'groundnuts', 'dry-turmeric'].includes(product.slug) && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Features</h4>
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add feature"
            />
            <Button
              type="button"
              onClick={() => addArrayItem("features", newFeature)}
              disabled={!newFeature.trim()}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {typeof feature === 'object' && feature.title ? feature.title : String(feature)}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeArrayItem("features", index)}
                />
              </Badge>
            ))}
          </div>
        </div>
        )}

        {/* Page-Specific Editor */}
        {product?.slug === 'grapes' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                features: product.features ? (typeof product.features === 'string' ? JSON.parse(product.features) : product.features) : [],
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                // Update form data
                setFormData(prev => ({
                  ...prev,
                  ...sectionData
                }))
                
                // Save to database immediately
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            
            {/* Nashik Grapes Table Manager */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nashik Grapes Table Management</h3>
              <NashikGrapesTableManager />
            </div>
          </div>
        ) : product?.slug === 'onions' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                // Update form data
                setFormData(prev => ({
                  ...prev,
                  ...sectionData
                }))
                
                // Save to database immediately
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            
            {/* Nashik Onions Table Manager */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nashik Onions Table Management</h3>
              <NashikOnionsTableManager />
            </div>
          </div>
        ) : product?.slug === 'pomegranates' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pomegranates Table Management</h3>
              <PomegranatesTableManager />
            </div>
          </div>
        ) : product?.slug === 'banana' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Green Bananas Table Management</h3>
              <BananaTableManager />
            </div>
          </div>
        ) : product?.slug === 'guava' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guavas Table Management</h3>
              <GuavaTableManager />
            </div>
          </div>
        ) : product?.slug === 'green-chillis' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Green Chilies Table Management</h3>
              <GreenChillisTableManager />
            </div>
          </div>
        ) : product?.slug === 'tomatoes' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tomatoes Table Management</h3>
              <TomatoesTableManager />
            </div>
          </div>
        ) : product?.slug === 'potatoes' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Potatoes Table Management</h3>
              <PotatoesTableManager />
            </div>
          </div>
        ) : product?.slug === 'garlics' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Garlics Table Management</h3>
              <GarlicsTableManager />
            </div>
          </div>
        ) : product?.slug === 'rice' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basmati Rice Table Management</h3>
              <RiceTableManager />
            </div>
          </div>
        ) : product?.slug === 'groundnuts' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Groundnuts Table Management</h3>
              <GroundnutsTableManager />
            </div>
          </div>
        ) : product?.slug === 'dry-turmeric' ? (
          <div className="space-y-4">
            <GrapesPageEditor
              data={{
                heroTitle: formData.heroTitle || product.heroTitle,
                heroSubtitle: formData.heroSubtitle || product.heroSubtitle,
                heroDescription: formData.heroDescription || product.heroDescription,
                heroImageUrl: formData.heroImageUrl || product.heroImageUrl,
                heroButtonText: formData.heroButtonText || product.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product.heroButton2Link,
                featuresTitle: formData.featuresTitle || product.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product.featuresSubtitle,
                ctaTitle: formData.ctaTitle || product.ctaTitle,
                ctaDescription: formData.ctaDescription || product.ctaDescription,
                ctaButtonText: formData.ctaButtonText || product.ctaButtonText,
                ctaButtonLink: formData.ctaButtonLink || product.ctaButtonLink,
                tableTitle: formData.tableTitle || product.tableTitle,
                tableDescription: formData.tableDescription || product.tableDescription,
                tableVarieties: formData.tableVarieties || product.tableVarieties,
                tableSpecs: formData.tableSpecs || product.tableSpecs,
                tableAdvantages: formData.tableAdvantages || product.tableAdvantages,
              }}
              onSave={async (sectionData) => {
                setFormData(prev => ({ ...prev, ...sectionData }))
                try {
                  const response = await fetch(`/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sectionData)
                  })
                  if (response.ok) {
                    toast.success('Section saved successfully!')
                  } else {
                    throw new Error('Failed to save')
                  }
                } catch (error) {
                  console.error('Error saving section:', error)
                  toast.error('Failed to save section')
                }
              }}
              onCancel={() => {}}
              loading={loading}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dry Turmeric Table Management</h3>
              <DryTurmericTableManager />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <HeroSectionEditor
              data={{
                heroTitle: formData.heroTitle || product?.heroTitle,
                heroSubtitle: formData.heroSubtitle || product?.heroSubtitle,
                heroDescription: formData.heroDescription || product?.heroDescription,
                heroImageUrl: formData.heroImageUrl || product?.heroImageUrl,
                heroButtonText: formData.heroButtonText || product?.heroButtonText,
                heroButtonLink: formData.heroButtonLink || product?.heroButtonLink,
                heroButton2Text: formData.heroButton2Text || product?.heroButton2Text,
                heroButton2Link: formData.heroButton2Link || product?.heroButton2Link,
              }}
              onSave={(heroData) => {
                setFormData(prev => ({
                  ...prev,
                  ...heroData
                }))
              }}
              onCancel={() => {}}
              loading={loading}
            />

            {/* Features Section Editor */}
            <FeaturesSectionEditor
              data={{
                featuresTitle: formData.featuresTitle || product?.featuresTitle,
                featuresSubtitle: formData.featuresSubtitle || product?.featuresSubtitle,
                features: product?.features ? (typeof product.features === 'string' ? JSON.parse(product.features) : product.features) : []
              }}
              onSave={(featuresData) => {
                setFormData(prev => ({
                  ...prev,
                  ...featuresData
                }))
              }}
              onCancel={() => {}}
              loading={loading}
            />
          </div>
        )}


        {/* Actions - Only show for non-grapes and non-onions products */}
        {product?.slug !== 'grapes' && product?.slug !== 'onions' && (
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {product?.id ? "Update Product" : "Add Product"}
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
