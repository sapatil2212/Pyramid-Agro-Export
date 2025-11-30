"use client"

import { motion } from "framer-motion"
import { CheckCircle, Star, Award, Leaf, Truck } from "lucide-react"

const varieties = [
  {
    name: "White Garlic",
    type: "Premium",
    characteristics: "Large, white bulbs with strong flavor and long shelf life",
    features: "Large bulbs, Strong flavor, Long shelf life, High quality"
  },
  {
    name: "Purple Garlic",
    type: "Standard",
    characteristics: "Purple-skinned garlic with mild, sweet flavor",
    features: "Purple skin, Mild flavor, Sweet taste, Good storage"
  },
  {
    name: "Elephant Garlic",
    type: "Premium",
    characteristics: "Extra large cloves with mild, sweet flavor",
    features: "Extra large, Mild flavor, Sweet taste, Premium quality"
  }
]

const specifications = [
  { spec: "Size", value: "Various sizes from small to extra large" },
  { spec: "Color", value: "White, Purple, and mixed varieties" },
  { spec: "Texture", value: "Firm, dry, and well-cured" },
  { spec: "Shelf Life", value: "6-8 months in proper storage" },
  { spec: "Storage", value: "Cool, dry, and well-ventilated" },
  { spec: "Packaging", value: "Mesh bags, cartons, or bulk packaging" }
]

const advantages = [
  "Rich in allicin and antioxidants",
  "Natural antibiotic properties",
  "Long shelf life and storage",
  "Versatile culinary applications",
  "Export quality standards",
  "Customized packaging options"
]

export default function GarlicsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Quality Garlic
          </h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Fresh, aromatic garlic from India&apos;s finest farms, perfect for domestic and international markets
          </p>
        </motion.div>
      </div>

      {/* Varieties Section */}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Available Varieties
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {varieties.map((variety, index) => (
              <motion.div
                key={variety.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{variety.name}</h4>
                    <span className="text-sm text-purple-600 font-medium">{variety.type}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3 text-sm">{variety.characteristics}</p>
                <div className="text-xs text-gray-500">
                  <strong>Features:</strong> {variety.features}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Product Specifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specifications.map((spec, index) => (
              <motion.div
                key={spec.spec}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <span className="font-semibold text-gray-900">{spec.spec}:</span>
                    <span className="text-gray-600 ml-2">{spec.value}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Garlic?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center bg-green-50 rounded-lg p-4 border border-green-200"
              >
                <Award className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{advantage}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
