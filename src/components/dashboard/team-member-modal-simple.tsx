"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X, Save, Upload, CheckCircle, User } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  member?: TeamMember | null;
}

export function TeamMemberModal({ isOpen, onClose, onSave, member }: TeamMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    imageUrl: '',
    order: 0,
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        position: member.position,
        imageUrl: member.imageUrl || '',
        order: member.order,
        isActive: member.isActive
      });
    } else {
      setFormData({
        name: '',
        position: '',
        imageUrl: '',
        order: 0,
        isActive: true
      });
    }
    setErrors({});
  }, [member, isOpen]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadSuccess(false);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'team');

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload response:', data);
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        setUploadSuccess(true);
        
        // Show different message for placeholder images
        if (data.isPlaceholder) {
          console.log('Using placeholder image - Cloudinary not configured');
          setIsPlaceholder(true);
        } else {
          setIsPlaceholder(false);
        }
        
        // Hide success message after 3 seconds
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        alert(`Upload failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        alert('Please select an image file');
      }
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
      const url = member ? `/api/team-members/${member.id}` : '/api/team-members';
      const method = member ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.error || 'Failed to save team member' });
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      setErrors({ general: 'Failed to save team member' });
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {member ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {member ? 'Update team member details' : 'Add a new team member to your directors section'}
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

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600">
                  Upload Profile Image
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragOver
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {formData.imageUrl ? (
                    <div className="space-y-3">
                      <Image
                        src={formData.imageUrl}
                        alt="Profile image"
                        width={200}
                        height={200}
                        className="w-32 h-32 object-cover rounded-lg mx-auto border border-gray-200"
                      />
                      {uploadSuccess && (
                        <div className="flex items-center justify-center text-green-600 text-xs">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Image uploaded successfully!
                        </div>
                      )}
                      {isPlaceholder && (
                        <div className="text-amber-600 text-xs">
                          Using placeholder image - Cloudinary not configured
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <User className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm text-gray-600">No image selected</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Drag and drop an image here, or click to select
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                  
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <LoadingSpinner size="lg" />
                        <p className="text-sm font-medium text-gray-700 mt-2">Uploading...</p>
                      </div>
                    </div>
                  )}
                </div>
                {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter full name"
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter position/title"
                    />
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      Member Status
                    </label>
                    <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
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
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={saving}
                className="text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700 text-sm"
              >
                {saving ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {member ? 'Update Member' : 'Add Member'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
