"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  FileCheck, 
  Truck, 
  Users, 
  ArrowRight,
  CheckCircle,
  Clock,
  Globe
} from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const services = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Comprehensive testing and certification to meet international food safety standards",
    features: [
      "ISO 22000 Certified Processes",
      "Third-party Laboratory Testing",
      "Traceability Documentation",
      "Quality Control at Every Stage"
    ],
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Users,
    title: "Sustainable Sourcing",
    description: "Direct partnerships with farmers ensuring ethical practices and premium quality",
    features: [
      "Fair Trade Practices",
      "Sustainable Farming Support",
      "Direct Farmer Relationships",
      "Organic Certification Support"
    ],
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Extensive network covering 50+ countries with reliable supply chain management",
    features: [
      "Worldwide Distribution",
      "Multi-language Support",
      "Currency Flexibility",
      "Local Market Expertise"
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: FileCheck,
    title: "Export Documentation",
    description: "Complete documentation support for hassle-free international trade",
    features: [
      "Export-Import Documentation",
      "Customs Clearance Support",
      "Phytosanitary Certificates",
      "Insurance & Logistics"
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Truck,
    title: "Logistics & Shipping",
    description: "End-to-end logistics solutions ensuring timely and safe delivery worldwide",
    features: [
      "Temperature-controlled Transport",
      "Real-time Tracking",
      "Multiple Shipping Options",
      "Warehousing Solutions"
    ],
    color: "from-red-500 to-red-600"
  },
  {
    icon: Clock,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance to address all your queries and concerns",
    features: [
      "Dedicated Account Managers",
      "Multi-channel Support",
      "Quick Response Time",
      "Technical Assistance"
    ],
    color: "from-indigo-500 to-indigo-600"
  }
]

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Understanding your specific requirements and market needs"
  },
  {
    step: "02", 
    title: "Sourcing",
    description: "Identifying and selecting the best quality products from trusted farmers"
  },
  {
    step: "03",
    title: "Quality Testing",
    description: "Rigorous testing and certification to ensure international standards"
  },
  {
    step: "04",
    title: "Documentation",
    description: "Complete export documentation and regulatory compliance"
  },
  {
    step: "05",
    title: "Logistics",
    description: "Efficient packaging, shipping, and delivery to your destination"
  }
]

export function ServicesPreview() {
  return (
    <section className="py-20 lg:py-8 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6"
          >
            <Shield className="h-4 w-4 mr-2" />
            Our Core Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4"
          >
            Comprehensive Export Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            From farm to your doorstep, we provide end-to-end services that ensure 
            quality, compliance, and reliable delivery of premium agricultural products.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                    {(() => {
                      const IconComponent = service.icon
                      return <IconComponent className="h-8 w-8 text-white" />
                    })()}
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      

       
      </div>
    </section>
  )
}
