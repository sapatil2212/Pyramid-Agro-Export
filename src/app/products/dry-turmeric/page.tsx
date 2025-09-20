"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { ArrowRight, Star, CheckCircle, Leaf, Truck, Shield } from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"

export default function DryTurmericPage() {
  const { openModal } = useAppointmentModal()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 to-amber-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Premium Quality{" "}
                <span className="text-emerald-600">Dry Turmeric</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover the golden spice of India - our premium dry turmeric. 
                Carefully processed and dried to preserve its natural color, aroma, 
                and health benefits while meeting international quality standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <LoadingButton
                  onClick={openModal}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
                  showArrow={true}
                  loadingText="Getting Quote..."
                >
                  Get Quote
                </LoadingButton>
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
              <div className="bg-gradient-to-br from-emerald-100 to-amber-100 rounded-2xl p-8">
                <div className="relative w-full h-80 rounded-xl overflow-hidden">
                  <img
                    src="/products/dry-turmeric.jpg"
                    alt="Premium Dry Turmeric"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 flex items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <div className="text-center text-gray-600">
                      <Leaf className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
                      <p className="text-lg font-semibold">Premium Dry Turmeric</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Dry Turmeric?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium quality dry turmeric with natural color and health benefits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Natural Color",
                description: "Preserves natural golden color and aroma"
              },
              {
                icon: CheckCircle,
                title: "Quality Assured",
                description: "Rigorous quality checks for the best selection"
              },
              {
                icon: Leaf,
                title: "Health Benefits",
                description: "Rich in curcumin and natural antioxidants"
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Quick delivery to maintain freshness"
              },
              {
                icon: Shield,
                title: "Safe & Clean",
                description: "Hygienic processing and packaging"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Order Premium Dry Turmeric?
            </h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Contact us today for the finest quality dry turmeric delivered to your doorstep
            </p>
            <LoadingButton
              onClick={openModal}
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 group"
              showArrow={true}
              loadingText="Getting Quote..."
            >
              Get Quote Now
            </LoadingButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
