"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X, Save, Star, CheckCircle } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  location?: string;
  quote: string;
  rating: number;
  avatar?: string;
  imageUrl?: string;
  verified: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  testimonial?: Testimonial | null;
}

export function TestimonialModal({ isOpen, onClose, onSave, testimonial }: TestimonialModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    location: '',
    quote: '',
    rating: 0,
    avatar: '',
    imageUrl: '',
    verified: true,
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        position: testimonial.position,
        company: testimonial.company,
        location: testimonial.location || '',
        quote: testimonial.quote,
        rating: testimonial.rating,
        avatar: testimonial.avatar || '',
        imageUrl: testimonial.imageUrl || '',
        verified: testimonial.verified,
        isActive: testimonial.isActive
      });
    } else {
      setFormData({
        name: '',
        position: '',
        company: '',
        location: '',
        quote: '',
        rating: 0,
        avatar: '',
        imageUrl: '',
        verified: true,
        isActive: true
      });
    }
    setErrors({});
  }, [testimonial, isOpen]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.quote.trim()) {
      newErrors.quote = 'Quote is required';
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Please select a rating between 1 and 5 stars';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const url = testimonial ? `/api/testimonials/${testimonial.id}` : '/api/testimonials';
      const method = testimonial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSave();
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      setErrors(prev => ({ ...prev, general: 'Failed to save testimonial' }));
    } finally {
      setSaving(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 cursor-pointer transition-colors ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        } ${interactive ? "hover:text-yellow-300" : ""}`}
        onClick={interactive ? () => handleInputChange('rating', i + 1) : undefined}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {testimonial ? 'Update testimonial content and settings' : 'Add a new customer testimonial with details'}
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
          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-red-50 text-red-800 rounded-lg text-xs">
              {errors.general}
            </div>
          )}


          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Customer Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter customer name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.position ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., CEO, Director"
              />
              {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  errors.company ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Company name"
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., Dubai, UAE"
              />
            </div>
          </div>

          {/* Quote */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-600">
              Testimonial Quote *
            </label>
            <textarea
              value={formData.quote}
              onChange={(e) => handleInputChange('quote', e.target.value)}
              className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none ${
                errors.quote ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Customer testimonial..."
              rows={3}
            />
            {errors.quote && <p className="text-red-500 text-xs mt-1">{errors.quote}</p>}
          </div>

          {/* Rating and Avatar Initial - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Rating *
              </label>
              <div className="flex items-center space-x-1">
                {renderStars(formData.rating, true)}
                <span className="ml-2 text-xs text-gray-600">
                  {formData.rating > 0 ? `(${formData.rating}/5)` : '(Not selected)'}
                </span>
              </div>
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Avatar Initial
              </label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., J for John"
                maxLength={1}
              />
              <p className="text-xs text-gray-500">
                Single character to display as avatar
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-700">
                Testimonial Status
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
            {/* No delete button for new testimonials */}
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
              {saving ? 'Saving...' : (testimonial ? 'Save Changes' : 'Add Testimonial')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
