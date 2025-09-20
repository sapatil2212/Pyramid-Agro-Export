"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Star, 
  Quote, 
  ArrowRight, 
  Globe,
  Award,
  Users,
  CheckCircle
} from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"
import { useState } from "react"

// Types
interface Testimonial {
  id: string
  name: string
  company: string
  location: string
  rating: number
  comment: string
  image: string
  verified: boolean
}

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Procurement Manager",
    company: "Global Foods Ltd.",
    location: "London, UK",
    rating: 5,
    image: "/hero/hero-1.png",
    comment: "Pyramid Agro Exports has been our trusted partner for over 5 years. Their commitment to quality and timely delivery has helped us maintain our reputation in the European market. The fresh grapes we receive are always of the highest quality.",
    products: ["Fresh Grapes", "Onions"],
    duration: "5+ years"
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    position: "Director",
    company: "Middle East Trading Co.",
    location: "Dubai, UAE",
    rating: 5,
    image: "/hero/hero-1.png",
    comment: "Excellent service and consistent quality. They understand our specific requirements and deliver every time. The team is professional and responsive to our needs. Highly recommended for agricultural exports.",
    products: ["Banana", "Green Chilli", "Spices"],
    duration: "3+ years"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    position: "Import Manager",
    company: "European Imports",
    location: "Madrid, Spain",
    rating: 5,
    image: "/hero/hero-1.png",
    comment: "Professional team, competitive prices, and always on-time delivery. The quality of their products consistently exceeds our expectations. They have become an integral part of our supply chain.",
    products: ["Basmati Rice", "Turmeric", "Fresh Vegetables"],
    duration: "4+ years"
  },
  {
    id: 4,
    name: "David Chen",
    position: "CEO",
    company: "Asia Pacific Foods",
    location: "Singapore",
    rating: 5,
    image: "/hero/hero-1.png",
    comment: "Outstanding partnership with Pyramid Agro Exports. Their sustainable sourcing practices align perfectly with our company values. The quality and freshness of their products are unmatched in the market.",
    products: ["All Product Categories"],
    duration: "6+ years"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Quality Assurance Manager",
    company: "North American Distributors",
    location: "Toronto, Canada",
    rating: 5,
    image: "/hero/hero-1.png",
    comment: "The quality control measures implemented by Pyramid Agro Exports are exceptional. Every shipment meets our strict standards. Their attention to detail and customer service is remarkable.",
    products: ["Fresh Fruits", "Grains"],
    duration: "2+ years"
  },
  {
    id: 6,
    name: "James Wilson",
    position: "Operations Director",
    company: "African Continental Trading",
    location: "Lagos, Nigeria",
    rating: 5,
    image: "/hero/hero-1.png",
    comment: "Reliable, trustworthy, and professional. Pyramid Agro Exports has helped us expand our business across Africa. Their logistics support and customer service are top-notch.",
    products: ["Fresh Vegetables", "Spices"],
    duration: "4+ years"
  }
]

// Testimonial Card Component
function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMxMDU2NDMiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOC42ODYyOSAxNCA2IDE2LjY4NjMgNiAyMEgxOEMxOCAxNi42ODYzIDE1LjMxMzcgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+Cg=="
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
            <p className="text-sm text-emerald-600 font-medium">{testimonial.company}</p>
            <p className="text-xs text-gray-500">{testimonial.location}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
          ))}
        </div>

        <div className="relative mb-6">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-emerald-200" />
          <p className="text-gray-700 italic leading-relaxed pl-6">
            &ldquo;{testimonial.comment}&rdquo;
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-gray-600">
              <strong>Products:</strong> {testimonial.products.join(", ")}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-gray-600">
              <strong>Partnership:</strong> {testimonial.duration}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Stats Section
function StatsSection() {
  const stats = [
    { label: "Happy Clients", value: "1000+", icon: Users },
    { label: "Countries Served", value: "50+", icon: Globe },
    { label: "Years Experience", value: "25+", icon: Award },
    { label: "Success Rate", value: "99%", icon: CheckCircle }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses worldwide for reliable agricultural export services
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("all")
  const { openModal } = useAppointmentModal()

  const filteredTestimonials = filter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.products.some((p: string) => p.toLowerCase().includes(filter.toLowerCase())))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Hear from our satisfied clients who trust Pyramid Agro Exports for their agricultural needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              >
                Read Testimonials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
              >
                Our Success
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from real clients who have experienced our exceptional service
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Testimonials
            </button>
            <button
              onClick={() => setFilter("fruits")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "fruits"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Fresh Fruits
            </button>
            <button
              onClick={() => setFilter("vegetables")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "vegetables"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Fresh Vegetables
            </button>
            <button
              onClick={() => setFilter("grains")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "grains"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Grains & Spices
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Quote className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-600">
                Try selecting a different filter category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Satisfied Clients
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Experience the same level of service and quality that our clients rave about
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={openModal}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contact'}
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
