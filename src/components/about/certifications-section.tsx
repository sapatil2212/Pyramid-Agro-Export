"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Award, 
  CheckCircle, 
  Leaf, 
  Globe, 
  Heart,
  FileCheck,
  Users,
  Calendar,
  ExternalLink
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const certifications = [
  {
    id: 1,
    name: "ISO 22000:2018",
    fullName: "Food Safety Management Systems",
    issuer: "International Organization for Standardization",
    validUntil: "2025-12-31",
    description: "Demonstrates our commitment to food safety management throughout the supply chain",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    features: [
      "Hazard Analysis and Critical Control Points (HACCP)",
      "Prerequisite Programs",
      "Management System Requirements",
      "Continuous Improvement"
    ]
  },
  {
    id: 2,
    name: "FSSAI License",
    fullName: "Food Safety and Standards Authority of India",
    issuer: "Government of India",
    validUntil: "2025-08-15",
    description: "Official license for food business operations in India, ensuring compliance with national standards",
    icon: CheckCircle,
    color: "from-green-500 to-green-600",
    features: [
      "Food Business Operation License",
      "Quality Control Systems",
      "Hygiene Standards",
      "Regulatory Compliance"
    ]
  },
  {
    id: 3,
    name: "Organic Certification",
    fullName: "NPOP & NOP Certified Organic",
    issuer: "Control Union Certifications",
    validUntil: "2025-10-20",
    description: "Certification for organic products meeting international organic standards",
    icon: Leaf,
    color: "from-emerald-500 to-emerald-600",
    features: [
      "NPOP (India) Compliance",
      "NOP (USA) Standards",
      "EU Organic Regulation",
      "Traceability Systems"
    ]
  },
  {
    id: 4,
    name: "Export License",
    fullName: "Import Export Code (IEC)",
    issuer: "Directorate General of Foreign Trade",
    validUntil: "Permanent",
    description: "Government authorization for international trade operations",
    icon: Globe,
    color: "from-purple-500 to-purple-600",
    features: [
      "International Trade Authorization",
      "Customs Clearance Rights",
      "Export Documentation",
      "Global Market Access"
    ]
  },
  {
    id: 5,
    name: "Fair Trade Certification",
    fullName: "Fair Trade Certified Producer",
    issuer: "Fair Trade USA",
    validUntil: "2025-06-30",
    description: "Commitment to fair wages and ethical business practices with farmers",
    icon: Heart,
    color: "from-red-500 to-red-600",
    features: [
      "Fair Pricing for Farmers",
      "Community Development",
      "Environmental Protection",
      "Worker Welfare"
    ]
  },
  {
    id: 6,
    name: "HACCP Certification",
    fullName: "Hazard Analysis Critical Control Points",
    issuer: "SGS India Pvt. Ltd.",
    validUntil: "2025-04-18",
    description: "Systematic approach to food safety and hazard prevention",
    icon: FileCheck,
    color: "from-amber-500 to-amber-600",
    features: [
      "Hazard Identification",
      "Critical Control Points",
      "Monitoring Procedures",
      "Corrective Actions"
    ]
  }
]

const qualityStandards = [
  {
    icon: Shield,
    title: "Food Safety",
    description: "Comprehensive food safety management systems ensuring product integrity",
    standards: ["ISO 22000", "HACCP", "FSSAI", "BRC"]
  },
  {
    icon: Leaf,
    title: "Organic Standards",
    description: "Certified organic products meeting international organic regulations",
    standards: ["NPOP", "NOP", "EU Organic", "JAS Organic"]
  },
  {
    icon: Globe,
    title: "Export Compliance",
    description: "Full compliance with international trade and export regulations",
    standards: ["IEC License", "Export Documentation", "Customs Compliance", "International Trade"]
  },
  {
    icon: Heart,
    title: "Ethical Trade",
    description: "Fair trade practices ensuring ethical sourcing and farmer welfare",
    standards: ["Fair Trade", "Ethical Sourcing", "Community Development", "Sustainable Practices"]
  }
]

const complianceMetrics = [
  { number: 100, suffix: "%", label: "Certification Compliance" },
  { number: 20, suffix: "+", label: "Quality Certifications" },
  { number: 15, suffix: "+", label: "Years Certified" },
  { number: 0, suffix: "", label: "Non-Compliance Issues" }
]

export function CertificationsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
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
            <Award className="h-4 w-4 mr-2" />
            Certifications & Compliance
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Quality You Can Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our commitment to excellence is backed by comprehensive certifications and compliance 
            with international standards, ensuring the highest quality and safety of our products.
          </motion.p>
        </motion.div>

        {/* Compliance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {complianceMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {metric.number}{metric.suffix}
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  {/* Certification Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center`}>
                      {(() => {
                        const IconComponent = cert.icon
                        return <IconComponent className="h-8 w-8 text-white" />
                      })()}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Valid Until</div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(cert.validUntil).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Certification Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {cert.name}
                    </h3>
                    <h4 className="text-sm font-medium text-emerald-600 mb-3">
                      {cert.fullName}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {cert.description}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      Issued by: {cert.issuer}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Key Features</h5>
                    <ul className="space-y-2">
                      {cert.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Certificate Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group"
                  >
                    View Certificate
                    <ExternalLink className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quality Standards Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200 mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Quality Standards
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We adhere to the highest international standards across all aspects of our operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityStandards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const IconComponent = standard.icon
                    return <IconComponent className="h-8 w-8 text-white" />
                  })()}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {standard.title}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4">
                  {standard.description}
                </p>

                <div className="space-y-1">
                  {standard.standards.map((std, stdIndex) => (
                    <div key={stdIndex} className="text-xs text-emerald-600 font-medium">
                      {std}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Commitment to Excellence
            </h3>
            <blockquote className="text-xl italic mb-8 max-w-4xl mx-auto leading-relaxed">
              "Quality is not just a requirement for us – it's a promise we make to every farmer we work with, 
              every client we serve, and every consumer who enjoys our products. Our certifications are proof 
              of this unwavering commitment."
            </blockquote>
            <cite className="text-emerald-200 font-medium">
              — Pyramid Agro Export Quality Assurance Team
            </cite>
            
            <div className="mt-8">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-emerald-700 hover:bg-gray-100"
              >
                Download Quality Policy
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
