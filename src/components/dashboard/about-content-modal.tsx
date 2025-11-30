"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { X, Save, Upload, CheckCircle } from "lucide-react";
import Image from "next/image";

interface AboutContent {
  id: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AboutContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  content?: AboutContent | null;
  section: string;
}

export function AboutContentModal({ isOpen, onClose, onSave, content, section }: AboutContentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        subtitle: content.subtitle || '',
        description: content.description || '',
        imageUrl: (section === 'vision' || section === 'mission') ? '' : (content.imageUrl || ''),
        buttonText: (section === 'vision' || section === 'mission') ? '' : (content.buttonText || ''),
        buttonLink: (section === 'vision' || section === 'mission') ? '' : (content.buttonLink || ''),
        isActive: content.isActive
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        imageUrl: (section === 'vision' || section === 'mission') ? '' : '',
        buttonText: (section === 'vision' || section === 'mission') ? '' : '',
        buttonLink: (section === 'vision' || section === 'mission') ? '' : '',
        isActive: true
      });
    }
    setErrors({});
  }, [content, isOpen, section]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'about');

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({ ...prev, imageUrl: 'Failed to upload image' }));
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const url = content ? `/api/about-content/${content.id}` : '/api/about-content';
      const method = content ? 'PUT' : 'POST';
      
      const payload = content 
        ? { 
            ...formData,
            ...(section === 'vision' || section === 'mission' ? {
              imageUrl: undefined,
              buttonText: undefined,
              buttonLink: undefined
            } : {})
          }
        : { 
            section, 
            ...formData,
            ...(section === 'vision' || section === 'mission' ? {
              imageUrl: undefined,
              buttonText: undefined,
              buttonLink: undefined
            } : {})
          };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        onSave();
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setErrors({ general: 'Failed to save content' });
    } finally {
      setSaving(false);
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
              {content ? 'Edit Content' : section === 'certifications' ? 'Add New Certificate' : 'Add New Content'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {content 
                ? 'Update content details' 
                : section === 'certifications' 
                  ? 'Add a new certificate image and details' 
                  : `Add content for ${section} section`
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Content */}
          <div className="p-4 space-y-4">
            {/* General Error */}
            {errors.general && (
              <div className="p-3 bg-red-50 text-red-800 rounded-lg text-xs">
                {errors.general}
              </div>
            )}

            {/* Form Fields */}
            {(section === 'vision' || section === 'mission') ? (
              // Simplified form for vision-mission section
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter title"
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter subtitle"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    placeholder="Enter description"
                    rows={4}
                  />
                </div>
              </div>
            ) : (
              // Full form for other sections
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      {section === 'certifications' ? 'Certificate Name *' : 'Title *'}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder={section === 'certifications' ? 'e.g., ISO 22000 Certification' : 'Enter title'}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      {section === 'certifications' ? 'Issuing Organization' : 'Subtitle'}
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder={section === 'certifications' ? 'e.g., International Organization for Standardization' : 'Enter subtitle'}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    {section === 'certifications' ? 'Certificate Details' : 'Description'}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    placeholder={section === 'certifications' ? 'e.g., Food safety management system certification' : 'Enter description'}
                    rows={2}
                  />
                </div>
              </>
            )}

            {/* Image Upload/Display - Hidden for vision-mission */}
            {section !== 'vision' && section !== 'mission' && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                {formData.imageUrl 
                  ? (section === 'certifications' ? 'Certificate Image' : 'Section Image')
                  : (section === 'certifications' ? 'Upload Certificate Image' : 'Upload Section Image')
                }
              </label>
              <div className="relative group">
                {formData.imageUrl ? (
                  <Image
                    src={formData.imageUrl}
                    alt="Content image"
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
              {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
            </div>
            )}

            {/* Button fields and content status - Hidden for vision-mission */}
            {section !== 'vision' && section !== 'mission' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => handleInputChange('buttonText', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter button text"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      Button Link
                    </label>
                    <input
                      type="url"
                      value={formData.buttonLink}
                      onChange={(e) => handleInputChange('buttonLink', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter button link"
                    />
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-xs font-medium text-gray-700">
                      Content Status
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
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saving}
              className="text-xs px-3 py-1.5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-1.5"
            >
              {saving ? (
                <>
                  <LoadingSpinner size="sm" className="mr-1" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5 mr-1" />
                  {content ? 'Update Content' : 'Create Content'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}