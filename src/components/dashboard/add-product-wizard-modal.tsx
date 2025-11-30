"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Plus, 
  X, 
  Upload,
  Folder,
  Image as ImageIcon,
  Star,
  Table,
  Sparkles,
  MessageSquare,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2
} from "lucide-react"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  isActive: boolean
  _count?: { products: number }
}

interface Feature {
  icon: string
  title: string
  description: string
}

interface TableRow {
  key: string
  value: string
}

interface SpecTable {
  title: string
  rows: TableRow[]
}

interface AddProductWizardModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  categories: ProductCategory[]
  onCategoryCreated: () => void
}

const STEPS = [
  { id: 1, name: "Category", icon: Folder },
  { id: 2, name: "Hero", icon: ImageIcon },
  { id: 3, name: "Features", icon: Star },
  { id: 4, name: "Tables", icon: Table },
  { id: 5, name: "CTA", icon: MessageSquare },
]

const ICON_OPTIONS = [
  "Star", "CheckCircle", "Leaf", "Truck", "Shield", "Heart", "Award", "Zap", 
  "Globe", "Clock", "Users", "Target", "Lock", "TrendingUp", "Sparkles"
]

const COLOR_OPTIONS = [
  { name: "Emerald", value: "#10b981" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Orange", value: "#f97316" },
  { name: "Green", value: "#22c55e" },
]

export function AddProductWizardModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  categories,
  onCategoryCreated 
}: AddProductWizardModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "", slug: "", description: "", color: "#10b981", isActive: true
  })
  
  const [heroData, setHeroData] = useState({
    name: "", slug: "", heroTitle: "", heroSubtitle: "", heroDescription: "",
    heroImageUrl: "", heroButtonText: "Get Quote", heroButtonLink: "/contact",
    heroButton2Text: "Learn More", heroButton2Link: "#features"
  })
  
  const [featuresData, setFeaturesData] = useState({
    featuresTitle: "", featuresSubtitle: "", features: [] as Feature[]
  })
  const [newFeature, setNewFeature] = useState<Feature>({ icon: "Star", title: "", description: "" })
  
  const [specTables, setSpecTables] = useState<SpecTable[]>([])
  const [newTableTitle, setNewTableTitle] = useState("")
  const [newRowKey, setNewRowKey] = useState("")
  const [newRowValue, setNewRowValue] = useState("")
  const [activeTableIndex, setActiveTableIndex] = useState<number | null>(null)
  
  const [ctaData, setCtaData] = useState({
    ctaTitle: "", ctaDescription: "", ctaButtonText: "Get Quote Now", ctaButtonLink: "/contact"
  })

  // Category management state
  const [categoryToDelete, setCategoryToDelete] = useState<ProductCategory | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [togglingCategoryId, setTogglingCategoryId] = useState<string | null>(null)
  const [deletingCategory, setDeletingCategory] = useState(false)

  useEffect(() => {
    if (!isOpen) resetForm()
  }, [isOpen])

  const resetForm = () => {
    setCurrentStep(1)
    setSelectedCategoryId("")
    setShowNewCategoryForm(false)
    setNewCategory({ name: "", slug: "", description: "", color: "#10b981", isActive: true })
    setHeroData({
      name: "", slug: "", heroTitle: "", heroSubtitle: "", heroDescription: "",
      heroImageUrl: "", heroButtonText: "Get Quote", heroButtonLink: "/contact",
      heroButton2Text: "Learn More", heroButton2Link: "#features"
    })
    setFeaturesData({ featuresTitle: "", featuresSubtitle: "", features: [] })
    setSpecTables([])
    setNewTableTitle("")
    setNewRowKey("")
    setNewRowValue("")
    setActiveTableIndex(null)
    setCtaData({ ctaTitle: "", ctaDescription: "", ctaButtonText: "Get Quote Now", ctaButtonLink: "/contact" })
  }

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

  const handleNameChange = (name: string) => {
    setHeroData(prev => ({
      ...prev, name, slug: generateSlug(name),
      heroTitle: name ? `Premium Quality ${name}` : ""
    }))
  }

  const handleCategoryNameChange = (name: string) => {
    setNewCategory(prev => ({ ...prev, name, slug: generateSlug(name) }))
  }

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) { toast.error("Category name is required"); return }
    setLoading(true)
    try {
      const response = await fetch("/api/product-categories", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory)
      })
      if (response.ok) {
        const created = await response.json()
        toast.success("Category created!")
        setSelectedCategoryId(created.id)
        setShowNewCategoryForm(false)
        onCategoryCreated()
        setNewCategory({ name: "", slug: "", description: "", color: "#10b981", isActive: true })
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to create category")
      }
    } catch { toast.error("Failed to create category") }
    finally { setLoading(false) }
  }

  const handleToggleCategory = async (cat: ProductCategory) => {
    setTogglingCategoryId(cat.id)
    try {
      const response = await fetch(`/api/product-categories/${cat.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !cat.isActive })
      })
      if (response.ok) {
        toast.success(`Category ${cat.isActive ? 'disabled' : 'enabled'}!`)
        onCategoryCreated() // Refresh categories
        if (selectedCategoryId === cat.id && cat.isActive) setSelectedCategoryId("")
      } else toast.error("Failed to update category")
    } catch { toast.error("Failed to update category") }
    finally { setTogglingCategoryId(null) }
  }

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return
    setDeletingCategory(true)
    try {
      const response = await fetch(`/api/product-categories/${categoryToDelete.id}`, { method: "DELETE" })
      if (response.ok) {
        toast.success("Category and its products deleted!")
        onCategoryCreated() // Refresh categories
        if (selectedCategoryId === categoryToDelete.id) setSelectedCategoryId("")
        setShowDeleteConfirm(false)
        setCategoryToDelete(null)
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to delete category")
      }
    } catch { toast.error("Failed to delete category") }
    finally { 
      setDeletingCategory(false)
    }
  }

  const confirmDeleteCategory = (cat: ProductCategory) => {
    setCategoryToDelete(cat)
    setShowDeleteConfirm(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast.error('Select a valid image'); return }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be < 5MB'); return }
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'products')
      const response = await fetch('/api/upload-image', { method: 'POST', body: formData })
      if (response.ok) {
        const result = await response.json()
        setHeroData(prev => ({ ...prev, heroImageUrl: result.url }))
        toast.success('Image uploaded')
      } else throw new Error()
    } catch { toast.error('Upload failed') }
    finally { setIsUploading(false) }
  }

  const addFeature = () => {
    if (!newFeature.title.trim() || !newFeature.description.trim()) {
      toast.error("Title and description required"); return
    }
    setFeaturesData(prev => ({ ...prev, features: [...prev.features, { ...newFeature }] }))
    setNewFeature({ icon: "Star", title: "", description: "" })
  }

  const removeFeature = (i: number) => {
    setFeaturesData(prev => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }))
  }

  // Table management functions
  const addTable = () => {
    if (!newTableTitle.trim()) { toast.error("Table title required"); return }
    setSpecTables(prev => [...prev, { title: newTableTitle, rows: [] }])
    setActiveTableIndex(specTables.length)
    setNewTableTitle("")
  }

  const removeTable = (index: number) => {
    setSpecTables(prev => prev.filter((_, i) => i !== index))
    if (activeTableIndex === index) setActiveTableIndex(null)
    else if (activeTableIndex && activeTableIndex > index) setActiveTableIndex(activeTableIndex - 1)
  }

  const addRowToTable = (tableIndex: number) => {
    if (!newRowKey.trim() || !newRowValue.trim()) { toast.error("Row key and value required"); return }
    setSpecTables(prev => prev.map((table, i) => 
      i === tableIndex ? { ...table, rows: [...table.rows, { key: newRowKey, value: newRowValue }] } : table
    ))
    setNewRowKey("")
    setNewRowValue("")
  }

  const removeRowFromTable = (tableIndex: number, rowIndex: number) => {
    setSpecTables(prev => prev.map((table, i) => 
      i === tableIndex ? { ...table, rows: table.rows.filter((_, ri) => ri !== rowIndex) } : table
    ))
  }

  const canProceed = () => {
    if (currentStep === 1) return selectedCategoryId !== ""
    if (currentStep === 2) return heroData.name.trim() !== "" && heroData.heroTitle.trim() !== ""
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Convert first table to specifications object for backward compatibility
      const specsObj: Record<string, string> = {}
      if (specTables.length > 0 && specTables[0].rows.length > 0) {
        specTables[0].rows.forEach(row => { specsObj[row.key] = row.value })
      }
      
      const productData = {
        name: heroData.name, slug: heroData.slug, categoryId: selectedCategoryId,
        imageUrl: heroData.heroImageUrl, // Set main image for preview cards
        heroTitle: heroData.heroTitle, heroSubtitle: heroData.heroSubtitle,
        heroDescription: heroData.heroDescription, heroImageUrl: heroData.heroImageUrl,
        heroButtonText: heroData.heroButtonText, heroButtonLink: heroData.heroButtonLink,
        heroButton2Text: heroData.heroButton2Text, heroButton2Link: heroData.heroButton2Link,
        featuresTitle: featuresData.featuresTitle || `Why Choose Our ${heroData.name}?`,
        featuresSubtitle: featuresData.featuresSubtitle,
        features: featuresData.features, specifications: specsObj,
        ctaTitle: ctaData.ctaTitle || `Ready to Order Premium ${heroData.name}?`,
        ctaDescription: ctaData.ctaDescription || `Contact us today for the finest quality ${heroData.name.toLowerCase()} delivered to your doorstep`,
        ctaButtonText: ctaData.ctaButtonText,
        ctaButtonLink: ctaData.ctaButtonLink,
        isActive: true, isFeatured: false, isOrganic: false, isPremium: false, order: 0
      }
      
      const response = await fetch("/api/products", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })
      
      if (response.ok) {
        toast.success("Product created!")
        onSuccess()
        onClose()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to create product")
      }
    } catch { toast.error("Failed to create product") }
    finally { setLoading(false) }
  }

  return (
    <>
    <Dialog open={isOpen && !showDeleteConfirm} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center justify-center gap-1.5 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-[11px] text-center">Create a product in a few simple steps</DialogDescription>
        </DialogHeader>

        {/* Progress Steps - Centered & Compact */}
        <div className="py-2">
          <div className="flex items-center justify-center gap-1">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center border transition-all",
                      isCompleted ? "bg-emerald-600 border-emerald-600 text-white" :
                      isCurrent ? "border-emerald-600 text-emerald-600 bg-emerald-50" : "border-gray-300 text-gray-400"
                    )}>
                      {isCompleted ? <Check className="h-3.5 w-3.5" /> : <StepIcon className="h-3.5 w-3.5" />}
                    </div>
                    <span className={cn("mt-1 text-[10px] font-medium", isCurrent ? "text-emerald-600" : "text-gray-400")}>{step.name}</span>
                  </div>
                  {index < STEPS.length - 1 && <div className={cn("w-6 h-px mx-0.5", isCompleted ? "bg-emerald-600" : "bg-gray-200")} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[280px] py-2 px-4">
          {/* Step 1: Category */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-sm font-semibold">Select Category</h3>
                <p className="text-[11px] text-gray-500">Choose, create, or manage categories</p>
              </div>
              
              {/* All Categories with Management - Grid Layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                {categories.map((cat) => (
                  <div key={cat.id} className={cn(
                    "relative p-2.5 rounded-lg border transition-all",
                    !cat.isActive ? "opacity-60 bg-gray-50" : "",
                    selectedCategoryId === cat.id ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600" : "border-gray-200 hover:border-gray-300"
                  )}>
                    {/* Select Area */}
                    <button 
                      onClick={() => { if (cat.isActive) { setSelectedCategoryId(cat.id); setShowNewCategoryForm(false) }}}
                      className={cn("w-full text-left", !cat.isActive && "cursor-not-allowed")}
                      disabled={!cat.isActive}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {cat.color && <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />}
                        <span className="text-xs font-medium truncate flex-1">{cat.name}</span>
                        {selectedCategoryId === cat.id && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        {!cat.isActive && <span className="text-orange-500">(disabled)</span>}
                        {cat._count?.products !== undefined && <span>{cat._count.products} products</span>}
                      </div>
                    </button>
                    
                    {/* Actions Row */}
                    <div className="flex items-center justify-end gap-1 mt-1.5 pt-1.5 border-t border-gray-100">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleToggleCategory(cat) }} 
                        disabled={togglingCategoryId === cat.id}
                        className={cn("p-1 rounded hover:bg-gray-100 transition-colors", cat.isActive ? "text-emerald-600" : "text-gray-400")}
                        title={cat.isActive ? "Disable" : "Enable"}
                      >
                        {togglingCategoryId === cat.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : cat.isActive ? (
                          <ToggleRight className="h-3.5 w-3.5" />
                        ) : (
                          <ToggleLeft className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); confirmDeleteCategory(cat) }} 
                        className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add New Category Button */}
                <button onClick={() => { setShowNewCategoryForm(true); setSelectedCategoryId("") }}
                  className={cn("p-2.5 rounded-lg border border-dashed flex flex-col items-center justify-center gap-1 min-h-[70px]",
                    showNewCategoryForm ? "border-emerald-600 bg-emerald-50" : "border-gray-300 hover:border-emerald-400"
                  )}>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Plus className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-[10px] font-medium text-emerald-600">Add New</span>
                </button>
              </div>

              {showNewCategoryForm && (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <h4 className="text-xs font-semibold mb-2">Create Category</h4>
                  <div className="space-y-2">
                    <div><Label className="text-[11px]">Name *</Label><Input className="h-8 text-xs" value={newCategory.name} onChange={(e) => handleCategoryNameChange(e.target.value)} placeholder="e.g., Fresh Fruits" /></div>
                    <div className="flex items-center gap-2">
                      <Label className="text-[11px]">Color:</Label>
                      {COLOR_OPTIONS.map((c) => (
                        <button key={c.value} type="button" className={cn("w-5 h-5 rounded-full border", newCategory.color === c.value ? "ring-2 ring-offset-1 ring-gray-400" : "")}
                          style={{ backgroundColor: c.value }} onClick={() => setNewCategory(p => ({ ...p, color: c.value }))} />
                      ))}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setShowNewCategoryForm(false)}>Cancel</Button>
                      <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={handleCreateCategory} disabled={loading}>
                        {loading ? "..." : "Create"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Hero */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-sm font-semibold">Hero Section</h3>
                <p className="text-[11px] text-gray-500">Product details & image</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div><Label className="text-[11px]">Product Name *</Label><Input className="h-8 text-xs" value={heroData.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g., Nashik Grapes" /></div>
                  <div><Label className="text-[11px]">Hero Title *</Label><Input className="h-8 text-xs" value={heroData.heroTitle} onChange={(e) => setHeroData(p => ({ ...p, heroTitle: e.target.value }))} /></div>
                  <div><Label className="text-[11px]">Subtitle</Label><Input className="h-8 text-xs" value={heroData.heroSubtitle} onChange={(e) => setHeroData(p => ({ ...p, heroSubtitle: e.target.value }))} placeholder="Appears in green" /></div>
                  <div><Label className="text-[11px]">Description</Label><Textarea className="text-xs min-h-[60px]" value={heroData.heroDescription} onChange={(e) => setHeroData(p => ({ ...p, heroDescription: e.target.value }))} rows={3} /></div>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label className="text-[11px]">Hero Image</Label>
                    <div className="mt-1 border border-dashed rounded-lg p-3 text-center">
                      {heroData.heroImageUrl ? (
                        <div className="relative">
                          <img src={heroData.heroImageUrl} alt="Hero" className="max-h-20 mx-auto rounded" />
                          <Button variant="outline" size="sm" className="mt-1 h-6 text-[10px]" onClick={() => setHeroData(p => ({ ...p, heroImageUrl: "" }))}>Remove</Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Upload className="h-5 w-5 mx-auto text-gray-400" />
                          <p className="mt-1 text-[10px] text-gray-500">{isUploading ? "Uploading..." : "Click to upload"}</p>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label className="text-[11px]">Btn 1 Text</Label><Input className="h-8 text-xs" value={heroData.heroButtonText} onChange={(e) => setHeroData(p => ({ ...p, heroButtonText: e.target.value }))} /></div>
                    <div><Label className="text-[11px]">Btn 1 Link</Label><Input className="h-8 text-xs" value={heroData.heroButtonLink} onChange={(e) => setHeroData(p => ({ ...p, heroButtonLink: e.target.value }))} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label className="text-[11px]">Btn 2 Text</Label><Input className="h-8 text-xs" value={heroData.heroButton2Text} onChange={(e) => setHeroData(p => ({ ...p, heroButton2Text: e.target.value }))} /></div>
                    <div><Label className="text-[11px]">Btn 2 Link</Label><Input className="h-8 text-xs" value={heroData.heroButton2Link} onChange={(e) => setHeroData(p => ({ ...p, heroButton2Link: e.target.value }))} /></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Features */}
          {currentStep === 3 && (
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-sm font-semibold">Why Choose Our {heroData.name || "Product"}?</h3>
                <p className="text-[11px] text-gray-500">Add feature highlights</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-[11px]">Section Title</Label><Input className="h-8 text-xs" value={featuresData.featuresTitle} onChange={(e) => setFeaturesData(p => ({ ...p, featuresTitle: e.target.value }))} placeholder={`Why Choose Our ${heroData.name}?`} /></div>
                <div><Label className="text-[11px]">Subtitle</Label><Input className="h-8 text-xs" value={featuresData.featuresSubtitle} onChange={(e) => setFeaturesData(p => ({ ...p, featuresSubtitle: e.target.value }))} /></div>
              </div>
              
              <div className="border rounded-lg p-3 bg-gray-50">
                <div className="flex items-end gap-2">
                  <div className="w-24">
                    <Label className="text-[10px]">Icon</Label>
                    <select value={newFeature.icon} onChange={(e) => setNewFeature(p => ({ ...p, icon: e.target.value }))}
                      className="w-full h-8 text-xs px-2 border rounded">
                      {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                  <div className="flex-1"><Label className="text-[10px]">Title</Label><Input className="h-8 text-xs" value={newFeature.title} onChange={(e) => setNewFeature(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Premium Quality" /></div>
                  <div className="flex-1"><Label className="text-[10px]">Description</Label><Input className="h-8 text-xs" value={newFeature.description} onChange={(e) => setNewFeature(p => ({ ...p, description: e.target.value }))} placeholder="Brief description" /></div>
                  <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={addFeature}><Plus className="h-3 w-3" /></Button>
                </div>
              </div>

              {featuresData.features.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[140px] overflow-y-auto">
                  {featuresData.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-7 h-7 bg-emerald-100 rounded flex items-center justify-center text-emerald-600 text-[10px] font-bold flex-shrink-0">{f.icon.slice(0, 2)}</div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-medium truncate">{f.title}</h5>
                        <p className="text-[10px] text-gray-500 truncate">{f.description}</p>
                      </div>
                      <button onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700 flex-shrink-0"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Tables Builder */}
          {currentStep === 4 && (
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-sm font-semibold">Specification Tables</h3>
                <p className="text-[11px] text-gray-500">Create tables like Grapes component</p>
              </div>
              
              {/* Add New Table */}
              <div className="border rounded-lg p-3 bg-gray-50">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label className="text-[11px]">New Table Title</Label>
                    <Input className="h-8 text-xs" value={newTableTitle} onChange={(e) => setNewTableTitle(e.target.value)} placeholder="e.g., Product Specifications" />
                  </div>
                  <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={addTable}>
                    <Plus className="h-3 w-3 mr-1" />Add Table
                  </Button>
                </div>
              </div>

              {/* Tables List */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto">
                {specTables.map((table, tableIndex) => (
                  <div key={tableIndex} className={cn("border rounded-lg overflow-hidden", activeTableIndex === tableIndex ? "ring-2 ring-emerald-500" : "")}>
                    {/* Table Header */}
                    <div className="bg-emerald-600 text-white px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTableIndex(activeTableIndex === tableIndex ? null : tableIndex)}>
                        <Table className="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold">{table.title}</span>
                        <span className="text-[10px] opacity-75">({table.rows.length} rows)</span>
                      </div>
                      <button onClick={() => removeTable(tableIndex)} className="text-white/80 hover:text-white"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                    
                    {/* Table Content - Expandable */}
                    {activeTableIndex === tableIndex && (
                      <div className="p-2 bg-white">
                        {/* Add Row */}
                        <div className="flex items-end gap-2 mb-2 pb-2 border-b">
                          <div className="flex-1">
                            <Label className="text-[10px]">Key</Label>
                            <Input className="h-7 text-xs" value={newRowKey} onChange={(e) => setNewRowKey(e.target.value)} placeholder="e.g., Origin" />
                          </div>
                          <div className="flex-1">
                            <Label className="text-[10px]">Value</Label>
                            <Input className="h-7 text-xs" value={newRowValue} onChange={(e) => setNewRowValue(e.target.value)} placeholder="e.g., Nashik, India" />
                          </div>
                          <Button size="sm" className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700" onClick={() => addRowToTable(tableIndex)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Rows */}
                        {table.rows.length > 0 ? (
                          <div className="space-y-1">
                            {table.rows.map((row, rowIndex) => (
                              <div key={rowIndex} className="flex items-center gap-2 text-xs bg-gray-50 rounded px-2 py-1.5">
                                <span className="font-medium text-gray-900 w-1/3 truncate">{row.key}</span>
                                <span className="text-gray-600 flex-1 truncate">{row.value}</span>
                                <button onClick={() => removeRowFromTable(tableIndex, rowIndex)} className="text-red-500 hover:text-red-700 flex-shrink-0">
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-gray-400 text-center py-2">No rows yet. Add rows above.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {specTables.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <Table className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No tables yet. Create one above.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: CTA Section */}
          {currentStep === 5 && (
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-sm font-semibold">Call to Action</h3>
                <p className="text-[11px] text-gray-500">Bottom section of product page</p>
              </div>
              
              <div className="space-y-2">
                <div><Label className="text-[11px]">CTA Title</Label><Input className="h-8 text-xs" value={ctaData.ctaTitle} onChange={(e) => setCtaData(p => ({ ...p, ctaTitle: e.target.value }))} placeholder={`Ready to Order Premium ${heroData.name}?`} /></div>
                <div><Label className="text-[11px]">Description</Label><Textarea className="text-xs min-h-[50px]" value={ctaData.ctaDescription} onChange={(e) => setCtaData(p => ({ ...p, ctaDescription: e.target.value }))} placeholder={`Contact us today...`} rows={2} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><Label className="text-[11px]">Button Text</Label><Input className="h-8 text-xs" value={ctaData.ctaButtonText} onChange={(e) => setCtaData(p => ({ ...p, ctaButtonText: e.target.value }))} /></div>
                  <div><Label className="text-[11px]">Button Link</Label><Input className="h-8 text-xs" value={ctaData.ctaButtonLink} onChange={(e) => setCtaData(p => ({ ...p, ctaButtonLink: e.target.value }))} /></div>
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                <p className="text-[10px] text-gray-400 mb-2 text-center">Preview</p>
                <div className="text-center">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{ctaData.ctaTitle || `Ready to Order Premium ${heroData.name}?`}</h3>
                  <p className="text-[11px] text-gray-600 mb-2">{ctaData.ctaDescription || `Contact us today for the finest quality ${heroData.name.toLowerCase()} delivered to your doorstep`}</p>
                  <div className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white rounded text-xs">{ctaData.ctaButtonText || "Get Quote Now"}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-3 border-t">
          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={currentStep === 1 ? onClose : () => setCurrentStep(p => p - 1)}>
            {currentStep === 1 ? "Cancel" : <><ChevronLeft className="h-3 w-3 mr-1" />Back</>}
          </Button>
          {currentStep < 5 ? (
            <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => setCurrentStep(p => p + 1)} disabled={!canProceed()}>
              Next<ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          ) : (
            <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>

      {/* Delete Category Confirmation Modal */}
      {showDeleteConfirm && (
        <ConfirmationModal
          isOpen={showDeleteConfirm}
          onClose={() => { if (!deletingCategory) { setShowDeleteConfirm(false); setCategoryToDelete(null) }}}
          onConfirm={handleDeleteCategory}
          title="Delete Category?"
          message={categoryToDelete && categoryToDelete._count?.products && categoryToDelete._count.products > 0 
            ? `This will permanently delete "${categoryToDelete.name}" and its ${categoryToDelete._count.products} product(s). This action cannot be undone.`
            : `This will permanently delete "${categoryToDelete?.name || 'this category'}". This action cannot be undone.`
          }
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          loading={deletingCategory}
        />
      )}
    </>
  )
}
