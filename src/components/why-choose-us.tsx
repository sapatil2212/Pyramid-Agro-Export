"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Award, 
  Users, 
  Globe, 
  Clock, 
  Leaf,
  TrendingUp,
  Heart,
  CheckCircle
} from "lucide-react"
import { StatsCounter } from "@/components/ui/stats-counter"
import { Card, CardContent } from "@/components/ui/card"

const advantages = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "ISO 22000 certified processes with rigorous testing at every stage to ensure international quality standards",
    stats: { number: 99.8, suffix: "%", label: "Quality Score" }
  },
  {
    icon: Users,
    title: "Direct Farmer Partnerships",
    description: "Strong relationships with over 1000+ farmers ensuring consistent supply and fair pricing",
    stats: { number: 1000, suffix: "+", label: "Farmer Partners" }
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "15+ years of experience serving 50+ countries with deep understanding of international markets",
    stats: { number: 50, suffix: "+", label: "Countries Served" }
  },
  {
    icon: Clock,
    title: "Reliable Supply Chain",
    description: "Efficient logistics network ensuring timely delivery with 98% on-time performance record",
    stats: { number: 98, suffix: "%", label: "On-Time Delivery" }
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "Committed to eco-friendly farming methods and supporting sustainable agricultural practices",
    stats: { number: 85, suffix: "%", label: "Sustainable Sources" }
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Multiple certifications and awards recognizing our commitment to excellence and innovation",
    stats: { number: 20, suffix: "+", label: "Certifications" }
  }
]

const certifications = [
  {
    name: "ISO 22000",
    description: "Food Safety Management",
    icon: Shield,
    color: "bg-blue-500"
  },
  {
    name: "FSSAI",
    description: "Food Safety & Standards Authority",
    icon: CheckCircle,
    color: "bg-green-500"
  },
  {
    name: "HACCP",
    description: "Hazard Analysis Critical Control Points",
    icon: Award,
    color: "bg-purple-500"
  },
  {
    name: "Organic Certification",
    description: "Certified Organic Products",
    icon: Leaf,
    color: "bg-emerald-500"
  },
  {
    name: "Export License",
    description: "Government Authorized Exporter",
    icon: Globe,
    color: "bg-amber-500"
  },
  {
    name: "Fair Trade",
    description: "Ethical Trading Practices",
    icon: Heart,
    color: "bg-red-500"
  }
]

const keyMetrics = [
  { number: 15, suffix: "+", label: "Years Experience", icon: TrendingUp },
  { number: 25000, suffix: "+", label: "Tons Exported Annually", icon: Award },
  { number: 50, suffix: "+", label: "Countries Reached", icon: Globe },
  { number: 99, suffix: "%", label: "Customer Satisfaction", icon: Heart }
]

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
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
            Why Choose Pyramid Agro Export
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Your Trusted Partner for{" "}
            <span className="text-emerald-600 relative">
              Excellence
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200 -z-10"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover what sets us apart in the agricultural export industry and why global partners 
            trust us for their sourcing needs.
          </motion.p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const IconComponent = metric.icon
                  return <IconComponent className="h-6 w-6 text-white" />
                })()}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <StatsCounter end={metric.number} suffix={metric.suffix} />
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    {(() => {
                      const IconComponent = advantage.icon
                      return <IconComponent className="h-8 w-8 text-white" />
                    })()}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {advantage.description}
                  </p>

                  {/* Stat */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{advantage.stats.label}</span>
                      <div className="text-2xl font-bold text-emerald-600">
                        <StatsCounter 
                          end={advantage.stats.number} 
                          suffix={advantage.stats.suffix} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Compliance
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality is backed by industry-leading certifications and compliance standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-16 h-16 ${cert.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {(() => {
                    const IconComponent = cert.icon
                    return <IconComponent className="h-8 w-8 text-white" />
                  })()}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                  {cert.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              &ldquo;Built on <span className="text-emerald-600">Trust</span>, 
              Delivering <span className="text-amber-600">Excellence</span>, 
              Creating <span className="text-blue-600">Partnerships</span> 
              that Last&rdquo;
            </blockquote>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied customers who trust Pyramid Agro Export 
              for their agricultural sourcing needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
