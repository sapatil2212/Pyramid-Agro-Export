"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { 
  Plus,
  Edit,
  Trash2,
  Power,
  Upload,
  Image as ImageIcon,
  Award,
  Calendar,
  Building,
  FileText
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import Image from "next/image";

interface Certification {
  id: string;
  name: string;
  fullName: string;
  issuer: string;
  validUntil?: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  color?: string;
  features?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CertificationsManagerProps {
  isActive: boolean;
  onToggle: () => void;
}

export interface CertificationsManagerRef {
  handleAddCertification: () => void;
}

export const CertificationsManager = forwardRef<CertificationsManagerRef, CertificationsManagerProps>(
  ({ isActive, onToggle }, ref) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  // Fetch certifications
  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/certifications');
      if (response.ok) {
        const data = await response.json();
        setCertifications(data);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  useImperativeHandle(ref, () => ({
    handleAddCertification
  }));

  // Handle delete certification
  const handleDeleteCertification = async (id: string) => {
    try {
      setDeleting(true);
      const response = await fetch(`/api/certifications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCertifications(prev => prev.filter(cert => cert.id !== id));
        setSuccessMessage("Certification deleted successfully!");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error deleting certification:', error);
    } finally {
      setDeleting(false);
    }
  };

  // Handle toggle certification status
  const handleToggleCertificationStatus = async (cert: Certification) => {
    try {
      setToggling(cert.id);
      const response = await fetch(`/api/certifications/${cert.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...cert,
          isActive: !cert.isActive,
        }),
      });

      if (response.ok) {
        setCertifications(prev => 
          prev.map(c => c.id === cert.id ? { ...c, isActive: !c.isActive } : c)
        );
        setSuccessMessage(`Certification ${!cert.isActive ? 'enabled' : 'disabled'} successfully!`);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error toggling certification status:', error);
    } finally {
      setToggling(null);
    }
  };

  // Handle edit certification
  const handleEditCertification = (cert: Certification) => {
    setEditingCert(cert);
    setShowCertModal(true);
  };

  // Handle add new certification
  const handleAddCertification = () => {
    setEditingCert(null);
    setShowCertModal(true);
  };

  // Handle certification saved
  const handleCertificationSaved = () => {
    fetchCertifications();
    setShowCertModal(false);
    setEditingCert(null);
    setSuccessMessage(editingCert ? "Certification updated successfully!" : "Certification added successfully!");
    setShowSuccessModal(true);
  };

  // Show confirmation dialog
  const showConfirmation = (title: string, message: string, action: () => void) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
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

      {/* Certifications Grid */}
      {certifications.length === 0 ? (
        <Card className="p-12 text-center">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Certifications</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first certification.</p>
          <Button onClick={handleAddCertification} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Certification</span>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-48 w-full bg-gray-100">
                {cert.imageUrl ? (
                  <Image
                    src={cert.imageUrl}
                    alt={cert.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cert.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {cert.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{cert.name}</h4>
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={() => handleEditCertification(cert)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit certification"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    
                    <button
                      onClick={() => handleToggleCertificationStatus(cert)}
                      disabled={toggling === cert.id}
                      className={`p-1 rounded transition-colors ${
                        cert.isActive
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      } ${toggling === cert.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={cert.isActive ? 'Disable certification' : 'Enable certification'}
                    >
                      {toggling === cert.id ? (
                        <ToggleLoader size="sm" />
                      ) : (
                        <Power className="h-3 w-3" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => showConfirmation(
                        'Delete Certification',
                        'Are you sure you want to delete this certification? This action cannot be undone.',
                        () => handleDeleteCertification(cert.id)
                      )}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete certification"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{cert.fullName}</p>
                
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Building className="h-3 w-3" />
                    <span className="line-clamp-1">{cert.issuer}</span>
                  </div>
                  {cert.validUntil && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Valid until {new Date(cert.validUntil).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
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

      {/* Certification Modal - We'll create this next */}
      {showCertModal && (
        <CertificationModal
          isOpen={showCertModal}
          onClose={() => {
            setShowCertModal(false);
            setEditingCert(null);
          }}
          onSave={handleCertificationSaved}
          certification={editingCert}
        />
      )}
    </div>
  );
});

CertificationsManager.displayName = 'CertificationsManager';

// Certification Modal Component
interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  certification: Certification | null;
}

function CertificationModal({ isOpen, onClose, onSave, certification }: CertificationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    issuer: '',
    validUntil: '',
    description: '',
    imageUrl: '',
    icon: 'award',
    color: 'from-blue-500 to-blue-600',
    features: [] as string[],
    order: 0,
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  useEffect(() => {
    if (certification) {
      setFormData({
        name: certification.name,
        fullName: certification.fullName || certification.name,
        issuer: certification.issuer || '',
        validUntil: certification.validUntil || '',
        description: certification.description || '',
        imageUrl: certification.imageUrl || '',
        icon: certification.icon || 'award',
        color: certification.color || 'from-blue-500 to-blue-600',
        features: certification.features ? JSON.parse(certification.features) : [],
        order: certification.order,
        isActive: certification.isActive
      });
    } else {
      setFormData({
        name: '',
        fullName: '',
        issuer: '',
        validUntil: '',
        description: '',
        imageUrl: '',
        icon: 'award',
        color: 'from-blue-500 to-blue-600',
        features: [],
        order: 0,
        isActive: true
      });
    }
  }, [certification]);

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadSuccess(false);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'certifications');

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

  const handleDragEnter = (e: React.DragEvent) => {
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
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const url = certification ? `/api/certifications/${certification.id}` : '/api/certifications';
      const method = certification ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          features: formData.features.length > 0 ? formData.features : null
        }),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving certification:', error);
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
            <h2 className="text-lg font-semibold text-gray-900">
              {certification ? 'Edit Certification' : 'Add New Certification'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Certificate Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value, fullName: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., ISO 22000:2018"
                required
              />
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Certificate Image *</label>
              <div 
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  isDragOver 
                    ? 'border-emerald-400 bg-emerald-50' 
                    : formData.imageUrl 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 hover:border-emerald-400'
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={uploading}
                />
                
                {formData.imageUrl ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <Image
                        src={formData.imageUrl}
                        alt="Certificate preview"
                        width={240}
                        height={180}
                        style={{ width: 'auto', height: 'auto' }}
                        className="mx-auto rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, imageUrl: '' }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Success Message */}
                    {uploadSuccess && (
                      <div className={`flex items-center justify-center space-x-2 rounded-lg py-2 px-3 ${
                        isPlaceholder 
                          ? 'text-amber-600 bg-amber-50 border border-amber-200' 
                          : 'text-green-600 bg-green-50 border border-green-200'
                      }`}>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">
                          {isPlaceholder ? 'Placeholder image loaded (Cloudinary not configured)' : 'Image uploaded successfully!'}
                        </span>
                      </div>
                    )}
                    
                    {/* File Info */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Certificate image ready</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center ${
                      isDragOver ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      <ImageIcon className={`h-6 w-6 ${
                        isDragOver ? 'text-emerald-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="space-y-1">
                      {isDragOver ? (
                        <p className="text-sm font-medium text-emerald-600">
                          Drop your image here
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-emerald-600 hover:text-emerald-500">Click to upload</span>
                          <span className="text-gray-500"> or drag and drop</span>
                        </p>
                      )}
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
                
                {uploading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                disabled={saving}
                className="text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={saving || uploading}
                className="flex items-center space-x-2 text-sm"
              >
                {saving ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <FileText className="h-3 w-3" />
                )}
                <span>{saving ? 'Saving...' : (certification ? 'Update' : 'Create')}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}