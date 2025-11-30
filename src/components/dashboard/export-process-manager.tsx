"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, Edit, Trash2, Power, Save, X,
  MessageCircle, Search, TestTube, FileText, Package,
  Truck, Clock, CheckCircle, Shield, Globe, Users
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

interface ExportStep {
  id: string;
  step: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

const ICON_OPTIONS = [
  { value: 'message-circle', label: 'Message', icon: MessageCircle },
  { value: 'search', label: 'Search', icon: Search },
  { value: 'test-tube', label: 'Test Tube', icon: TestTube },
  { value: 'file-text', label: 'File Text', icon: FileText },
  { value: 'package', label: 'Package', icon: Package },
  { value: 'truck', label: 'Truck', icon: Truck },
  { value: 'clock', label: 'Clock', icon: Clock },
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'globe', label: 'Globe', icon: Globe },
  { value: 'users', label: 'Users', icon: Users },
];

const COLOR_OPTIONS = [
  { value: 'emerald', label: 'Emerald', bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { value: 'blue', label: 'Blue', bg: 'bg-blue-100', text: 'text-blue-600' },
  { value: 'purple', label: 'Purple', bg: 'bg-purple-100', text: 'text-purple-600' },
  { value: 'amber', label: 'Amber', bg: 'bg-amber-100', text: 'text-amber-600' },
  { value: 'rose', label: 'Rose', bg: 'bg-rose-100', text: 'text-rose-600' },
  { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-100', text: 'text-indigo-600' },
  { value: 'teal', label: 'Teal', bg: 'bg-teal-100', text: 'text-teal-600' },
  { value: 'red', label: 'Red', bg: 'bg-red-100', text: 'text-red-600' },
];

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'message-circle': MessageCircle, 'search': Search, 'test-tube': TestTube,
    'file-text': FileText, 'package': Package, 'truck': Truck, 'clock': Clock,
    'shield': Shield, 'globe': Globe, 'users': Users, 'check-circle': CheckCircle,
  };
  return iconMap[iconName] || MessageCircle;
};

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    'emerald': { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    'blue': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'purple': { bg: 'bg-purple-100', text: 'text-purple-600' },
    'amber': { bg: 'bg-amber-100', text: 'text-amber-600' },
    'rose': { bg: 'bg-rose-100', text: 'text-rose-600' },
    'indigo': { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    'teal': { bg: 'bg-teal-100', text: 'text-teal-600' },
    'red': { bg: 'bg-red-100', text: 'text-red-600' },
  };
  return colorMap[color] || colorMap['emerald'];
};

interface SectionContent {
  id?: string;
  title: string;
  subtitle: string;
}

export function ExportProcessManager() {
  const [steps, setSteps] = useState<ExportStep[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>({ title: 'Our Export Process', subtitle: '' });
  const [editingSection, setEditingSection] = useState(false);
  const [sectionForm, setSectionForm] = useState<SectionContent>({ title: '', subtitle: '' });
  const [savingSection, setSavingSection] = useState(false);
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
  const [formData, setFormData] = useState<Partial<ExportStep>>({
    step: '', title: '', description: '', icon: 'message-circle', color: 'emerald'
  });

  useEffect(() => { fetchSteps(); fetchSectionContent(); }, []);

  const fetchSteps = async () => {
    try {
      const response = await fetch('/api/export-process');
      const data = await response.json();
      if (response.ok) setSteps(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching steps:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionContent = async () => {
    try {
      const res = await fetch('/api/home-content');
      const data = await res.json();
      if (res.ok) {
        const exportSection = data.find((s: { section: string }) => s.section === 'export-process');
        if (exportSection) {
          const c = { id: exportSection.id, title: exportSection.title || 'Our Export Process', subtitle: exportSection.subtitle || '' };
          setSectionContent(c);
          setSectionForm(c);
        }
      }
    } catch (e) {
      console.error('Error fetching section content:', e);
    }
  };

  const handleSaveSection = async () => {
    setSavingSection(true);
    try {
      const res = await fetch('/api/home-content/export-process', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: sectionForm.title, subtitle: sectionForm.subtitle })
      });
      if (res.ok) {
        setSectionContent(sectionForm);
        setEditingSection(false);
        showSuccess('Section header updated!');
      }
    } catch (e) {
      console.error('Error saving section:', e);
    } finally {
      setSavingSection(false);
    }
  };

  const showSuccess = (msg: string) => { setSuccessMessage(msg); setShowSuccessModal(true); };
  const showConfirmation = (title: string, msg: string, action: () => void) => {
    setConfirmTitle(title); setConfirmMessage(msg); setConfirmAction(() => action); setShowConfirmModal(true);
  };

  const handleAdd = () => {
    const nextStep = String(steps.length + 1).padStart(2, '0');
    setEditingId('new');
    setFormData({ step: nextStep, title: '', description: '', icon: 'message-circle', color: 'emerald' });
  };

  const handleEdit = (step: ExportStep) => {
    setEditingId(step.id);
    setFormData({ step: step.step, title: step.title, description: step.description, icon: step.icon, color: step.color });
  };

  const handleSave = async () => {
    if (!formData.title?.trim()) return;
    setSaving(true);
    try {
      const isNew = editingId === 'new';
      const url = isNew ? '/api/export-process' : `/api/export-process/${editingId}`;
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        await fetchSteps();
        showSuccess(`Step ${isNew ? 'added' : 'updated'} successfully!`);
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error saving step:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/export-process/${id}`, { method: 'DELETE' });
      if (response.ok) { await fetchSteps(); showSuccess('Step deleted!'); }
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (step: ExportStep) => {
    setToggling(step.id);
    try {
      await fetch(`/api/export-process/${step.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !step.isActive })
      });
      await fetchSteps();
    } catch (error) {
      console.error('Error toggling:', error);
    } finally {
      setToggling(null);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const idx = steps.findIndex(s => s.id === id);
    if (idx === -1) return;
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= steps.length) return;
    const newSteps = [...steps];
    [newSteps[idx], newSteps[newIdx]] = [newSteps[newIdx], newSteps[idx]];
    const updated = newSteps.map((s, i) => ({ ...s, order: i, step: String(i + 1).padStart(2, '0') }));
    setSteps(updated);
    for (const s of updated) {
      await fetch(`/api/export-process/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: s.order, step: s.step }) });
    }
  };

  if (loading) return <div className="flex justify-center py-8"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-4">
      {/* Section Header Editor */}
      <Card className="p-4 border-emerald-200 bg-emerald-50/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Section Header</h4>
          {!editingSection ? (
            <Button variant="ghost" size="sm" onClick={() => { setSectionForm(sectionContent); setEditingSection(true); }}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setEditingSection(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {editingSection ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Title</label>
                <Input value={sectionForm.title} onChange={e => setSectionForm(p => ({ ...p, title: e.target.value }))} placeholder="Our Export Process" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Subtitle</label>
                <Input value={sectionForm.subtitle} onChange={e => setSectionForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="A streamlined process..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditingSection(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSaveSection} disabled={savingSection} className="bg-emerald-600 hover:bg-emerald-700">
                {savingSection ? <LoadingSpinner size="sm" className="mr-1" /> : <Save className="h-3 w-3 mr-1" />} Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500">Title</p>
              <p className="font-medium text-gray-900">{sectionContent.title || 'Our Export Process'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Subtitle</p>
              <p className="text-sm text-gray-600">{sectionContent.subtitle || 'Not set'}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Steps Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Export Process Steps</h3>
          <p className="text-sm text-gray-500">Manage the export process steps displayed on the home page</p>
        </div>
        {!editingId && (
          <Button onClick={handleAdd} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-1" /> Add Step
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {editingId && (
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-900">{editingId === 'new' ? 'Add New Step' : 'Edit Step'}</h4>
              <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Step Number</label>
                <Input value={formData.step || ''} onChange={e => setFormData(p => ({ ...p, step: e.target.value }))} placeholder="01" className="h-9" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-700 mb-1 block">Title *</label>
                <Input value={formData.title || ''} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="Step title" className="h-9" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Color</label>
                <div className="flex flex-wrap gap-1">
                  {COLOR_OPTIONS.map(opt => (
                    <button key={opt.value} type="button" onClick={() => setFormData(p => ({ ...p, color: opt.value }))}
                      className={`w-6 h-6 rounded ${opt.bg} ${formData.color === opt.value ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`} title={opt.label} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Description</label>
              <Textarea value={formData.description || ''} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="Brief description of this step" rows={2} className="text-sm" />
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

      {/* Steps List */}
      <div className="space-y-2">
        {steps.map((step, idx) => {
          const Icon = getIconComponent(step.icon);
          const colors = getColorClasses(step.color);
          return (
            <Card key={step.id} className={`p-3 ${!step.isActive ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                {/* Reorder Handle */}
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => handleReorder(step.id, 'up')} disabled={idx === 0} className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => handleReorder(step.id, 'down')} disabled={idx === steps.length - 1} className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>

                {/* Step Number */}
                <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-sm font-bold ${colors.text}`}>{step.step}</span>
                </div>

                {/* Icon */}
                <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-4 w-4 ${colors.text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{step.title}</h4>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${step.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {step.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  {step.description && <p className="text-xs text-gray-500 truncate mt-0.5">{step.description}</p>}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button onClick={() => handleEdit(step)} className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleToggle(step)} disabled={toggling === step.id}
                    className={`p-1.5 rounded ${step.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`} title={step.isActive ? 'Disable' : 'Enable'}>
                    {toggling === step.id ? <ToggleLoader size="sm" /> : <Power className="h-4 w-4" />}
                  </button>
                  <button onClick={() => showConfirmation('Delete Step', `Delete "${step.title}"?`, () => handleDelete(step.id))}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {steps.length === 0 && !editingId && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Package className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm mb-3">No export process steps yet</p>
          <Button onClick={handleAdd} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-1" /> Add Step
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
