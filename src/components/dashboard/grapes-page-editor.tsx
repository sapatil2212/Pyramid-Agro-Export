"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { SuccessModal } from "@/components/ui/success-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Edit, 
  Upload, 
  X, 
  Save, 
  XCircle,
  Image as ImageIcon,
  Package,
  ArrowRight,
  Star,
  CheckCircle,
  Leaf,
  Truck,
  Shield,
  Plus,
  Trash2,
  Heart,
  Award,
  Zap,
  Globe,
  Clock,
  Users,
  Target,
  Lock,
  TrendingUp,
  Sparkles
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { motion } from "framer-motion"

// Feature Card Form Component
interface FeatureCardFormProps {
  feature: { icon: string; title: string; description: string }
  onSave: (feature: { icon: string; title: string; description: string }) => void
  onCancel: () => void
  iconMap: Record<string, React.ComponentType<{ className?: string }>>
}

function FeatureCardForm({ feature, onSave, onCancel, iconMap }: FeatureCardFormProps) {
  const [formData, setFormData] = useState(feature)

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="space-y-3">
      {/* Icon Selection Dropdown */}
      <div>
        <Label htmlFor="featureIcon" className="text-sm font-medium text-gray-700 mb-1 block">
          Icon
        </Label>
        <select
          id="featureIcon"
          value={formData.icon}
          onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {Object.keys(iconMap).map(iconName => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>
      </div>

      {/* Title Field */}
      <div>
        <Label htmlFor="featureTitle" className="text-sm font-medium text-gray-700 mb-1 block">
          Feature Title
        </Label>
        <Input
          id="featureTitle"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter feature title"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Description Field */}
      <div>
        <Label htmlFor="featureDescription" className="text-sm font-medium text-gray-700 mb-1 block">
          Feature Description
        </Label>
        <Textarea
          id="featureDescription"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter feature description"
          rows={2}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="px-3 py-1.5 text-sm"
        >
          Cancel
        </Button>
        <Button 
          type="button"
          onClick={handleSave} 
          className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-sm"
        >
          <Save className="h-4 w-4 mr-1" />
          Save Feature
        </Button>
      </div>
    </div>
  )
}

interface GrapesPageData {
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
  features?: Array<{
    icon: string
    title: string
    description: string
  }>
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  tableTitle?: string
  tableDescription?: string
  tableVarieties?: string
  tableNutrition?: string
  tableSeasons?: string
  tableStorage?: string
  tableAdvantages?: string
  tableSpecs?: string
}

interface GrapesPageEditorProps {
  data: GrapesPageData
  onSave: (data: GrapesPageData) => void
  onCancel: () => void
  loading?: boolean
}

export function GrapesPageEditor({ data, onSave, onCancel, loading = false }: GrapesPageEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState<'hero' | 'features' | 'cta' | null>(null)
  const [editingFeatureCard, setEditingFeatureCard] = useState<number | null>(null)
  const [formData, setFormData] = useState<GrapesPageData>(data)
  const [imagePreview, setImagePreview] = useState<string | null>(data.heroImageUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Icon mapping for feature cards
  const iconMap = {
    Star,
    CheckCircle,
    Leaf,
    Truck,
    Shield,
    Package,
    Heart,
    Award,
    Zap,
    Globe,
    Clock,
    Users,
    Target,
    Lock,
    TrendingUp,
    Sparkles
  }

  // Default feature cards
  const defaultFeatures = [
    {
      icon: "Star",
      title: "Premium Quality",
      description: "Hand-picked from finest vineyards"
    },
    {
      icon: "CheckCircle",
      title: "International Standards",
      description: "Meets all quality standards"
    },
    {
      icon: "Leaf",
      title: "Fresh & Natural",
      description: "100% natural, no preservatives"
    },
    {
      icon: "Truck",
      title: "Fast Delivery",
      description: "Quick worldwide delivery"
    },
    {
      icon: "Shield",
      title: "Quality Assurance",
      description: "Rigorous quality checks"
    }
  ]

  // Initialize features if not provided
  const [features, setFeatures] = useState(data.features || defaultFeatures)
  

  // Update form data when props change
  useEffect(() => {
    setFormData(data)
    setImagePreview(data.heroImageUrl || null)
    // Update features from data if available
    if (data.features && data.features.length > 0) {
      setFeatures(data.features)
    }
    
    // Parse table data
  }, [data])

  // Update image preview when form data changes
  useEffect(() => {
    setImagePreview(formData.heroImageUrl || null)
  }, [formData.heroImageUrl])

  const handleInputChange = (field: keyof GrapesPageData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      formData.append('folder', 'products/hero')

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        const imageUrl = result.url
        setFormData(prev => ({ ...prev, heroImageUrl: imageUrl }))
        setImagePreview(imageUrl)
        toast.success('Image uploaded successfully')
        // Auto-save the updated data
        const updatedData = { ...formData, heroImageUrl: imageUrl }
        onSave(updatedData)
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

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, heroImageUrl: '' }))
    setImagePreview(null)
  }

  // Feature card management functions
  const handleAddFeature = () => {
    const newFeature = {
      icon: "Star",
      title: "New Feature",
      description: "Feature description"
    }
    setFeatures(prev => [...prev, newFeature])
    setEditingFeatureCard(features.length)
  }

  const handleEditFeature = (index: number) => {
    setEditingFeatureCard(index)
  }

  const handleDeleteFeature = async (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures)
    if (editingFeatureCard === index) {
      setEditingFeatureCard(null)
    }
    // Save updated features to API
    await saveFeaturesToAPI(newFeatures)
  }

  const handleUpdateFeature = (index: number, updatedFeature: { icon: string; title: string; description: string }) => {
    setFeatures(prev => prev.map((feature, i) => i === index ? updatedFeature : feature))
    setEditingFeatureCard(null)
  }

  const handleSaveFeatures = async () => {
    try {
      const featuresData = {
        featuresTitle: formData.featuresTitle,
        featuresSubtitle: formData.featuresSubtitle,
        features: features
      }
      
      onSave(featuresData)
      setEditingSection(null)
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Error saving features:', error)
      toast.error('Failed to save features')
    }
  }

  // Save features data directly to API (for individual card edits)
  const saveFeaturesToAPI = async (featuresToSave: Array<{ icon: string; title: string; description: string }>) => {
    try {
      const featuresData = {
        featuresTitle: formData.featuresTitle,
        featuresSubtitle: formData.featuresSubtitle,
        features: featuresToSave
      }
      
      // Update form data with new features
      setFormData(prev => ({
        ...prev,
        features: featuresToSave
      }))
      
      onSave(featuresData)
      toast.success('Feature updated successfully!')
    } catch (error) {
      console.error('Error saving features:', error)
      toast.error('Failed to save feature')
    }
  }

  const handleSave = async () => {
    try {
      // Save hero section data to the parent form
      onSave(formData)
      setIsEditing(false)
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Error saving hero section:', error)
      toast.error('Failed to save hero section')
    }
  }


  const handleCancel = () => {
    setFormData(data)
    setImagePreview(data.heroImageUrl || null)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section Editor */}
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
              <p className="text-sm text-gray-600">Edit the main hero section of the grapes page</p>
            </div>
            {!isEditing && (
              <Button
                onClick={handleEdit}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Hero Section
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              {/* Text Content - Left Side */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Text Content</h4>
                  
                  <div>
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input
                      id="heroTitle"
                      value={formData.heroTitle || ''}
                      onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                      placeholder="e.g., Premium Quality Grapes"
                    />
                  </div>

                  <div>
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Input
                      id="heroSubtitle"
                      value={formData.heroSubtitle || ''}
                      onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                      placeholder="e.g., From India's Premier Vineyards"
                    />
                  </div>

                  <div>
                    <Label htmlFor="heroDescription">Hero Description</Label>
                    <Textarea
                      id="heroDescription"
                      value={formData.heroDescription || ''}
                      onChange={(e) => handleInputChange('heroDescription', e.target.value)}
                      rows={6}
                      placeholder="Describe the grapes and their benefits..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heroButtonText">Primary Button Text</Label>
                      <Input
                        id="heroButtonText"
                        value={formData.heroButtonText || ''}
                        onChange={(e) => handleInputChange('heroButtonText', e.target.value)}
                        placeholder="e.g., Get Quote"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroButtonLink">Primary Button Link</Label>
                      <Input
                        id="heroButtonLink"
                        value={formData.heroButtonLink || ''}
                        onChange={(e) => handleInputChange('heroButtonLink', e.target.value)}
                        placeholder="e.g., /contact"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heroButton2Text">Secondary Button Text</Label>
                      <Input
                        id="heroButton2Text"
                        value={formData.heroButton2Text || ''}
                        onChange={(e) => handleInputChange('heroButton2Text', e.target.value)}
                        placeholder="e.g., Learn More"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroButton2Link">Secondary Button Link</Label>
                      <Input
                        id="heroButton2Link"
                        value={formData.heroButton2Link || ''}
                        onChange={(e) => handleInputChange('heroButton2Link', e.target.value)}
                        placeholder="e.g., #features"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Content - Right Side */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Hero Image</h4>
                  
                  <div className="space-y-4">
                    {/* Image Preview */}
                    <div className="relative">
                      <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={imagePreview}
                              alt="Hero preview"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const placeholder = target.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center"
                              style={{ display: 'none' }}
                            >
                              <ImageIcon className="h-12 w-12 text-gray-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No image selected</p>
                          </div>
                        )}
                      </div>
                      
                      {imagePreview && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="imageUpload">Upload New Image</Label>
                      <div className="flex gap-2">
                        <Input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, WebP. Max size: 5MB
                      </p>
                      {isUploading && (
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          Uploading...
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Hero Section'}
                </Button>
              </div>
            </div>
          ) : (
            /* Preview Mode - Matches Frontend Design */
            <div className="bg-white rounded-lg border">
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-4 items-center">
                  {/* Text Preview - Left Side */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                  >
                    <h1 className="text-xl md:text-4xl font-bold text-gray-900">
                      {formData.heroTitle || "Premium Quality Grapes"}
                      {formData.heroSubtitle && (
                        <span className="text-emerald-600"> {formData.heroSubtitle}</span>
                      )}
                    </h1>
                    <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-relaxed">
                      {formData.heroDescription ? (
                        <div dangerouslySetInnerHTML={{ __html: formData.heroDescription.replace(/\n/g, '<br />') }} />
                      ) : (
                        <>
                          <p>
                            Experience the finest grapes from India&apos;s premier vineyards. 
                            Our premium quality grapes are carefully selected, packed, 
                            and exported to meet the highest international standards.
                          </p>
                          <p>
                            From Nashik, the grape capital of India, we bring you world-class grapes 
                            known for their natural sweetness, crunchy texture, and rich antioxidant content.
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      {formData.heroButtonText && (
                        <Button
                          size="lg"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
                        >
                          {formData.heroButtonText}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      )}
                      {formData.heroButton2Text && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
                        >
                          {formData.heroButton2Text}
                        </Button>
                      )}
                      {!formData.heroButtonText && !formData.heroButton2Text && (
                        <>
                          <Button
                            size="lg"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
                          >
                            Get Quote
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
                          >
                            Learn More
                          </Button>
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* Image Preview - Right Side */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <div className="relative max-w-lg mx-auto">
                      <Image
                        src={formData.heroImageUrl || "/products/grapes-2.png"}
                        alt={formData.heroTitle || "Premium Grapes"}
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
                          <p className="text-lg font-semibold">{formData.heroTitle || "Premium Grapes"}</p>
                          <p className="text-sm">Export Quality</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Features Section Editor */}
      <Card className="overflow-hidden">
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Features Section</h3>
                <p className="text-sm text-gray-600">Edit the &quot;Why Choose Our Grapes?&quot; section</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleAddFeature}
                >
                  <Plus className="h-4 w-4" />
                  Add Feature
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setEditingSection('features')}
                >
                  <Edit className="h-4 w-4" />
                  Edit Section
                </Button>
              </div>
            </div>

          {/* Features Editing Form */}
          {editingSection === 'features' ? (
            <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="featuresTitle">Section Title</Label>
                  <Input
                    id="featuresTitle"
                    value={formData.featuresTitle || "Why Choose Our Grapes?"}
                    onChange={(e) => handleInputChange('featuresTitle', e.target.value)}
                    placeholder="Enter section title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="featuresSubtitle">Section Description</Label>
                  <Textarea
                    id="featuresSubtitle"
                    value={formData.featuresSubtitle || "Premium quality grapes with exceptional taste and freshness"}
                    onChange={(e) => handleInputChange('featuresSubtitle', e.target.value)}
                    placeholder="Enter section description"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setEditingSection(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveFeatures}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Features
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Features Preview */
            <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {formData.featuresTitle || "Why Choose Our Grapes?"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                {formData.featuresSubtitle || "Premium quality grapes with exceptional taste and freshness"}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {features.map((feature, index) => (
                <div
                  key={`${feature.title}-${index}`}
                  className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 min-w-[200px] flex-1 max-w-[250px] relative"
                >
                  {/* Edit/Delete buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={() => handleEditFeature(index)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteFeature(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                      {(() => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Star
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
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Individual Feature Card Editing Modal */}
          <Dialog open={editingFeatureCard !== null} onOpenChange={() => setEditingFeatureCard(null)}>
            <DialogContent className="sm:max-w-md max-h-[70vh] overflow-y-auto">
              <DialogHeader className="pb-2">
                <DialogTitle className="text-base font-semibold text-gray-900">
                  {editingFeatureCard === features.length ? 'Add New Feature' : 'Edit Feature'}
                </DialogTitle>
                <p className="text-xs text-gray-500 mt-1">
                  {editingFeatureCard === features.length ? 'Add a new feature to showcase your product benefits' : 'Update feature details'}
                </p>
              </DialogHeader>
              <FeatureCardForm
                feature={editingFeatureCard !== null ? (features[editingFeatureCard] || { icon: "Star", title: "", description: "" }) : { icon: "Star", title: "", description: "" }}
                onSave={async (updatedFeature) => {
                  if (editingFeatureCard !== null) {
                    if (editingFeatureCard === features.length) {
                      // Adding new feature
                      const newFeatures = [...features, updatedFeature]
                      setFeatures(newFeatures)
                      // Save features data to API
                      await saveFeaturesToAPI(newFeatures)
                    } else {
                      // Updating existing feature
                      const newFeatures = features.map((feature, i) => i === editingFeatureCard ? updatedFeature : feature)
                      setFeatures(newFeatures)
                      // Save features data to API
                      await saveFeaturesToAPI(newFeatures)
                    }
                  }
                  setEditingFeatureCard(null)
                }}
                onCancel={() => setEditingFeatureCard(null)}
                iconMap={iconMap}
              />
            </DialogContent>
          </Dialog>
        </div>
      </Card>



      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Hero Section Updated!"
        message="Your changes have been saved successfully."
      />
    </div>
  )
}
