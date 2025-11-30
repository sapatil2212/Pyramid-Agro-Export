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
  Star,
  Quote,
  Upload
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { TestimonialModal } from "./testimonial-modal";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  location?: string;
  quote: string;
  rating: number;
  avatar?: string;
  imageUrl?: string;
  verified: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function TestimonialsManagerSimple() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

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
    fetchTestimonials();
    
    // Listen for add testimonial event from parent component
    const handleAddTestimonialEvent = () => {
      handleAddTestimonial();
    };
    
    window.addEventListener('addTestimonial', handleAddTestimonialEvent);
    
    return () => {
      window.removeEventListener('addTestimonial', handleAddTestimonialEvent);
    };
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      
      if (response.ok) {
        console.log('Testimonials manager fetched testimonials:', data);
        setTestimonials(data);
      } else {
        throw new Error(data.error || 'Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setMessage({ type: 'error', text: 'Failed to load testimonials' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setShowTestimonialModal(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowTestimonialModal(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchTestimonials();
        showSuccess('Testimonial deleted successfully!');
      } else {
        throw new Error('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setMessage({ type: 'error', text: 'Failed to delete testimonial' });
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleStatus = async (testimonial: Testimonial) => {
    setToggling(testimonial.id);
    try {
      const updatedTestimonial = { ...testimonial, isActive: !testimonial.isActive };
      
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updatedTestimonial.isActive })
      });

      if (response.ok) {
        await fetchTestimonials();
        showSuccess(`Testimonial ${updatedTestimonial.isActive ? 'enabled' : 'disabled'} successfully!`);
      } else {
        throw new Error('Failed to update testimonial status');
      }
    } catch (error) {
      console.error('Error toggling testimonial status:', error);
      setMessage({ type: 'error', text: 'Failed to update testimonial status' });
    } finally {
      setToggling(null);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = testimonials.findIndex(testimonial => testimonial.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;

    const newTestimonials = [...testimonials];
    const [movedItem] = newTestimonials.splice(currentIndex, 1);
    newTestimonials.splice(newIndex, 0, movedItem);

    // Update order values
    const updatedTestimonials = newTestimonials.map((item, index) => ({
      ...item,
      order: index
    }));

    setTestimonials(updatedTestimonials);

    // Update in database
    try {
      for (const item of updatedTestimonials) {
        await fetch(`/api/testimonials/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: item.order })
        });
      }
      showSuccess('Testimonial order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      // Revert on error
      await fetchTestimonials();
      setMessage({ type: 'error', text: 'Failed to update order' });
    }
  };

  const handleTestimonialSaved = () => {
    setShowTestimonialModal(false);
    setEditingTestimonial(null);
    fetchTestimonials();
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
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

      {/* Testimonials Grid - Similar to Interactive Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              {/* Header with Order and Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    testimonial.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {testimonial.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEditTestimonial(testimonial)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit testimonial"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  
                  <button
                    onClick={() => handleToggleStatus(testimonial)}
                    disabled={toggling === testimonial.id}
                    className={`p-1.5 rounded-lg transition-colors ${
                      testimonial.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                    } ${toggling === testimonial.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={testimonial.isActive ? 'Disable testimonial' : 'Enable testimonial'}
                  >
                    {toggling === testimonial.id ? (
                      <ToggleLoader size="sm" />
                    ) : (
                      <Power className="h-3.5 w-3.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => showConfirmation(
                      'Delete Testimonial',
                      'Are you sure you want to delete this testimonial? This action cannot be undone.',
                      () => handleDeleteTestimonial(testimonial.id)
                    )}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete testimonial"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Reorder Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleReorder(testimonial.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleReorder(testimonial.id, 'down')}
                    disabled={index === testimonials.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-0.5">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              
              {/* Testimonial Content */}
              <div className="space-y-3">
                {/* Customer Info */}
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    {testimonial.imageUrl ? (
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                        {testimonial.avatar || testimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.position}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                    {testimonial.location && (
                      <p className="text-xs text-gray-400">{testimonial.location}</p>
                    )}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute top-0 right-0 h-4 w-4 text-emerald-200" />
                  <blockquote className="text-sm text-gray-700 leading-relaxed pl-2">
                    &quot;{testimonial.quote.length > 120 
                      ? `${testimonial.quote.substring(0, 120)}...` 
                      : testimonial.quote}&quot;
                  </blockquote>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <Quote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first customer testimonial.</p>
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

      <TestimonialModal
        isOpen={showTestimonialModal}
        onClose={() => {
          setShowTestimonialModal(false);
          setEditingTestimonial(null);
        }}
        onSave={handleTestimonialSaved}
        testimonial={editingTestimonial}
      />
    </div>
  );
}
