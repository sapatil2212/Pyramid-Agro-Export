"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { SuccessModal } from "@/components/ui/success-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2,
  Star,
  CheckCircle,
  Eye,
  RefreshCw
} from "lucide-react"
import { toast } from "sonner"

interface Variety {
  name: string
  type: string
  characteristics: string
  features: string
}

interface Specification {
  category: string
  value: string
}

interface GreenChillisTableData {
  tableTitle?: string
  tableDescription?: string
  tableVarieties?: string
  tableSpecs?: string
  tableAdvantages?: string
}

export function GreenChillisTableManager() {
  const [tableData, setTableData] = useState<GreenChillisTableData>({})
  const [varieties, setVarieties] = useState<Variety[]>([])
  const [specifications, setSpecifications] = useState<Specification[]>([])
  const [advantages, setAdvantages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingSection, setEditingSection] = useState<'info' | 'varieties' | 'specifications' | 'advantages' | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Default data fallback
  const defaultVarieties: Variety[] = [
    {
      name: "Premium Grade",
      type: "Export Quality",
      characteristics: "Premium quality green chilies with excellent characteristics",
      features: "Premium quality, Export grade, Excellent characteristics"
    },
    {
      name: "Standard Grade",
      type: "Commercial Quality",
      characteristics: "Standard quality green chilies for commercial use",
      features: "Standard quality, Commercial use, Good characteristics"
    }
  ]

  const defaultSpecifications: Specification[] = [
    { category: "Origin", value: "India" },
    { category: "Quality Grade", value: "Export Grade" },
    { category: "Season", value: "Year Round" },
    { category: "Packaging", value: "Export Standard" },
    { category: "Certification", value: "FSSAI, APEDA" }
  ]

  const defaultAdvantages = [
    "Premium quality green chilies with excellent characteristics",
    "Export grade quality meeting international standards",
    "Fresh harvest ensuring maximum quality and taste",
    "Quality assured with rigorous quality checks",
    "Perfect for both domestic and international markets"
  ]

  useEffect(() => {
    fetchTableData()
  }, [])

  const fetchTableData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products?slug=green-chillis')
      if (response.ok) {
        const data = await response.json()
        if (data.products && data.products.length > 0) {
          const product = data.products[0]
          setTableData({
            tableTitle: product.tableTitle,
            tableDescription: product.tableDescription,
            tableVarieties: product.tableVarieties,
            tableSpecs: product.tableSpecs,
            tableAdvantages: product.tableAdvantages
          })

          // Parse JSON data
          if (product.tableVarieties) {
            try {
              const parsedVarieties = JSON.parse(product.tableVarieties)
              if (Array.isArray(parsedVarieties)) {
                setVarieties(parsedVarieties)
              }
            } catch (e) {
              console.error('Error parsing varieties:', e)
              setVarieties(defaultVarieties)
            }
          } else {
            setVarieties(defaultVarieties)
          }

          if (product.tableSpecs) {
            try {
              const parsedSpecs = JSON.parse(product.tableSpecs)
              if (Array.isArray(parsedSpecs)) {
                setSpecifications(parsedSpecs)
              }
            } catch (e) {
              console.error('Error parsing specifications:', e)
              setSpecifications(defaultSpecifications)
            }
          } else {
            setSpecifications(defaultSpecifications)
          }

          if (product.tableAdvantages) {
            try {
              const parsedAdvantages = JSON.parse(product.tableAdvantages)
              if (Array.isArray(parsedAdvantages)) {
                setAdvantages(parsedAdvantages)
              }
            } catch (e) {
              console.error('Error parsing advantages:', e)
              setAdvantages(defaultAdvantages)
            }
          } else {
            setAdvantages(defaultAdvantages)
          }
        } else {
          // No product found, use defaults
          setVarieties(defaultVarieties)
          setSpecifications(defaultSpecifications)
          setAdvantages(defaultAdvantages)
        }
      } else {
        throw new Error('Failed to fetch table data')
      }
    } catch (error) {
      console.error('Error fetching table data:', error)
      toast.error('Failed to load table data')
      // Use default data on error
      setVarieties(defaultVarieties)
      setSpecifications(defaultSpecifications)
      setAdvantages(defaultAdvantages)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      const response = await fetch('/api/products/green-chillis-table-content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableTitle: tableData.tableTitle,
          tableDescription: tableData.tableDescription,
          tableVarieties: JSON.stringify(varieties),
          tableSpecs: JSON.stringify(specifications),
          tableAdvantages: JSON.stringify(advantages)
        })
      })

      if (response.ok) {
        toast.success('Table content updated successfully!')
        setShowSuccessModal(true)
        setShowEditModal(false)
        setEditingSection(null)
        // Refresh the page to show updated content
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update table content')
      }
    } catch (error) {
      console.error('Error saving table data:', error)
      toast.error('Failed to save table content')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setShowEditModal(false)
    setEditingSection(null)
    fetchTableData() // Reset to original data
  }

  const handleEditSection = (section: 'info' | 'varieties' | 'specifications' | 'advantages') => {
    setEditingSection(section)
    setShowEditModal(true)
  }

  // Variety handlers
  const handleAddVariety = () => {
    setVarieties([...varieties, { name: '', type: '', characteristics: '', features: '' }])
  }

  const handleUpdateVariety = (index: number, field: string, value: string) => {
    const updated = [...varieties]
    updated[index] = { ...updated[index], [field]: value }
    setVarieties(updated)
  }

  const handleDeleteVariety = (index: number) => {
    setVarieties(varieties.filter((_, i) => i !== index))
  }

  // Specification handlers
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { category: '', value: '' }])
  }

  const handleUpdateSpecification = (index: number, field: string, value: string) => {
    const updated = [...specifications]
    updated[index] = { ...updated[index], [field]: value }
    setSpecifications(updated)
  }

  const handleDeleteSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }

  // Advantage handlers
  const handleAddAdvantage = () => {
    setAdvantages([...advantages, ''])
  }

  const handleUpdateAdvantage = (index: number, value: string) => {
    const updated = [...advantages]
    updated[index] = value
    setAdvantages(updated)
  }

  const handleDeleteAdvantage = (index: number) => {
    setAdvantages(advantages.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
          <span className="ml-2 text-gray-600">Loading table data...</span>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Table Info Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                  Table Info
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditSection('info')}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit table content"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => window.open('/products/green-chillis', '_blank')}
                  className="p-1.5 text-gray-400 hover:text-gray-600"
                  title="Preview on website"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {tableData.tableTitle || "GREEN CHILIES - Premium Export Quality"}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-3">
                {tableData.tableDescription || "Premium quality green chilies with excellent characteristics and export grade quality."}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
                <span>{varieties.length} varieties</span>
                <span>•</span>
                <span>{specifications.length} specifications</span>
                <span>•</span>
                <span>{advantages.length} advantages</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Green Chilies Varieties Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                  Varieties
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {varieties.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditSection('varieties')}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit varieties"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => window.open('/products/green-chillis', '_blank')}
                  className="p-1.5 text-gray-400 hover:text-gray-600"
                  title="Preview on website"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                <Star className="h-4 w-4 mr-1 text-emerald-600" />
                Green Chilies Varieties
              </h4>
              <div className="space-y-1">
                {varieties.slice(0, 3).map((variety, index) => (
                  <div key={index} className="text-xs text-gray-600">
                    <span className="font-medium">{variety.name}</span> - {variety.type}
                  </div>
                ))}
                {varieties.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{varieties.length - 3} more varieties
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Product Specifications Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                  Specs
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {specifications.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditSection('specifications')}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit specifications"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => window.open('/products/green-chillis', '_blank')}
                  className="p-1.5 text-gray-400 hover:text-gray-600"
                  title="Preview on website"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-emerald-600" />
                Product Specifications
              </h4>
              <div className="space-y-1">
                {specifications.slice(0, 3).map((spec, index) => (
                  <div key={index} className="text-xs text-gray-600">
                    <span className="font-medium">{spec.category}:</span> {spec.value}
                  </div>
                ))}
                {specifications.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{specifications.length - 3} more specifications
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Key Advantages Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                  Advantages
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {advantages.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditSection('advantages')}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit advantages"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => window.open('/products/green-chillis', '_blank')}
                  className="p-1.5 text-gray-400 hover:text-gray-600"
                  title="Preview on website"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                <Star className="h-4 w-4 mr-1 text-emerald-600" />
                Key Advantages
              </h4>
              <div className="space-y-1">
                {advantages.slice(0, 2).map((advantage, index) => (
                  <div key={index} className="text-xs text-gray-600 line-clamp-2">
                    {advantage}
                  </div>
                ))}
                {advantages.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{advantages.length - 2} more advantages
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSection === 'info' && 'Edit Table Information'}
              {editingSection === 'varieties' && 'Edit Green Chilies Varieties'}
              {editingSection === 'specifications' && 'Edit Product Specifications'}
              {editingSection === 'advantages' && 'Edit Key Advantages'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Table Information Form */}
            {editingSection === 'info' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tableTitle" className="text-sm font-medium text-gray-700 mb-2 block">
                    Table Title
                  </Label>
                  <Input
                    id="tableTitle"
                    value={tableData.tableTitle || ''}
                    onChange={(e) => setTableData(prev => ({ ...prev, tableTitle: e.target.value }))}
                    placeholder="Enter table title"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="tableDescription" className="text-sm font-medium text-gray-700 mb-2 block">
                    Table Description
                  </Label>
                  <Textarea
                    id="tableDescription"
                    value={tableData.tableDescription || ''}
                    onChange={(e) => setTableData(prev => ({ ...prev, tableDescription: e.target.value }))}
                    placeholder="Enter table description"
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Varieties Form */}
            {editingSection === 'varieties' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-emerald-600" />
                    Green Chilies Varieties
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddVariety}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Variety
                  </Button>
                </div>
                <div className="space-y-3">
                  {varieties.map((variety, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg">
                      <Input
                        placeholder="Variety Name"
                        value={variety.name}
                        onChange={(e) => handleUpdateVariety(index, 'name', e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        placeholder="Type"
                        value={variety.type}
                        onChange={(e) => handleUpdateVariety(index, 'type', e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        placeholder="Characteristics"
                        value={variety.characteristics}
                        onChange={(e) => handleUpdateVariety(index, 'characteristics', e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Key Features"
                          value={variety.features}
                          onChange={(e) => handleUpdateVariety(index, 'features', e.target.value)}
                          className="text-sm flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteVariety(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Form */}
            {editingSection === 'specifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
                    Product Specifications
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddSpecification}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Specification
                  </Button>
                </div>
                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-lg">
                      <Input
                        placeholder="Category"
                        value={spec.category}
                        onChange={(e) => handleUpdateSpecification(index, 'category', e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        placeholder="Specification"
                        value={spec.value}
                        onChange={(e) => handleUpdateSpecification(index, 'value', e.target.value)}
                        className="text-sm"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSpecification(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advantages Form */}
            {editingSection === 'advantages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-emerald-600" />
                    Key Advantages
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddAdvantage}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Advantage
                  </Button>
                </div>
                <div className="space-y-3">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <Textarea
                        placeholder="Enter advantage"
                        value={advantage}
                        onChange={(e) => handleUpdateAdvantage(index, e.target.value)}
                        rows={2}
                        className="text-sm flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAdvantage(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save/Cancel Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Table Content Updated!"
        message="Your Green Chilies table content has been saved successfully."
      />
    </div>
  )
}