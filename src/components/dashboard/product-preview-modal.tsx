"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoadingSpinner, DottedLoader } from "@/components/ui/loading-spinner";
import { 
  X, 
  Plus, 
  Trash2, 
  Upload,
  Save,
  Image as ImageIcon,
  CheckCircle
} from "lucide-react";
import Image from "next/image";

interface ProductPreview {
  id: string;
  title: string;
  description?: string;
  benefits?: string[];
  imageUrl: string;
  link: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productPreview?: ProductPreview | null;
  onSave: (productPreview: ProductPreview) => void;
  onDelete?: (id: string) => void;
  onAdd?: (productPreview: ProductPreview) => void;
}

export function ProductPreviewModal({
  isOpen,
  onClose,
  productPreview,
  onSave,
  onDelete,
  onAdd
}: ProductPreviewModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    benefits: [] as string[],
    imageUrl: '',
    link: '',
    order: 0,
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newBenefit, setNewBenefit] = useState('');

  const isEdit = !!productPreview;
  const isAdd = !productPreview;

  useEffect(() => {
    if (productPreview) {
      setFormData({
        title: productPreview.title,
        description: productPreview.description || '',
        benefits: productPreview.benefits || [],
        imageUrl: productPreview.imageUrl,
        link: productPreview.link,
        order: productPreview.order,
        isActive: productPreview.isActive
      });
    } else {
      setFormData({
        title: '',
        description: '',
        benefits: [],
        imageUrl: '',
        link: '',
        order: 0,
        isActive: true
      });
    }
  }, [productPreview]);

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
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
        handleInputChange('imageUrl', data.imageUrl);
      } else {
        throw new Error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const productPreviewData: ProductPreview = {
        id: productPreview?.id || '',
        title: formData.title,
        description: formData.description,
        benefits: formData.benefits,
        imageUrl: formData.imageUrl,
        link: formData.link,
        order: formData.order,
        isActive: formData.isActive,
        createdAt: productPreview?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (isAdd && onAdd) {
        onAdd(productPreviewData);
      } else if (isEdit && onSave) {
        onSave(productPreviewData);
      }
    } catch (error) {
      console.error('Error saving product preview:', error);
      alert('Failed to save product preview');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (productPreview && onDelete) {
      onDelete(productPreview.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {isAdd ? 'Add New Product Preview' : 'Edit Product Preview'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {isAdd ? 'Add a new product preview with image and content' : 'Update product content and settings'}
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

          <form id="product-preview-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload/Display */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                {formData.imageUrl ? 'Current Product Image' : 'Upload Product Image'}
              </label>
              <div className="relative group">
                {formData.imageUrl ? (
                  <Image
                    src={formData.imageUrl}
                    alt="Product preview"
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded-xl border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
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
                      <DottedLoader size="sm" className="mr-2" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 mr-2" />
                    )}
                    {uploading ? 'Uploading...' : (formData.imageUrl ? 'Change Image' : 'Upload Image')}
                  </label>
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center space-y-2">
                      <DottedLoader size="lg" />
                      <p className="text-sm font-medium text-gray-700">Uploading image...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Title and Link - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">
                  Product Link *
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="/products/product-name"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Product Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                Key Features/Benefits
              </label>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...formData.benefits];
                        newBenefits[index] = e.target.value;
                        handleInputChange('benefits', newBenefits);
                      }}
                      className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter benefit"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Add new benefit"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBenefit();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    disabled={!newBenefit.trim()}
                    className="p-1.5 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Order and Status - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="0"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">
                  Product Status
                </label>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs font-medium text-gray-700">
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleInputChange('isActive', !formData.isActive)}
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
                      formData.isActive
                        ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex space-x-2">
            {isEdit && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 border border-red-300 rounded hover:bg-red-50 hover:border-red-400 transition-colors"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </button>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="product-preview-form"
              disabled={saving || !formData.title || !formData.imageUrl || !formData.link}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
            >
              {saving ? (
                <DottedLoader size="sm" className="mr-1" />
              ) : (
                <Save className="h-3 w-3 mr-1" />
              )}
              {saving ? 'Saving...' : (isAdd ? 'Add Product' : 'Save Changes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
