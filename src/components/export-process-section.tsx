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

/**
 * Map the logical `process.color` value to a Tailwind color family.
 * Add more mappings as needed.
 */
const tailwindColorMap: Record<string, string> = {
  emerald: 'emerald',
  green: 'emerald',
  blue: 'sky',
  sky: 'sky',
  yellow: 'yellow',
  orange: 'orange',
  red: 'rose',
  indigo: 'indigo',
  slate: 'slate',
  gray: 'gray',
}

const colorToTailwind = (color: string) => tailwindColorMap[color] ?? color

export function ExportProcessSection() {
  const [steps, setSteps] = useState<ExportStep[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent>({ title: 'Our Export Process', subtitle: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSteps()
    fetchSectionContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-24">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (steps.length === 0) return null

  const defaultSubtitle = `From initial consultation and quality inspection to secure packaging and timely international delivery — end-to-end export services across ${steps.length} carefully managed steps.`

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {sectionContent.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            {sectionContent.subtitle?.trim() ? sectionContent.subtitle : defaultSubtitle}
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {steps.map((process, index) => {
              const IconComponent = getIconComponent(process.icon)
              const tColor = colorToTailwind(process.color)
              const stepBadgeBg = `bg-${tColor}-100`
              const stepBadgeText = `text-${tColor}-700`
              const iconBg = `bg-${tColor}-50`
              const iconText = `text-${tColor}-600`
              // gradient class uses faint green-to-white; still allow slight tint per card color:
              // We'll use a gentle green->white for consistency while letting accent color control small parts.
              const cardGradient = `bg-gradient-to-b from-emerald-50 to-white`

              return (
              <motion.div
  key={process.id}
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, delay: index * 0.06 }}
  viewport={{ once: true }}
  className="relative z-10"
>
  <div
    className={`border border-gray-200 rounded-xl p-4 h-full ${cardGradient}`}
    style={{ minHeight: 140 }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stepBadgeBg}`}>
        <span className={`text-sm font-semibold ${stepBadgeText}`}>{process.step}</span>
      </div>

      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
        <IconComponent className={`h-4 w-4 ${iconText}`} />
      </div>
    </div>

    <div className="space-y-1">
      <h3 className="text-sm md:text-base font-semibold text-gray-900">
        {process.title}
      </h3>
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
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
