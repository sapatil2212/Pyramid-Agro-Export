"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Edit,
  Trash2,
  Power,
  GripVertical,
  Save,
  X,
  Shield,
  Users,
  Globe,
  FileCheck,
  Truck,
  Clock,
  CheckCircle,
  Leaf,
  Award,
  Heart,
  Star
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

interface Service {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  features: string[];
  order: number;
  isActive: boolean;
}

const ICON_OPTIONS = [
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'globe', label: 'Globe', icon: Globe },
  { value: 'file-check', label: 'File Check', icon: FileCheck },
  { value: 'truck', label: 'Truck', icon: Truck },
  { value: 'clock', label: 'Clock', icon: Clock },
  { value: 'leaf', label: 'Leaf', icon: Leaf },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'heart', label: 'Heart', icon: Heart },
  { value: 'star', label: 'Star', icon: Star },
];

const COLOR_OPTIONS = [
  { value: 'from-emerald-500 to-emerald-600', label: 'Emerald', bg: 'bg-emerald-500' },
  { value: 'from-amber-500 to-amber-600', label: 'Amber', bg: 'bg-amber-500' },
  { value: 'from-blue-500 to-blue-600', label: 'Blue', bg: 'bg-blue-500' },
  { value: 'from-purple-500 to-purple-600', label: 'Purple', bg: 'bg-purple-500' },
  { value: 'from-red-500 to-red-600', label: 'Red', bg: 'bg-red-500' },
  { value: 'from-indigo-500 to-indigo-600', label: 'Indigo', bg: 'bg-indigo-500' },
  { value: 'from-pink-500 to-pink-600', label: 'Pink', bg: 'bg-pink-500' },
  { value: 'from-teal-500 to-teal-600', label: 'Teal', bg: 'bg-teal-500' },
];

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'shield': Shield, 'users': Users, 'globe': Globe, 'file-check': FileCheck,
    'truck': Truck, 'clock': Clock, 'leaf': Leaf, 'award': Award, 'heart': Heart, 'star': Star,
  };
  return iconMap[iconName] || Shield;
};

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '', description: '', icon: 'shield', color: 'from-emerald-500 to-emerald-600', features: []
  });

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      if (response.ok) setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => { setSuccessMessage(msg); setShowSuccessModal(true); };
  const showConfirmation = (title: string, msg: string, action: () => void) => {
    setConfirmTitle(title); setConfirmMessage(msg); setConfirmAction(() => action); setShowConfirmModal(true);
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ title: '', description: '', icon: 'shield', color: 'from-emerald-500 to-emerald-600', features: [] });
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({ title: service.title, description: service.description, icon: service.icon, color: service.color, features: service.features || [] });
  };

  const handleSave = async () => {
    if (!formData.title?.trim()) return;
    setSaving(true);
    try {
      const isNew = editingId === 'new';
      const url = isNew ? '/api/services' : `/api/services/${editingId}`;
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        await fetchServices();
        showSuccess(`Service ${isNew ? 'added' : 'updated'} successfully!`);
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (response.ok) { await fetchServices(); showSuccess('Service deleted!'); }
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (service: Service) => {
    setToggling(service.id);
    try {
      await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive })
      });
      await fetchServices();
    } catch (error) {
      console.error('Error toggling:', error);
    } finally {
      setToggling(null);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const idx = services.findIndex(s => s.id === id);
    if (idx === -1) return;
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= services.length) return;
    const newServices = [...services];
    [newServices[idx], newServices[newIdx]] = [newServices[newIdx], newServices[idx]];
    const updated = newServices.map((s, i) => ({ ...s, order: i }));
    setServices(updated);
    for (const s of updated) {
      await fetch(`/api/services/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: s.order }) });
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(p => ({ ...p, features: [...(p.features || []), newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const removeFeature = (idx: number) => {
    setFormData(p => ({ ...p, features: (p.features || []).filter((_, i) => i !== idx) }));
  };

  if (loading) return <div className="flex justify-center py-8"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Core Services</h3>
          <p className="text-sm text-gray-500">Manage services displayed on the home page</p>
        </div>
        {!editingId && (
          <Button onClick={handleAdd} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-1" /> Add Service
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {editingId && (
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-900">{editingId === 'new' ? 'Add New Service' : 'Edit Service'}</h4>
              <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Title *</label>
                <Input value={formData.title || ''} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="Service title" className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Icon</label>
                <div className="flex flex-wrap gap-1">
                  {ICON_OPTIONS.map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button key={opt.value} type="button" onClick={() => setFormData(p => ({ ...p, icon: opt.value }))}
                        className={`p-1.5 rounded border ${formData.icon === opt.value ? 'border-emerald-500 bg-emerald-100' : 'border-gray-200 hover:border-gray-300'}`}>
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Color</label>
                <div className="flex flex-wrap gap-1">
                  {COLOR_OPTIONS.map(opt => (
                    <button key={opt.value} type="button" onClick={() => setFormData(p => ({ ...p, color: opt.value }))}
                      className={`w-6 h-6 rounded ${opt.bg} ${formData.color === opt.value ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`} title={opt.label} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Description</label>
                <Textarea value={formData.description || ''} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="Brief description" rows={2} className="text-sm" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Features</label>
              <div className="flex gap-2 mb-2">
                <Input value={newFeature} onChange={e => setNewFeature(e.target.value)} placeholder="Add feature" className="h-8 text-sm"
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                <Button type="button" onClick={addFeature} size="sm" variant="outline" className="h-8"><Plus className="h-3 w-3" /></Button>
              </div>
              {formData.features && formData.features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.features.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border rounded text-xs">
                      {f} <button onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
              <Button size="sm" onClick={handleSave} disabled={saving || !formData.title?.trim()} className="bg-emerald-600 hover:bg-emerald-700">
                {saving ? <LoadingSpinner size="sm" className="mr-1" /> : <Save className="h-3 w-3 mr-1" />}
                {editingId === 'new' ? 'Create' : 'Update'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Services List */}
      <div className="space-y-2">
        {services.map((service, idx) => {
          const Icon = getIconComponent(service.icon);
          return (
            <Card key={service.id} className={`p-3 ${!service.isActive ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                {/* Reorder Handle */}
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => handleReorder(service.id, 'up')} disabled={idx === 0} className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => handleReorder(service.id, 'down')} disabled={idx === services.length - 1} className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">#{idx + 1}</span>
                    <h4 className="font-medium text-gray-900 text-sm truncate">{service.title}</h4>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {service.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  {service.description && <p className="text-xs text-gray-500 truncate mt-0.5">{service.description}</p>}
                  {service.features && service.features.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      {service.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">{f}</span>
                      ))}
                      {service.features.length > 3 && <span className="text-[10px] text-gray-400">+{service.features.length - 3}</span>}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button onClick={() => handleEdit(service)} className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleToggle(service)} disabled={toggling === service.id}
                    className={`p-1.5 rounded ${service.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`} title={service.isActive ? 'Disable' : 'Enable'}>
                    {toggling === service.id ? <ToggleLoader size="sm" /> : <Power className="h-4 w-4" />}
                  </button>
                  <button onClick={() => showConfirmation('Delete Service', `Delete "${service.title}"?`, () => handleDelete(service.id))}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {services.length === 0 && !editingId && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Shield className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm mb-3">No services yet</p>
          <Button onClick={handleAdd} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-1" /> Add Service
          </Button>
        </div>
      )}

      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} message={successMessage} />
      <ConfirmationModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); setShowConfirmModal(false); }}
        title={confirmTitle} message={confirmMessage} confirmText="Delete" cancelText="Cancel" type="danger" loading={deleting} />
    </div>
  );
}
