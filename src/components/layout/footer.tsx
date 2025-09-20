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
  Wheat,
  ArrowRight,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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
    city: "Nashik Head Office",
    address: "Ground Floor, Shree Hari Plaza, Abhang Nagar, New Adgaon Naka, Panchavati, Nashik, Maharashtra 422003",
    phone: "+91 91300 70701"
  }
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setEmail("")
    setIsSubscribing(false)
    // Show success message here
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
     

      {/* Main Footer Content */}
      <div className="container mx-auto py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-20">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Wheat className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Pyramid <span className="text-emerald-400">Agro</span> Exports
                </h1>
                <p className="text-sm text-gray-400">Premium Fresh Fruits & Vegetables</p>
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
              {offices.map((office) => (
                <div key={office.city} className="border-l-2 border-emerald-500 pl-4">
                  <h4 className="font-semibold text-emerald-400 mb-2">{office.city} Office</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2 text-gray-300">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Phone className="h-4 w-4" />
                      <span>{office.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-gray-300 mb-2">
                  <Mail className="h-4 w-4" />
                  <span>info@pyramidagroexports.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="h-4 w-4" />
                  <span>+91 91300 70701 (Business Hours)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Pyramid Agro Exports. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
