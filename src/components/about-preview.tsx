"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users, Target, Heart, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import Link from "next/link"
import { useAboutContent } from "@/hooks/use-about-content"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "Every product undergoes rigorous quality testing to meet international standards"
  },
  {
    icon: Heart,
    title: "Sustainable Farming",
    description: "Supporting eco-friendly practices that benefit farmers and the environment"
  },
  {
    icon: Users,
    title: "Farmer Partnership",
    description: "Direct relationships with farmers ensuring fair prices and premium quality"
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Leveraging technology for better supply chain management and traceability"
  }
]


export function AboutPreview() {
  const { content, loading } = useAboutContent();
  
  // Get the about section content
  const aboutContent = content.find(section => section.section === 'about');
  
  // Fallback content if not found or loading
  const fallbackContent = {
    title: "Bridging Tradition with Innovation",
    subtitle: "About Pyramid Agro Export",
    description: "With decades of expertise in agricultural exports, Pyramid Agro Exports has been a trusted name in the export of premium-quality fresh fruits and vegetables. We take pride in delivering the finest agricultural produce to customers worldwide from our base in Nashik, Maharashtra.\n\nOur commitment extends beyond business – we work closely with local farmers, promoting sustainable farming practices and ensuring that every product undergoes rigorous quality checks to meet the highest international standards for freshness and nutrition.",
    buttonText: "Learn More About Us",
    buttonLink: "/about",
    imageUrl: "/hero/home-about.png"
  };

  const displayContent = aboutContent || fallbackContent;

  if (loading) {
    return (
      <section className="py-15 lg:py-32 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-15 lg:py-32 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-32">
        {/* Main Content - Image and Text Side by Side */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center mb-20">
          {/* Left Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-full"
          >
            <div className="relative group bg-transparent overflow-hidden rounded-lg h-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-transparent w-full h-auto flex items-center justify-center"
              >
                <Image 
                  src={displayContent.imageUrl || "/hero/home-about.png"} 
                  alt="Pyramid Agro Export - Agricultural Excellence"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain bg-transparent max-w-full"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjUuNDY0IDE4Ny4zMjQgMTc4IDE3MCAxNzhDMTUyLjY3NiAxNzggMTQwIDE2NS40NjQgMTQwIDE1MEMxNDAgMTM0LjUzNiAxNTIuNjc2IDEyMiAxNzAgMTIyQzE4Ny4zMjQgMTIyIDIwMCAxMzQuNTM2IDIwMCAxNTBaIiBmaWxsPSIjOUI5QkE1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIExvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPgo="
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6"
            >
              <Heart className="h-4 w-4 mr-2" />
              {displayContent.subtitle}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: displayContent.title.replace('Tradition', '<span class="text-emerald-600 relative">Tradition<span class="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200 -z-10"></span></span>') }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-sm md:text-lg text-gray-600 mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: displayContent.description.replace(/\n\n/g, '</p><p class="text-sm md:text-[15px] text-gray-600 mb-8 leading-relaxed">') }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-row gap-4"
            >
              <AnimatedButton size="lg" asChild>
                <Link href={displayContent.buttonLink} className="group">
                  {displayContent.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimatedButton>
              
        
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section - Horizontal Layout for Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-white border border-gray-200 hover:border-emerald-300 rounded-xl p-6 transition-all duration-700 ease-out group-hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:from-emerald-600 group-hover:to-emerald-700 rounded-lg flex items-center justify-center mb-4 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3">
                {(() => {
                  const IconComponent = value.icon
                  return <IconComponent className="h-6 w-6 text-white transition-all duration-700 ease-out group-hover:scale-110" />
                })()}
              </div>
              
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-500 ease-out">
                {value.title}
              </h3>
              
              <p className="text-gray-600 text-xs sm:text-[15px] leading-relaxed group-hover:text-gray-700 transition-colors duration-500 ease-out">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
