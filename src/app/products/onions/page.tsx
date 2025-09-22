"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, CheckCircle, Leaf, Truck, Shield } from "lucide-react"
import OnionsTable from "@/components/products/onions-table"

export default function OnionsPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-42 pb-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
                Premium Quality{" "}
                <span className="text-emerald-600">Nashik Onions</span>
              </h1>
              <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-relaxed">
                <p>
                  Experience the finest Nashik red and pink onions from India&apos;s premier onion growing region. 
                  Our premium quality onions are carefully harvested, graded, 
                  and exported to meet the highest international standards.
                </p>
                <p>
                  Renowned worldwide for their strong flavor, firm texture, and uniform grading, 
                  with year-round availability and extended shelf life.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  onClick={() => window.location.href = '/contact'}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-lg mx-auto">
                <Image
                  src="/products/onion.png"
                  alt="Premium Nashik Onions"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-xl flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-center text-gray-600">
                    <Leaf className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
                    <p className="text-lg font-semibold">Premium Nashik Onions</p>
                    <p className="text-sm">Export Quality</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Choose Our Nashik Onions?
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Premium quality Nashik onions with strong flavor and extended shelf life
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              {
                icon: Star,
                title: "Strong Flavor",
                description: "Renowned worldwide taste"
              },
              {
                icon: CheckCircle,
                title: "Year-round Availability",
                description: "Consistent supply"
              },
              {
                icon: Leaf,
                title: "Firm Texture",
                description: "Uniform grading"
              },
              {
                icon: Truck,
                title: "Extended Shelf Life",
                description: "Longer than other origins"
              },
              {
                icon: Shield,
                title: "Dubai & Oman",
                description: "Major demand markets"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 min-w-[200px] flex-1 max-w-[250px]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                    <feature.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Onions Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <OnionsTable />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Ready to Order Premium Nashik Onions?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Contact us today for the finest quality Nashik onions delivered to your doorstep with our proven export process
              </p>
              <Button
                onClick={() => window.location.href = '/contact'}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
              >
                Get Quote Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}