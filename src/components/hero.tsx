"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, MapPin, Star, ChevronLeft, ChevronRight, ArrowRight, Leaf, Globe, TrendingUp, Truck } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

// Animated Tagline Component
function AnimatedTagline() {
  const taglines = [
    "Delivering Nature's Best to Your Table",
    "From Nashik Farms to Global Markets",
    "Premium Fresh Produce, Decades of Excellence"
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
      className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight px-2 sm:px-0"
    >
      {taglines[currentIndex]}
    </motion.h1>
  )
}

// Animated Sub-Content Component
function AnimatedSubContent() {
  const subContents = [
    "Bringing the finest fruits, vegetables from Indian farms to your table, ensuring unmatched quality in every product with decades of expertise.",
    "With our robust global supply chain and commitment to excellence, we connect the richness of Nashik agriculture to markets worldwide.",
    "Every product undergoes rigorous quality checks to ensure it meets the highest international standards for freshness and nutrition."
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
      className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-2 sm:px-0"
    >
      {subContents[currentIndex]}
    </motion.p>
  )
}


// Product Image Carousel Component
function ProductCarousel() {
  
  const products = [
    {
      id: 1,
      src: "/hero/hero-1.png",
      alt: "Fresh Grapes",
      title: "Premium Fresh Grapes",
      subtitle: "Table Grade, Export Quality",
      origin: "Nashik Vineyards"
    },
    {
      id: 2,
      src: "/hero/hero-1.png",
      alt: "Fresh Onions",
      title: "Fresh Red Onions",
      subtitle: "Medium to Large Size",
      origin: "Maharashtra Farms"
    },
    {
      id: 3,
      src: "/hero/hero-1.png",
      alt: "Fresh Bananas",
      title: "Cavendish Bananas",
      subtitle: "Hand Selected Premium",
      origin: "Organic Farms"
    },
    {
      id: 4,
      src: "/hero/hero-1.png",
      alt: "Green Chilli",
      title: "Fresh Green Chilli",
      subtitle: "Authentic Indian Flavor",
      origin: "Spice Gardens"
    }
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 4000) // Change every 4 seconds to sync with text
    
    return () => clearInterval(interval)
  }, [products.length])
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }
  
  return (
    <div 
      className="relative group bg-transparent overflow-hidden rounded-lg sm:rounded-xl mx-auto w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] max-w-lg sm:max-w-xl md:max-w-xl lg:max-w-lg xl:max-w-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Product Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center rounded-lg sm:rounded-xl shadow-lg overflow-hidden bg-white w-full h-full"
      >
        <div className="relative w-full h-full">
          <Image
            src={products[currentIndex].src}
            alt={products[currentIndex].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentIndex === 0}
          />
          {/* Overlay with product info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
            <div className="text-white p-3 sm:p-4 md:p-6 w-full">
              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1">{products[currentIndex].title}</h3>
              <p className="text-xs sm:text-sm opacity-90">{products[currentIndex].subtitle}</p>
              <p className="text-xs mt-1 opacity-80">From: {products[currentIndex].origin}</p>
            </div>
          </div>
        </div>
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
        className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-600 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.button>
      
      <motion.button
        onClick={goToNext}
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-600 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.button>

      {/* Product Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-emerald-600 scale-125' : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 min-h-[70vh] sm:min-h-screen flex items-center overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-500/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-16 xl:px-32 pt-2 sm:pt-12 md:pt-16 pb-4 sm:pb-0 md:pb-8 relative z-10 w-full max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 md:gap-8 lg:gap-12 items-center w-full max-w-full overflow-hidden">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-6 text-center lg:text-left order-1 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-1 sm:space-x-2 bg-emerald-100 text-emerald-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mx-auto lg:mx-0"
            >
              <Leaf className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Premium Fresh Produce Exports - Decades of Expertise</span>
              <span className="sm:hidden">Premium Fresh Produce</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-3">
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
              className="hidden sm:grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-700">Quality Assured</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-700">Global Reach</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Truck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-700">Reliable Supply Chain</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-orange-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-700">Nashik Origin</span>
              </div>
            </motion.div>

            {/* CTA Buttons - Now visible on mobile */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
              className="flex flex-row gap-2 sm:gap-4 justify-center items-center w-full"
            >
              <Button
                size="sm"
                asChild
                className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-3 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-200 text-xs sm:text-sm md:text-base"
              >
                <Link href="/contact">
                  Get Quote Now
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-3 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base"
              >
                <Link href="/products">View Products</Link>
              </Button>
            </motion.div>

            {/* Trust Indicators - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
              className="hidden md:flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-600 justify-center lg:justify-start"
            >
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>Trusted Quality</span>
              </div>
              <div>•</div>
              <div>50+ Countries</div>
              <div>•</div>
              <div>1000+ Farmers</div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full h-full mt-1 sm:mt-4 lg:mt-0 order-2 lg:order-2 max-w-full overflow-hidden"
          >
            <ProductCarousel />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-emerald-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-2 sm:w-1 sm:h-3 bg-emerald-600 rounded-full mt-1.5 sm:mt-2"
          />
        </motion.div>
      </motion.div>

    </section>
  )
}