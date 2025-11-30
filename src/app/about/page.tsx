"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
  Star,
  type LucideIcon,
} from "lucide-react"
import { ExportProcessSection } from "@/components/export-process-section"
import { CertificationsSection } from "@/components/about/certifications-section"
import { useAboutDynamic } from "@/hooks/use-about-dynamic"
import { useTeamMembers } from "@/hooks/use-team-members"

export default function AboutPage() {
  const { content, features, loading } = useAboutDynamic();
  const { members: teamMembers, loading: teamLoading } = useTeamMembers();
  
  // Get the about section content
  const storyContent = content.find(section => section.section === 'story');
  const valuesFeatures = features.filter(f => f.section === 'values');
  const visionContent = content.find(section => section.section === 'vision');
  const missionContent = content.find(section => section.section === 'mission');
  const teamContent = content.find(section => section.section === 'team');
  
  // Fallback content if not found or loading
  const fallbackStoryContent = {
    title: "About us",
    subtitle: "About Pyramid Agro Export",
    description: "At Pyramid Agro Exports, we are committed to delivering the finest, freshest, and most nutritious produce from India's fertile lands to tables across the world. Headquartered in Nashik, Maharashtra—India's agricultural heartland—we specialize in the export of premium-quality onions, grapes, and green chilies.\n\nWith a seamless farm-to-market approach, we take pride in our sourcing, grading, packaging, and timely delivery, ensuring that every shipment meets global quality and safety standards. Our strength lies in combining modern agri-export expertise with ethical farming practices, thereby building long-term trust with both farmers and customers.\n\nAt Pyramid Agro Exports, we don't just export produce—we export freshness, trust, and long-lasting partnerships.",
    imageUrl: "/hero/home-about.png"
  };

  const displayStoryContent = storyContent || fallbackStoryContent;

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="pt-32 sm:pt-42 pb-16 bg-white">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
             {displayStoryContent.title}
            </h2>
            <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-relaxed">
              {displayStoryContent.description?.split('\n\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
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
                <Image
                  src={displayStoryContent.imageUrl || "/hero/home-about.png"}
                  alt="Pyramid Agro Exports - Agricultural Excellence"
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
            {(valuesFeatures.length > 0 ? valuesFeatures : [
              {
                title: "Global Export Expertise",
                description: "Years of successful exports backed by strong logistics and compliance with international standards.",
                icon: "Globe"
              },
              {
                title: "Premium-Quality Produce",
                description: "Freshly harvested onions, grapes, and green chilies directly from India's best farmlands.",
                icon: "Leaf"
              },
              {
                title: "Seamless Supply Chain",
                description: "Assured freshness with timely delivery and customized export-friendly packaging.",
                icon: "Truck"
              },
              {
                title: "Sustainability & Ethical Sourcing",
                description: "Supporting farmers with fair practices while delivering responsibly grown produce.",
                icon: "Heart"
              },
              {
                title: "Trust & Reliability",
                description: "Every shipment is a promise of quality, freshness, and care.",
                icon: "Shield"
              },
              {
                title: "Commitment to Consistency",
                description: "We ensure uniform quality, size, and taste in every batch, meeting the most demanding international standards.",
                icon: "CheckCircle"
              }
            ]).map((feature, index) => {
              const iconMap: Record<string, LucideIcon> = {
                Globe, Leaf, Truck, Heart, Shield, CheckCircle, Award, Star, Target, Users
              };
              const IconComponent = iconMap[feature.icon || 'Star'] || Star;
              const iconColors = [
                { bg: "bg-blue-100", hover: "group-hover:bg-blue-200", color: "text-blue-600" },
                { bg: "bg-green-100", hover: "group-hover:bg-green-200", color: "text-green-600" },
                { bg: "bg-purple-100", hover: "group-hover:bg-purple-200", color: "text-purple-600" },
                { bg: "bg-emerald-100", hover: "group-hover:bg-emerald-200", color: "text-emerald-600" },
                { bg: "bg-amber-100", hover: "group-hover:bg-amber-200", color: "text-amber-600" },
                { bg: "bg-indigo-100", hover: "group-hover:bg-indigo-200", color: "text-indigo-600" }
              ];
              const colors = iconColors[index % iconColors.length];
              
              return (
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
                  <div className={`w-16 h-16 ${colors.bg} ${colors.hover} rounded-2xl flex items-center justify-center mb-4 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3`}>
                    <IconComponent className={`h-8 w-8 ${colors.color} transition-all duration-700 ease-out group-hover:scale-110`} />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-500 ease-out">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-[15px] leading-relaxed group-hover:text-gray-700 transition-colors duration-500 ease-out">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
              );
            })}
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
                    {visionContent?.title || 'Vision'}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-md">
                  {visionContent?.description || "To become a globally admired leader in agricultural exports, renowned for delivering the authentic freshness and richness of Indian produce to households and businesses across the world. We aspire to build a future where sustainable farming practices preserve nature's balance, where farmers are empowered with fair opportunities and growth, and where our commitment to quality, innovation, and trust sets new benchmarks in the agri-export industry."}
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
                    {missionContent?.title || 'Mission'}
                  </h2>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {missionContent?.description ? (
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-md">
                      {missionContent.description}
                    </p>
                  ) : (
                    <>
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
                    </>
                  )}
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
              {teamContent?.title || 'Our Directors'}
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {teamContent?.subtitle || 'Meet the visionary leaders behind Pyramid Agro Exports'}
            </p>
          </motion.div>

          {teamLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="text-center transition-all duration-700 ease-out group-hover:scale-105 h-full border border-gray-200 hover:border-emerald-300 rounded-xl bg-white overflow-hidden">
                    <div className="relative w-full h-64 rounded-t-xl overflow-hidden transition-all duration-700 ease-out">
                      <Image
                        src={member.imageUrl || "/hero/team/default.jpg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
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
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-500 ease-out">
                        {member.position}
                      </p>
                      {member.bio && (
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Directors Added</h3>
              <p className="text-gray-600">Team members will appear here once they are added.</p>
            </div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Export Process Section */}
      <ExportProcessSection />
    </div>
  )
}