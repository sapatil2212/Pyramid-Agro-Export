"use client"

import { motion } from "framer-motion"
import { CheckCircle, Star, Award, Leaf, Truck } from "lucide-react"

const varieties = [
  {
    name: "Allahabad Safeda",
    type: "White Flesh",
    characteristics: "Premium white-fleshed guava with sweet flavor and tropical freshness",
    features: "White flesh, Sweet flavor, Tropical freshness, Rich in Vitamin C"
  },
  {
    name: "Pink Guava",
    type: "Pink Flesh",
    characteristics: "Attractive pink-fleshed guava with exceptional taste and health benefits",
    features: "Pink flesh, Sweet flavor, Rich in antioxidants, High fiber content"
  }
]

const specifications = [
  { category: "Origin", value: "India" },
  { category: "Varieties", value: "Allahabad Safeda, Pink Guava" },
  { category: "Quality Grade", value: "Export Grade" },
  { category: "Flesh Types", value: "White and Pink flesh varieties" },
  { category: "Nutrition", value: "Rich in Vitamin C, fiber, and antioxidants" },
  { category: "Flavor", value: "Naturally sweet flavor" },
  { category: "Freshness", value: "Tropical freshness" },
  { category: "Health Benefits", value: "Exceptional taste and health benefits" },
  { category: "Market Appeal", value: "Suitable for diverse markets" },
  { category: "Popularity", value: "Increasingly popular in Gulf region" }
]

const keyAdvantages = [
  "Naturally sweet flavor and tropical freshness",
  "Available in both white and pink flesh, suiting diverse markets",
  "Increasingly popular in the Gulf region for juice, pulp, and fresh consumption",
  "Rich in Vitamin C, fiber, and antioxidants offering exceptional taste and health benefits",
  "Premium quality guavas with excellent export potential",
  "Versatile fruit suitable for multiple consumption methods"
]

export default function GuavaTable() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center">
          <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
          GUAVAS - Premium Export Quality
        </h2>
        <p className="text-base text-gray-600 max-w-4xl mx-auto">
          Guavas are rich in Vitamin C, fiber, and antioxidants, offering exceptional taste and health benefits.
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
                Guava Varieties
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
