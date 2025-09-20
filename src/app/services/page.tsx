"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Shield, 
  Leaf, 
  Truck, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Clock,
  Award,
  Heart,
  Star
} from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"

// Types
interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
}

interface ProcessStep {
  step: string
  title: string
  description: string
  icon: React.ComponentType<any>
}

// Service data
const services = [
  {
    id: "quality-assurance",
    title: "Quality Assurance",
    description: "Comprehensive quality control measures to ensure every product meets international standards",
    icon: Shield,
    features: [
      "Multi-level quality checks",
      "International certification compliance", 
      "Freshness and nutrition testing",
      "Custom quality specifications"
    ],
    color: "emerald"
  },
  {
    id: "sustainable-sourcing",
    title: "Sustainable Sourcing",
    description: "Partnering with local farmers to promote sustainable farming practices",
    icon: Leaf,
    features: [
      "Direct farmer partnerships",
      "Sustainable farming practices",
      "Fair trade principles",
      "Environmental protection"
    ],
    color: "green"
  },
  {
    id: "global-logistics",
    title: "Global Logistics",
    description: "Efficient supply chain management for timely delivery worldwide",
    icon: Truck,
    features: [
      "Cold chain management",
      "Real-time tracking",
      "Customs clearance support",
      "Timely delivery guarantee"
    ],
    color: "blue"
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    description: "Tailored solutions to meet your specific business requirements",
    icon: Users,
    features: [
      "Custom packaging solutions",
      "Volume-based pricing",
      "Dedicated account management",
      "Flexible delivery schedules"
    ],
    color: "purple"
  }
]

// Process steps
const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Understanding your specific requirements and business needs",
    icon: Users
  },
  {
    step: "02", 
    title: "Sourcing",
    description: "Identifying and partnering with the best suppliers and farmers",
    icon: Leaf
  },
  {
    step: "03",
    title: "Quality Check",
    description: "Rigorous testing and quality assurance before packaging",
    icon: Shield
  },
  {
    step: "04",
    title: "Logistics",
    description: "Efficient packaging and transportation to your destination",
    icon: Truck
  }
]

// Service Card Component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 group">
        <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${service.color}-200 transition-colors`}>
          <service.icon className={`h-8 w-8 text-${service.color}-600`} />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>
        
        <div className="space-y-3">
          {service.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-3">
              <CheckCircle className={`h-5 w-5 text-${service.color}-500 flex-shrink-0`} />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

// Process Step Component
function ProcessStep({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {step.step}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-3">
            <step.icon className="h-6 w-6 text-emerald-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {step.title}
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
      
      {index < processSteps.length - 1 && (
        <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-emerald-600 to-emerald-400"></div>
      )}
    </motion.div>
  )
}

export default function ServicesPage() {
  const { openModal } = useAppointmentModal()

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
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Comprehensive agricultural export services designed to meet your business needs with excellence and reliability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              >
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
              >
                Our Process
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Export Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From sourcing to delivery, we provide end-to-end solutions for your agricultural export needs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section id="process" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined approach to ensure quality, efficiency, and customer satisfaction
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <ProcessStep key={step.step} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine decades of experience with modern technology to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "25+ Years Experience",
                description: "Decades of expertise in agricultural exports"
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Serving customers in 50+ countries worldwide"
              },
              {
                icon: Clock,
                title: "Timely Delivery",
                description: "99% on-time delivery rate with real-time tracking"
              },
              {
                icon: Heart,
                title: "Customer Focus",
                description: "Dedicated support and personalized service"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by businesses worldwide for reliable agricultural export services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "Global Foods Ltd.",
                location: "London, UK",
                rating: 5,
                comment: "Pyramid Agro Exports has been our trusted partner for over 5 years. Their quality and reliability are unmatched."
              },
              {
                name: "Ahmed Hassan",
                company: "Middle East Trading Co.",
                location: "Dubai, UAE", 
                rating: 5,
                comment: "Excellent service and consistent quality. They understand our specific requirements and deliver every time."
              },
              {
                name: "Maria Rodriguez",
                company: "European Imports",
                location: "Madrid, Spain",
                rating: 5,
                comment: "Professional team, competitive prices, and always on-time delivery. Highly recommended for agricultural exports."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Let us help you with your agricultural export needs. Get a customized quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={openModal}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3"
              >
                Get Quote
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
