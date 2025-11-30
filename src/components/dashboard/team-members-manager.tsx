"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { 
  Eye, 
  Edit, 
  Plus,
  CheckCircle,
  AlertCircle,
  Users,
  Upload,
  Save,
  X,
  Power,
  Trash2,
  User
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { TeamMemberModal } from "./team-member-modal-simple";
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

export function TeamMembersManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
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
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

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
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/team-members');
      const data = await response.json();
      
      if (response.ok) {
        setMembers(data);
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

  const handleAddMember = () => {
    setEditingMember(null);
    setShowMemberModal(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setShowMemberModal(true);
  };

  const handleDeleteMember = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchMembers();
        showSuccess('Team member deleted successfully!');
      } else {
        throw new Error('Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setMessage({ type: 'error', text: 'Failed to delete team member' });
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleMemberStatus = async (member: TeamMember) => {
    setToggling(member.id);
    try {
      const response = await fetch(`/api/team-members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !member.isActive })
      });

      if (response.ok) {
        await fetchMembers();
        showSuccess(`Team member ${!member.isActive ? 'enabled' : 'disabled'} successfully!`);
      } else {
        throw new Error('Failed to update team member status');
      }
    } catch (error) {
      console.error('Error toggling team member status:', error);
      setMessage({ type: 'error', text: 'Failed to update team member status' });
    } finally {
      setToggling(null);
    }
  };

  const handleMemberSaved = () => {
    setShowMemberModal(false);
    setEditingMember(null);
    fetchMembers();
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
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Our Directors</h3>
            <p className="text-sm text-gray-600">
              Manage team members and directors information
            </p>
          </div>
        </div>
        <Button
          onClick={handleAddMember}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Director
        </Button>
      </div>

      {/* Team Members Grid */}
      {members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                      #{member.order}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      member.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {member.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{member.name}</h4>
                    <p className="text-emerald-600 font-medium text-sm">{member.position}</p>
                  </div>

                  {member.bio && (
                    <p className="text-gray-600 text-sm line-clamp-3">{member.bio}</p>
                  )}

                  {member.expertise && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Expertise:</span> {member.expertise}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit member"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleToggleMemberStatus(member)}
                      disabled={toggling === member.id}
                      className={`p-2 rounded-lg transition-colors ${
                        member.isActive
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      } ${toggling === member.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={member.isActive ? 'Disable member' : 'Enable member'}
                    >
                      {toggling === member.id ? (
                        <ToggleLoader size="sm" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => showConfirmation(
                        'Delete Team Member',
                        'Are you sure you want to delete this team member? This action cannot be undone.',
                        () => handleDeleteMember(member.id)
                      )}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Directors Added</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first team member.</p>
          <Button
            onClick={handleAddMember}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Director
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

      <TeamMemberModal
        isOpen={showMemberModal}
        onClose={() => {
          setShowMemberModal(false);
          setEditingMember(null);
        }}
        onSave={handleMemberSaved}
        member={editingMember}
      />
    </div>
  );
}