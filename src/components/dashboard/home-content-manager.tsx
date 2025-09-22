"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Eye, 
  Edit, 
  Plus,
  CheckCircle,
  AlertCircle,
  Shield,
  Award,
  Star,
  MapPin,
  Globe,
  Leaf,
  Truck,
  Heart,
  Upload,
  Save,
  X,
  Power,
  Trash2
} from "lucide-react";
import { HeroImageModal } from "./hero-image-modal";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { HomeAboutModal } from "./home-about-modal";
import Image from "next/image";

interface HomeContent {
  id: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  button2Text?: string;
  button2Link?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

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

interface KeyFeature {
  id: string;
  text: string;
  icon: string;
}

const ICON_OPTIONS = [
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'map-pin', label: 'Map Pin', icon: MapPin },
  { value: 'globe', label: 'Globe', icon: Globe },
  { value: 'leaf', label: 'Leaf', icon: Leaf },
  { value: 'truck', label: 'Truck', icon: Truck },
  { value: 'heart', label: 'Heart', icon: Heart },
];

interface HomeContentManagerProps {
  // No props currently needed
  _?: never;
}

export function HomeContentManager({}: HomeContentManagerProps) {
  const [content, setContent] = useState<HomeContent[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [selectedHeroImage, setSelectedHeroImage] = useState<HeroImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHeroContent, setEditingHeroContent] = useState(false);
  const [editingButton, setEditingButton] = useState<string | null>(null);
  const [heroContent, setHeroContent] = useState({
    buttonText: '',
    buttonLink: '',
    button2Text: '',
    button2Link: '',
    description: ''
  });
  const [keyFeatures, setKeyFeatures] = useState<KeyFeature[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [aboutContent, setAboutContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    imageUrl: ''
  });
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

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

  // About section management functions
  const handleEditAboutContent = () => {
    const aboutSection = content.find(section => section.section === 'about');
    if (aboutSection) {
      setAboutContent({
        title: aboutSection.title || '',
        subtitle: aboutSection.subtitle || '',
        description: aboutSection.description || '',
        buttonText: aboutSection.buttonText || '',
        buttonLink: aboutSection.buttonLink || '',
        imageUrl: aboutSection.imageUrl || ''
      });
    }
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  const handleSaveAboutModal = async (updatedContent: typeof aboutContent) => {
    setAboutContent(updatedContent);
    await handleSaveAboutContent(updatedContent);
    setIsAboutModalOpen(false);
  };

  const handleSaveAboutContent = async (contentToSave = aboutContent) => {
    setSaving(true);
    try {
      const response = await fetch('/api/home-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'about',
          ...contentToSave
        })
      });

      if (response.ok) {
        await fetchContent();
        showSuccess('About section updated successfully!');
        // Add a small delay to make the loading state visible
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        throw new Error('Failed to update about section');
      }
    } catch (error) {
      console.error('Error updating about section:', error);
      setMessage({ type: 'error', text: 'Failed to update about section' });
    } finally {
      setSaving(false);
    }
  };



  useEffect(() => {
    fetchContent();
    fetchHeroImages();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/home-content');
      const data = await response.json();
      
      if (response.ok) {
        setContent(data);
        console.log('Fetched content:', data);
      } else {
        throw new Error(data.error || 'Failed to fetch content');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
    } finally {
      setLoading(false);
    }
  };

  const fetchHeroImages = async () => {
    try {
      const response = await fetch('/api/hero-images');
      const data = await response.json();
      
      if (response.ok) {
        setHeroImages(data);
        console.log('Fetched hero images:', data);
      } else {
        throw new Error(data.error || 'Failed to fetch hero images');
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
    }
  };

  const handleImageUpload = async (file: File, section: string) => {
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
        await updateContent(section, { imageUrl: data.imageUrl });
        showSuccess('Image uploaded successfully!');
      } else {
        throw new Error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const updateContent = async (section: string, updates: Partial<HomeContent>) => {
    setSaving(true);
    try {
      const sectionContent = content.find(c => c.section === section);
      const updatedContent = { ...sectionContent, ...updates };

      const response = await fetch('/api/home-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      });

      const data = await response.json();

      if (response.ok) {
        setContent(prev => prev.map(c => c.section === section ? data : c));
        showSuccess('Content updated successfully!');
        setEditingSection(null);
      } else {
        throw new Error(data.error || 'Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      setMessage({ type: 'error', text: 'Failed to update content' });
    } finally {
      setSaving(false);
    }
  };


  const handleEditHeroContent = async () => {
    const heroSection = content.find(c => c.section === 'hero');
    if (heroSection) {
      setHeroContent({
        buttonText: heroSection.buttonText || '',
        buttonLink: heroSection.buttonLink || '',
        button2Text: heroSection.button2Text || '',
        button2Link: heroSection.button2Link || '',
        description: heroSection.description || ''
      });
      
      // Fetch key features from API
      await fetchKeyFeatures();
    }
    setEditingHeroContent(true);
  };

  const handleSaveHeroContent = async () => {
    try {
      // Save all key features
      for (const feature of keyFeatures) {
        await saveKeyFeature(feature);
      }
      
      // Convert key features back to description format for backward compatibility
      const description = keyFeatures.map(f => f.text).join('\n');
      const updatedContent = { ...heroContent, description };
      
      await updateContent('hero', updatedContent);
      showSuccess('Hero content saved successfully!');
      setEditingHeroContent(false);
    } catch (error) {
      console.error('Error saving hero content:', error);
    }
  };

  const addKeyFeature = () => {
    const newFeature: KeyFeature = {
      id: `feature-${Date.now()}`,
      text: '',
      icon: 'shield'
    };
    setKeyFeatures([...keyFeatures, newFeature]);
  };

  const updateKeyFeature = (id: string, field: 'text' | 'icon', value: string) => {
    setKeyFeatures(prev => prev.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const removeKeyFeature = async (id: string) => {
    await deleteKeyFeature(id);
  };

  const fetchKeyFeatures = async () => {
    try {
      const response = await fetch('/api/hero-key-features');
      if (response.ok) {
        const data = await response.json();
        setKeyFeatures(data.map((f: { id: string; text: string; icon: string; order: number; isActive: boolean; createdAt: string; updatedAt: string }) => ({
          id: f.id,
          text: f.text,
          icon: f.icon
        })));
      }
    } catch (error) {
      console.error('Error fetching key features:', error);
    }
  };

  const saveKeyFeature = async (feature: KeyFeature) => {
    try {
      if (feature.id.startsWith('feature-')) {
        // New feature
        const response = await fetch('/api/hero-key-features', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: feature.text,
            icon: feature.icon,
            order: keyFeatures.length
          })
        });
        if (response.ok) {
          const newFeature = await response.json();
          setKeyFeatures(prev => prev.map(f => 
            f.id === feature.id ? { ...f, id: newFeature.id } : f
          ));
        }
      } else {
        // Update existing feature
        await fetch(`/api/hero-key-features/${feature.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: feature.text,
            icon: feature.icon,
            order: keyFeatures.findIndex(f => f.id === feature.id),
            isActive: true
          })
        });
      }
    } catch (error) {
      console.error('Error saving key feature:', error);
    }
  };

  const deleteKeyFeature = async (id: string) => {
    try {
      if (!id.startsWith('feature-')) {
        await fetch(`/api/hero-key-features/${id}`, {
          method: 'DELETE'
        });
      }
      setKeyFeatures(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting key feature:', error);
    }
  };

  const handleCancelHeroContent = () => {
    setEditingHeroContent(false);
    const heroSection = content.find(c => c.section === 'hero');
    if (heroSection) {
      setHeroContent({
        buttonText: heroSection.buttonText || '',
        buttonLink: heroSection.buttonLink || '',
        button2Text: heroSection.button2Text || '',
        button2Link: heroSection.button2Link || '',
        description: heroSection.description || ''
      });
    }
  };

  const handleEditButton = (buttonType: 'button1' | 'button2') => {
    const heroSection = content.find(c => c.section === 'hero');
    if (heroSection) {
      setHeroContent({
        buttonText: heroSection.buttonText || '',
        buttonLink: heroSection.buttonLink || '',
        button2Text: heroSection.button2Text || '',
        button2Link: heroSection.button2Link || '',
        description: heroSection.description || ''
      });
    }
    setEditingButton(buttonType);
  };

  const handleSaveButton = async (buttonType: 'button1' | 'button2') => {
    setSaving(true);
    try {
      const updates = buttonType === 'button1' 
        ? { buttonText: heroContent.buttonText, buttonLink: heroContent.buttonLink }
        : { button2Text: heroContent.button2Text, button2Link: heroContent.button2Link };
      
      const response = await fetch('/api/home-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'hero', ...updates })
      });

      if (response.ok) {
        const data = await response.json();
        setContent(prev => prev.map(c => c.section === 'hero' ? data : c));
        showSuccess(`${buttonType === 'button1' ? 'Button 1' : 'Button 2'} updated successfully!`);
        setEditingButton(null);
      } else {
        throw new Error('Failed to update button');
      }
    } catch (error) {
      console.error('Error saving button:', error);
      setMessage({ type: 'error', text: 'Failed to update button' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelButton = () => {
    setEditingButton(null);
    const heroSection = content.find(c => c.section === 'hero');
    if (heroSection) {
      setHeroContent({
        buttonText: heroSection.buttonText || '',
        buttonLink: heroSection.buttonLink || '',
        button2Text: heroSection.button2Text || '',
        button2Link: heroSection.button2Link || '',
        description: heroSection.description || ''
      });
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setContent(prev => prev.map(c => 
      c.section === section ? { ...c, [field]: value } : c
    ));
  };


  const handleDeleteHeroImage = async (imageId: string) => {
    const image = heroImages.find(img => img.id === imageId);
    const imageTitle = image?.title || 'this image';
    
    showConfirmation(
      'Delete Hero Image',
      `Are you sure you want to delete "${imageTitle}"? This action cannot be undone.`,
      async () => {
        setDeleting(true);
        try {
          const response = await fetch(`/api/hero-images/${imageId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            await fetchHeroImages();
            // Trigger refresh on frontend
            localStorage.setItem('hero-images-updated', Date.now().toString());
            window.dispatchEvent(new CustomEvent('hero-images-updated'));
            showSuccess('Hero image deleted successfully!');
          } else {
            throw new Error('Failed to delete hero image');
          }
        } catch (error) {
          console.error('Error deleting hero image:', error);
          setMessage({ type: 'error', text: 'Failed to delete hero image' });
        } finally {
          setDeleting(false);
        }
      }
    );
  };


  const handleEditHeroImage = (image: HeroImage) => {
    setSelectedHeroImage(image);
    setIsModalOpen(true);
  };

  const handleSaveHeroImage = async (updatedImage: HeroImage) => {
    try {
      const response = await fetch(`/api/hero-images/${updatedImage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedImage)
      });

      if (response.ok) {
        await fetchHeroImages();
        // Trigger refresh on frontend
        localStorage.setItem('hero-images-updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('hero-images-updated'));
        showSuccess('Hero image updated successfully!');
      } else {
        throw new Error('Failed to update hero image');
      }
    } catch (error) {
      console.error('Error updating hero image:', error);
      setMessage({ type: 'error', text: 'Failed to update hero image' });
    }
  };

  const handleAddHeroImage = async () => {
    try {
      await fetchHeroImages();
      // Trigger refresh on frontend
      localStorage.setItem('hero-images-updated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('hero-images-updated'));
      showSuccess('Hero image added successfully!');
    } catch (error) {
      console.error('Error adding hero image:', error);
      setMessage({ type: 'error', text: 'Failed to add hero image' });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHeroImage(null);
  };

  const handleToggleImageStatus = async (image: HeroImage) => {
    try {
      const updatedImage = { ...image, isActive: !image.isActive };
      
      const response = await fetch(`/api/hero-images/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedImage)
      });

      if (response.ok) {
        await fetchHeroImages();
        // Trigger refresh on frontend
        localStorage.setItem('hero-images-updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('hero-images-updated'));
        showSuccess(`Image ${updatedImage.isActive ? 'enabled' : 'disabled'} successfully!`);
      } else {
        throw new Error('Failed to update image status');
      }
    } catch (error) {
      console.error('Error toggling image status:', error);
      setMessage({ type: 'error', text: 'Failed to update image status' });
    }
  };

  const getSectionTitle = (section: string) => {
    const titles: { [key: string]: string } = {
      'hero': 'Hero Section',
      'about': 'About Section',
      'services-preview': 'Services Preview',
      'products-preview': 'Products Preview'
    };
    return titles[section] || section;
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
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      )}

      {/* Content Sections */}
      <div className="grid gap-6">
        {content.map((section) => (
          <Card key={section.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {getSectionTitle(section.section)}
              </h3>
              {section.section !== 'hero' && section.section !== 'about' && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(
                      editingSection === section.section ? null : section.section
                    )}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingSection === section.section ? 'Cancel' : 'Edit'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('/', '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              )}
            </div>

            {/* About Section Management - Always Visible */}
            {section.section === 'about' && (
              <div className="space-y-4">
                {/* About Content Preview */}
                <div className="space-y-4">
                  {/* Header with Action Buttons */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">About Section Preview</h3>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleEditAboutContent}
                        className="text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Content
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open('/', '_blank')}
                        className="text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  {/* Main Content - Image and Text Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side - Image (Smaller) */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-500">Section Image</label>
                      <div className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden">
                        {section.imageUrl ? (
                          <Image
                            src={section.imageUrl}
                            alt="About section image"
                            width={400}
                            height={160}
                            className="w-full h-40 object-contain rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const placeholder = target.nextElementSibling as HTMLElement;
                              if (placeholder) placeholder.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center ${section.imageUrl ? 'hidden' : 'flex'}`}
                        >
                          <div className="text-center text-gray-500">
                            <Upload className="h-6 w-6 mx-auto mb-1" />
                            <p className="text-xs">No image</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Content Fields (2 columns) */}
                    <div className="lg:col-span-2 space-y-4">
                      {/* Title */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {section.title || 'Not set'}
                        </h3>
                      </div>

                      {/* Description below Title */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-2">Description</label>
                        <div className="bg-gray-50 rounded-lg p-3 border">
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {section.description || 'Not set'}
                          </p>
                        </div>
                      </div>

                      {/* Subtitle and Button Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle</label>
                          <p className="text-sm text-gray-700">
                            {section.subtitle || 'Not set'}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Button Text</label>
                            <p className="text-sm font-medium text-gray-900">
                              {section.buttonText || 'Not set'}
                            </p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Button Link</label>
                            <p className="text-sm text-gray-700">
                              {section.buttonLink || 'Not set'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Section Management - Always Visible */}
            {section.section === 'hero' && (
              <div className="space-y-4">
                {/* Hero Content Preview */}
                {!editingHeroContent ? (
                  <div className="space-y-4">
                    {/* Buttons Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Button 1 Card */}
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {editingButton === 'button1' ? (
                          <div className="space-y-3">
                            <div className="text-xs text-gray-500 mb-2">Button 1</div>
                            <div className="space-y-2">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
                                <input
                                  type="text"
                                  value={heroContent.buttonText}
                                  onChange={(e) => setHeroContent(prev => ({ ...prev, buttonText: e.target.value }))}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="Enter button text"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Button Link</label>
                                <input
                                  type="text"
                                  value={heroContent.buttonLink}
                                  onChange={(e) => setHeroContent(prev => ({ ...prev, buttonLink: e.target.value }))}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="/products"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelButton}
                                className="text-xs h-7 px-3"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSaveButton('button1')}
                                disabled={saving}
                                className="text-xs h-7 px-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {saving ? (
                                  <LoadingSpinner size="sm" className="mr-1" />
                                ) : (
                                  <Save className="h-3 w-3 mr-1" />
                                )}
                                {saving ? 'Saving...' : 'Save'}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">Button 1</div>
                              <div className="text-sm font-medium text-gray-900">
                                {section.buttonText || 'Not set'} → {section.buttonLink || 'Not set'}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditButton('button1')}
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Button 2 Card */}
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {editingButton === 'button2' ? (
                          <div className="space-y-3">
                            <div className="text-xs text-gray-500 mb-2">Button 2</div>
                            <div className="space-y-2">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
                                <input
                                  type="text"
                                  value={heroContent.button2Text}
                                  onChange={(e) => setHeroContent(prev => ({ ...prev, button2Text: e.target.value }))}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="Enter button text"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Button Link</label>
                                <input
                                  type="text"
                                  value={heroContent.button2Link}
                                  onChange={(e) => setHeroContent(prev => ({ ...prev, button2Link: e.target.value }))}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="/contact"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelButton}
                                className="text-xs h-7 px-3"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSaveButton('button2')}
                                disabled={saving}
                                className="text-xs h-7 px-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {saving ? (
                                  <LoadingSpinner size="sm" className="mr-1" />
                                ) : (
                                  <Save className="h-3 w-3 mr-1" />
                                )}
                                {saving ? 'Saving...' : 'Save'}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">Button 2</div>
                              <div className="text-sm font-medium text-gray-900">
                                {section.button2Text || 'Not set'} → {section.button2Link || 'Not set'}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditButton('button2')}
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Key Features Preview */}
                    <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-2">Key Features</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {section.description ? section.description.split('\n').map((feature, index) => {
                            const IconComponent = ICON_OPTIONS[index % ICON_OPTIONS.length].icon;
                            return (
                              <div key={index} className="flex items-center space-x-2">
                                <IconComponent className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-gray-900">{feature.trim()}</span>
                              </div>
                            );
                          }) : (
                            <span className="text-sm text-gray-500">No features set</span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleEditHeroContent}
                        className="h-8 w-8 p-0 hover:bg-gray-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Edit Form */
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    {/* Button 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
                          Button 1 Text
                        </label>
                        <input
                          type="text"
                          value={heroContent.buttonText}
                          onChange={(e) => setHeroContent(prev => ({ ...prev, buttonText: e.target.value }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="Explore Products"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
                          Button 1 Link
                        </label>
                        <input
                          type="text"
                          value={heroContent.buttonLink}
                          onChange={(e) => setHeroContent(prev => ({ ...prev, buttonLink: e.target.value }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="/products"
                        />
                      </div>
                    </div>

                    {/* Button 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
                          Button 2 Text
                        </label>
                        <input
                          type="text"
                          value={heroContent.button2Text}
                          onChange={(e) => setHeroContent(prev => ({ ...prev, button2Text: e.target.value }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="Get Quote"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
                          Button 2 Link
                        </label>
                        <input
                          type="text"
                          value={heroContent.button2Link}
                          onChange={(e) => setHeroContent(prev => ({ ...prev, button2Link: e.target.value }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="/contact"
                        />
                      </div>
                    </div>

                    {/* Key Features Management */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-medium text-gray-700">
                          Key Features
                        </label>
                        <Button
                          type="button"
                          size="sm"
                          onClick={addKeyFeature}
                          className="text-xs h-6 px-2"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Feature
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {keyFeatures.map((feature) => {
                          const IconComponent = ICON_OPTIONS.find(opt => opt.value === feature.icon)?.icon || Shield;
                          return (
                            <div key={feature.id} className="flex items-center space-x-2 p-2 bg-white border rounded">
                              <div className="flex items-center space-x-2">
                                <IconComponent className="h-4 w-4 text-emerald-600" />
                                <select
                                  value={feature.icon}
                                  onChange={(e) => updateKeyFeature(feature.id, 'icon', e.target.value)}
                                  className="text-xs border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                >
                                  {ICON_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <input
                                type="text"
                                value={feature.text}
                                onChange={(e) => updateKeyFeature(feature.id, 'text', e.target.value)}
                                placeholder="Enter feature text"
                                className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => removeKeyFeature(feature.id)}
                                className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelHeroContent}
                        className="text-xs"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveHeroContent}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                      >
                        {saving ? (
                          <LoadingSpinner size="sm" className="mr-1" />
                        ) : (
                          <Save className="h-3 w-3 mr-1" />
                        )}
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Hero Images Management */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-700">
                      Hero Images ({heroImages.length})
                    </label>
                    <button
                      onClick={() => {
                        setSelectedHeroImage(null);
                        setIsModalOpen(true);
                      }}
                      className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-emerald-500"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add New
                    </button>
                  </div>

                {/* Hero Images Cards - Side by Side Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {heroImages.map((image, index) => (
                    <div key={image.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 group">
                      <div className="p-4">
                        {/* Header with Image Number and Status */}
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
                              onClick={() => handleEditHeroImage(image)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Edit image"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            
                            <button
                              onClick={() => handleToggleImageStatus(image)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                image.isActive
                                  ? 'text-green-600 hover:bg-green-50'
                                  : 'text-gray-400 hover:bg-gray-50'
                              }`}
                              title={image.isActive ? 'Disable image' : 'Enable image'}
                            >
                              <Power className="h-3.5 w-3.5" />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteHeroImage(image.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete image"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Image Preview */}
                        <div className="mb-3">
                          <Image
                            src={image.imageUrl}
                            alt={image.altText || 'Hero image'}
                            width={400}
                            height={128}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="space-y-2">
                          {/* Title */}
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Title
                            </label>
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                              {image.title || 'Untitled Hero Image'}
                            </h3>
                          </div>
                          
                          {/* Subtitle */}
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Subtitle
                            </label>
                            <p className="text-xs text-gray-700 line-clamp-2">
                              {image.subtitle || 'No subtitle provided'}
                            </p>
                          </div>
                          
                          {/* Alt Text */}
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Alt Text
                            </label>
                            <p className="text-xs text-gray-600 line-clamp-1">
                              {image.altText || 'No alt text provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )}

            {editingSection === section.section && section.section !== 'hero' && section.section !== 'about' ? (
              <div className="space-y-4">
                {/* Regular Image Upload for other sections */}
                {section.section !== 'hero' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Section Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {section.imageUrl && (
                        <Image
                          src={section.imageUrl}
                          alt="Current image"
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, section.section);
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                          disabled={uploading}
                        />
                        {uploading && (
                          <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) => handleInputChange(section.section, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter title"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={section.subtitle || ''}
                    onChange={(e) => handleInputChange(section.section, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter subtitle"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={section.description || ''}
                    onChange={(e) => handleInputChange(section.section, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter description"
                  />
                </div>

                {/* Button Text */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={section.buttonText || ''}
                    onChange={(e) => handleInputChange(section.section, 'buttonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter button text"
                  />
                </div>

                {/* Button Link */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={section.buttonLink || ''}
                    onChange={(e) => handleInputChange(section.section, 'buttonLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter button link"
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => updateContent(section.section, {})}
                    disabled={saving}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {saving ? (
                      <LoadingSpinner size="sm" className="mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Preview - Hide extra content for hero and about sections */}
                {section.section !== 'hero' && section.section !== 'about' && (
                  <>
                    {section.imageUrl && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <Image
                          src={section.imageUrl}
                          alt="Section image"
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <p className="text-gray-900">{section.title || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <p className="text-gray-900">{section.subtitle || 'Not set'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <p className="text-gray-900">{section.description || 'Not set'}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Text</label>
                        <p className="text-gray-900">{section.buttonText || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Link</label>
                        <p className="text-gray-900">{section.buttonLink || 'Not set'}</p>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Hero section - no preview, always show management interface */}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Hero Image Modal */}
      <HeroImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedHeroImage}
        onSave={handleSaveHeroImage}
        onDelete={handleDeleteHeroImage}
        onAdd={handleAddHeroImage}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      {/* Home About Modal */}
      <HomeAboutModal
        isOpen={isAboutModalOpen}
        onClose={handleCloseAboutModal}
        content={aboutContent}
        onSave={handleSaveAboutModal}
      />

      {/* Confirmation Modal */}
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
