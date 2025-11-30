"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  MessageCircle,
  Search,
  TestTube,
  FileText,
  Package,
  Truck,
  Clock,
  Shield,
  Globe,
  Users,
  CheckCircle
} from "lucide-react"

interface ExportStep {
  id: string
  step: string
  title: string
  description?: string
  icon: string
  color: string
  order: number
  isActive: boolean
}

interface SectionContent {
  title: string
  subtitle: string
}

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'message-circle': MessageCircle, 'search': Search, 'test-tube': TestTube,
    'file-text': FileText, 'package': Package, 'truck': Truck, 'clock': Clock,
    'shield': Shield, 'globe': Globe, 'users': Users, 'check-circle': CheckCircle,
  }
  return iconMap[iconName] || MessageCircle
}

export function ExportProcessSection() {
  const [steps, setSteps] = useState<ExportStep[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent>({ title: 'Our Export Process', subtitle: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSteps()
    fetchSectionContent()
  }, [])

  const fetchSectionContent = async () => {
    try {
      const res = await fetch('/api/home-content')
      const data = await res.json()
      if (res.ok) {
        const exportSection = data.find((s: { section: string }) => s.section === 'export-process')
        if (exportSection) {
          setSectionContent({
            title: exportSection.title || 'Our Export Process',
            subtitle: exportSection.subtitle || ''
          })
        }
      }
    } catch (e) {
      console.error('Error fetching section content:', e)
    }
  }

  const fetchSteps = async () => {
    try {
      const response = await fetch('/api/export-process')
      const data = await response.json()
      if (response.ok && Array.isArray(data)) {
        setSteps(data.filter((s: ExportStep) => s.isActive))
      }
    } catch (error) {
      console.error('Error fetching export process:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (steps.length === 0) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {sectionContent.title}
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            {sectionContent.subtitle || `A streamlined ${steps.length}-step process ensuring quality and efficiency from consultation to delivery`}
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((process, index) => {
              const IconComponent = getIconComponent(process.icon)
              return (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div className="bg-white border border-gray-200 rounded-xl p-5 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 bg-${process.color}-100 rounded-lg flex items-center justify-center`}>
                        <span className={`text-sm font-bold text-${process.color}-700`}>{process.step}</span>
                      </div>
                      <div className={`w-9 h-9 bg-${process.color}-50 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`h-4 w-4 text-${process.color}-600`} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-gray-900">
                        {process.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
