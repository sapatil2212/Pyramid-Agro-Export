"use client"

import Link from "next/link"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight
} from "lucide-react"

const productCategories = [
  { name: "Fresh Grapes", href: "/products#grapes" },
  { name: "Fresh Onions", href: "/products#onions" },
  { name: "Bananas", href: "/products#bananas" },
  { name: "Green Chilli", href: "/products#green-chilli" }
]

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Quality Assurance", href: "/services#quality" },
  { name: "Export Process", href: "/services#process" },
  { name: "Certifications", href: "/about#certifications" }
]

const offices = [
  {
    city: "Nashik",
    address: "Ground Floor, Shree Hari Plaza, Abhang Nagar, New Adgaon Naka, Panchavati, Nashik, Maharashtra 422003",
    phone: "+91 91300 70701"
  }
]

export function Footer() {

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
     

      {/* Main Footer Content */}
      <div className="container mx-auto py-20 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-20">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                {/* Desktop Logo */}
                <img 
                  src="/Logo_v1.png"
                  alt="Pyramid Agro Exports Logo"
                  className="hidden lg:block h-12 w-auto"
                />
                {/* Mobile Logo */}
                <img 
                  src="/Logo_v2.png"
                  alt="Pyramid Agro Exports Logo"
                  className="lg:hidden h-12 w-auto"
                />
              </div>
             
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bringing the finest fruits, vegetables from Indian farms to your table with decades of expertise. 
              Your trusted partner for premium fresh produce and reliable export solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Products</h3>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <div key={index} className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Phone className="h-4 w-4" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 mb-2">
                  <Mail className="h-4 w-4" />
                  <span>info@pyramidagroexports.com</span>
                </div>
                    <div className="flex items-start space-x-2 text-gray-300">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    
                    
                
                  </div>
                
              ))}
              
           
             
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Stacked on mobile, horizontal on desktop */}
      <div className="mt-12 pt-2 border-t border-white/20 p-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs text-white/80">
          {/* Copyright */}
          <span className="text-center md:text-left">Copyright © {new Date().getFullYear()}, Pyramid Agro Exports. All Rights Reserved.</span>
          
          {/* Desktop Separator */}
          <span className="hidden md:block text-white/60">|</span>
          
          {/* Credit */}
          <span className="text-center md:text-left">
            Made with ❤️ by{' '}
            <a 
              href="https://digiworldtechnologies.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline hover:no-underline transition-all duration-200 font-medium"
            >
              Digiworld Infotech
            </a>
          </span>
          
          {/* Desktop Separator */}
          <span className="hidden md:block text-white/60">|</span>
          
          {/* Policy Links */}
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Link 
              href="/privacy"
              className="text-white/80 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden md:block text-white/60">|</span>
            <Link 
              href="/terms"
              className="text-white/80 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
