"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Plus, Edit, X, Save, Upload, Power, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface SlideFormData {
  imageUrl: string;
  title: string;
  subtitle: string;
  altText: string;
  isActive: boolean;
}

interface HeroSlideFormProps {
  isNew: boolean;
  initialData?: SlideFormData;
  onSave: (data: SlideFormData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

export function HeroSlideForm({ isNew, initialData, onSave, onCancel, saving }: HeroSlideFormProps) {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<SlideFormData>(initialData || {
    imageUrl: '', title: '', subtitle: '', altText: '', isActive: true
  });

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

  const canSave = form.imageUrl && form.title?.trim();

  return (
    <Card className="p-5 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            {isNew ? <Plus className="h-4 w-4 text-emerald-600" /> : <Edit className="h-4 w-4 text-emerald-600" />}
          </div>
          <h4 className="font-semibold text-gray-900">{isNew ? 'Add New Hero Slide' : 'Edit Hero Slide'}</h4>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel}><X className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-emerald-500" /> Hero Image *
          </label>
          <div className="relative group">
            {form.imageUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-emerald-200 shadow-md">
                <Image src={form.imageUrl} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <label className="opacity-0 group-hover:opacity-100 cursor-pointer bg-white/90 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Change
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={uploading} />
                  </label>
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-3 flex items-center gap-2">
                      <LoadingSpinner size="sm" /><span className="text-sm">Uploading...</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-emerald-300 rounded-xl bg-emerald-50/50 cursor-pointer hover:bg-emerald-100/50 transition-all">
                {uploading ? (
                  <div className="flex items-center gap-2"><LoadingSpinner size="sm" /><span className="text-sm">Uploading...</span></div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-emerald-400 mb-2" />
                    <span className="text-sm font-medium text-emerald-600">Click to upload</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
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
              <label className="text-sm font-medium text-gray-700">Title *</label>
              <Input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Premium Quality" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Subtitle</label>
              <Input value={form.subtitle} onChange={(e) => setForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="e.g., Fresh from farm" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Alt Text (SEO)</label>
            <Input value={form.altText} onChange={(e) => setForm(p => ({ ...p, altText: e.target.value }))} placeholder="Describe the image" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Power className={`h-4 w-4 ${form.isActive ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">{form.isActive ? 'Active' : 'Disabled'}</span>
            </div>
            <button type="button" onClick={() => setForm(p => ({ ...p, isActive: !p.isActive }))}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isActive ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={() => onSave(form)} disabled={saving || !canSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              {saving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
              {isNew ? 'Add Slide' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
