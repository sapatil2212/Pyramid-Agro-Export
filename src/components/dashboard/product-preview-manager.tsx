"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Eye,
  RefreshCw,
  Image as ImageIcon,
  Package,
  Info
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  imageUrl?: string;
  images?: string[];
  heroImageUrl?: string;
  heroDescription?: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  isActive: boolean;
  isFeatured: boolean;
  updatedAt?: string;
}

export function ProductPreviewManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (response.ok && data.products) {
        // Parse JSON fields and filter only active products
        const parsedProducts = data.products.map((product: Product & { images?: string | string[] }) => ({
          ...product,
          images: product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : []
        }));
        
        const activeProducts = parsedProducts.filter((p: Product) => p.isActive);
        setProducts(activeProducts);
        // Show random 6 products
        shuffleAndDisplay(activeProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const shuffleAndDisplay = (productList: Product[]) => {
    // Shuffle array and take first 6
    const shuffled = [...productList].sort(() => Math.random() - 0.5);
    setDisplayedProducts(shuffled.slice(0, 6));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    shuffleAndDisplay(products);
    setTimeout(() => setRefreshing(false), 500);
  };

  const getImageUrl = (product: Product) => {
    return product.imageUrl || product.heroImageUrl || (product.images && product.images[0]) || null;
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Product Previews</h3>
          <p className="text-xs md:text-sm text-gray-600">
            Random products from your catalog displayed on the home page
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          disabled={refreshing}
          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Shuffle Products
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800 font-medium">Automatic Product Display</p>
          <p className="text-xs text-blue-600 mt-1">
            The home page automatically displays random products from your product catalog. 
            To add or manage products, go to <span className="font-semibold">Products Management</span> section.
          </p>
        </div>
      </div>

      {/* Products Preview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts.map((product, index) => {
          const imageUrl = getImageUrl(product);
          const cacheBuster = product.updatedAt ? `?t=${new Date(product.updatedAt).getTime()}` : '';
          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-3">
                {/* Image Preview */}
                <div className="relative h-32 mb-3 rounded-lg overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <Image
                      src={`${imageUrl}${cacheBuster}`}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.parentElement?.querySelector('.placeholder') as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`placeholder absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center ${imageUrl ? 'hidden' : 'flex'}`}
                  >
                    <Package className="h-8 w-8 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-400">No image</span>
                  </div>
                  
                  {/* Order badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-emerald-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                      #{index + 1}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: product.category?.color || '#10b981' }}
                    />
                    <span className="text-xs text-gray-500">{product.category?.name || 'Uncategorized'}</span>
                  </div>
                  
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {product.shortDescription || product.description || product.heroDescription || 'Premium quality agricultural product.'}
                  </p>
                  
                  {/* View Button */}
                  <Button
                    onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                    size="sm"
                    variant="outline"
                    className="w-full h-7 text-xs mt-2"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Product
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {displayedProducts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
          <p className="text-gray-600 mb-4">
            Add products in the Products Management section to display them here.
          </p>
        </div>
      )}

      {/* Stats */}
      {products.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{displayedProducts.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{products.length}</span> active products
          </div>
          <Button
            onClick={() => window.location.href = '/dashboard?tab=products'}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            Manage All Products
          </Button>
        </div>
      )}
    </div>
  );
}
