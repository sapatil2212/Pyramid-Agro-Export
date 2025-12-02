"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Plus, Edit, Save, Upload, Power, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SlideFormData {
  imageUrl: string;
  title: string;
  subtitle: string;
  altText: string;
  isActive: boolean;
}

interface HeroSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNew: boolean;
  initialData?: SlideFormData;
  onSave: (data: SlideFormData) => Promise<void>;
  saving: boolean;
}

export function HeroSlideModal({ isOpen, onClose, isNew, initialData, onSave, saving }: HeroSlideModalProps) {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<SlideFormData>({
    imageUrl: '', title: '', subtitle: '', altText: '', isActive: true
  });
  const [hasInitialized, setHasInitialized] = useState(false);

  // Reset form only when modal first opens (not on every render)
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setForm(initialData || {
        imageUrl: '', title: '', subtitle: '', altText: '', isActive: true
      });
      setHasInitialized(true);
    } else if (!isOpen && hasInitialized) {
      // Reset the flag when modal closes
      setHasInitialized(false);
    }
  }, [isOpen, hasInitialized, initialData]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) setForm(p => ({ ...p, imageUrl: data.url || data.imageUrl }));
    } catch (e) {
      console.error('Upload error:', e);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    await onSave(form);
    onClose();
  };

  const canSave = form.imageUrl && form.title?.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              {isNew ? <Plus className="h-4 w-4 text-emerald-600" /> : <Edit className="h-4 w-4 text-emerald-600" />}
            </div>
            {isNew ? 'Add New Hero Slide' : 'Edit Hero Slide'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs md:text-sm font-medium text-gray-700 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-emerald-500" /> Hero Image *
            </label>
            <div className="relative group">
              {form.imageUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-emerald-200 shadow-md">
                  <Image src={form.imageUrl} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <label className="opacity-0 group-hover:opacity-100 cursor-pointer bg-white/90 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-white flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Change Image
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={uploading} />
                    </label>
                  </div>
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-1.5 md:p-2 flex items-center gap-2">
                        <LoadingSpinner size="sm" /><span className="text-xs">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-emerald-300 rounded-xl bg-emerald-50/50 cursor-pointer hover:bg-emerald-100/50 transition-all">
                  {uploading ? (
                    <div className="flex items-center gap-2"><LoadingSpinner size="sm" /><span className="text-xs md:text-sm">Uploading...</span></div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 md:h-8 md:w-8 text-emerald-400 mb-2" />
                      <span className="text-xs md:text-sm font-medium text-emerald-600">Click to upload</span>
                      <span className="text-[10px] md:text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={uploading} />
                </label>
              )}
            </div>
          </div>

          {/* Content Fields */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-medium text-gray-700">Title *</label>
                <Input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Premium Quality" />
              </div>
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-medium text-gray-700">Subtitle</label>
                <Input value={form.subtitle} onChange={(e) => setForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="e.g., Fresh from farm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs md:text-sm font-medium text-gray-700">Alt Text (SEO)</label>
              <Input value={form.altText} onChange={(e) => setForm(p => ({ ...p, altText: e.target.value }))} placeholder="Describe the image" />
            </div>
            <div className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Power className={`h-4 w-4 ${form.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-xs md:text-sm font-medium">{form.isActive ? 'Active' : 'Disabled'}</span>
              </div>
              <button type="button" onClick={() => setForm(p => ({ ...p, isActive: !p.isActive }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isActive ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t">
              <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving || !canSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                {saving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
                {isNew ? 'Add Slide' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
