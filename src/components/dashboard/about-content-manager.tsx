"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
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
  Trash2,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { AboutContentModal } from "./about-content-modal";
import { AboutFeatureModal } from "./about-feature-modal";
import { CertificationsManager, type CertificationsManagerRef } from "./certifications-manager";
import { TeamMembersManager } from "./team-members-manager";
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

export function AboutContentManager() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [features, setFeatures] = useState<AboutFeature[]>([]);
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
  const [toggling, setToggling] = useState<string | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [editingContent, setEditingContent] = useState<AboutContent | null>(null);
  const [editingFeature, setEditingFeature] = useState<AboutFeature | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('story');
  const certificationsManagerRef = useRef<CertificationsManagerRef | null>(null);

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
    fetchContent();
    fetchFeatures();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/about-content');
      const data = await response.json();
      
      if (response.ok) {
        setContent(data);
      } else {
        throw new Error(data.error || 'Failed to fetch content');
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      setMessage({ type: 'error', text: 'Failed to load about content' });
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/about-features');
      const data = await response.json();
      
      if (response.ok) {
        setFeatures(data);
      } else {
        throw new Error(data.error || 'Failed to fetch features');
      }
    } catch (error) {
      console.error('Error fetching about features:', error);
      setMessage({ type: 'error', text: 'Failed to load about features' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = (section: string) => {
    setSelectedSection(section);
    setEditingContent(null);
    setShowContentModal(true);
  };

  const handleEditContent = (content: AboutContent) => {
    setEditingContent(content);
    setSelectedSection(content.section);
    setShowContentModal(true);
  };

  const handleAddFeature = (section: string) => {
    setSelectedSection(section);
    setEditingFeature(null);
    setShowFeatureModal(true);
  };

  const handleEditFeature = (feature: AboutFeature) => {
    setEditingFeature(feature);
    setShowFeatureModal(true);
  };

  const handleDeleteContent = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/about-content/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchContent();
        showSuccess('Content deleted successfully!');
      } else {
        throw new Error('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      setMessage({ type: 'error', text: 'Failed to delete content' });
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteFeature = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/about-features/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchFeatures();
        showSuccess('Feature deleted successfully!');
      } else {
        throw new Error('Failed to delete feature');
      }
    } catch (error) {
      console.error('Error deleting feature:', error);
      setMessage({ type: 'error', text: 'Failed to delete feature' });
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleContentStatus = async (content: AboutContent) => {
    setToggling(content.id);
    try {
      // Special handling for certifications section
      if (content.section === 'certifications' && content.id === 'certifications') {
        // Create or update certifications content
        const response = await fetch('/api/about-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'certifications',
            title: 'Certifications & Compliance',
            subtitle: 'Quality You Can Trust',
            description: 'Our commitment to excellence is backed by comprehensive certifications and compliance with international standards, ensuring the highest quality and safety of our products.',
            isActive: !content.isActive
          })
        });
        
        if (response.ok) {
          await fetchContent();
          showSuccess(`Certifications section ${!content.isActive ? 'enabled' : 'disabled'} successfully!`);
        } else {
          throw new Error('Failed to update certifications section status');
        }
      } else {
        const response = await fetch(`/api/about-content/${content.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isActive: !content.isActive })
        });
        
        if (response.ok) {
          await fetchContent();
          showSuccess(`Content ${!content.isActive ? 'enabled' : 'disabled'} successfully!`);
        } else {
          throw new Error('Failed to update content status');
        }
      }
    } catch (error) {
      console.error('Error toggling content status:', error);
      setMessage({ type: 'error', text: 'Failed to update content status' });
    } finally {
      setToggling(null);
    }
  };

  const handleToggleFeatureStatus = async (feature: AboutFeature) => {
    setToggling(feature.id);
    try {
      const response = await fetch(`/api/about-features/${feature.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !feature.isActive })
      });
      
      if (response.ok) {
        await fetchFeatures();
        showSuccess(`Feature ${!feature.isActive ? 'enabled' : 'disabled'} successfully!`);
      } else {
        throw new Error('Failed to update feature status');
      }
    } catch (error) {
      console.error('Error toggling feature status:', error);
      setMessage({ type: 'error', text: 'Failed to update feature status' });
    } finally {
      setToggling(null);
    }
  };

  const handleContentSaved = () => {
    setShowContentModal(false);
    setEditingContent(null);
    fetchContent();
    showSuccess(editingContent ? 'Content updated successfully!' : 'Content added successfully!');
  };

  const handleFeatureSaved = () => {
    setShowFeatureModal(false);
    setEditingFeature(null);
    fetchFeatures();
  };

  const getSectionTitle = (section: string) => {
    const titles: { [key: string]: string } = {
      'story': 'Our Story',
      'values': 'Why Choose Us',
      'vision': 'Vision',
      'mission': 'Mission',
      'certifications': 'Certifications',
      'team': 'Our Directors'
    };
    return titles[section] || section;
  };

  const getSectionIcon = (section: string) => {
    const icons: Record<string, LucideIcon> = {
      'story': Heart,
      'values': Star,
      'vision': Target,
      'mission': Award,
      'certifications': Award,
      'team': Users
    };
    return icons[section] || Star;
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
        <div className={`p-3 md:p-4 rounded-lg flex items-center space-x-2 ${
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

      {/* Content Sections */}
      {['story', 'values', 'vision-mission', 'certifications', 'team'].map((section) => {
        const sectionContent = content.find(c => c.section === section);
        const sectionFeatures = features.filter(f => f.section === section);
        const SectionIcon = getSectionIcon(section);

        // Special handling for certifications section
        if (section === 'certifications') {
          const certificationsContent = content.find(c => c.section === 'certifications');
          const hasActiveContent = certificationsContent?.isActive ?? true;
          
          return (
            <Card key={section} className={`p-4 md:p-6 ${!hasActiveContent ? 'border-amber-200 bg-amber-50' : ''}`}>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                    hasActiveContent ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    <SectionIcon className={`h-5 w-5 md:h-6 md:w-6 ${
                      hasActiveContent ? 'text-emerald-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-gray-900">
                      {getSectionTitle(section)}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Manage certificate images for the certifications section
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    hasActiveContent 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {hasActiveContent ? 'Active' : 'Disabled'}
                  </span>
                  <button
                    onClick={() => certificationsContent && handleToggleContentStatus(certificationsContent)}
                    className={`p-2 rounded-lg transition-colors ${
                      hasActiveContent 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title="Toggle section visibility"
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  <Button 
                    onClick={() => certificationsManagerRef.current?.handleAddCertification()} 
                    className="flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:inline">Add Certification</span>
                  </Button>
                </div>
              </div>


              <CertificationsManager 
                ref={certificationsManagerRef}
                isActive={hasActiveContent}
                onToggle={() => certificationsContent && handleToggleContentStatus(certificationsContent)}
              />
            </Card>
          );
        }

        // Special handling for vision-mission section
        if (section === 'vision-mission') {
          const visionContent = content.find(c => c.section === 'vision');
          const missionContent = content.find(c => c.section === 'mission');
          
          return (
            <Card key={section} className="p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-gray-900">
                      Vision & Mission
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Manage vision and mission content side by side
                    </p>
                  </div>
                </div>
              </div>
                
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Vision Content */}
                <div className="space-y-4">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 flex items-center">
                    <Target className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 mr-2" />
                    Vision
                  </h4>
                  {visionContent ? (
                    <div className="p-3 md:p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                            Vision Content
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            visionContent.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {visionContent.isActive ? 'Active' : 'Disabled'}
                          </span>
                </div>
                
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditContent(visionContent)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit vision"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          
                          <button
                            onClick={() => handleToggleContentStatus(visionContent)}
                            disabled={toggling === visionContent.id}
                            className={`p-1.5 rounded-lg transition-colors ${
                              visionContent.isActive
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-gray-400 hover:bg-gray-50'
                            } ${toggling === visionContent.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={visionContent.isActive ? 'Disable vision' : 'Enable vision'}
                          >
                            {toggling === visionContent.id ? (
                              <ToggleLoader size="sm" />
                            ) : (
                              <Power className="h-3.5 w-3.5" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => showConfirmation(
                              'Delete Vision',
                              'Are you sure you want to delete this vision content? This action cannot be undone.',
                              () => handleDeleteContent(visionContent.id)
                            )}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete vision"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                  </div>
                </div>

                      <div className="space-y-2">
                        {visionContent.title && (
                          <h5 className="text-sm md:text-base font-semibold text-gray-900">{visionContent.title}</h5>
                        )}
                        {visionContent.description && (
                          <p className="text-xs md:text-sm text-gray-700 line-clamp-3">
                            {visionContent.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 md:p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <Target className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs md:text-sm text-gray-500">No vision content added</p>
                    </div>
                  )}
                </div>

                {/* Mission Content */}
                <div className="space-y-4">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 flex items-center">
                    <Award className="h-4 w-4 md:h-5 md:w-5 text-amber-600 mr-2" />
                    Mission
                  </h4>
                  {missionContent ? (
                    <div className="p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">
                            Mission Content
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            missionContent.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {missionContent.isActive ? 'Active' : 'Disabled'}
                          </span>
                  </div>
                        
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditContent(missionContent)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit mission"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          
                          <button
                            onClick={() => handleToggleContentStatus(missionContent)}
                            disabled={toggling === missionContent.id}
                            className={`p-1.5 rounded-lg transition-colors ${
                              missionContent.isActive
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-gray-400 hover:bg-gray-50'
                            } ${toggling === missionContent.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={missionContent.isActive ? 'Disable mission' : 'Enable mission'}
                          >
                            {toggling === missionContent.id ? (
                              <ToggleLoader size="sm" />
                            ) : (
                              <Power className="h-3.5 w-3.5" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => showConfirmation(
                              'Delete Mission',
                              'Are you sure you want to delete this mission content? This action cannot be undone.',
                              () => handleDeleteContent(missionContent.id)
                            )}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete mission"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                  </div>
                    </div>

                      <div className="space-y-2">
                        {missionContent.title && (
                          <h5 className="text-sm md:text-base font-semibold text-gray-900">{missionContent.title}</h5>
                        )}
                        {missionContent.description && (
                          <p className="text-xs md:text-sm text-gray-700 line-clamp-3">
                            {missionContent.description}
                          </p>
                        )}
                    </div>
                  </div>
                  ) : (
                    <div className="p-3 md:p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <Award className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs md:text-sm text-gray-500">No mission content added</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        }

        // Special handling for team section
        if (section === 'team') {
          return (
            <Card key={section} className="p-6">
              {/* Team Members Manager */}
              <TeamMembersManager />

              {/* Section Content */}
              {sectionContent && (
                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                        Section Content
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        sectionContent.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {sectionContent.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditContent(sectionContent)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit content"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      
                      <button
                        onClick={() => handleToggleContentStatus(sectionContent)}
                        disabled={toggling === sectionContent.id}
                        className={`p-1.5 rounded-lg transition-colors ${
                          sectionContent.isActive
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-50'
                        } ${toggling === sectionContent.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={sectionContent.isActive ? 'Disable content' : 'Enable content'}
                      >
                        {toggling === sectionContent.id ? (
                          <ToggleLoader size="sm" />
                        ) : (
                          <Power className="h-3.5 w-3.5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => showConfirmation(
                          'Delete Content',
                          'Are you sure you want to delete this content? This action cannot be undone.',
                          () => handleDeleteContent(sectionContent.id)
                        )}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete content"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sectionContent.title && (
                      <h4 className="font-semibold text-gray-900">{sectionContent.title}</h4>
                    )}
                    {sectionContent.subtitle && (
                      <p className="text-sm text-gray-600">{sectionContent.subtitle}</p>
                    )}
                    {sectionContent.description && (
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {sectionContent.description}
                      </p>
                    )}
                    {sectionContent.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={sectionContent.imageUrl}
                          alt={sectionContent.title || 'Content image'}
                          width={100}
                          height={60}
                          className="w-24 h-15 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        }

        // Special handling for values section (Why Choose Us)
        if (section === 'values') {
          return (
            <Card key={section} className="p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <SectionIcon className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-gray-900">
                      {getSectionTitle(section)}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Manage features for the {getSectionTitle(section).toLowerCase()} section
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleAddFeature(section)}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              {/* Section Features */}
              {sectionFeatures.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionFeatures.map((feature) => (
                    <div key={feature.id} className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                            Feature
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            feature.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {feature.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditFeature(feature)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit feature"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          
                          <button
                            onClick={() => handleToggleFeatureStatus(feature)}
                            disabled={toggling === feature.id}
                            className={`p-1.5 rounded-lg transition-colors ${
                              feature.isActive
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-gray-400 hover:bg-gray-50'
                            } ${toggling === feature.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={feature.isActive ? 'Disable feature' : 'Enable feature'}
                          >
                            {toggling === feature.id ? (
                              <ToggleLoader size="sm" />
                            ) : (
                              <Power className="h-3.5 w-3.5" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => showConfirmation(
                              'Delete Feature',
                              'Are you sure you want to delete this feature? This action cannot be undone.',
                              () => handleDeleteFeature(feature.id)
                            )}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete feature"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs md:text-sm font-semibold text-gray-900">{feature.title}</h4>
                        {feature.description && (
                          <p className="text-xs text-gray-700 line-clamp-2">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {sectionFeatures.length === 0 && (
                <div className="p-6 md:p-8 text-center">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs md:text-sm text-gray-500">No features added yet</p>
                </div>
              )}
            </Card>
          );
        }

        // Special handling for story section (Our Story)
        if (section === 'story') {
          return (
            <Card key={section} className="p-4 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <SectionIcon className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-gray-900">
                    {getSectionTitle(section)}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Manage content for the {getSectionTitle(section).toLowerCase()} section
                  </p>
                </div>
              </div>

              {/* Section Content */}
              {sectionContent && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                        Content
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        sectionContent.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {sectionContent.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditContent(sectionContent)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit content"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      
                      <button
                        onClick={() => handleToggleContentStatus(sectionContent)}
                        disabled={toggling === sectionContent.id}
                        className={`p-1.5 rounded-lg transition-colors ${
                          sectionContent.isActive
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-50'
                        } ${toggling === sectionContent.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={sectionContent.isActive ? 'Disable content' : 'Enable content'}
                      >
                        {toggling === sectionContent.id ? (
                          <ToggleLoader size="sm" />
                        ) : (
                          <Power className="h-3.5 w-3.5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => showConfirmation(
                          'Delete Content',
                          'Are you sure you want to delete this content? This action cannot be undone.',
                          () => handleDeleteContent(sectionContent.id)
                        )}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete content"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sectionContent.title && (
                      <h4 className="font-semibold text-gray-900">{sectionContent.title}</h4>
                    )}
                    {sectionContent.subtitle && (
                      <p className="text-sm text-gray-600">{sectionContent.subtitle}</p>
                    )}
                    {sectionContent.description && (
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {sectionContent.description}
                      </p>
                    )}
                    {sectionContent.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={sectionContent.imageUrl}
                          alt={sectionContent.title || 'Content image'}
                          width={100}
                          height={60}
                          className="w-24 h-15 object-cover rounded"
                        />
                      </div>
                    )}
                    {sectionContent.buttonText && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {sectionContent.buttonText}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!sectionContent && (
                <div className="p-8 text-center">
                  <Heart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No content added yet</p>
                </div>
              )}
            </Card>
          );
        }

        return (
          <Card key={section} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <SectionIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {getSectionTitle(section)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage content and features for the {getSectionTitle(section).toLowerCase()} section
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleAddContent(section)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
                <Button
                  onClick={() => handleAddFeature(section)}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>

            {/* Section Content */}
            {sectionContent && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                      Content
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      sectionContent.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {sectionContent.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEditContent(sectionContent)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit content"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    
                    <button
                      onClick={() => handleToggleContentStatus(sectionContent)}
                      disabled={toggling === sectionContent.id}
                      className={`p-1.5 rounded-lg transition-colors ${
                        sectionContent.isActive
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      } ${toggling === sectionContent.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={sectionContent.isActive ? 'Disable content' : 'Enable content'}
                    >
                      {toggling === sectionContent.id ? (
                        <ToggleLoader size="sm" />
                      ) : (
                        <Power className="h-3.5 w-3.5" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => showConfirmation(
                        'Delete Content',
                        'Are you sure you want to delete this content? This action cannot be undone.',
                        () => handleDeleteContent(sectionContent.id)
                      )}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete content"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
      </div>

                <div className="space-y-2">
                  {sectionContent.title && (
                    <h4 className="font-semibold text-gray-900">{sectionContent.title}</h4>
                  )}
                  {sectionContent.subtitle && (
                    <p className="text-sm text-gray-600">{sectionContent.subtitle}</p>
                  )}
                  {sectionContent.description && (
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {sectionContent.description}
                    </p>
                  )}
                  {sectionContent.imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={sectionContent.imageUrl}
                        alt={sectionContent.title || 'Content image'}
                        width={100}
                        height={60}
                        className="w-24 h-15 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section Features */}
            {sectionFeatures.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Features ({sectionFeatures.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sectionFeatures.map((feature) => (
                    <div key={feature.id} className="p-3 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                            #{feature.order}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            feature.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {feature.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditFeature(feature)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit feature"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          
                          <button
                            onClick={() => handleToggleFeatureStatus(feature)}
                            disabled={toggling === feature.id}
                            className={`p-1 rounded transition-colors ${
                              feature.isActive
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-gray-400 hover:bg-gray-50'
                            } ${toggling === feature.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={feature.isActive ? 'Disable feature' : 'Enable feature'}
                          >
                            {toggling === feature.id ? (
                              <ToggleLoader size="sm" />
                            ) : (
                              <Power className="h-3 w-3" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => showConfirmation(
                              'Delete Feature',
                              'Are you sure you want to delete this feature? This action cannot be undone.',
                              () => handleDeleteFeature(feature.id)
                            )}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete feature"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      <h5 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h5>
                      {feature.description && (
                        <p className="text-xs text-gray-600 line-clamp-2">{feature.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
      })}

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

      <AboutContentModal
        isOpen={showContentModal}
        onClose={() => {
          setShowContentModal(false);
          setEditingContent(null);
        }}
        onSave={handleContentSaved}
        content={editingContent}
        section={selectedSection}
      />

      <AboutFeatureModal
        isOpen={showFeatureModal}
        onClose={() => {
          setShowFeatureModal(false);
          setEditingFeature(null);
        }}
        onSave={handleFeatureSaved}
        feature={editingFeature}
        section={selectedSection}
      />
    </div>
  );
}
