"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Heart, 
  Handshake, 
  Globe, 
  Leaf, 
  Users,
  Award,
  TrendingUp
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const coreValues = [
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description: "We maintain the highest standards in every aspect of our operations, from sourcing to delivery",
    details: [
      "Rigorous quality testing at every stage",
      "International certification compliance",
      "Continuous improvement processes",
      "Zero tolerance for substandard products"
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Heart,
    title: "Ethical Business Practices",
    description: "Our business is built on trust, transparency, and fair treatment of all stakeholders",
    details: [
      "Fair pricing for farmers",
      "Transparent business dealings",
      "Ethical sourcing practices",
      "Honest communication with clients"
    ],
    color: "from-red-500 to-red-600"
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    description: "We are committed to sustainable practices that protect our planet for future generations",
    details: [
      "Promoting organic farming methods",
      "Reducing carbon footprint",
      "Sustainable packaging solutions",
      "Supporting eco-friendly initiatives"
    ],
    color: "from-green-500 to-green-600"
  },
  {
    icon: Users,
    title: "Community Development",
    description: "We believe in empowering farming communities and contributing to rural development",
    details: [
      "Supporting farmer education programs",
      "Providing agricultural training",
      "Community infrastructure development",
      "Healthcare initiatives for farmers"
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Handshake,
    title: "Partnership Excellence",
    description: "We build long-term relationships based on mutual respect and shared success",
    details: [
      "Collaborative approach with partners",
      "Regular communication and feedback",
      "Flexible business solutions",
      "Commitment to mutual growth"
    ],
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "We think globally while acting locally, connecting cultures through agricultural trade",
    details: [
      "Understanding diverse market needs",
      "Cultural sensitivity in business",
      "International quality standards",
      "Global supply chain expertise"
    ],
    color: "from-indigo-500 to-indigo-600"
  }
]

const sustainabilityCommitments = [
  {
    icon: Leaf,
    title: "Organic Farming Support",
    description: "Promoting chemical-free farming practices",
    impact: "85% of our farmers use organic methods"
  },
  {
    icon: Users,
    title: "Farmer Welfare Programs",
    description: "Supporting agricultural communities",
    impact: "1000+ farmers benefited from our programs"
  },
  {
    icon: Shield,
    title: "Food Safety Standards",
    description: "Maintaining highest food safety protocols",
    impact: "100% compliance with international standards"
  },
  {
    icon: TrendingUp,
    title: "Economic Growth",
    description: "Contributing to rural economic development",
    impact: "25% average income increase for partner farmers"
  }
]

export function Values() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
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
            <Heart className="h-4 w-4 mr-2" />
            Our Core Values
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Values That Define Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our values are not just words on a wall – they are the foundation of every decision we make 
            and every relationship we build in our journey to connect farms with global markets.
          </motion.p>
        </motion.div>

        {/* Core Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                    {(() => {
                      const IconComponent = value.icon
                      return <IconComponent className="h-8 w-8 text-white" />
                    })()}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {value.description}
                  </p>

                  <ul className="space-y-2">
                    {value.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sustainability Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Sustainability Commitments
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe that sustainable business practices are essential for long-term success 
              and the well-being of our planet and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityCommitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const IconComponent = commitment.icon
                    return <IconComponent className="h-8 w-8 text-white" />
                  })()}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {commitment.title}
                </h4>
                
                <p className="text-gray-600 mb-3 text-sm">
                  {commitment.description}
                </p>

                <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {commitment.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 lg:p-10 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              
              <p className="text-lg text-emerald-100 leading-relaxed">
                To be the most trusted bridge connecting India&rsquo;s agricultural heritage with global 
                opportunities, while empowering farming communities and promoting sustainable 
                practices that benefit both people and planet.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 lg:p-10 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              
              <p className="text-lg text-amber-100 leading-relaxed">
                To create a world where premium Indian agricultural products are accessible 
                to every corner of the globe, while ensuring that the farmers who grow them 
                prosper and thrive through fair and sustainable partnerships.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
