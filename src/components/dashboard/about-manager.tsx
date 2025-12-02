"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { Edit, Save, X, Upload, Image as ImageIcon, Plus, Trash2, Power, Award, Leaf, Users, Lightbulb, Shield, Star, Heart, Globe, type LucideIcon } from "lucide-react";
import Image from "next/image";

interface AboutContent {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

interface Feature {
  id: string;
  section: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

interface HomeContentSection extends AboutContent {
  section: string;
  isActive?: boolean;
}

const ICON_OPTIONS: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: 'Award', label: 'Quality', icon: Award },
  { value: 'Leaf', label: 'Eco', icon: Leaf },
  { value: 'Users', label: 'Partnership', icon: Users },
  { value: 'Lightbulb', label: 'Innovation', icon: Lightbulb },
  { value: 'Shield', label: 'Trust', icon: Shield },
  { value: 'Star', label: 'Excellence', icon: Star },
  { value: 'Heart', label: 'Care', icon: Heart },
  { value: 'Globe', label: 'Global', icon: Globe },
];

export function AboutManager() {
  const [content, setContent] = useState<AboutContent>({
    title: '', subtitle: '', description: '', imageUrl: '', buttonText: '', buttonLink: ''
  });
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<AboutContent>(content);
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [featureForm, setFeatureForm] = useState({ title: '', description: '', icon: 'Award' });
  const [savingFeature, setSavingFeature] = useState(false);
  const [togglingFeature, setTogglingFeature] = useState<string | null>(null);
  const [deletingFeature, setDeletingFeature] = useState<string | null>(null);

  useEffect(() => { fetchContent(); fetchFeatures(); }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/home-content');
      const data = (await res.json()) as HomeContentSection[];
      if (res.ok) {
        const aboutSection = data.find((section) => section.section === 'about');
        if (aboutSection) {
          const c = {
            id: aboutSection.id,
            title: aboutSection.title || '',
            subtitle: aboutSection.subtitle || '',
            description: aboutSection.description || '',
            imageUrl: aboutSection.imageUrl || '',
            buttonText: aboutSection.buttonText || '',
            buttonLink: aboutSection.buttonLink || ''
          };
          setContent(c);
          setForm(c);
        }
      }
    } catch (e) {
      console.error('Error fetching about content:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/home-content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setContent(form);
        setEditing(false);
      }
    } catch (e) {
      console.error('Error saving:', e);
    } finally {
      setSaving(false);
    }
  };

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

  const fetchFeatures = async () => {
    try {
      const res = await fetch('/api/home-features');
      const data = await res.json();
      if (res.ok) {
        const aboutFeatures = data.filter((f: Feature) => f.section === 'about').sort((a: Feature, b: Feature) => a.order - b.order);
        setFeatures(aboutFeatures);
      }
    } catch (e) {
      console.error('Error fetching features:', e);
    }
  };

  const handleSaveFeature = async () => {
    if (!featureForm.title.trim()) return;
    setSavingFeature(true);
    try {
      const isNew = editingFeatureId === 'new';
      const url = isNew ? '/api/home-features' : `/api/home-features/${editingFeatureId}`;
      
      // For update, find the existing feature to preserve its order
      const existingFeature = !isNew ? features.find(f => f.id === editingFeatureId) : null;
      
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: featureForm.title,
          description: featureForm.description,
          icon: featureForm.icon,
          section: 'about',
          order: isNew ? features.length : existingFeature?.order,
          isActive: existingFeature?.isActive ?? true
        })
      });
      if (res.ok) {
        await fetchFeatures();
        setEditingFeatureId(null);
        setFeatureForm({ title: '', description: '', icon: 'Award' });
      } else {
        console.error('Failed to save feature:', await res.text());
      }
    } catch (e) {
      console.error('Error saving feature:', e);
    } finally {
      setSavingFeature(false);
    }
  };

  const handleToggleFeature = async (feature: Feature) => {
    setTogglingFeature(feature.id);
    try {
      await fetch(`/api/home-features/${feature.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...feature, isActive: !feature.isActive })
      });
      await fetchFeatures();
    } catch (e) {
      console.error('Error toggling feature:', e);
    } finally {
      setTogglingFeature(null);
    }
  };

  const handleDeleteFeature = async (id: string) => {
    setDeletingFeature(id);
    try {
      await fetch(`/api/home-features/${id}`, { method: 'DELETE' });
      await fetchFeatures();
    } catch (e) {
      console.error('Error deleting feature:', e);
    } finally {
      setDeletingFeature(null);
    }
  };

  const startEditFeature = (feature: Feature) => {
    setEditingFeatureId(feature.id);
    setFeatureForm({ title: feature.title, description: feature.description || '', icon: feature.icon || 'Award' });
  };

  const getIconComponent = (iconName: string) => {
    const option = ICON_OPTIONS.find(o => o.value === iconName);
    return option?.icon || Award;
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size="lg" />
      <p className="mt-3 text-sm text-gray-500">Loading about section...</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm md:text-base font-semibold text-gray-900">About Section</h4>
        <div className="flex items-center gap-2">
          {!editing && (
            <Button onClick={() => setEditing(true)} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
              <Edit className="h-4 w-4" /> <span className="hidden md:inline">Edit</span>
            </Button>
          )}
        </div>
      </div>

      {editing ? (
        /* Edit Mode */
        <Card className="p-3 md:p-5 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm md:text-base font-semibold text-gray-900">Edit About Section</h4>
            <Button variant="ghost" size="sm" onClick={() => { setForm(content); setEditing(false); }}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-medium text-gray-700">Section Image</label>
              <div className="relative group">
                {form.imageUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-emerald-200">
                    <Image src={form.imageUrl} alt="About" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <label className="opacity-0 group-hover:opacity-100 cursor-pointer bg-white/90 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium">
                        <Upload className="h-3 w-3 md:h-4 md:w-4 inline mr-2" /> Change
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                      </label>
                    </div>
                    {uploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <LoadingSpinner size="sm" />
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-emerald-300 rounded-xl bg-emerald-50/50 cursor-pointer hover:bg-emerald-100/50">
                    {uploading ? <LoadingSpinner size="sm" /> : (
                      <>
                        <Upload className="h-6 w-6 md:h-8 md:w-8 text-emerald-400 mb-2" />
                        <span className="text-xs md:text-sm font-medium text-emerald-600">Upload Image</span>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                  </label>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs md:text-sm font-medium text-gray-700">Title</label>
                  <Input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} placeholder="About Us" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs md:text-sm font-medium text-gray-700">Subtitle</label>
                  <Input value={form.subtitle} onChange={(e) => setForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="Our Story" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs md:text-sm font-medium text-gray-700">Description <span className="text-[10px] md:text-xs text-gray-400 font-normal">(Press Enter for new paragraph)</span></label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Tell your story... Use Enter key to add new paragraphs."
                  rows={6}
                  className="w-full px-3 py-2 border rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs md:text-sm font-medium text-gray-700">Button Text</label>
                  <Input value={form.buttonText} onChange={(e) => setForm(p => ({ ...p, buttonText: e.target.value }))} placeholder="Learn More" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs md:text-sm font-medium text-gray-700">Button Link</label>
                  <Input value={form.buttonLink} onChange={(e) => setForm(p => ({ ...p, buttonLink: e.target.value }))} placeholder="/about" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <Button variant="outline" onClick={() => { setForm(content); setEditing(false); }}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  {saving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />} Save
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        /* View Mode */
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Image */}
            <div className="relative aspect-video lg:aspect-auto lg:min-h-[200px] bg-gray-100">
              {content.imageUrl ? (
                <Image src={content.imageUrl} alt="About" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                    <p className="text-sm">No image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="lg:col-span-2 p-5 space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Title</p>
                <p className="text-lg font-semibold text-gray-900">{content.title || <span className="text-gray-300 italic">Not set</span>}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Subtitle</p>
                <p className="text-gray-700">{content.subtitle || <span className="text-gray-300 italic">Not set</span>}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Description</p>
                <div className="text-sm text-gray-600 space-y-2">
                  {content.description ? (
                    content.description.split('\n').filter(p => p.trim()).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  ) : (
                    <span className="text-gray-300 italic">Not set</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Button</p>
                  <p className="text-sm font-medium text-emerald-600">{content.buttonText || 'Not set'} → {content.buttonLink || '/'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Why Choose Us Features */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex items-center justify-between">
          <h4 className="text-sm md:text-base font-semibold text-gray-900">Why Choose Us Features ({features.length})</h4>
          {!editingFeatureId && (
            <Button onClick={() => { setEditingFeatureId('new'); setFeatureForm({ title: '', description: '', icon: 'Award' }); }} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
              <Plus className="h-4 w-4" /> <span className="hidden md:inline">Add Feature</span>
            </Button>
          )}
        </div>

        {/* Add/Edit Feature Form */}
        {editingFeatureId && (
          <Card className="p-3 md:p-4 border-2 border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm md:text-base font-medium text-gray-900">{editingFeatureId === 'new' ? 'Add Feature' : 'Edit Feature'}</h5>
              <Button variant="ghost" size="sm" onClick={() => { setEditingFeatureId(null); setFeatureForm({ title: '', description: '', icon: 'Award' }); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Icon</label>
                <select
                  value={featureForm.icon}
                  onChange={(e) => setFeatureForm(p => ({ ...p, icon: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-xs md:text-sm"
                >
                  {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Title *</label>
                <Input value={featureForm.title} onChange={(e) => setFeatureForm(p => ({ ...p, title: e.target.value }))} placeholder="Quality First" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-medium text-gray-600">Description</label>
                <Input value={featureForm.description} onChange={(e) => setFeatureForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief description..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => { setEditingFeatureId(null); setFeatureForm({ title: '', description: '', icon: 'Award' }); }}>Cancel</Button>
              <Button size="sm" onClick={handleSaveFeature} disabled={savingFeature || !featureForm.title.trim()} className="bg-emerald-600 hover:bg-emerald-700 gap-1">
                {savingFeature ? <LoadingSpinner size="sm" /> : <Save className="h-3 w-3" />} Save
              </Button>
            </div>
          </Card>
        )}

        {/* Features List */}
        {features.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed">
            <Award className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No features yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature) => {
              const IconComp = getIconComponent(feature.icon);
              return (
                <Card key={feature.id} className={`p-3 ${!feature.isActive ? 'opacity-50' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <IconComp className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 text-sm">{feature.title}</h5>
                      <p className="text-xs text-gray-500 line-clamp-2">{feature.description || 'No description'}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => startEditFeature(feature)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Edit">
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleToggleFeature(feature)} disabled={togglingFeature === feature.id}
                        className={`p-1.5 rounded ${feature.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} title={feature.isActive ? 'Disable' : 'Enable'}>
                        {togglingFeature === feature.id ? <ToggleLoader size="sm" /> : <Power className="h-3.5 w-3.5" />}
                      </button>
                      <button onClick={() => handleDeleteFeature(feature.id)} disabled={deletingFeature === feature.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                        {deletingFeature === feature.id ? <LoadingSpinner size="sm" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
