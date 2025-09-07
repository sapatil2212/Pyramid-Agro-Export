"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail,
  MapPin,
  Wheat,
  Leaf,
  Truck,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    submenu: [
      { name: "Our Story", href: "/about#story" },
      { name: "Our Team", href: "/about#team" },
      { name: "Certifications", href: "/about#certifications" }
    ]
  },
  { 
    name: "Products", 
    href: "/products",
    submenu: [
      { name: "Fresh Grapes", href: "/products#grapes", icon: Leaf },
      { name: "Fresh Onions", href: "/products#onions", icon: Leaf },
      { name: "Bananas", href: "/products#bananas", icon: Leaf },
      { name: "Green Chilli", href: "/products#green-chilli", icon: Leaf }
    ]
  },
  { 
    name: "Services", 
    href: "/services",
    submenu: [
      { name: "Quality Assurance", href: "/services#quality", icon: Shield },
      { name: "Export Documentation", href: "/services#documentation" },
      { name: "Logistics & Shipping", href: "/services#logistics", icon: Truck }
    ]
  },
  { name: "Contact", href: "/contact" }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate scroll progress (0 to 1) with smoother curve
  const scrollProgress = Math.min(scrollY / 150, 1) // Increased distance for smoother transition
  const isScrolled = scrollY > 5 // Earlier trigger for smoother start

  // Use easing function for ultra-smooth transitions
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const smoothProgress = easeOutCubic(scrollProgress)

  // Calculate dynamic values based on smooth scroll progress
  const borderRadius = smoothProgress * 16 // Smooth transition to rounded-2xl
  const paddingX = smoothProgress * 20 + 16 // Smooth padding transition
  const paddingY = smoothProgress * 10 + 8 // Smooth padding transition
  const logoScale = 1 - (smoothProgress * 0.12) // Slight logo scale down
  const textScale = 1 - (smoothProgress * 0.08) // Slight text scale down

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setActiveDropdown(null)
  }

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-emerald-50 border-b border-emerald-100 py-2 hidden lg:block">
        <div className="container mx-auto">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-emerald-700">
                <Phone className="h-4 w-4" />
                <span>+91 91300 70701</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <Mail className="h-4 w-4" />
                <span>info@pyramidagroexports.com</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <MapPin className="h-4 w-4" />
                <span>Nashik, Maharashtra</span>
              </div>
            </div>
            <div className="text-emerald-600 font-medium">
              Premium Fresh Fruits & Vegetables Export
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50">
        <div 
          className="will-change-transform"
          style={{
            padding: `${paddingY / 2}px ${paddingX}px`,
            transition: 'padding 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md will-change-transform"
            style={{
              borderRadius: `${borderRadius}px`,
              maxWidth: isScrolled ? '84rem' : '100%',
              margin: isScrolled ? '0 auto' : '0',
              boxShadow: isScrolled ? '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
              border: isScrolled ? '1px solid rgba(229, 231, 235, 0.5)' : 'none',
              transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="flex justify-between items-center will-change-transform"
              style={{
                padding: `${isScrolled ? 8 : 12}px ${isScrolled ? 24 : 16}px`,
                transition: 'padding 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
              }}
            >
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div 
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg will-change-transform"
                    style={{
                      width: `${logoScale * 48}px`,
                      height: `${logoScale * 48}px`,
                      transition: 'width 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    }}
                  >
                    <Wheat 
                      className="text-white will-change-transform" 
                      style={{
                        width: `${logoScale * 28}px`,
                        height: `${logoScale * 28}px`,
                        transition: 'width 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span 
                    className="font-bold text-gray-900 will-change-transform"
                    style={{
                      fontSize: `${textScale * 1.25}rem`,
                      lineHeight: '1.2',
                      transition: 'font-size 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    }}
                  >
                    Pyramid Agro Exports
                  </span>
                  <span 
                    className="text-emerald-600 hidden sm:block will-change-transform"
                    style={{
                      fontSize: `${textScale * 0.75}rem`,
                      transition: 'font-size 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    }}
                  >
                    Premium Fresh Fruits & Vegetables
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.submenu ? (
                      <div className="relative">
                        <button
                          className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                          onMouseEnter={() => setActiveDropdown(item.name)}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                              onMouseEnter={() => setActiveDropdown(item.name)}
                              onMouseLeave={() => setActiveDropdown(null)}
                            >
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200"
                                >
                                  {subItem.icon && (
                                    (() => {
                                      const IconComponent = subItem.icon
                                      return <IconComponent className="h-4 w-4" />
                                    })()
                                  )}
                                  <span>{subItem.name}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Contact Section - Desktop */}
                <div className="flex items-center space-x-3">
                  <a
                    href="tel:+919130070701"
                    className="relative overflow-hidden font-medium text-white text-sm tracking-wide flex items-center gap-2 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full px-4 py-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Call Now</span>
                  </a>

                  <Button 
                    asChild
                    size="sm" 
                    variant="outline" 
                    className="transition-all duration-300 hover:scale-105 text-sm border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    <Link href="/contact">Get Quote</Link>
                  </Button>
                </div>
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden bg-white border transition-all duration-300 rounded-xl p-4 mt-2"
                style={{
                  marginLeft: '16px',
                  marginRight: '16px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="space-y-4">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(item.name)}
                            className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-emerald-600 font-medium"
                          >
                            <span>{item.name}</span>
                            <ChevronDown 
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                activeDropdown === item.name && "rotate-180"
                              )}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-4 mt-2 space-y-1"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-1 text-sm text-gray-600 hover:text-emerald-600"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 text-gray-700 hover:text-emerald-600 font-medium"
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <a
                      href="tel:+919130070701"
                      className="flex-1 relative overflow-hidden px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg font-medium text-white text-sm tracking-wide flex items-center gap-2 justify-center transition-transform duration-200 hover:scale-105"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">Call</span>
                    </a>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                        Get Quote
                      </Link>
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