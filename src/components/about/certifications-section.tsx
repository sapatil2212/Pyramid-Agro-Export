"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Award } from "lucide-react"
import { useCertifications } from "@/hooks/use-certifications"

interface AboutContentSection {
  section: string;
  isActive?: boolean | null;
}

export function CertificationsSection() {
  const { certifications, loading } = useCertifications(true);
  const [sectionVisible, setSectionVisible] = useState(true);
  const [checkingVisibility, setCheckingVisibility] = useState(true);

  // Check if certifications section is enabled
  useEffect(() => {
    const checkSectionVisibility = async () => {
      try {
        const response = await fetch('/api/about-content');
        if (response.ok) {
          const content = (await response.json()) as AboutContentSection[];
          const certificationsContent = content.find((c) => c.section === 'certifications');
          setSectionVisible(certificationsContent?.isActive ?? true);
        }
      } catch (error) {
        console.error('Error checking section visibility:', error);
        setSectionVisible(true); // Default to visible if error
      } finally {
        setCheckingVisibility(false);
      }
    };

    checkSectionVisibility();
  }, []);

  // Don't render if section is disabled
  if (!sectionVisible) {
    return null;
  }

  if (loading || checkingVisibility) {
    return (
      <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return (
      <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6"
            >
              <Award className="h-4 w-4 mr-2" />
              Certifications & Compliance
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Quality You Can Trust
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our commitment to excellence is backed by comprehensive certifications and compliance 
              with international standards, ensuring the highest quality and safety of our products.
            </motion.p>
          </motion.div>

          {/* Empty State */}
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Certifications Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We are currently working on adding our quality certifications and compliance documents. 
              Please check back soon to see our commitment to excellence.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6"
          >
            <Award className="h-4 w-4 mr-2" />
            Certifications & Compliance
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Quality You Can Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our commitment to excellence is backed by comprehensive certifications and compliance 
            with international standards, ensuring the highest quality and safety of our products.
          </motion.p>
        </motion.div>

        {/* Certifications Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="relative h-64 w-full">
                  <Image
                    src={cert.imageUrl || "/certificates/default-certificate.jpg"}
                    alt={cert.name || "Certification"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Certificate";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
