"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, TrendingUp, Handshake, Award } from "lucide-react"
import { StatsCounter } from "@/components/ui/stats-counter"

const timeline = [
  {
    year: 2009,
    title: "Company Founded",
    description: "Started with a vision to connect Indian agricultural excellence with global markets",
    icon: Calendar
  },
  {
    year: 2012,
    title: "First International Export",
    description: "Successfully exported our first shipment of premium basmati rice to the Middle East",
    icon: MapPin
  },
  {
    year: 2015,
    title: "ISO 22000 Certification",
    description: "Achieved international food safety management certification, reinforcing our quality commitment",
    icon: Award
  },
  {
    year: 2018,
    title: "1000+ Farmer Network",
    description: "Built strong partnerships with over 1000 farmers across India's agricultural regions",
    icon: Users
  },
  {
    year: 2021,
    title: "50 Countries Milestone",
    description: "Expanded our reach to serve clients across 50+ countries worldwide",
    icon: TrendingUp
  },
  {
    year: 2024,
    title: "Sustainable Future",
    description: "Leading initiatives in sustainable farming and organic product certification",
    icon: Handshake
  }
]

const foundingPrinciples = [
  {
    title: "Quality First",
    description: "Never compromise on the quality of products we source and deliver"
  },
  {
    title: "Farmer Partnership",
    description: "Build lasting relationships that benefit both farmers and global partners"
  },
  {
    title: "Sustainable Growth",
    description: "Promote eco-friendly practices that protect our environment for future generations"
  },
  {
    title: "Global Excellence",
    description: "Maintain international standards while preserving the authentic taste of Indian agriculture"
  }
]

const keyMetrics = [
  { number: 15, suffix: "+", label: "Years of Excellence" },
  { number: 25000, suffix: "+", label: "Tons Exported" },
  { number: 50, suffix: "+", label: "Global Partners" },
  { number: 1000, suffix: "+", label: "Trusted Farmers" }
]

export function CompanyStory() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-emerald-50 to-white">
      <div className="container mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Our Journey Since 2009
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Building Bridges Between{" "}
            <span className="text-emerald-600 relative">
              Farms
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-2 left-0 right-0 h-4 bg-emerald-200 -z-10"
              />
            </span>{" "}
            and{" "}
            <span className="text-amber-600 relative">
              Markets
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-2 left-0 right-0 h-4 bg-amber-200 -z-10"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Pyramid Agro Export was born from a simple yet powerful vision: to showcase 
            India's agricultural heritage to the world while supporting the farmers who 
            cultivate these exceptional products with unwavering dedication.
          </motion.p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-2">
                <StatsCounter end={metric.number} suffix={metric.suffix} />
              </div>
              <p className="text-gray-600 font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Founded in 2009 by a team of agricultural enthusiasts and export professionals, 
                Pyramid Agro Export began as a small venture with big dreams. We recognized 
                the immense potential of India's diverse agricultural landscape and the growing 
                global demand for authentic, high-quality products.
              </p>
              <p>
                What started as a mission to export premium basmati rice has evolved into a 
                comprehensive agricultural export business covering cereals, spices, pulses, 
                oil seeds, and fresh produce. Our growth has been guided by three core principles: 
                unwavering quality standards, fair partnerships with farmers, and exceptional 
                service to our global clients.
              </p>
              <p>
                Today, we proudly serve over 50 countries while maintaining direct relationships 
                with more than 1000 farmers across India. Every product that bears our name 
                represents not just agricultural excellence, but also the dreams and hard work 
                of farming families who trust us to bring their harvest to the world.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400 rounded-2xl flex items-center justify-center shadow-2xl">
              <div className="text-center text-emerald-700 p-8">
                <Users className="h-24 w-24 mx-auto mb-4" />
                <p className="text-lg font-medium">Our Founding Team</p>
                <p className="text-sm opacity-80 mt-2">Image showcasing founders and early team members</p>
              </div>
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-gray-200"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Founding Vision</h4>
              <p className="text-sm text-gray-600">
                "To be the most trusted bridge connecting India's agricultural heritage with global opportunities"
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Milestones of Growth
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key moments that shaped our journey from a small export venture to a trusted global partner
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400" />

            <div className="space-y-16">
              {timeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          {(() => {
                            const IconComponent = event.icon
                            return <IconComponent className="h-6 w-6 text-white" />
                          })()}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-emerald-600">{event.year}</div>
                          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg" />

                  <div className="lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Founding Principles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Founding Principles</h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
              The core values that have guided our journey and continue to shape our decisions every day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {foundingPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-white rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-emerald-100">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
