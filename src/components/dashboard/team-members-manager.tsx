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
  Mail,
  Linkedin,
  User,
  Power,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import Image from "next/image";

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

interface TeamMembersManagerProps {
  // No props currently needed
  _?: never;
}

export function TeamMembersManager({}: TeamMembersManagerProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [memberForm, setMemberForm] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    bio: '',
    expertise: '',
    email: '',
    linkedin: '',
    imageUrl: '',
    isActive: true
  });

  // Helper function to show success modal
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/team-members');
      const data = await response.json();
      
      if (response.ok) {
        setTeamMembers(data);
      } else {
        throw new Error(data.error || 'Failed to fetch team members');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setMessage({ type: 'error', text: 'Failed to load team members' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
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
        setMemberForm(prev => ({ ...prev, imageUrl: data.imageUrl }));
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

  const handleSaveMember = async () => {
    if (!memberForm.name || !memberForm.position) {
      setMessage({ type: 'error', text: 'Name and position are required' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...memberForm,
          expertise: memberForm.expertise ? memberForm.expertise.split(',').map(s => s.trim()) : []
        })
      });

      const data = await response.json();

      if (response.ok) {
        await fetchTeamMembers();
        showSuccess('Team member saved successfully!');
        setEditingMember(null);
        setMemberForm({
          name: '',
          position: '',
          bio: '',
          expertise: '',
          email: '',
          linkedin: '',
          imageUrl: '',
          isActive: true
        });
      } else {
        throw new Error(data.error || 'Failed to save team member');
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      setMessage({ type: 'error', text: 'Failed to save team member' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMember = async (id: string) => {
    if (!memberForm.name || !memberForm.position) {
      setMessage({ type: 'error', text: 'Name and position are required' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...memberForm,
          expertise: memberForm.expertise ? memberForm.expertise.split(',').map(s => s.trim()) : []
        })
      });

      const data = await response.json();

      if (response.ok) {
        await fetchTeamMembers();
        showSuccess('Team member updated successfully!');
        setEditingMember(null);
        setMemberForm({
          name: '',
          position: '',
          bio: '',
          expertise: '',
          email: '',
          linkedin: '',
          imageUrl: '',
          isActive: true
        });
      } else {
        throw new Error(data.error || 'Failed to update team member');
      }
    } catch (error) {
      console.error('Error updating team member:', error);
      setMessage({ type: 'error', text: 'Failed to update team member' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchTeamMembers();
        showSuccess('Team member deleted successfully!');
      } else {
        throw new Error('Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setMessage({ type: 'error', text: 'Failed to delete team member' });
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setMemberForm({
      ...member,
      expertise: member.expertise ? JSON.parse(member.expertise).join(', ') : ''
    });
    setEditingMember(member.id);
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setMemberForm({
      name: '',
      position: '',
      bio: '',
      expertise: '',
      email: '',
      linkedin: '',
      imageUrl: '',
      isActive: true
    });
  };

  const handleToggleStatus = async (member: TeamMember) => {
    try {
      const response = await fetch(`/api/team-members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...member,
          isActive: !member.isActive,
          expertise: member.expertise ? JSON.parse(member.expertise) : []
        })
      });

      if (response.ok) {
        await fetchTeamMembers();
        showSuccess(`Team member ${!member.isActive ? 'enabled' : 'disabled'} successfully!`);
      } else {
        throw new Error('Failed to update team member status');
      }
    } catch (error) {
      console.error('Error updating team member status:', error);
      setMessage({ type: 'error', text: 'Failed to update team member status' });
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Members Management</h2>
        <Button
          onClick={() => setEditingMember('new')}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Add/Edit Form */}
      {editingMember && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingMember === 'new' ? 'Add New Team Member' : 'Edit Team Member'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                value={memberForm.name || ''}
                onChange={(e) => setMemberForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter name"
              />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Position *</label>
              <input
                type="text"
                value={memberForm.position || ''}
                onChange={(e) => setMemberForm(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter position"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={memberForm.email || ''}
                onChange={(e) => setMemberForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter email"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                type="url"
                value={memberForm.linkedin || ''}
                onChange={(e) => setMemberForm(prev => ({ ...prev, linkedin: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter LinkedIn URL"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={memberForm.bio || ''}
                onChange={(e) => setMemberForm(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter bio"
              />
            </div>

            {/* Expertise */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Expertise (comma-separated)</label>
              <input
                type="text"
                value={memberForm.expertise || ''}
                onChange={(e) => setMemberForm(prev => ({ ...prev, expertise: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., International Trade, Quality Management, Supply Chain"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <div className="flex items-center space-x-4">
                {memberForm.imageUrl && (
                  <Image
                    src={memberForm.imageUrl}
                    alt="Profile preview"
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
                      if (file) handleImageUpload(file);
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
              onClick={() => editingMember === 'new' ? handleSaveMember() : handleUpdateMember(editingMember)}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {saving ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {editingMember === 'new' ? 'Add Member' : 'Update Member'}
            </Button>
          </div>
        </Card>
      )}

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-gray-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-emerald-600">{member.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditMember(member)}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit member"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleToggleStatus(member)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    member.isActive
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                  title={member.isActive ? 'Disable member' : 'Enable member'}
                >
                  <Power className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {member.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
            )}

            {member.expertise && (
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-1">
                  {JSON.parse(member.expertise).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </Card>
        ))}
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
