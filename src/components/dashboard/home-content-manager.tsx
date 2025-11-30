"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Eye, 
  Edit, 
  CheckCircle,
  AlertCircle,
  Home,
  Image as ImageIcon,
  Users,
  Package,
  Star,
  Truck,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layout,
  Settings,
  Layers,
  GripVertical,
  LayoutGrid,
  Info
} from "lucide-react";
import { HeroImageModal } from "./hero-image-modal";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { HomeAboutModal } from "./home-about-modal";
import { ProductPreviewManager } from "./product-preview-manager";
import { InteractiveGalleryManager } from "./interactive-gallery-manager";
import { TestimonialsManagerSimple } from "./testimonials-manager-simple";
import { ServicesManager } from "./services-manager";
import { ExportProcessManager } from "./export-process-manager";
import { HeroManager } from "./hero-manager";
import { AboutManager } from "./about-manager";
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
  createdAt?: string;
  updatedAt?: string;
}

// Section configuration with icons and descriptions
const SECTION_CONFIG = {
  'hero': {
    icon: Home,
    label: 'Hero Section',
    description: 'Main banner with carousel images and call-to-action buttons',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600'
  },
  'about': {
    icon: Users,
    label: 'About Section',
    description: 'Company introduction and overview content',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600'
  },
  'services': {
    icon: Settings,
    label: 'Core Services',
    description: 'Highlight your main services and offerings',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600'
  },
  'export-process': {
    icon: Truck,
    label: 'Export Process',
    description: 'Step-by-step export workflow visualization',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-600'
  },
  'products-preview': {
    icon: Package,
    label: 'Products Preview',
    description: 'Featured products showcase section',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconColor: 'text-rose-600'
  },
  'interactive-gallery': {
    icon: ImageIcon,
    label: 'Interactive Gallery',
    description: 'Visual gallery with interactive elements',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconColor: 'text-indigo-600'
  },
  'testimonials': {
    icon: MessageSquare,
    label: 'Testimonials',
    description: 'Customer reviews and feedback section',
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconColor: 'text-teal-600'
  }
};

type SectionKey = keyof typeof SECTION_CONFIG;

export function HomeContentManager() {
  const [content, setContent] = useState<HomeContent[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedHeroImage, setSelectedHeroImage] = useState<HeroImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Helper function to show success modal
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
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
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
    }
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
        localStorage.setItem('hero-images-updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('hero-images-updated'));
        showSuccess('Hero image updated successfully!');
      }
    } catch (error) {
      console.error('Error updating hero image:', error);
      setMessage({ type: 'error', text: 'Failed to update hero image' });
    }
  };

  const handleDeleteHeroImage = async (imageId: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/hero-images/${imageId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchHeroImages();
        localStorage.setItem('hero-images-updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('hero-images-updated'));
        showSuccess('Hero image deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting hero image:', error);
      setMessage({ type: 'error', text: 'Failed to delete hero image' });
    } finally {
      setDeleting(false);
    }
  };

  const handleAddHeroImage = async () => {
    try {
      await fetchHeroImages();
      localStorage.setItem('hero-images-updated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('hero-images-updated'));
      showSuccess('Hero image added successfully!');
    } catch (error) {
      console.error('Error adding hero image:', error);
    }
  };

  const getSectionStats = (sectionKey: string) => {
    const section = content.find(c => c.section === sectionKey);
    if (!section) return { hasContent: false, isActive: false };
    
    const hasContent = !!(section.title || section.description || section.imageUrl);
    return { hasContent, isActive: section.isActive };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-500">Loading content management...</p>
        </div>
      </div>
    );
  }

  // Render section content based on active section
  const renderSectionContent = (sectionKey: string) => {
    switch (sectionKey) {
      case 'hero':
        return <HeroManager />;
      case 'about':
        return <AboutManager />;
      case 'services':
        return <ServicesManager />;
      case 'export-process':
        return <ExportProcessManager />;
      case 'products-preview':
        return <ProductPreviewManager />;
      case 'interactive-gallery':
        return <InteractiveGalleryManager />;
      case 'testimonials':
        return <TestimonialsManagerSimple />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span className="flex-1">{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* View Mode Toggle - Only show on main section list */}
      {!activeSection && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Click on a section card to manage its content</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Layers className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Section Cards Grid */}
      {!activeSection && (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {Object.entries(SECTION_CONFIG).map(([key, config]) => {
            const stats = getSectionStats(key);
            const Icon = config.icon;
            
            return (
              <Card
                key={key}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${config.borderColor} overflow-hidden ${
                  viewMode === 'list' ? 'flex items-center' : ''
                }`}
                onClick={() => setActiveSection(key)}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Card Header with Gradient */}
                    <div className={`h-2 bg-gradient-to-r ${config.color}`} />
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-6 w-6 ${config.iconColor}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          {stats.hasContent && (
                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <CheckCircle className="h-3 w-3" />
                              Content Set
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {config.label}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {config.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-400">Click to manage</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center w-full p-4 gap-4">
                    <div className={`w-3 h-full absolute left-0 top-0 bg-gradient-to-b ${config.color}`} />
                    <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0 ml-2`}>
                      <Icon className={`h-6 w-6 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {config.label}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {config.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {stats.hasContent && (
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <CheckCircle className="h-3 w-3" />
                          Set
                        </span>
                      )}
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Active Section Content */}
      {activeSection && (
        <div className="space-y-4">
          {/* Back Button and Section Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveSection(null)}
              className="gap-2"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Sections
            </Button>
            
            <div className="flex items-center gap-3">
              {(() => {
                const config = SECTION_CONFIG[activeSection as SectionKey];
                const Icon = config?.icon || Layout;
                return (
                  <>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{config?.label || activeSection}</h2>
                      <p className="text-sm text-gray-500">{config?.description}</p>
                    </div>
                  </>
                );
              })()}
            </div>
            
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/#${activeSection}`, '_blank')}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Preview Section
              </Button>
            </div>
          </div>

          {/* Section Content */}
          <Card className="p-6">
            {renderSectionContent(activeSection)}
          </Card>
        </div>
      )}

      {/* Modals */}
      <HeroImageModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedHeroImage(null); }}
        image={selectedHeroImage}
        onSave={handleSaveHeroImage}
        onDelete={handleDeleteHeroImage}
        onAdd={handleAddHeroImage}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      <HomeAboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        content={aboutContent}
        onSave={handleSaveAboutModal}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          if (confirmAction) confirmAction();
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
