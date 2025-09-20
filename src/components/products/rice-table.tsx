"use client"

import { motion } from "framer-motion"
import { CheckCircle, Star, Award, Leaf, Truck } from "lucide-react"

const varieties = [
  {
    name: "Basmati 1121",
    type: "Basmati",
    characteristics: "Premium long grain basmati with exceptional aroma and fluffy texture",
    features: "Long grain, Aroma, Fluffy texture, Premium quality"
  },
  {
    name: "Pusa",
    type: "Basmati",
    characteristics: "High-quality basmati variety with excellent cooking properties",
    features: "Long grain, Aroma, Cooking quality, Export grade"
  },
  {
    name: "Traditional",
    type: "Basmati",
    characteristics: "Classic basmati variety known for its authentic taste and aroma",
    features: "Traditional, Aroma, Authentic taste, Premium"
  },
  {
    name: "Golden Sella",
    type: "Basmati",
    characteristics: "Parboiled basmati with golden color and enhanced nutritional value",
    features: "Parboiled, Golden color, Nutritional, Enhanced"
  },
  {
    name: "Sona Masoori",
    type: "Non-Basmati",
    characteristics: "Cost-effective medium grain rice with good cooking properties",
    features: "Medium grain, Cost-effective, Good cooking, Quality"
  },
  {
    name: "IR64",
    type: "Non-Basmati",
    characteristics: "High-yield variety with excellent cooking and eating quality",
    features: "High yield, Cooking quality, Eating quality, Reliable"
  },
  {
    name: "Swarna",
    type: "Non-Basmati",
    characteristics: "Popular variety with good grain quality and cooking properties",
    features: "Popular, Good quality, Cooking properties, Reliable"
  },
  {
    name: "Ponni",
    type: "Non-Basmati",
    characteristics: "Premium non-basmati variety with excellent grain quality",
    features: "Premium, Grain quality, Cooking, Export grade"
  }
]

const specifications = [
  { category: "Origin", value: "India" },
  { category: "Types", value: "Basmati & Non-Basmati" },
  { category: "Basmati Varieties", value: "1121, Pusa, Traditional, Golden Sella" },
  { category: "Non-Basmati Varieties", value: "Sona Masoori, IR64, Swarna, Ponni" },
  { category: "Packaging", value: "PP bags, jute bags, vacuum packs" },
  { category: "Grain Type", value: "Long grain (Basmati), Medium grain (Non-Basmati)" },
  { category: "Quality", value: "Export grade with consistent quality" },
  { category: "Aroma", value: "Basmati varieties have distinctive aroma" },
  { category: "Texture", value: "Fluffy texture, excellent cooking properties" },
  { category: "Markets", value: "UAE, Dubai, Oman buyers for consistent quality" }
]

const keyAdvantages = [
  "Basmati rice is globally famous for its long grain, aroma, and fluffy texture",
  "Non-Basmati varieties provide cost-effective solutions without compromising quality",
  "Widely trusted by UAE, Dubai, and Oman buyers for consistent quality and customized packaging",
  "Available in multiple packaging options: PP bags, jute bags, vacuum packs",
  "Premium basmati varieties with exceptional cooking and eating quality",
  "Reliable supply chain with consistent quality across all varieties"
]

export default function RiceTable() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center">
          <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
          BASMATI & NON-BASMATI RICE - Premium Export Quality
        </h2>
        <p className="text-base text-gray-600 max-w-4xl mx-auto">
          Premium quality rice varieties including both Basmati and Non-Basmati types, 
          offering exceptional taste, aroma, and cooking properties for international markets.
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
                Rice Varieties
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          variety.type === 'Basmati' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
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
