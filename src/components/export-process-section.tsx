"use client"

import { motion } from "framer-motion"
import { LoadingButton } from "@/components/ui/loading-button"
import { 
  MessageCircle,
  Search,
  TestTube,
  FileText,
  Package
} from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"

export function ExportProcessSection() {
  const { openModal } = useAppointmentModal()

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
            Our Export Process
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            A streamlined 5-step process ensuring quality and efficiency from consultation to delivery
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Dotted Progress Lines */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 z-0">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12"></div>
              <div className="flex-1 flex items-center justify-between px-6">
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="w-8 h-0.5 relative"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-emerald-300 to-emerald-400 rounded-full relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      />
                    </div>
                    {/* Dotted pattern overlay */}
                    <div className="absolute inset-0 flex justify-between items-center">
                      {[...Array(6)].map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className="w-1 h-1 bg-emerald-200 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="w-12 h-12"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Understanding your specific requirements and market needs",
                icon: MessageCircle,
                color: "emerald",
                delay: 0
              },
              {
                step: "02", 
                title: "Sourcing",
                description: "Identifying and selecting the best quality products from trusted farmers",
                icon: Search,
                color: "blue",
                delay: 0.1
              },
              {
                step: "03",
                title: "Quality Testing", 
                description: "Rigorous testing and certification to ensure international standards",
                icon: TestTube,
                color: "purple",
                delay: 0.2
              },
              {
                step: "04",
                title: "Documentation",
                description: "Complete export documentation and regulatory compliance",
                icon: FileText,
                color: "amber",
                delay: 0.3
              },
              {
                step: "05",
                title: "Logistics",
                description: "Efficient packaging, shipping, and delivery to your destination",
                icon: Package,
                color: "rose",
                delay: 0.4
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: process.delay }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative z-10"
              >
                <div className="bg-white border-2 border-gray-100 hover:border-emerald-300 rounded-2xl p-6 h-full transition-all duration-500 ease-out relative overflow-hidden group-hover:bg-gradient-to-br group-hover:from-emerald-50 group-hover:to-blue-50">
                  {/* Animated Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #f59e0b, #f43f5e)',
                      backgroundSize: '300% 300%',
                      animation: 'gradientShift 3s ease infinite'
                    }}
                  />
                  <div className="absolute inset-[2px] bg-white rounded-2xl" />
                  
                  <div className="relative z-10">
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br from-${process.color}-100 to-${process.color}-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 ease-out relative`}
                        whileHover={{ rotate: 5 }}
                      >
                        <span className="text-lg font-bold text-gray-700 group-hover:text-${process.color}-700 transition-colors duration-300 relative z-10">
                          {process.step}
                        </span>
                        {/* Pulsing ring effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl border-2 border-${process.color}-300 opacity-0 group-hover:opacity-100`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                      
                      {/* Icon */}
                      <motion.div
                        className={`w-10 h-10 bg-${process.color}-50 rounded-lg flex items-center justify-center group-hover:bg-${process.color}-100 transition-all duration-500 ease-out`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <process.icon className={`h-5 w-5 text-${process.color}-600 group-hover:text-${process.color}-700 transition-colors duration-300`} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <motion.h3 
                        className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        {process.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                        whileHover={{ scale: 1.01 }}
                      >
                        {process.description}
                      </motion.p>
                      
                      {/* Interactive progress indicator */}
                      <motion.div 
                        className="w-full h-1 bg-gray-100 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: process.delay + 0.5 }}
                      >
                        <motion.div
                          className={`h-full bg-gradient-to-r from-${process.color}-400 to-${process.color}-500 rounded-full`}
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: process.delay + 0.8 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-100">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Export Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let us guide you through our proven process to deliver the finest agricultural products to your market
            </p>
            <LoadingButton
              onClick={openModal}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 group"
              showArrow={true}
              loadingText="Starting Process..."
            >
              Begin Export Process
            </LoadingButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
