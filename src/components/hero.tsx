"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, Shield, MapPin, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
// Using public folder images directly
const HeroImage1 = "/hero/hero-2.png"
const HeroImage2 = "/hero/hero-1.png" 
const HeroImage3 = "/hero/hero-3.png" 
import { useAppointmentModal } from "@/components/appointment-modal-provider"

// Animated Tagline Component
function AnimatedTagline() {
  const taglines = [
    "Delivering Nature's Best to Your Table.",
    "From Indian Farms to Global Markets.",
    "Premium Agricultural Products, Unmatched Quality."
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(interval)
  }, [taglines.length])
  
  return (
    <motion.h1
      key={currentIndex}
      initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
      transition={{ 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.1
      }}
      className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
    >
      {taglines[currentIndex]}
    </motion.h1>
  )
}

// Animated Sub-Content Component
function AnimatedSubContent() {
  const subContents = [
    "At Pyramid Agro Exports, we bring the finest fruits, vegetables, grains, and spices from Indian farms to your table with unmatched quality and freshness.",
    "With decades of expertise in agricultural exports, we ensure every product meets the highest international standards for quality and nutrition.",
    "Our commitment to sustainable farming practices and direct partnerships with local farmers guarantees premium produce that exceeds expectations."
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % subContents.length)
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(interval)
  }, [subContents.length])
  
  return (
    <motion.p
      key={currentIndex}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -40, rotateX: 15 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="text-sm md:text-lg text-gray-600 leading-relaxed"
    >
      {subContents[currentIndex]}
    </motion.p>
  )
}


// Image Carousel Component
function ImageCarousel() {
  const images = [
    {
      id: 1,
      src: HeroImage1,
      alt: "Fresh Agricultural Products",
      title: "Premium Quality",
      subtitle: "Fresh Fruits & Vegetables",
      experience: "Decades of Expertise"
    },
    {
      id: 2,
      src: HeroImage2,
      alt: "Global Export Network",
      title: "Worldwide Distribution",
      subtitle: "International Standards",
      experience: "1000+ Global Partners"
    },
    {
      id: 3,
      src: HeroImage3,
      alt: "Sustainable Farming",
      title: "Farm-to-Table",
      subtitle: "Sustainable Sourcing",
      experience: "50+ Product Categories"
    }
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000) // Change every 4 seconds to sync with text
    
    return () => clearInterval(interval)
  }, [images.length])
  
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  
  return (
    <div 
      className="relative group bg-transparent overflow-hidden rounded-lg h-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-transparent w-full h-auto flex items-center justify-center"
      >
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].alt}
          className="w-full h-auto object-contain bg-transparent max-w-full"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjUuNDY0IDE4Ny4zMjQgMTc4IDE3MCAxNzhDMTUyLjY3NiAxNzggMTQwIDE2NS40NjQgMTQwIDE1MEMxNDAgMTM0LjUzNiAxNTIuNjc2IDEyMiAxNzAgMTIyQzE4Ny4zMjQgMTIyIDIwMCAxMzQuNTM2IDIwMCAxNTBaIiBmaWxsPSIjOUI5QkE1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIExvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPgo="
          }}
        />
      </motion.div>
      
      {/* Navigation Arrows - Hidden by default, visible on hover */}
      <motion.button
        onClick={goToPrevious}
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -20
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>
      
      <motion.button
        onClick={goToNext}
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

export function Hero() {
  const { openModal } = useAppointmentModal()

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 min-h-screen flex items-start overflow-hidden pt-24 lg:pt-32 pb-8 md:pb-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-500/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-32 pt-8 pb-8 md:pt-12 md:pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-4 lg:space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium"
            >
              <Award className="h-4 w-4" />
              <span>Decades of Export Excellence</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4 lg:space-y-4">
              {/* Animated Tagline as Main Headline */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
              >
                <AnimatedTagline />
              </motion.div>
              
              {/* Animated Sub-Content */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              >
                <AnimatedSubContent />
              </motion.div>
            </div>

            {/* Key Features - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
              className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">International Quality Standards</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">Sustainable Sourcing</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">Global Distribution</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700">Farm-to-Table Freshness</span>
              </div>
            </motion.div>

            {/* CTA Buttons - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
              className="hidden md:flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="default"
                size="lg"
                onClick={openModal}
                className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3"
              >
                Get Quote
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/products'}
                className="group border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
              >
                View Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Trust Indicators - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
              className="hidden md:flex items-center space-x-6 text-sm text-gray-600"
            >
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>5.0 Rating</span>
              </div>
              <div>•</div>
              <div>1000+ Global Partners</div>
              <div>•</div>
              <div>50+ Product Categories</div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full h-full mt-1 md:mt-0"
          >
            <ImageCarousel />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-emerald-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-emerald-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Mobile Fixed Appointment Button */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg"
        style={{ pointerEvents: 'auto' }}
      >
        <Button
          variant="default"
          size="lg"
          onClick={openModal}
          className="group shadow-lg px-6 py-3 rounded-lg text-sm font-medium w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Get Quote
        </Button>
      </motion.div>
    </section>
  )
}