"use client"

import { motion } from "framer-motion"
import { LoadingButton } from "@/components/ui/loading-button"
import { useAppointmentModal } from "@/components/appointment-modal-provider"

export function ExportCtaSection() {
  const { openModal } = useAppointmentModal()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
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
