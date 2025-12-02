"use client"

import { motion } from "framer-motion"
import { LoadingButton } from "@/components/ui/loading-button"
import { useAppointmentModal } from "@/components/appointment-modal-provider"
import { ArrowRight } from "lucide-react"

export function ExportCtaSection() {
  const { openModal } = useAppointmentModal()

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background card */}
          <div
            className="relative overflow-hidden rounded-2xl border border-emerald-800/30"
            style={{
              // darker emerald/teal gradient with faint pattern image on top
              backgroundImage:
                `linear-gradient(120deg, rgba(4,120,87,0.92), rgba(6,95,86,0.92)), url('/images/cta-pattern.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* subtle overlay to reduce brightness of pattern (keeps text readable) */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* decorative floating shapes (low opacity) */}
            <svg
              className="absolute -top-6 -right-10 opacity-20 pointer-events-none"
              width="280"
              height="280"
              viewBox="0 0 280 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <circle cx="140" cy="140" r="140" fill="rgba(255,255,255,0.04)" />
              <circle cx="220" cy="60" r="56" fill="rgba(255,255,255,0.03)" />
            </svg>

            <div className="relative z-10 px-6 py-10 sm:py-12 md:py-14 lg:py-16">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
                >
                  Ready to Start Your Export Journey?
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.45 }}
                  className="text-emerald-100 text-sm md:text-base mb-6"
                >
                  Let us guide you through our proven process to deliver the finest agricultural products to your market —
                  compliance, packaging, and reliable international delivery handled end-to-end.
                </motion.p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LoadingButton
                      onClick={openModal}
                      size="lg"
                      className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 text-white px-8 py-3 rounded-lg"
                      showArrow={false}
                      loadingText="Starting Process..."
                      aria-label="Begin export process"
                    >
                      <span className="flex items-center gap-3">
                        Begin Export Process
                        {/* animated arrow inside button */}
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 6 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-flex items-center"
                        >
                          <ArrowRight className="h-4 w-4 text-white" />
                        </motion.span>
                      </span>
                    </LoadingButton>
                  </motion.div>

                  {/* secondary action (text link) */}
                  <motion.button
                    onClick={openModal}
                    className="text-emerald-200 hover:text-white text-sm px-3 py-2 rounded-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Schedule a consultation"
                  >
                    Schedule a free consultation
                  </motion.button>
                </div>

                {/* micro trust/meta row */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-emerald-100 text-xs">
                  <span className="inline-flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    ISO-compliant packing
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 2v6" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 8h14" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Customs & documentation support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
