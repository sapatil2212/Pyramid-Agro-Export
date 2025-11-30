"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { 
  Edit, 
  Upload, 
  X, 
  Eye, 
  Save, 
  XCircle,
  Image as ImageIcon,
  Package
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface HeroSectionData {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroImageUrl?: string
  heroButtonText?: string
  heroButtonLink?: string
  heroButton2Text?: string
  heroButton2Link?: string
}

interface HeroSectionEditorProps {
  data: HeroSectionData
  onSave: (data: HeroSectionData) => void
  onCancel: () => void
  loading?: boolean
}

export function HeroSectionEditor({ data, onSave, onCancel, loading = false }: HeroSectionEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<HeroSectionData>(data)
  const [imagePreview, setImagePreview] = useState<string | null>(data.heroImageUrl || null)
  const [isUploading, setIsUploading] = useState(false)

  const handleInputChange = (field: keyof HeroSectionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
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

  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
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
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
            <p className="text-sm text-gray-600">Edit the hero section content for this product page</p>
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
                    rows={4}
                    placeholder="Describe the product and its benefits..."
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
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isUploading}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {isUploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, WebP. Max size: 5MB
                    </p>
                  </div>

                  {/* Image URL Input */}
                  <div>
                    <Label htmlFor="heroImageUrl">Or enter image URL</Label>
                    <Input
                      id="heroImageUrl"
                      value={formData.heroImageUrl || ''}
                      onChange={(e) => {
                        handleInputChange('heroImageUrl', e.target.value)
                        setImagePreview(e.target.value)
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
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
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Text Preview - Left Side */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-gray-900">
                  {data.heroTitle || 'Hero Title'}
                </h4>
                {data.heroSubtitle && (
                  <p className="text-emerald-600 font-medium">
                    {data.heroSubtitle}
                  </p>
                )}
                {data.heroDescription && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {data.heroDescription}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {data.heroButtonText && (
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {data.heroButtonText}
                  </Button>
                )}
                {data.heroButton2Text && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    {data.heroButton2Text}
                  </Button>
                )}
              </div>
            </div>

            {/* Image Preview - Right Side */}
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-lg border flex items-center justify-center">
                {data.heroImageUrl ? (
                  <Image
                    src={data.heroImageUrl}
                    alt="Hero preview"
                    width={400}
                    height={300}
                    className="object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center"
                  style={{ display: data.heroImageUrl ? 'none' : 'flex' }}
                >
                  <div className="text-center text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">No hero image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
