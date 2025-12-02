"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Power,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Upload
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import Image from "next/image";

interface GalleryImage {
  id: string;
  imageUrl: string;
  altText?: string;
  title?: string;
  description?: string;
  section: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function InteractiveGalleryManager() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  // Helper function to show success modal
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  // Helper function to show confirmation modal
  const showConfirmation = (title: string, message: string, action: () => void) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery-images?section=interactive');
      const data = await response.json();
      
      if (response.ok) {
        console.log('Interactive gallery manager fetched images:', data);
        setGalleryImages(data);
      } else {
        throw new Error(data.error || 'Failed to fetch gallery images');
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setMessage({ type: 'error', text: 'Failed to load gallery images' });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'interactive-gallery');

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload response:', data);
        // API returns 'url' not 'imageUrl'
        const imageUrl = data.url || data.imageUrl;
        if (!imageUrl) {
          throw new Error('No image URL returned from upload');
        }
        await handleAddImage(imageUrl, file.name);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddImage = async (imageUrl: string, altText?: string) => {
    setSaving(true);
    try {
      const response = await fetch('/api/gallery-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          altText: altText || null,
          title: null,
          description: null,
          section: 'interactive'
        })
      });

      if (response.ok) {
        await fetchGalleryImages();
        showSuccess('Gallery image added successfully!');
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to add gallery image');
      }
    } catch (error) {
      console.error('Error adding gallery image:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to add gallery image' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/gallery-images/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchGalleryImages();
        showSuccess('Gallery image deleted successfully!');
      } else {
        throw new Error('Failed to delete gallery image');
      }
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      setMessage({ type: 'error', text: 'Failed to delete gallery image' });
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleStatus = async (image: GalleryImage) => {
    setToggling(image.id);
    try {
      const updatedImage = { ...image, isActive: !image.isActive };
      
      const response = await fetch(`/api/gallery-images/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedImage)
      });

      if (response.ok) {
        await fetchGalleryImages();
        showSuccess(`Gallery image ${updatedImage.isActive ? 'enabled' : 'disabled'} successfully!`);
      } else {
        throw new Error('Failed to update gallery image status');
      }
    } catch (error) {
      console.error('Error toggling gallery image status:', error);
      setMessage({ type: 'error', text: 'Failed to update gallery image status' });
    } finally {
      setToggling(null);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = galleryImages.findIndex(img => img.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= galleryImages.length) return;

    const newImages = [...galleryImages];
    const [movedItem] = newImages.splice(currentIndex, 1);
    newImages.splice(newIndex, 0, movedItem);

    // Update order values
    const updatedImages = newImages.map((item, index) => ({
      ...item,
      order: index
    }));

    setGalleryImages(updatedImages);

    // Update in database
    try {
      for (const item of updatedImages) {
        await fetch(`/api/gallery-images/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: item.order })
        });
      }
      showSuccess('Gallery image order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      // Revert on error
      await fetchGalleryImages();
      setMessage({ type: 'error', text: 'Failed to update order' });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUploadImage(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Interactive Gallery</h3>
          <p className="text-xs md:text-sm text-gray-600">
            Manage images for the interactive gallery section on the homepage
          </p>
        </div>
        <div className="flex space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="upload-interactive-gallery-image"
            disabled={uploading}
          />
          <Button
            onClick={() => document.getElementById('upload-interactive-gallery-image')?.click()}
            disabled={uploading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {uploading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Upload Image
          </Button>
        </div>
      </div>

      {/* Gallery Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              {/* Header with Order and Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    image.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {image.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleToggleStatus(image)}
                    disabled={toggling === image.id}
                    className={`p-1.5 rounded-lg transition-colors ${
                      image.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                    } ${toggling === image.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={image.isActive ? 'Disable image' : 'Enable image'}
                  >
                    {toggling === image.id ? (
                      <ToggleLoader size="sm" />
                    ) : (
                      <Power className="h-3.5 w-3.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => showConfirmation(
                      'Delete Gallery Image',
                      'Are you sure you want to delete this image? This action cannot be undone.',
                      () => handleDeleteImage(image.id)
                    )}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Reorder Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleReorder(image.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleReorder(image.id, 'down')}
                    disabled={index === galleryImages.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </button>
                </div>
                
                <button
                  onClick={() => window.open(image.imageUrl, '_blank')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="View full image"
                >
                  <Eye className="h-3 w-3" />
                </button>
              </div>
              
              {/* Image Preview */}
              <div className="mb-3">
                <Image
                  src={image.imageUrl}
                  alt={image.altText || 'Gallery image'}
                  width={300}
                  height={200}
                  unoptimized
                  className="w-full h-32 object-cover rounded-lg border"
                  onLoad={() => console.log('Interactive gallery manager image loaded:', image.imageUrl)}
                  onError={(e) => {
                    console.error('Interactive gallery manager image failed to load:', image.imageUrl, e);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-32 bg-gray-100 rounded-lg border flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                {image.title && (
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {image.title}
                  </h4>
                )}
                
                {image.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {image.description}
                  </p>
                )}
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    Alt: {image.altText || 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery images</h3>
          <p className="text-gray-600 mb-4">Get started by uploading your first interactive gallery image.</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="upload-first-interactive-gallery-image"
            disabled={uploading}
          />
          <Button
            onClick={() => document.getElementById('upload-first-interactive-gallery-image')?.click()}
            disabled={uploading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {uploading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Upload First Image
          </Button>
        </div>
      )}

      {/* Modals */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          if (confirmAction) {
            confirmAction();
          }
          setShowConfirmModal(false);
        }}
        title={confirmTitle}
        message={confirmMessage}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </div>
  );
}
