"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Plus, Edit, Save, Sparkles, Eye, Image as ImageIcon } from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { HeroSlideModal } from "./hero-slide-modal";
import { HeroSlideCard } from "./hero-slide-card";

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

interface HeroContent {
  buttonText: string;
  buttonLink: string;
  button2Text: string;
  button2Link: string;
  description: string;
}

export function HeroManager() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent>({ buttonText: '', buttonLink: '', button2Text: '', button2Link: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [imagesRes, contentRes] = await Promise.all([
        fetch('/api/hero-images'),
        fetch('/api/home-content')
      ]);
      const images = await imagesRes.json();
      const content = await contentRes.json();
      
      if (imagesRes.ok) setHeroImages(Array.isArray(images) ? images.sort((a: HeroImage, b: HeroImage) => a.order - b.order) : []);
      if (contentRes.ok) {
        const heroSection = content.find((s: { section: string }) => s.section === 'hero');
        if (heroSection) {
          setHeroContent({
            buttonText: heroSection.buttonText || '',
            buttonLink: heroSection.buttonLink || '',
            button2Text: heroSection.button2Text || '',
            button2Link: heroSection.button2Link || '',
            description: heroSection.description || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => { setSuccessMessage(msg); setShowSuccessModal(true); };

  const handleToggle = async (image: HeroImage) => {
    setToggling(image.id);
    try {
      await fetch(`/api/hero-images/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !image.isActive })
      });
      await fetchData();
    } catch (error) {
      console.error('Error toggling:', error);
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await fetch(`/api/hero-images/${id}`, { method: 'DELETE' });
      await fetchData();
      showSuccess('Hero slide deleted!');
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setDeleting(false);
      setShowConfirmModal(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await fetch('/api/home-content/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroContent)
      });
      await fetchData();
      showSuccess('CTA buttons saved!');
      setEditingSettings(false);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSlide = async (data: { imageUrl: string; title: string; subtitle: string; altText: string; isActive: boolean }) => {
    setSaving(true);
    try {
      const isNew = editingSlideId === 'new';
      const url = isNew ? '/api/hero-images' : `/api/hero-images/${editingSlideId}`;
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, order: isNew ? heroImages.length : undefined })
      });
      if (response.ok) {
        await fetchData();
        showSuccess(`Hero slide ${isNew ? 'added' : 'updated'} successfully!`);
        setEditingSlideId(null);
      }
    } catch (error) {
      console.error('Error saving slide:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const idx = heroImages.findIndex(img => img.id === id);
    if (idx === -1) return;
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= heroImages.length) return;
    const newImages = [...heroImages];
    [newImages[idx], newImages[newIdx]] = [newImages[newIdx], newImages[idx]];
    const updated = newImages.map((img, i) => ({ ...img, order: i }));
    setHeroImages(updated);
    for (const img of updated) {
      await fetch(`/api/hero-images/${img.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: img.order })
      });
    }
  };

  const showConfirmation = (title: string, message: string, action: () => void) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const getEditingSlide = () => {
    if (!editingSlideId || editingSlideId === 'new') return undefined;
    const slide = heroImages.find(s => s.id === editingSlideId);
    if (!slide) return undefined;
    return { imageUrl: slide.imageUrl, title: slide.title || '', subtitle: slide.subtitle || '', altText: slide.altText || '', isActive: slide.isActive };
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size="lg" />
      <p className="mt-3 text-sm text-gray-500">Loading hero section...</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm md:text-base font-semibold text-gray-900">Hero Slides ({heroImages.length})</h4>
        <div className="flex items-center gap-2">
          <Button onClick={() => setEditingSlideId('new')} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
            <Plus className="h-4 w-4" /> <span className="hidden md:inline">Add Slide</span>
          </Button>
          <Button onClick={() => window.open('/', '_blank')} variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" /> <span className="hidden md:inline">Preview</span>
          </Button>
        </div>
      </div>

      {/* Hero Slides List */}
      <div className="space-y-3">

        {heroImages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h4 className="text-sm md:text-base font-medium text-gray-600 mb-1">No Hero Slides Yet</h4>
            <p className="text-xs md:text-sm text-gray-400 mb-4">Add your first hero slide to get started</p>
            <Button onClick={() => setEditingSlideId('new')} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Add First Slide
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {heroImages.map((slide, idx) => (
              <HeroSlideCard
                key={slide.id}
                slide={slide}
                index={idx}
                total={heroImages.length}
                toggling={toggling === slide.id}
                onEdit={() => setEditingSlideId(slide.id)}
                onToggle={() => handleToggle(slide)}
                onDelete={() => showConfirmation('Delete Slide', `Delete "${slide.title || 'this slide'}"?`, () => handleDelete(slide.id))}
                onMoveUp={() => handleReorder(slide.id, 'up')}
                onMoveDown={() => handleReorder(slide.id, 'down')}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA Button Settings */}
      <Card className="overflow-hidden">
        <div className="p-3 md:p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <h4 className="text-sm md:text-base font-semibold text-gray-900">CTA Button Settings</h4>
          </div>
          {!editingSettings && (
            <Button size="sm" variant="outline" onClick={() => setEditingSettings(true)} className="gap-2">
              <Edit className="h-3 w-3" /> <span className="hidden md:inline">Edit</span>
            </Button>
          )}
        </div>
        <div className="p-3 md:p-4">
        {editingSettings ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 p-3 md:p-4 bg-gray-50 rounded-lg border">
                <label className="text-xs md:text-sm font-semibold text-gray-800">Primary Button</label>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Button Text</label>
                    <Input value={heroContent.buttonText} onChange={(e) => setHeroContent(p => ({ ...p, buttonText: e.target.value }))} placeholder="e.g., Get Started" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Redirect Link</label>
                    <Input value={heroContent.buttonLink} onChange={(e) => setHeroContent(p => ({ ...p, buttonLink: e.target.value }))} placeholder="e.g., /products" />
                  </div>
                </div>
              </div>
              <div className="space-y-3 p-3 md:p-4 bg-gray-50 rounded-lg border">
                <label className="text-xs md:text-sm font-semibold text-gray-800">Secondary Button</label>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Button Text</label>
                    <Input value={heroContent.button2Text} onChange={(e) => setHeroContent(p => ({ ...p, button2Text: e.target.value }))} placeholder="e.g., Learn More" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Redirect Link</label>
                    <Input value={heroContent.button2Link} onChange={(e) => setHeroContent(p => ({ ...p, button2Link: e.target.value }))} placeholder="e.g., /about" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setEditingSettings(false)}>Cancel</Button>
              <Button onClick={handleSaveSettings} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                {saving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />} Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 md:p-4 bg-gray-50 rounded-lg border">
              <span className="text-[10px] md:text-xs text-gray-500 block mb-2">Primary Button</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-12">Text:</span>
                  <span className="text-sm md:text-base font-medium text-gray-900">{heroContent.buttonText || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-12">Link:</span>
                  <span className="text-sm md:text-base text-emerald-600">{heroContent.buttonLink || 'Not set'}</span>
                </div>
              </div>
            </div>
            <div className="p-3 md:p-4 bg-gray-50 rounded-lg border">
              <span className="text-[10px] md:text-xs text-gray-500 block mb-2">Secondary Button</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-12">Text:</span>
                  <span className="font-medium text-gray-900">{heroContent.button2Text || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-12">Link:</span>
                  <span className="text-emerald-600">{heroContent.button2Link || 'Not set'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </Card>

      {/* Modals */}
      <HeroSlideModal
        isOpen={!!editingSlideId}
        onClose={() => setEditingSlideId(null)}
        isNew={editingSlideId === 'new'}
        initialData={getEditingSlide()}
        onSave={handleSaveSlide}
        saving={saving}
      />
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} message={successMessage} />
      <ConfirmationModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); }} title={confirmTitle} message={confirmMessage}
        confirmText="Delete" cancelText="Cancel" type="danger" loading={deleting} />
    </div>
  );
}
