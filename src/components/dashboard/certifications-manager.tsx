"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Plus,
  Edit,
  Trash2,
  Save,
  Award,
  Shield,
  CheckCircle,
  Leaf,
  Globe,
  Heart,
  FileCheck,
  Calendar,
  Power,
  AlertCircle
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";

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

interface CertificationsManagerProps {
  // No props currently needed
  _?: never;
}

export function CertificationsManager({}: CertificationsManagerProps) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editingCert, setEditingCert] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [certForm, setCertForm] = useState<Partial<Certification>>({
    name: '',
    fullName: '',
    issuer: '',
    validUntil: '',
    description: '',
    icon: 'award',
    color: 'from-blue-500 to-blue-600',
    features: '',
    isActive: true
  });

  const ICON_OPTIONS = [
    { value: 'award', label: 'Award', icon: Award },
    { value: 'shield', label: 'Shield', icon: Shield },
    { value: 'check-circle', label: 'Check Circle', icon: CheckCircle },
    { value: 'leaf', label: 'Leaf', icon: Leaf },
    { value: 'globe', label: 'Globe', icon: Globe },
    { value: 'heart', label: 'Heart', icon: Heart },
    { value: 'file-check', label: 'File Check', icon: FileCheck },
  ];

  const COLOR_OPTIONS = [
    { value: 'from-blue-500 to-blue-600', label: 'Blue' },
    { value: 'from-green-500 to-green-600', label: 'Green' },
    { value: 'from-emerald-500 to-emerald-600', label: 'Emerald' },
    { value: 'from-purple-500 to-purple-600', label: 'Purple' },
    { value: 'from-red-500 to-red-600', label: 'Red' },
    { value: 'from-amber-500 to-amber-600', label: 'Amber' },
    { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' },
    { value: 'from-pink-500 to-pink-600', label: 'Pink' },
  ];

  // Helper function to show success modal
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/certifications');
      const data = await response.json();
      
      if (response.ok) {
        setCertifications(data);
      } else {
        throw new Error(data.error || 'Failed to fetch certifications');
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      setMessage({ type: 'error', text: 'Failed to load certifications' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCertification = async () => {
    if (!certForm.name || !certForm.fullName || !certForm.issuer) {
      setMessage({ type: 'error', text: 'Name, full name, and issuer are required' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...certForm,
          features: certForm.features ? certForm.features.split(',').map(s => s.trim()) : []
        })
      });

      const data = await response.json();

      if (response.ok) {
        await fetchCertifications();
        showSuccess('Certification saved successfully!');
        setEditingCert(null);
        setCertForm({
          name: '',
          fullName: '',
          issuer: '',
          validUntil: '',
          description: '',
          icon: 'award',
          color: 'from-blue-500 to-blue-600',
          features: '',
          isActive: true
        });
      } else {
        throw new Error(data.error || 'Failed to save certification');
      }
    } catch (error) {
      console.error('Error saving certification:', error);
      setMessage({ type: 'error', text: 'Failed to save certification' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCertification = async (id: string) => {
    if (!certForm.name || !certForm.fullName || !certForm.issuer) {
      setMessage({ type: 'error', text: 'Name, full name, and issuer are required' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...certForm,
          features: certForm.features ? certForm.features.split(',').map(s => s.trim()) : []
        })
      });

      const data = await response.json();

      if (response.ok) {
        await fetchCertifications();
        showSuccess('Certification updated successfully!');
        setEditingCert(null);
        setCertForm({
          name: '',
          fullName: '',
          issuer: '',
          validUntil: '',
          description: '',
          icon: 'award',
          color: 'from-blue-500 to-blue-600',
          features: '',
          isActive: true
        });
      } else {
        throw new Error(data.error || 'Failed to update certification');
      }
    } catch (error) {
      console.error('Error updating certification:', error);
      setMessage({ type: 'error', text: 'Failed to update certification' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCertification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) {
      return;
    }

    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchCertifications();
        showSuccess('Certification deleted successfully!');
      } else {
        throw new Error('Failed to delete certification');
      }
    } catch (error) {
      console.error('Error deleting certification:', error);
      setMessage({ type: 'error', text: 'Failed to delete certification' });
    }
  };

  const handleEditCertification = (cert: Certification) => {
    setCertForm({
      ...cert,
      features: cert.features ? JSON.parse(cert.features).join(', ') : ''
    });
    setEditingCert(cert.id);
  };

  const handleCancelEdit = () => {
    setEditingCert(null);
    setCertForm({
      name: '',
      fullName: '',
      issuer: '',
      validUntil: '',
      description: '',
      icon: 'award',
      color: 'from-blue-500 to-blue-600',
      features: '',
      isActive: true
    });
  };

  const handleToggleStatus = async (cert: Certification) => {
    try {
      const response = await fetch(`/api/certifications/${cert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cert,
          isActive: !cert.isActive,
          features: cert.features ? JSON.parse(cert.features) : []
        })
      });

      if (response.ok) {
        await fetchCertifications();
        showSuccess(`Certification ${!cert.isActive ? 'enabled' : 'disabled'} successfully!`);
      } else {
        throw new Error('Failed to update certification status');
      }
    } catch (error) {
      console.error('Error updating certification status:', error);
      setMessage({ type: 'error', text: 'Failed to update certification status' });
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = ICON_OPTIONS.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Award;
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Certifications Management</h2>
        <Button
          onClick={() => setEditingCert('new')}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {/* Add/Edit Form */}
      {editingCert && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingCert === 'new' ? 'Add New Certification' : 'Edit Certification'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                value={certForm.name || ''}
                onChange={(e) => setCertForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., ISO 22000:2018"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                value={certForm.fullName || ''}
                onChange={(e) => setCertForm(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Food Safety Management Systems"
              />
            </div>

            {/* Issuer */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Issuer *</label>
              <input
                type="text"
                value={certForm.issuer || ''}
                onChange={(e) => setCertForm(prev => ({ ...prev, issuer: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., International Organization for Standardization"
              />
            </div>

            {/* Valid Until */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Valid Until</label>
              <input
                type="date"
                value={certForm.validUntil || ''}
                onChange={(e) => setCertForm(prev => ({ ...prev, validUntil: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <select
                value={certForm.icon || 'award'}
                onChange={(e) => setCertForm(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {ICON_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <select
                value={certForm.color || 'from-blue-500 to-blue-600'}
                onChange={(e) => setCertForm(prev => ({ ...prev, color: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {COLOR_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={certForm.description || ''}
                onChange={(e) => setCertForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter description"
              />
            </div>

            {/* Features */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
              <input
                type="text"
                value={certForm.features || ''}
                onChange={(e) => setCertForm(prev => ({ ...prev, features: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., HACCP, Prerequisite Programs, Management System Requirements"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
            <Button
              onClick={() => editingCert === 'new' ? handleSaveCertification() : handleUpdateCertification(editingCert)}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {saving ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {editingCert === 'new' ? 'Add Certification' : 'Update Certification'}
            </Button>
          </div>
        </Card>
      )}

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => {
          const IconComponent = getIconComponent(cert.icon || 'award');
          return (
            <Card key={cert.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cert.color || 'from-blue-500 to-blue-600'} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEditCertification(cert)}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Edit certification"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(cert)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      cert.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={cert.isActive ? 'Disable certification' : 'Enable certification'}
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCertification(cert.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete certification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                {cert.validUntil && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Valid until: {new Date(cert.validUntil).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {cert.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{cert.description}</p>
              )}

              {cert.features && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Key Features</h4>
                  <div className="space-y-1">
                    {JSON.parse(cert.features).slice(0, 3).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {JSON.parse(cert.features).length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{JSON.parse(cert.features).length - 3} more features
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </div>
  );
}
