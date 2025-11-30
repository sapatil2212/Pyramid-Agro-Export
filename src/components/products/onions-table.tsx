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

interface OnionsTableData {
  tableTitle?: string
  tableDescription?: string
  tableVarieties?: string
  tableSpecs?: string
  tableAdvantages?: string
}

// Default data fallback
const defaultVarieties: Variety[] = [
  {
    name: "Small Grade",
    type: "20-40 mm",
    characteristics: "Small-sized onions with strong flavor and firm texture, perfect for retail",
    features: "Small size, Strong flavor, Firm texture, Retail"
  },
  {
    name: "Medium Grade",
    type: "40-60 mm",
    characteristics: "Medium-sized onions with uniform grading and excellent cooking properties",
    features: "Medium size, Uniform grading, Cooking properties, Quality"
  },
  {
    name: "Large Grade",
    type: "60-80 mm",
    characteristics: "Large-sized onions with extended shelf life and premium quality",
    features: "Large size, Extended shelf life, Premium quality, Export"
  }
]

const defaultSpecifications: Specification[] = [
  { category: "Origin", value: "Nashik, Maharashtra, India" },
  { category: "Grades", value: "Small (20–40 mm), Medium (40–60 mm), Large (60–80 mm)" },
  { category: "Availability", value: "Year-round" },
  { category: "Quality Grade", value: "Export Grade" },
  { category: "Flavor", value: "Strong flavor and pungency" },
  { category: "Texture", value: "Firm texture and uniform grading" },
  { category: "Shelf Life", value: "Extended shelf life compared to other origins" },
  { category: "Grading", value: "Uniform sizing & pungency" },
  { category: "Export Markets", value: "Middle East, Southeast Asia, Europe" },
  { category: "Demand", value: "Major demand in Dubai and Oman" }
]

const defaultAdvantages = [
  "Extended shelf life compared to other origins",
  "Uniform sizing & pungency make them ideal for both food service and retail",
  "Major demand in Dubai and Oman, where consistency and storage life are crucial",
  "Renowned worldwide for strong flavor, firm texture, and uniform grading",
  "Year-round availability with consistent quality",
  "Perfect for both food service and retail applications"
]

export default function OnionsTable() {
  const [tableData, setTableData] = useState<OnionsTableData>({})
  const [varieties, setVarieties] = useState<Variety[]>(defaultVarieties)
  const [specifications, setSpecifications] = useState<Specification[]>(defaultSpecifications)
  const [advantages, setAdvantages] = useState<string[]>(defaultAdvantages)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTableData()
  }, [])

  const fetchTableData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products?slug=onions')
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
              setVarieties(defaultVarieties)
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
              setSpecifications(defaultSpecifications)
            }
          }

          if (product.tableAdvantages) {
            try {
              const parsedAdvantages = JSON.parse(product.tableAdvantages)
              if (Array.isArray(parsedAdvantages)) {
                setAdvantages(parsedAdvantages)
              }
            } catch (e) {
              console.error('Error parsing advantages:', e)
              setAdvantages(defaultAdvantages)
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
          {tableData.tableTitle || "NASHIK RED & PINK ONIONS - Premium Export Quality"}
        </h2>
        <p className="text-base text-gray-600 max-w-4xl mx-auto">
          {tableData.tableDescription || "Renowned worldwide, Nashik onions are known for their strong flavor, firm texture, and uniform grading with year-round availability."}
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
                Onion Grades
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Grade Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Size</th>
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
              {advantages.map((advantage, index) => (
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
