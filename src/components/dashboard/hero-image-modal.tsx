"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X, Save, Upload, Trash2, CheckCircle } from "lucide-react";
import Image from "next/image";

interface HeroImage {
  id: string;
  imageUrl: string;
  altText?: string;
  title?: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HeroImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: HeroImage | null;
  onSave: (image: HeroImage) => void;
  onDelete?: (imageId: string) => void;
  onAdd?: (image: Omit<HeroImage, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function HeroImageModal({ isOpen, onClose, image, onSave, onDelete, onAdd }: HeroImageModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    altText: '',
    isActive: true,
    imageUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (image) {
      setFormData({
        title: image.title || '',
        subtitle: image.subtitle || '',
        altText: image.altText || '',
        isActive: image.isActive,
        imageUrl: image.imageUrl || ''
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        altText: '',
        isActive: true,
        imageUrl: ''
      });
    }
  }, [image]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // Update the image URL in the form
        setFormData(prev => ({
          ...prev,
          imageUrl: data.imageUrl
        }));
      } else {
        throw new Error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (image) {
        // Editing existing image
        const updatedImage = {
          ...image,
          ...formData
        };

        const response = await fetch(`/api/hero-images/${image.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedImage)
        });

        if (response.ok) {
          onSave(updatedImage);
          onClose();
        } else {
          throw new Error('Failed to save image');
        }
      } else if (onAdd) {
        // Adding new image
        const newImage = {
          ...formData,
          order: 0
        };

        const response = await fetch('/api/hero-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newImage)
        });

        if (response.ok) {
          const savedImage = await response.json();
          onAdd(savedImage);
          onClose();
        } else {
          throw new Error('Failed to add image');
        }
      }
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!image || !onDelete) return;

    if (confirm('Are you sure you want to delete this image?')) {
      await onDelete(image.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {image ? 'Edit Hero Image' : 'Add New Hero Image'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {image ? 'Update image content and settings' : 'Add a new hero image with title and content'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Image Upload/Display */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-600">
              {image ? 'Current Image' : 'Upload Image'}
            </label>
            <div className="relative group">
              {formData.imageUrl ? (
                <Image
                  src={formData.imageUrl}
                  alt={formData.altText || 'Hero image'}
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover rounded-xl border border-gray-200"
                />
              ) : (
                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No image selected</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-200 flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  id="image-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="image-upload"
                  className="opacity-0 group-hover:opacity-100 inline-flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg text-xs font-medium text-gray-700 hover:bg-white cursor-pointer transition-all duration-200"
                >
                  {uploading ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : (
                    <Upload className="h-3.5 w-3.5 mr-2" />
                  )}
                  {uploading ? 'Uploading...' : (formData.imageUrl ? 'Change Image' : 'Upload Image')}
                </label>
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center space-y-2">
                    <LoadingSpinner size="lg" />
                    <p className="text-sm font-medium text-gray-700">Uploading image...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Image Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter image title"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Image Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter image subtitle"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-600">
              Alt Text (for accessibility)
            </label>
            <input
              type="text"
              value={formData.altText}
              onChange={(e) => handleInputChange('altText', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Enter alt text for accessibility"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-700">
                Image Status
              </span>
              <button
                type="button"
                onClick={() => handleInputChange('isActive', !formData.isActive)}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                  formData.isActive
                    ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex space-x-2">
            {onDelete && image && (
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 text-xs px-3 py-1.5"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs px-3 py-1.5 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-1.5 shadow-sm"
            >
              {saving ? (
                <LoadingSpinner size="sm" className="mr-1" />
              ) : (
                <Save className="h-3 w-3 mr-1" />
              )}
              {saving ? 'Saving...' : (image ? 'Save Changes' : 'Add Image')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
