"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner, ToggleLoader } from "@/components/ui/loading-spinner";
import { 
  Plus,
  Edit,
  Trash2,
  Power,
  Image as ImageIcon,
  Package,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { SuccessModal } from "@/components/ui/success-modal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { AddProductWizardModal } from "./add-product-wizard-modal";
import { EditProductWizardModal } from "./edit-product-wizard-modal";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  imageUrl?: string;
  images?: string[];
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  specifications?: Record<string, string>;
  origin?: string;
  seasons?: string[];
  minOrderQuantity?: string;
  packaging?: string[];
  price?: { min: number; max: number; currency: string };
  availability: string;
  features?: string[] | Array<{ icon?: string; title?: string; description?: string }>;
  nutritionalInfo?: Record<string, string>;
  certifications?: string[];
  shelfLife?: string;
  storageConditions?: string[];
  exportMarkets?: string[];
  rating: number;
  reviews: number;
  isFeatured: boolean;
  isOrganic: boolean;
  isPremium: boolean;
  isActive: boolean;
  order: number;
  // Hero section fields
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImageUrl?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroButton2Text?: string;
  heroButton2Link?: string;
  // Features section fields
  featuresTitle?: string;
  featuresSubtitle?: string;
  // CTA section fields
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  // Nashik Grapes Table fields
  tableTitle?: string;
  tableDescription?: string;
  tableVarieties?: string;
  tableSpecs?: string;
  tableAdvantages?: string;
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'products'>('products');
  const [showAddProductWizard, setShowAddProductWizard] = useState(false);
  const [showEditProductWizard, setShowEditProductWizard] = useState(false);

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
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?admin=true&includeInactive=true');
      const data = await response.json();
      
      if (response.ok) {
        // Parse JSON fields
        const parsedData = data.products.map((product: Product & { images?: string; specifications?: string; seasons?: string; packaging?: string; certifications?: string; storageConditions?: string; exportMarkets?: string }) => ({
          ...product,
          images: product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : [],
          specifications: product.specifications ? (typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications) : null,
          seasons: product.seasons ? (typeof product.seasons === 'string' ? JSON.parse(product.seasons) : product.seasons) : [],
          packaging: product.packaging ? (typeof product.packaging === 'string' ? JSON.parse(product.packaging) : product.packaging) : [],
          price: product.price ? (typeof product.price === 'string' ? JSON.parse(product.price) : product.price) : null,
          features: product.features ? (typeof product.features === 'string' ? JSON.parse(product.features) : product.features) : [],
          nutritionalInfo: product.nutritionalInfo ? (typeof product.nutritionalInfo === 'string' ? JSON.parse(product.nutritionalInfo) : product.nutritionalInfo) : null,
          certifications: product.certifications ? (typeof product.certifications === 'string' ? JSON.parse(product.certifications) : product.certifications) : [],
          storageConditions: product.storageConditions ? (typeof product.storageConditions === 'string' ? JSON.parse(product.storageConditions) : product.storageConditions) : [],
          exportMarkets: product.exportMarkets ? (typeof product.exportMarkets === 'string' ? JSON.parse(product.exportMarkets) : product.exportMarkets) : []
        }));
        setProducts(parsedData);
      } else {
        throw new Error(data.error || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ type: 'error', text: 'Failed to load products' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/product-categories?admin=true&includeInactive=true');
      const data = await response.json();
      
      if (response.ok) {
        setCategories(data);
      } else {
        throw new Error(data.error || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = () => {
    // Open the new multi-step wizard modal
    setShowAddProductWizard(true);
  };

  const handleWizardSuccess = async () => {
    await fetchProducts();
    await fetchCategories();
    showSuccess('Product created successfully!');
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditProductWizard(true);
  };

  const handleEditWizardSuccess = async () => {
    await fetchProducts();
    await fetchCategories();
    showSuccess('Product updated successfully!');
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setDeleting(true);
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showSuccess('Product deleted successfully!');
        await fetchProducts();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ type: 'error', text: 'Failed to delete product' });
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      setToggling(product.id);
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !product.isActive
        })
      });

      if (response.ok) {
        showSuccess(`Product ${product.isActive ? 'disabled' : 'enabled'} successfully!`);
        await fetchProducts();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product status');
      }
    } catch (error) {
      console.error('Error toggling product status:', error);
      setMessage({ type: 'error', text: 'Failed to update product status' });
    } finally {
      setToggling(null);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = products.findIndex(p => p.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= products.length) return;

    const newProducts = [...products];
    const [movedItem] = newProducts.splice(currentIndex, 1);
    newProducts.splice(newIndex, 0, movedItem);

    // Update order values
    newProducts.forEach((product, index) => {
      product.order = index;
    });

    setProducts(newProducts);

    // Update in database
    try {
      await fetch('/api/products/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: newProducts.map(p => ({ id: p.id, order: p.order }))
        })
      });
    } catch (error) {
      console.error('Error reordering products:', error);
      // Revert on error
      await fetchProducts();
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.categoryId === filterCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Products Management</h3>
          <p className="text-gray-600">
            Manage all your products, categories, and product details
          </p>
        </div>
        {currentView === 'products' && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => { fetchProducts(); fetchCategories(); }}
              disabled={loading}
              className="border-gray-300"
            >
              <svg className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </Button>
            <Button
              onClick={handleAddProduct}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>
        )}
      </div>


      {/* Products Content */}
      <>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="sm:w-64">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              {/* Image Preview - Increased Height */}
              <div className="relative">
                {(() => {
                  const imageUrl = product.imageUrl || product.heroImageUrl || (product.images && product.images[0]);
                  const cacheBuster = product.updatedAt ? `?t=${new Date(product.updatedAt).getTime()}` : '';
                  
                  if (imageUrl) {
                    return (
                      <div className="relative w-full h-40 overflow-hidden bg-gray-50">
                        <Image
                          src={`${imageUrl}${cacheBuster}`}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = target.parentElement?.querySelector('.placeholder') as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        <div className="placeholder absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center" style={{ display: 'none' }}>
                          <ImageIcon className="h-10 w-10 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-400">Image unavailable</span>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  );
                })()}
                
                {/* Action Buttons - Always visible */}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-1.5 bg-white/90 text-emerald-600 hover:bg-white rounded-lg shadow-sm transition-colors"
                    title="Edit product"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleToggleStatus(product)}
                    disabled={toggling === product.id}
                    className={`p-1.5 bg-white/90 rounded-lg shadow-sm transition-colors ${
                      product.isActive ? 'text-green-600 hover:bg-white' : 'text-gray-400 hover:bg-white'
                    } ${toggling === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={product.isActive ? 'Disable product' : 'Enable product'}
                  >
                    {toggling === product.id ? (
                      <ToggleLoader size="sm" />
                    ) : (
                      <Power className="h-4 w-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => showConfirmation(
                      'Delete Product',
                      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
                      () => handleDeleteProduct(product.id)
                    )}
                    className="p-1.5 bg-white/90 text-red-600 hover:bg-white rounded-lg shadow-sm transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-3">
                {/* Badges Row */}
                <div className="flex items-center flex-wrap gap-1.5 mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    #{index + 1}
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    product.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {product.isActive ? 'Active' : 'Disabled'}
                  </span>
                  {product.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-700 text-[10px] font-medium px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                
                {/* Title */}
                <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                  {product.name}
                </h4>
                
                {/* Short Description */}
                {(product.shortDescription || product.heroDescription) && (
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                    {product.shortDescription || product.heroDescription}
                  </p>
                )}
                
                {/* Category */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Package className="h-3 w-3" />
                  <span className="truncate">{product.category.name}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first product.'
              }
            </p>
            {(!searchTerm && filterCategory === 'all') && (
              <Button
                onClick={handleAddProduct}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>
        )}
      </>

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

      {/* Add Product Wizard Modal */}
      <AddProductWizardModal
        isOpen={showAddProductWizard}
        onClose={() => setShowAddProductWizard(false)}
        onSuccess={handleWizardSuccess}
        categories={categories}
        onCategoryCreated={fetchCategories}
      />

      {/* Edit Product Wizard Modal */}
      <EditProductWizardModal
        isOpen={showEditProductWizard}
        onClose={() => {
          setShowEditProductWizard(false);
          setSelectedProduct(null);
        }}
        onSuccess={handleEditWizardSuccess}
        product={selectedProduct}
        categories={categories}
        onCategoryCreated={fetchCategories}
      />
    </div>
  );
}
