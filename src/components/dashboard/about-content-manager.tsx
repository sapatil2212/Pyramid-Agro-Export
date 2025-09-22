"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Eye, 
  Edit, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { AboutContentModal } from "./about-content-modal";
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

interface AboutImage {
  id: string;
  imageUrl: string;
  altText?: string;
  title?: string;
  subtitle?: string;
  section: string;
  order: number;
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

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  expertise?: string;
  email?: string;
  linkedin?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Certification {
  id: string;
  name: string;
  fullName: string;
  issuer: string;
  validUntil?: string;
  description?: string;
  icon?: string;
  color?: string;
  features?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


interface AboutContentManagerProps {
  // No props currently needed
  _?: never;
}

export function AboutContentManager({}: AboutContentManagerProps) {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [aboutImages, setAboutImages] = useState<AboutImage[]>([]);
  const [aboutFeatures, setAboutFeatures] = useState<AboutFeature[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<AboutContent | null>(null);

  // Helper function to show success modal
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  // Initialize default sections
  const defaultSections = [
    {
      section: 'story',
      title: 'About Pyramid Agro Export',
      subtitle: 'Bridging Tradition with Innovation',
      description: 'With decades of expertise in agricultural exports, Pyramid Agro Exports has been a trusted name in the export of premium-quality fresh fruits and vegetables. We take pride in delivering the finest agricultural produce to customers worldwide from our base in Nashik, Maharashtra.\n\nOur commitment extends beyond business – we work closely with local farmers, promoting sustainable farming practices and ensuring that every product undergoes rigorous quality checks to meet the highest international standards for freshness and nutrition.',
      buttonText: 'Learn More About Us',
      buttonLink: '/about',
      imageUrl: ''
    },
    {
      section: 'values',
      title: 'Our Core Values',
      subtitle: 'Values That Define Us',
      description: 'Our values are not just words on a wall – they are the foundation of every decision we make and every relationship we build in our journey to connect farms with global markets.',
      buttonText: 'View Our Values',
      buttonLink: '/about#values',
      imageUrl: ''
    },
    {
      section: 'team',
      title: 'Meet Our Team',
      subtitle: 'The People Behind Our Success',
      description: 'Our diverse team combines deep agricultural knowledge with international business expertise to deliver exceptional results for our partners worldwide.',
      buttonText: 'Meet the Team',
      buttonLink: '/about#team',
      imageUrl: ''
    },
    {
      section: 'certifications',
      title: 'Quality You Can Trust',
      subtitle: 'Certifications & Compliance',
      description: 'Our commitment to excellence is backed by comprehensive certifications and compliance with international standards, ensuring the highest quality and safety of our products.',
      buttonText: 'View Certifications',
      buttonLink: '/about#certifications',
      imageUrl: ''
    }
  ];

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchContent(),
        fetchAboutImages(),
        fetchAboutFeatures(),
        fetchTeamMembers(),
        fetchCertifications()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

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
      console.error('Error fetching content:', error);
    }
  };

  const fetchAboutImages = async () => {
    try {
      const response = await fetch('/api/about-images');
      const data = await response.json();
      
      if (response.ok) {
        setAboutImages(data);
      } else {
        throw new Error(data.error || 'Failed to fetch about images');
      }
    } catch (error) {
      console.error('Error fetching about images:', error);
    }
  };

  const fetchAboutFeatures = async () => {
    try {
      const response = await fetch('/api/about-features');
      const data = await response.json();
      
      if (response.ok) {
        setAboutFeatures(data);
      } else {
        throw new Error(data.error || 'Failed to fetch about features');
      }
    } catch (error) {
      console.error('Error fetching about features:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team-members');
      const data = await response.json();
      
      if (response.ok) {
        setTeamMembers(data);
      } else {
        throw new Error(data.error || 'Failed to fetch team members');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/certifications');
      const data = await response.json();
      
      if (response.ok) {
        setCertifications(data);
      } else {
        throw new Error(data.error || 'Failed to fetch certifications');
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  };



  const getSectionTitle = (section: string) => {
    const titles: { [key: string]: string } = {
      'story': 'Company Story',
      'values': 'Core Values',
      'team': 'Team Section',
      'certifications': 'Certifications'
    };
    return titles[section] || section;
  };

  const getSectionImages = (section: string) => {
    return aboutImages.filter(img => img.section === section);
  };

  const getSectionFeatures = (section: string) => {
    return aboutFeatures.filter(feature => feature.section === section);
  };

  const handleOpenModal = (section: string) => {
    const sectionContent = content.find(c => c.section === section);
    setSelectedContent(sectionContent || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  const handleSaveContent = async (updatedContent: AboutContent) => {   
    try {
      const response = await fetch('/api/home-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      });

      if (response.ok) {
        await fetchContent();
        showSuccess('Content updated successfully!');
      } else {
        throw new Error('Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      setMessage({ type: 'error', text: 'Failed to update content' });
    } finally {
      // Cleanup if needed
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
        {defaultSections.map((defaultSection) => {
          const section = content.find(c => c.section === defaultSection.section) || defaultSection;
          const sectionImages = getSectionImages(defaultSection.section);
          const sectionFeatures = getSectionFeatures(defaultSection.section);
          
          return (
            <Card key={defaultSection.section} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {getSectionTitle(defaultSection.section)}
                </h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenModal(defaultSection.section)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('/about', '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Preview */}
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

                {/* Section-specific content counts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{sectionImages.length}</div>
                    <div className="text-sm text-gray-600">Images</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{sectionFeatures.length}</div>
                    <div className="text-sm text-gray-600">Features</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {defaultSection.section === 'team' ? teamMembers.length : 
                       defaultSection.section === 'certifications' ? certifications.length : 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      {defaultSection.section === 'team' ? 'Team Members' : 
                       defaultSection.section === 'certifications' ? 'Certifications' : 'Items'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* About Content Modal */}
      <AboutContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={selectedContent}
        onSave={handleSaveContent}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </div>
  );
}
