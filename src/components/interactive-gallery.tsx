'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  imageUrl: string;
  altText?: string;
  title?: string;
  description?: string;
  section: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function InteractiveGallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPositionRef = useRef<number>(0);

  // Fetch gallery images from API
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch('/api/gallery-images?section=interactive');
        const data = await response.json();
        
        if (response.ok) {
          console.log('Fetched interactive gallery images:', data);
          const activeImages = data.filter((img: GalleryImage) => img.isActive);
          console.log('Active interactive gallery images:', activeImages);
          setGalleryImages(activeImages);
        } else {
          console.error('Failed to fetch interactive gallery images:', data.error);
        }
      } catch (error) {
        console.error('Error fetching interactive gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Smooth auto-scroll using requestAnimationFrame
  const smoothAutoScroll = useCallback(() => {
    if (!scrollContainerRef.current || isHovered) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    // Increment scroll position
    scrollPositionRef.current += 0.1; // Adjust speed here (0.1px per frame)

    // Reset when reaching the end
    if (scrollPositionRef.current >= maxScroll) {
      scrollPositionRef.current = 0;
    }

    // Apply the scroll
    container.scrollLeft = scrollPositionRef.current;

    // Continue the animation
    animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
  }, [isHovered]);

  const startAutoScroll = useCallback(() => {
    if (!animationFrameRef.current && !isHovered) {
      animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
    }
  }, [isHovered, smoothAutoScroll]);

  const stopAutoScroll = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Sync scroll position when user manually scrolls
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  // Initialize auto-scroll
  useEffect(() => {
    if (!isHovered) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
  }, [isHovered, startAutoScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAutoScroll();
  }, []);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setZoomLevel(1);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setZoomLevel(1);
  }, []);

  const nextImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
    setZoomLevel(1);
  }, [selectedImage]);

  const prevImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setSelectedImage(galleryImages[prevIndex]);
    setZoomLevel(1);
  }, [selectedImage]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isModalOpen) return;
    
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case '+':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case '0':
        resetZoom();
        break;
    }
  }, [isModalOpen, closeModal, nextImage, prevImage, handleZoomIn, handleZoomOut, resetZoom]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedImage, handleKeyDown]);

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 lg:p-12">
          

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : galleryImages.length > 0 ? (
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onScroll={handleScroll}
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Gallery images */}
              {galleryImages.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 w-80 h-64 group cursor-pointer"
                  onClick={() => openModal(image)}
                  style={{
                    animation: 'fadeInOut 0.8s ease-in-out',
                    opacity: 0,
                    animationFillMode: 'forwards',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Image
                      src={image.imageUrl}
                      alt={image.altText || image.title || 'Gallery image'}
                      width={320}
                      height={256}
                      unoptimized
                      className="w-full h-full object-cover"
                      onLoad={() => console.log('Frontend gallery image loaded:', image.imageUrl)}
                      onError={(e) => {
                        console.error('Frontend gallery image failed to load:', image.imageUrl);
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDMyMCAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgMTI4QzE2MCAxNDEuNDY0IDE0OS4zMjQgMTUyIDEzNiAxNTJDMTIyLjY3NiAxNTIgMTEyIDE0MS40NjQgMTEyIDEyOEMxMTIgMTE0LjUzNiAxMjIuNjc2IDEwNCAxMzYgMTA0QzE0OS4zMjQgMTA0IDE2MCAxMTQuNTM2IDE2MCAxMjhaIiBmaWxsPSIjOUI5QkE1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkltYWdlIExvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPgo="
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Images Available</h3>
              <p className="text-gray-600">Gallery images will appear here once uploaded.</p>
            </div>
          )}

        </div>
      </div>

      {/* Modal - Outside main container to avoid overlap */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-[95vw] h-[90vh] max-w-6xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <button
                onClick={handleZoomOut}
                className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all duration-300"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={resetZoom}
                className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-all duration-300"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Image */}
            {selectedImage && (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.altText || selectedImage.title || 'Gallery image'}
                  width={800}
                  height={600}
                  unoptimized
                  className="max-w-full max-h-full object-contain transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                  onLoad={() => console.log('Modal image loaded:', selectedImage.imageUrl)}
                  onError={(e) => console.error('Modal image failed to load:', selectedImage.imageUrl)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          50% {
            opacity: 0.8;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
