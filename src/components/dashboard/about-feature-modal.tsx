"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X, Save, CheckCircle } from "lucide-react";

interface AboutFeature {
  id: string;
  section: string;
  title: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AboutFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  feature?: AboutFeature | null;
  section: string;
}

const iconOptions = [
  { value: 'Globe', label: 'Globe', icon: '🌍' },
  { value: 'Leaf', label: 'Leaf', icon: '🍃' },
  { value: 'Truck', label: 'Truck', icon: '🚚' },
  { value: 'Heart', label: 'Heart', icon: '❤️' },
  { value: 'Shield', label: 'Shield', icon: '🛡️' },
  { value: 'CheckCircle', label: 'Check Circle', icon: '✅' },
  { value: 'Award', label: 'Award', icon: '🏆' },
  { value: 'Star', label: 'Star', icon: '⭐' },
  { value: 'Target', label: 'Target', icon: '🎯' },
  { value: 'Users', label: 'Users', icon: '👥' }
];

export function AboutFeatureModal({ isOpen, onClose, onSave, feature, section }: AboutFeatureModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0,
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (feature) {
      setFormData({
        title: feature.title,
        description: feature.description || '',
        icon: feature.icon || '',
        order: feature.order,
        isActive: feature.isActive
      });
    } else {
      setFormData({
        title: '',
        description: '',
        icon: '',
        order: 0,
        isActive: true
      });
    }
    setErrors({});
  }, [feature, isOpen]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
      const url = feature ? `/api/about-features/${feature.id}` : '/api/about-features';
      const method = feature ? 'PUT' : 'POST';
      
      const payload = feature 
        ? { ...formData }
        : { section, ...formData };

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
        throw new Error(errorData.error || 'Failed to save feature');
      }
    } catch (error) {
      console.error('Error saving feature:', error);
      setErrors({ general: 'Failed to save feature' });
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
              {feature ? 'Edit Feature' : 'Add New Feature'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {feature ? 'Update feature details' : `Add feature for ${section} section`}
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
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter feature title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Enter feature description"
                rows={2}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Icon
              </label>
              <div className="grid grid-cols-5 gap-2">
                {iconOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('icon', option.value)}
                    className={`p-2 border rounded-md text-center transition-colors ${
                      formData.icon === option.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-sm mb-1">{option.icon}</div>
                    <div className="text-xs">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">
                  Status
                </label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    {formData.isActive ? 'Active' : 'Disabled'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleInputChange('isActive', !formData.isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                      formData.isActive ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
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
                  {feature ? 'Update Feature' : 'Create Feature'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
