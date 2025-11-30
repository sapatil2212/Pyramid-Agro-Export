"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, ArrowRight, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { COMPANY_INFO } from "@/lib/constants"
import { useNavigation } from "@/hooks/use-navigation"
import { cn, formatPhoneNumber } from "@/lib/utils"
interface NavigationItem {
  id: string
  name: string
  href: string
}

interface HeaderProps {
  onAppointmentClick: () => void
}

export function Header({ onAppointmentClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [openMobileDropdowns, setOpenMobileDropdowns] = React.useState<Set<string>>(new Set())
  const [openSubCategories, setOpenSubCategories] = React.useState<Set<string>>(new Set())
  const [scrollY, setScrollY] = React.useState(0)
  const [hoveredDropdown, setHoveredDropdown] = React.useState<string | null>(null)
  const [clickedDropdown, setClickedDropdown] = React.useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = React.useState<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = React.useState(false)
  const [navbarLogo, setNavbarLogo] = React.useState<string>("/Logo_v1.png")
  const pathname = usePathname()
  const menuRef = React.useRef<HTMLDivElement>(null)
  const { navigationItems } = useNavigation()

  // Fetch navbar logo from site settings
  React.useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch("/api/site-settings?keys=navbar_logo")
        if (response.ok) {
          const data = await response.json()
          if (data.navbar_logo) {
            setNavbarLogo(data.navbar_logo)
          }
        }
      } catch (error) {
        console.error("Failed to fetch navbar logo:", error)
      }
    }
    fetchLogo()
  }, [])

  React.useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          setIsScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      // Close dropdowns on resize
      setHoveredDropdown(null)
      setClickedDropdown(null)
    }

    // Initial check
    handleResize()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout)
      }
    }
  }, [dropdownTimeout])

  // Calculate scroll progress (0 to 1) with smoother curve
  const scrollProgress = Math.min(scrollY / 150, 1) // Increased distance for smoother transition
  const showBanner = scrollY < 50 // Hide banner when scrolled down

  // Use easing function for ultra-smooth transitions
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const smoothProgress = easeOutCubic(scrollProgress)

  // Calculate dynamic values based on smooth scroll progress
  const borderRadius = smoothProgress * 16 // Smooth transition to rounded-2xl
  const paddingX = isScrolled ? Math.min(smoothProgress * 20 + 16, 24) : 0 // No padding when not scrolled
  const paddingY = smoothProgress * 10 + 8 // Smooth padding transition
  const logoScale = 1 - (smoothProgress * 0.12) // Slight logo scale down

  React.useEffect(() => {
    setIsMenuOpen(false)
    setOpenMobileDropdowns(new Set())
    setOpenSubCategories(new Set())
    setHoveredDropdown(null)
    setClickedDropdown(null)
  }, [pathname])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setOpenMobileDropdowns(new Set())
        setOpenSubCategories(new Set())
        setHoveredDropdown(null)
        setClickedDropdown(null)
      }
    }

    if (isMenuOpen || hoveredDropdown || clickedDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, hoveredDropdown, clickedDropdown])

  const handleGetDirections = () => {
    const googleMapsUrl = "https://maps.app.goo.gl/41wjFQCukoUpB9m29?g_st=ipc"
    window.open(googleMapsUrl, "_blank")
  }

  const handleWhatsAppClick = () => {
    const phone = COMPANY_INFO.phones[1] || COMPANY_INFO.phones[0] // Use second phone number for WhatsApp
    const message = "Hello! I would like to know more about Pyramid Agro Exports products and services. Please provide me with more information."
    const cleanPhone = phone.replace(/\D/g, '')
    const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleDropdownEnter = (itemName: string) => {
    if (isMobile) return // Don't use hover on mobile
    
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setHoveredDropdown(itemName)
  }

  const handleDropdownLeave = () => {
    if (isMobile) return // Don't use hover on mobile
    
    const timeout = setTimeout(() => {
      setHoveredDropdown(null)
    }, 200) // Increased delay for better UX
    setDropdownTimeout(timeout)
  }

  const handleDropdownClick = (itemName: string) => {
    if (clickedDropdown === itemName) {
      setClickedDropdown(null)
    } else {
      setClickedDropdown(itemName)
      setHoveredDropdown(null) // Clear hover state when clicking
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, itemName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleDropdownClick(itemName)
    } else if (event.key === 'Escape') {
      setClickedDropdown(null)
      setHoveredDropdown(null)
    }
  }

  const toggleMobileDropdown = (itemName: string) => {
    setOpenMobileDropdowns(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemName)) {
        newSet.delete(itemName)
        // Also close sub-categories when closing main dropdown
        setOpenSubCategories(new Set())
      } else {
        // Close other dropdowns and open this one
        newSet.clear()
        newSet.add(itemName)
        setOpenSubCategories(new Set())
      }
      return newSet
    })
  }

  const toggleSubCategory = (categoryId: string) => {
    setOpenSubCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  return (
    <>
      {/* Top Contact Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-40 bg-primary text-white py-2 text-sm"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: showBanner ? 0 : -50, 
          opacity: showBanner ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut" 
        }}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-32">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
            <div className="flex items-center justify-between sm:justify-start sm:space-x-6">
              {/* Contact Number */}
              <a
                href={`tel:+91${COMPANY_INFO.phones[0]}`}
                className="flex items-center space-x-1 text-xs hover:text-gray-200 transition-colors"
              >
                <Phone className="h-3 w-3" />
                <span>{formatPhoneNumber(COMPANY_INFO.phones[0])}</span>
              </a>
              
              {/* Vertical Separator - Mobile Only */}
              <div className="w-px h-4 bg-white/30 sm:hidden"></div>
              
              {/* Get Direction - Mobile Only */}
              <button
                onClick={handleGetDirections}
                className="flex items-center space-x-1 text-xs hover:text-gray-200 transition-colors sm:hidden"
              >
                <span>Get Direction</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-3 w-3" />
                </motion.div>
              </button>
              
              {/* WhatsApp Contact - Desktop Only */}
              <button
                onClick={handleWhatsAppClick}
                className="hidden sm:flex items-center space-x-1 text-xs hover:text-gray-200 transition-colors"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>{formatPhoneNumber(COMPANY_INFO.phones[1] || COMPANY_INFO.phones[0])}</span>
              </button>
            </div>
            
            {/* Get Direction - Desktop Only */}
            <button
              onClick={handleGetDirections}
              className="hidden sm:flex items-center space-x-1 text-xs hover:text-gray-200 transition-colors"
            >
              <span>Get Direction</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-3 w-3" />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <header 
        className="fixed left-0 right-0 z-50"
        style={{
          top: showBanner ? '2rem' : '0',
          transition: 'top 0.3s ease-in-out'
        }}
      >
        <div 
          className="will-change-transform max-w-full"
          style={{
            padding: `${paddingY / 2}px ${paddingX}px`,
            transition: 'padding 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
            overflow: 'visible'
          }}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md will-change-transform"
            style={{
              borderRadius: `${borderRadius}px`,
              maxWidth: isScrolled ? '84rem' : '100%',
              margin: isScrolled ? '0 auto' : '0',
              boxShadow: isScrolled ? '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
              border: isScrolled ? '1px solid rgba(229, 231, 235, 0.3)' : 'none',
              transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
              overflow: 'visible'
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={isScrolled ? "" : "container mx-auto px-6 sm:px-8 lg:px-12"} style={{ overflow: 'visible' }}>
              <div 
                className="flex items-center justify-between will-change-transform"
                style={{
                  padding: `${isScrolled ? 8 : 12}px ${isScrolled ? 24 : 16}px`,
                  transition: 'padding 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  overflow: 'visible'
                }}
              >
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={navbarLogo}
                  alt="Pyramid Agro Exports Logo"
                  className="will-change-transform"
                  style={{
                    height: `${logoScale * 48}px`,
                    width: 'auto',
                    transition: 'height 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" style={{ overflow: 'visible' }}>
              {navigationItems.map((item) => {
                const isDropdownOpen = hoveredDropdown === item.name || clickedDropdown === item.name
                
                return (
                  <div 
                    key={item.href} 
                    className="relative group"
                    style={{ overflow: 'visible' }}
                    onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.hasDropdown ? (
                      <button
                        onClick={() => handleDropdownClick(item.name)}
                        onKeyDown={(e) => handleKeyDown(e, item.name)}
                        className="flex items-center gap-1 cursor-pointer py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 -mx-2"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                        tabIndex={0}
                      >
                        <span className={cn(
                          "text-sm font-medium transition-all duration-200",
                          isDropdownOpen ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
                        )}>
                          {item.name}
                        </span>
                        <motion.div
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <ChevronDown className={cn(
                            "h-3 w-3 transition-all duration-200",
                            isDropdownOpen ? "text-emerald-600" : "text-gray-500 hover:text-emerald-600"
                          )} />
                        </motion.div>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-emerald-600 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 -mx-2",
                          pathname === item.href
                            ? "text-emerald-600 border-b-2 border-emerald-600"
                            : "text-gray-700"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  
                  {/* Hover Bridge - Invisible area to prevent dropdown from closing */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div 
                      className="absolute top-full left-0 right-0 h-2 z-40"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                    />
                  )}
                  
                  {/* Enhanced Dropdown */}
                  {item.hasDropdown && item.dropdownItems && (
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 backdrop-blur-sm"
                          style={{ overflow: 'visible' }}
                          onMouseEnter={() => handleDropdownEnter(item.name)}
                          onMouseLeave={handleDropdownLeave}
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="p-6" style={{ overflow: 'visible' }}>
                            <div className="space-y-2" style={{ overflow: 'visible' }}>
                              {item.dropdownItems.map((category) => (
                                <div key={category.id} className="group/category relative" style={{ overflow: 'visible' }}>
                                  {'href' in category ? (
                                    <Link
                                      href={category.href as string}
                                      role="menuitem"
                                      className="flex items-start p-4 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-50/50 transition-all duration-200 group-hover/category:shadow-lg group-hover/category:scale-[1.02] border border-transparent hover:border-emerald-100"
                                      onClick={() => {
                                        setClickedDropdown(null)
                                        setHoveredDropdown(null)
                                      }}
                                    >
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 group-hover/category:text-emerald-600 transition-colors text-sm">
                                          {category.name}
                                        </h4>
                                        <p className="text-xs text-gray-600 mt-1 leading-relaxed group-hover/category:text-gray-700">
                                          {category.description}
                                        </p>
                                      </div>
                                      <motion.div
                                        className="mt-1"
                                        whileHover={{ x: 2 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover/category:text-emerald-600 transition-colors" />
                                      </motion.div>
                                    </Link>
                                  ) : (
                                    <div 
                                      role="menuitem"
                                      className="flex items-start p-4 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-50/50 transition-all duration-200 group-hover/category:shadow-lg group-hover/category:scale-[1.02] border border-transparent hover:border-emerald-100 cursor-pointer"
                                    >
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 group-hover/category:text-emerald-600 transition-colors text-sm">
                                          {category.name}
                                        </h4>
                                        <p className="text-xs text-gray-600 mt-1 leading-relaxed group-hover/category:text-gray-700">
                                          {category.description}
                                        </p>
                                      </div>
                                      {category.hasSubDropdown && (
                                        <motion.div
                                          className="mt-1"
                                          whileHover={{ x: 2 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover/category:text-emerald-600 transition-colors" />
                                        </motion.div>
                                      )}
                                    </div>
                                  )}
                              
                                  {/* Sub-dropdown for products - positioned to the right */}
                                  {'hasSubDropdown' in category && category.hasSubDropdown && 'subItems' in category && category.subItems && (
                                    <motion.div 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="absolute left-full top-0 ml-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover/category:opacity-100 group-hover/category:visible transition-all duration-300 backdrop-blur-sm"
                                      style={{ 
                                        zIndex: 9999,
                                        overflow: 'visible'
                                      }}
                                    >
                                      <div className="p-5">
                                        <div className="mb-4 pb-3 border-b border-gray-100">
                                          <h5 className="font-bold text-gray-900 text-sm">{category.name}</h5>
                                          <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                                        </div>
                                        <div className="space-y-1">
                                          {category.subItems.map((product: NavigationItem) => (
                                            <Link
                                              key={product.id}
                                              href={product.href}
                                              role="menuitem"
                                              className="flex items-center p-3 text-xs text-gray-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-50/50 transition-all duration-200 rounded-xl group/product border border-transparent hover:border-emerald-100"
                                              onClick={() => {
                                                setClickedDropdown(null)
                                                setHoveredDropdown(null)
                                              }}
                                            >
                                              <motion.div 
                                                className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover/product:bg-emerald-600 transition-colors"
                                                whileHover={{ scale: 1.2 }}
                                              ></motion.div>
                                              <span className="font-medium">{product.name}</span>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                            </div>
                          ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <Link
                                href={item.href}
                                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-all duration-200 group hover:bg-emerald-50 px-4 py-2 rounded-xl"
                                onClick={() => {
                                  setClickedDropdown(null)
                                  setHoveredDropdown(null)
                                }}
                              >
                                View All {item.name}
                                <motion.div
                                  className="ml-2"
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </motion.div>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                )
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:+91${COMPANY_INFO.phones[0]}`)}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onAppointmentClick}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden bg-white border transition-all duration-300 rounded-xl p-4 mt-2 mx-4 mb-4 shadow-lg"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="space-y-4">
                  {navigationItems.map((item) => (
                    <div key={item.href}>
                      {item.hasDropdown && item.dropdownItems ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="flex items-center justify-between w-full text-xs font-medium py-2.5 px-3 text-gray-700 hover:text-emerald-600 transition-all duration-200 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-50/50"
                            aria-expanded={openMobileDropdowns.has(item.name)}
                            aria-haspopup="true"
                          >
                            <span>{item.name}</span>
                            <motion.div
                              animate={{ rotate: openMobileDropdowns.has(item.name) ? 180 : 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="text-gray-500"
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {openMobileDropdowns.has(item.name) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 space-y-2 bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-3 border border-gray-200/60 backdrop-blur-sm">
                                  {item.dropdownItems.map((category) => (
                                    <div key={category.id} className="space-y-2">
                                      {'href' in category ? (
                                        <Link
                                          href={category.href as string}
                                          className="flex items-center w-full text-xs font-medium py-2.5 px-3 text-gray-700 hover:text-emerald-600 transition-all duration-200 rounded-lg hover:bg-white/90 hover:shadow-sm"
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          <div className="text-left">
                                            <div className="font-semibold text-xs">{category.name}</div>
                                            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{category.description}</div>
                                          </div>
                                        </Link>
                                      ) : (
                                        <button
                                          onClick={() => category.id && toggleSubCategory(category.id)}
                                          className="flex items-center justify-between w-full text-xs font-medium py-2.5 px-3 text-gray-700 hover:text-emerald-600 transition-all duration-200 rounded-lg hover:bg-white/90 hover:shadow-sm"
                                          aria-expanded={category.id ? openSubCategories.has(category.id) : false}
                                          aria-haspopup="true"
                                        >
                                          <div className="text-left">
                                            <div className="font-semibold text-xs">{category.name}</div>
                                            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{category.description}</div>
                                          </div>
                                          {'hasSubDropdown' in category && category.hasSubDropdown && (
                                            <motion.div
                                              animate={{ rotate: category.id && openSubCategories.has(category.id) ? 180 : 0 }}
                                              transition={{ duration: 0.2, ease: "easeInOut" }}
                                              className="text-gray-400"
                                            >
                                              <ChevronDown className="h-3.5 w-3.5" />
                                            </motion.div>
                                          )}
                                        </button>
                                      )}
                                      
                                      {/* Sub-dropdown for products */}
                                      {'hasSubDropdown' in category && category.hasSubDropdown && 'subItems' in category && category.subItems && (
                                        <AnimatePresence>
                                          {category.id && openSubCategories.has(category.id) && (
                                            <motion.div
                                              initial={{ opacity: 0, height: 0 }}
                                              animate={{ opacity: 1, height: "auto" }}
                                              exit={{ opacity: 0, height: 0 }}
                                              transition={{ duration: 0.3, ease: "easeInOut" }}
                                              className="overflow-hidden ml-3 pl-3 border-l-2 border-emerald-200 space-y-1"
                                            >
                                              <div className="max-h-48 overflow-y-auto pr-2 space-y-1">
                                                {category.subItems.map((product: NavigationItem) => (
                                                  <Link
                                                    key={product.id}
                                                    href={product.href}
                                                    className="flex items-center text-xs text-gray-600 py-2 px-3 hover:text-emerald-600 hover:bg-white/90 transition-all duration-200 rounded-lg hover:shadow-sm"
                                                    onClick={() => setIsMenuOpen(false)}
                                                  >
                                                    <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:bg-emerald-600 transition-colors"></div>
                                                    <span className="font-medium">{product.name}</span>
                                                  </Link>
                                                ))}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      )}
                                    </div>
                                  ))}
                                  <div className="pt-3 mt-3 border-t border-gray-200">
                                    <Link
                                      href={item.href}
                                      className="flex items-center justify-center text-xs text-emerald-600 font-semibold py-2.5 px-3 hover:text-emerald-700 hover:bg-white/90 transition-all duration-200 rounded-lg hover:shadow-sm"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      <span>View All {item.name}</span>
                                      <ArrowRight className="h-3.5 w-3.5 ml-2" />
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "text-xs font-medium py-2.5 px-3 transition-all duration-200 hover:text-emerald-600 rounded-lg hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-50/50",
                            pathname === item.href
                              ? "text-emerald-600 font-semibold bg-emerald-50"
                              : "text-gray-700"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`tel:+91${COMPANY_INFO.phones[0]}`)}
                      className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={onAppointmentClick}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                    >
                      Get Quote
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}