"use client"

import { motion } from "framer-motion"
import { CheckCircle, Star, Award, Leaf, Truck } from "lucide-react"
import { useState, useEffect } from "react"

interface Variety {
  name: string
  type: string
  characteristics: string
  features: string
}

interface Specification {
  category: string
  value: string
}

interface NashikGrapesTableData {
  tableTitle?: string
  tableDescription?: string
  tableVarieties?: string
  tableSpecs?: string
  tableAdvantages?: string
}

// Default data fallback
const defaultVarieties: Variety[] = [
  {
    name: "Sonaka",
    type: "Seedless",
    characteristics: "Premium seedless variety with excellent shelf life",
    features: "Sweet, Crisp texture, Long shelf life"
  },
  {
    name: "Sharad Seedless",
    type: "Seedless",
    characteristics: "High-quality seedless grapes perfect for export",
    features: "Premium quality, Export grade, Uniform size"
  },
  {
    name: "Thompson Seedless",
    type: "Seedless",
    characteristics: "Classic variety known for its sweetness and crunch",
    features: "Sweet, Crunchy, Traditional favorite"
  },
  {
    name: "Flame Seedless",
    type: "Seedless",
    characteristics: "Attractive red variety with excellent visual appeal",
    features: "Red color, Attractive, Premium appearance"
  }
]

const defaultSpecifications: Specification[] = [
  { category: "Origin", value: "Nashik, Maharashtra, India" },
  { category: "Season", value: "December – April" },
  { category: "Quality Grade", value: "Export Grade" },
  { category: "Sugar Content", value: "Naturally High" },
  { category: "Shelf Life", value: "Long (Ideal for exports)" },
  { category: "Texture", value: "Crunchy & Crisp" },
  { category: "Appearance", value: "Attractive clusters, Uniform size, Appealing shine" },
  { category: "Packaging", value: "Clamshells, Punnets, Corrugated boxes with liners" },
  { category: "Processing", value: "Handpicked, Pre-cooled for maximum freshness" },
  { category: "Certification", value: "International quality standards" }
]

const defaultAdvantages = [
  "Naturally high sugar content and long shelf life make them ideal for long-distance exports",
  "Attractive clusters with uniform size and appealing shine",
  "Widely preferred in Dubai, UAE, and Oman for premium retail and wholesale markets",
  "Carefully handpicked, pre-cooled, and packed in export-friendly packaging",
  "Rich antioxidant content and natural sweetness",
  "Crunchy texture that maintains freshness during transport"
]

export default function NashikGrapesTable() {
  const [tableData, setTableData] = useState<NashikGrapesTableData>({})
  const [varieties, setVarieties] = useState<Variety[]>(defaultVarieties)
  const [specifications, setSpecifications] = useState<Specification[]>(defaultSpecifications)
  const [keyAdvantages, setKeyAdvantages] = useState<string[]>(defaultAdvantages)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch('/api/products?slug=grapes')
        if (response.ok) {
          const data = await response.json()
          if (data.products && data.products.length > 0) {
            const product = data.products[0]
            setTableData({
              tableTitle: product.tableTitle,
              tableDescription: product.tableDescription,
              tableVarieties: product.tableVarieties,
              tableSpecs: product.tableSpecs,
              tableAdvantages: product.tableAdvantages
            })

            // Parse JSON data
            if (product.tableVarieties) {
              try {
                const parsedVarieties = JSON.parse(product.tableVarieties)
                if (Array.isArray(parsedVarieties)) {
                  setVarieties(parsedVarieties)
                }
              } catch (e) {
                console.error('Error parsing varieties:', e)
              }
            }

            if (product.tableSpecs) {
              try {
                const parsedSpecs = JSON.parse(product.tableSpecs)
                if (Array.isArray(parsedSpecs)) {
                  setSpecifications(parsedSpecs)
                }
              } catch (e) {
                console.error('Error parsing specifications:', e)
              }
            }

            if (product.tableAdvantages) {
              try {
                const parsedAdvantages = JSON.parse(product.tableAdvantages)
                if (Array.isArray(parsedAdvantages)) {
                  setKeyAdvantages(parsedAdvantages)
                }
              } catch (e) {
                console.error('Error parsing advantages:', e)
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching table data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTableData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center">
          <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
          {tableData.tableTitle || "NASHIK GRAPES - Premium Export Quality"}
        </h2>
        <p className="text-base text-gray-600 max-w-4xl mx-auto">
          {tableData.tableDescription || "Nashik, often called the \"Grape Capital of India,\" produces world-class grapes known for their natural sweetness, crunchy texture, and rich antioxidant content."}
        </p>
      </div>

      {/* Side by Side Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Varieties Table and Key Advantages */}
        <div className="space-y-6">
          {/* Varieties Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden border border-gray-200"
          >
            <div className="bg-emerald-600 text-white px-4 py-3">
              <h3 className="text-lg font-bold flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Grape Varieties
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Variety Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Characteristics</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Key Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {varieties.map((variety, index) => (
                    <motion.tr
                      key={variety.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="hover:bg-emerald-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{variety.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {variety.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{variety.characteristics}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{variety.features}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Key Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-4 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <Truck className="h-5 w-5 text-emerald-600 mr-2" />
              Why They Stand Out Internationally
            </h3>
            <div className="space-y-2">
              {keyAdvantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-2"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700">{advantage}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Specifications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl overflow-hidden border border-gray-200"
        >
          <div className="bg-emerald-600 text-white px-4 py-3">
            <h3 className="text-lg font-bold flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Product Specifications
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {specifications.map((spec, index) => (
                  <motion.tr
                    key={spec.category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="hover:bg-emerald-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-xs font-semibold text-gray-900">{spec.category}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{spec.value}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
