"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
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
  Sparkles,
  Edit,
  Trash2,
  Plus,
  Save,
  X
} from "lucide-react"

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesSectionData {
  featuresTitle?: string
  featuresSubtitle?: string
  features?: Feature[]
}

interface FeaturesSectionEditorProps {
  data: FeaturesSectionData
  onSave: (data: FeaturesSectionData) => void
  onCancel: () => void
  loading?: boolean
}

export function FeaturesSectionEditor({ data, onSave, onCancel, loading = false }: FeaturesSectionEditorProps) {
  const [editingSection, setEditingSection] = useState<'features' | null>(null)
  const [editingFeatureCard, setEditingFeatureCard] = useState<number | null>(null)
  const [formData, setFormData] = useState<FeaturesSectionData>(data)
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
  const defaultFeatures: Feature[] = [
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
  const [features, setFeatures] = useState<Feature[]>(data.features || defaultFeatures)

  // Update form data when props change
  useEffect(() => {
    setFormData(data)
    // Update features from data if available
    if (data.features && data.features.length > 0) {
      setFeatures(data.features)
    }
  }, [data])

  const handleInputChange = (field: keyof FeaturesSectionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveFeatures = async () => {
    const featuresData = {
      ...formData,
      features
    }
    
    try {
      await onSave(featuresData)
      setEditingSection(null)
      setShowSuccessModal(true)
      setTimeout(() => setShowSuccessModal(false), 2000)
    } catch (error) {
      console.error('Error saving features:', error)
    }
  }

  const handleAddFeature = () => {
    const newFeature: Feature = {
      icon: "Star",
      title: "",
      description: ""
    }
    setFeatures(prev => [...prev, newFeature])
    setEditingFeatureCard(features.length)
  }

  const handleEditFeature = (index: number) => {
    setEditingFeatureCard(index)
  }

  const handleDeleteFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveFeature = (index: number, featureData: Feature) => {
    setFeatures(prev => prev.map((feature, i) => i === index ? featureData : feature))
    setEditingFeatureCard(null)
  }

  const handleCancelFeature = () => {
    setEditingFeatureCard(null)
  }

  return (
    <div className="space-y-6">
      {/* Features Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Features Section</h3>
          <p className="text-sm text-gray-600">Edit the &quot;Why Choose Our Products?&quot; section</p>
        </div>
        <Button
          onClick={() => setEditingSection(editingSection === 'features' ? null : 'features')}
          variant={editingSection === 'features' ? 'outline' : 'default'}
          className={editingSection === 'features' ? '' : 'bg-emerald-600 hover:bg-emerald-700'}
        >
          {editingSection === 'features' ? 'Cancel Edit' : 'Edit Section'}
        </Button>
      </div>

      {/* Features Editing Form */}
      {editingSection === 'features' ? (
        <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="featuresTitle">Section Title</Label>
              <Input
                id="featuresTitle"
                value={formData.featuresTitle || "Why Choose Our Products?"}
                onChange={(e) => handleInputChange('featuresTitle', e.target.value)}
                placeholder="Enter section title"
              />
            </div>
            
            <div>
              <Label htmlFor="featuresSubtitle">Section Description</Label>
              <Textarea
                id="featuresSubtitle"
                value={formData.featuresSubtitle || "Premium quality products with exceptional taste and freshness"}
                onChange={(e) => handleInputChange('featuresSubtitle', e.target.value)}
                placeholder="Enter section description"
                rows={3}
              />
            </div>

            {/* Feature Cards Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-900">Feature Cards</h4>
                <Button
                  onClick={handleAddFeature}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    {editingFeatureCard === index ? (
                      <FeatureCardForm
                        feature={feature}
                        onSave={(featureData) => handleSaveFeature(index, featureData)}
                        onCancel={handleCancelFeature}
                        iconMap={iconMap}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {iconMap[feature.icon as keyof typeof iconMap] && (
                            <div className="text-emerald-600">
                              {React.createElement(iconMap[feature.icon as keyof typeof iconMap], { className: "h-5 w-5" })}
                            </div>
                          )}
                          <div>
                            <h5 className="font-medium text-gray-900">{feature.title}</h5>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditFeature(index)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteFeature(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Features"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Features Preview */
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {formData.featuresTitle || "Why Choose Our Products?"}
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {formData.featuresSubtitle || "Premium quality products with exceptional taste and freshness"}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={`${feature.title}-${index}`}
                className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 min-w-[200px] flex-1 max-w-[250px] relative"
              >
                <div className="flex items-center space-x-3">
                  {iconMap[feature.icon as keyof typeof iconMap] && (
                    <div className="text-emerald-600">
                      {React.createElement(iconMap[feature.icon as keyof typeof iconMap], { className: "h-6 w-6" })}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
              <p className="text-sm text-gray-600">Features section saved successfully!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Feature Card Form Component
interface FeatureCardFormProps {
  feature: Feature
  onSave: (feature: Feature) => void
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
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
      </div>
    </div>
  )
}
