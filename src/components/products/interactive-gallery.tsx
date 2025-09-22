"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface InteractiveGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export function InteractiveGallery({ images, productName, className = "" }: InteractiveGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  
  const imageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const resetZoom = useCallback(() => {
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
    setRotation(0)
    setIsZoomed(false)
  }, [])

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    resetZoom()
  }, [images.length, resetZoom])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    resetZoom()
  }, [images.length, resetZoom])

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
    setIsZoomed(true)
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1)
      if (newZoom === 1) {
        setIsZoomed(false)
        setPanPosition({ x: 0, y: 0 })
      }
      return newZoom
    })
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (!isFullscreen) {
      resetZoom()
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = images[activeIndex]
    link.download = `${productName}-${activeIndex + 1}.jpg`
    link.click()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out this ${productName}`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'Escape':
          setIsFullscreen(false)
          resetZoom()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case 'r':
        case 'R':
          handleRotate()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, handleNext, handlePrevious, resetZoom])

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        className={`relative overflow-hidden bg-gray-100 rounded-xl ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-black rounded-none' 
            : 'aspect-square'
        }`}
      >
        <motion.div
          ref={imageRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{
            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          whileHover={{ scale: isZoomed ? 1 : 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={images[activeIndex]}
            alt={`${productName} ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes={isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={activeIndex === 0}
          />
        </motion.div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={handleRotate}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Action Controls */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Zoom Level Indicator */}
        {isZoomed && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {Math.round(zoomLevel * 100)}%
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {!isFullscreen && images.length > 1 && (
        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                  activeIndex === index 
                    ? 'border-emerald-500 scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90"
            onClick={() => {
              setIsFullscreen(false)
              resetZoom()
            }}
          />
        )}
      </AnimatePresence>

      {/* Instructions for Fullscreen */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm"
        >
          Use arrow keys to navigate • +/- to zoom • R to rotate • ESC to exit
        </motion.div>
      )}
    </div>
  )
}
