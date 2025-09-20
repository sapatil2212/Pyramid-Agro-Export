"use client"

import { motion } from "framer-motion"
import { LoadingButton } from "@/components/ui/loading-button"
import { 
  Award, 
  Users, 
  Globe, 
  Leaf, 
  Shield, 
  CheckCircle,
  Target,
  Heart,
  Truck,
  MessageCircle,
  Search,
  TestTube,
  FileText,
  Package
} from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"
import { ExportProcessSection } from "@/components/export-process-section"

export default function AboutPage() {
  const { openModal } = useAppointmentModal()

  return (
    <div className="min-h-screen">
      {/* Our Story Section */}
      <section id="story" className="pt-32 sm:pt-42 pb-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 ">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
             About us 
            </h2>
            <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-relaxed">
              <p>
                At Pyramid Agro Exports, we are committed to delivering the finest, freshest, and most nutritious 
                produce from India&apos;s fertile lands to tables across the world. Headquartered in Nashik, Maharashtra—India&apos;s 
                agricultural heartland—we specialize in the export of premium-quality onions, grapes, and green chilies.
              </p>
              <p>
                With a seamless farm-to-market approach, we take pride in our sourcing, grading, packaging, and timely delivery, 
                ensuring that every shipment meets global quality and safety standards. Our strength lies in combining modern 
                agri-export expertise with ethical farming practices, thereby building long-term trust with both farmers and customers.
              </p>
              <p>
                At Pyramid Agro Exports, we don&apos;t just export produce—we export freshness, trust, and long-lasting partnerships.
              </p>
            </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-lg mx-auto ">
                <img
                  src="/hero/home-about.png"
                  alt="Pyramid Agro Exports - Agricultural Excellence"
                  className="w-full h-auto rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-xl flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-center text-gray-600">
                    <Leaf className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
                    <p className="text-lg font-semibold">Agricultural Excellence</p>
                    <p className="text-sm">Premium Quality Produce</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-12"
          >
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">
              Why Pyramid Agro Exports?
            </h2>
            <p className="text-sm sm:text-[15px] text-gray-600 max-w-2xl mx-auto mb-6">
              The real question is – Why not Pyramid Agro Exports?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Globe,
                title: "Global Export Expertise",
                description: "Years of successful exports backed by strong logistics and compliance with international standards.",
                iconBg: "bg-blue-100",
                iconBgHover: "group-hover:bg-blue-200",
                iconColor: "text-blue-600"
              },
              {
                icon: Leaf,
                title: "Premium-Quality Produce",
                description: "Freshly harvested onions, grapes, and green chilies directly from India's best farmlands.",
                iconBg: "bg-green-100",
                iconBgHover: "group-hover:bg-green-200",
                iconColor: "text-green-600"
              },
              {
                icon: Truck,
                title: "Seamless Supply Chain",
                description: "Assured freshness with timely delivery and customized export-friendly packaging.",
                iconBg: "bg-purple-100",
                iconBgHover: "group-hover:bg-purple-200",
                iconColor: "text-purple-600"
              },
              {
                icon: Heart,
                title: "Sustainability & Ethical Sourcing",
                description: "Supporting farmers with fair practices while delivering responsibly grown produce.",
                iconBg: "bg-emerald-100",
                iconBgHover: "group-hover:bg-emerald-200",
                iconColor: "text-emerald-600"
              },
              {
                icon: Shield,
                title: "Trust & Reliability",
                description: "Every shipment is a promise of quality, freshness, and care.",
                iconBg: "bg-amber-100",
                iconBgHover: "group-hover:bg-amber-200",
                iconColor: "text-amber-600"
              },
              {
                icon: CheckCircle,
                title: "Commitment to Consistency",
                description: "We ensure uniform quality, size, and taste in every batch, meeting the most demanding international standards.",
                iconBg: "bg-indigo-100",
                iconBgHover: "group-hover:bg-indigo-200",
                iconColor: "text-indigo-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="p-6 h-full transition-all duration-700 ease-out group-hover:scale-105 border border-gray-200 hover:border-emerald-300 rounded-xl bg-white">
                  <div className={`w-16 h-16 ${feature.iconBg} ${feature.iconBgHover} rounded-2xl flex items-center justify-center mb-4 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor} transition-all duration-700 ease-out group-hover:scale-110`} />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-500 ease-out">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-[15px] leading-relaxed group-hover:text-gray-700 transition-colors duration-500 ease-out">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl p-6 md:p-8 text-gray-900">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                    <Target className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    Vision
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-md">
                To become a globally admired leader in agricultural exports, renowned for delivering the authentic freshness and richness of Indian produce to households and businesses across the world. We aspire to build a future where sustainable farming practices preserve nature’s balance, where farmers are empowered with fair opportunities and growth, and where our commitment to quality, innovation, and trust sets new benchmarks in the agri-export industry.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl p-6 md:p-8 text-gray-900">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                    <Award className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    Mission
                  </h2>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-md">
                      To consistently supply premium-quality, farm-fresh produce that meets international benchmarks.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-md">
                      To create a sustainable, transparent, and efficient supply chain that benefits farmers, partners, and consumers alike.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-md">
                      To uphold the values of trust, quality, and responsibility in every export.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Directors
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the visionary leaders behind Pyramid Agro Exports
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
            {[
              {
                name: "Vaibhav Abhang",
                position: "Director",
                image: "/hero/team/vaibhav.jpg"
              },
              {
                name: "Pravin Adik",
                position: "Director",
                image: "/hero/team/pravin.jpg"
              },
              {
                name: "Yogesh Salunke",
                position: "Director",
                image: "/hero/team/yogesh.jpg"
              },
              {
                name: "Saurabh Sonawane",
                position: "Director",
                image: "/hero/team/saurabh.jpg"
              }
            ].map((director, index) => (
              <motion.div
                key={director.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="text-center transition-all duration-700 ease-out group-hover:scale-105 h-full border border-gray-200 hover:border-emerald-300 rounded-xl bg-white overflow-hidden">
                  <div className="relative w-full h-64 rounded-t-xl overflow-hidden transition-all duration-700 ease-out">
                    <img
                      src={director.image}
                      alt={director.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center text-gray-600">
                        <Users className="h-12 w-12 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-500 ease-out">
                      {director.name}
                    </h3>
                    <p className="text-xs sm:text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-500 ease-out">
                      {director.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Process Section */}
      <ExportProcessSection />

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
              Ready to Experience Freshness?
            </h2>
            <p className="text-sm md:text-lg text-emerald-100 mb-8 max-w-3xl mx-auto">
              Join our global network of satisfied customers who trust Pyramid Agro Exports for premium agricultural products
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
              <LoadingButton
                onClick={openModal}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-6 sm:px-8 py-3 w-full sm:w-auto group"
                showArrow={true}
                loadingText="Getting Quote..."
              >
                Get Quote
              </LoadingButton>
              
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}