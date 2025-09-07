"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users, Target, Heart, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { StatsCounter } from "@/components/ui/stats-counter"
import Link from "next/link"

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

const keyStats = [
  { number: 15, suffix: "+", label: "Years of Excellence" },
  { number: 50, suffix: "+", label: "Global Partners" },
  { number: 1000, suffix: "+", label: "Trusted Farmers" },
  { number: 99, suffix: "%", label: "Customer Satisfaction" }
]

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
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
              About Pyramid Agro Export
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Bridging{" "}
              <span className="text-emerald-600 relative">
                Tradition
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200 -z-10"
                />
              </span>{" "}
              with Innovation
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              With decades of expertise in agricultural exports, Pyramid Agro Exports has been 
              a trusted name in the export of premium-quality fresh fruits and vegetables. 
              We take pride in delivering the finest agricultural produce to customers worldwide 
              from our base in Nashik, Maharashtra.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Our commitment extends beyond business – we work closely with local farmers, 
              promoting sustainable farming practices and ensuring that every product 
              undergoes rigorous quality checks to meet the highest international standards 
              for freshness and nutrition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <AnimatedButton size="lg" asChild>
                <Link href="/about" className="group">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimatedButton>
              
              <AnimatedButton variant="outline" size="lg" asChild>
                <Link href="/contact">Start Partnership</Link>
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {keyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    <StatsCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  {(() => {
                    const IconComponent = value.icon
                    return <IconComponent className="h-6 w-6 text-white" />
                  })()}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <blockquote className="text-xl text-gray-600 italic leading-relaxed border-l-4 border-emerald-500 pl-6">
              "To be the bridge that connects India's agricultural excellence with the world, 
              fostering sustainable farming practices while delivering uncompromising quality 
              that our global partners can trust."
            </blockquote>
            <cite className="text-emerald-600 font-medium mt-4 block">
              — Pyramid Agro Export Leadership Team
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
