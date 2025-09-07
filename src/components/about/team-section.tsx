"use client"

import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Linkedin, 
  Award, 
  Users,
  TrendingUp,
  Globe,
  Heart
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar Sharma",
    position: "Founder & CEO",
    bio: "With over 20 years in agricultural trade, Rajesh founded Pyramid Agro with a vision to connect Indian farms to global markets. His expertise in international trade and passion for supporting farmers drives our company's mission.",
    expertise: ["International Trade", "Agricultural Markets", "Strategic Planning", "Farmer Relations"],
    email: "rajesh@pyramidagro.com",
    linkedin: "#",
    image: "rajesh-sharma"
  },
  {
    id: 2,
    name: "Priya Patel",
    position: "Head of Quality Assurance",
    bio: "Priya brings 15+ years of experience in food safety and quality management. She ensures that every product meets international standards while maintaining the authentic quality of Indian agriculture.",
    expertise: ["Food Safety", "Quality Management", "ISO Standards", "Product Testing"],
    email: "priya@pyramidagro.com",
    linkedin: "#",
    image: "priya-patel"
  },
  {
    id: 3,
    name: "Arjun Singh",
    position: "Director of Operations",
    bio: "Arjun oversees our global supply chain operations, ensuring efficient logistics and timely delivery. His background in supply chain management has been crucial to our international expansion.",
    expertise: ["Supply Chain", "Logistics", "Operations Management", "Process Optimization"],
    email: "arjun@pyramidagro.com",
    linkedin: "#",
    image: "arjun-singh"
  },
  {
    id: 4,
    name: "Dr. Meera Joshi",
    position: "Head of Farmer Relations",
    bio: "Dr. Joshi leads our farmer partnership programs, working directly with agricultural communities to promote sustainable practices and ensure fair trade. Her PhD in Agricultural Sciences guides our farming initiatives.",
    expertise: ["Agricultural Sciences", "Sustainable Farming", "Community Development", "Training Programs"],
    email: "meera@pyramidagro.com",
    linkedin: "#",
    image: "meera-joshi"
  },
  {
    id: 5,
    name: "Vikram Gupta",
    position: "International Sales Director",
    bio: "Vikram manages our global client relationships and business development. His multilingual skills and cultural understanding have helped us expand to 50+ countries worldwide.",
    expertise: ["International Sales", "Business Development", "Client Relations", "Market Analysis"],
    email: "vikram@pyramidagro.com",
    linkedin: "#",
    image: "vikram-gupta"
  },
  {
    id: 6,
    name: "Kavya Reddy",
    position: "Head of Sustainability",
    bio: "Kavya leads our sustainability initiatives, promoting organic farming practices and environmental responsibility. Her work ensures that our growth is aligned with ecological conservation.",
    expertise: ["Sustainability", "Environmental Science", "Organic Certification", "Green Practices"],
    email: "kavya@pyramidagro.com",
    linkedin: "#",
    image: "kavya-reddy"
  }
]

const departments = [
  {
    icon: Users,
    name: "Farmer Relations",
    count: 15,
    description: "Building strong partnerships with farming communities"
  },
  {
    icon: Award,
    name: "Quality Assurance",
    count: 12,
    description: "Ensuring international quality standards"
  },
  {
    icon: Globe,
    name: "International Trade",
    count: 18,
    description: "Managing global export operations"
  },
  {
    icon: TrendingUp,
    name: "Business Development",
    count: 10,
    description: "Expanding our global market presence"
  }
]

const companyStats = [
  { number: 65, suffix: "+", label: "Team Members" },
  { number: 20, suffix: "+", label: "Years Combined Experience" },
  { number: 15, suffix: "+", label: "Languages Spoken" },
  { number: 50, suffix: "+", label: "Countries Served" }
]

export function TeamSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
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
            <Users className="h-4 w-4 mr-2" />
            Meet Our Team
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            The People Behind Our Success
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our diverse team combines deep agricultural knowledge with international business expertise 
            to deliver exceptional results for our partners worldwide.
          </motion.p>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {companyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {stat.number}{stat.suffix}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Leadership Team */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            Leadership Team
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-8">
                    {/* Member Image Placeholder */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto">
                        <User className="h-12 w-12 text-gray-500" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h4>
                      <p className="text-emerald-600 font-medium mb-4">
                        {member.position}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* Expertise Tags */}
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Expertise</h5>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Links */}
                    <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a
                        href={member.linkedin}
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Departments
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each department plays a crucial role in delivering excellence across our operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const IconComponent = dept.icon
                    return <IconComponent className="h-8 w-8 text-white" />
                  })()}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {dept.name}
                </h4>
                
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  {dept.count}
                </div>
                
                <p className="text-sm text-gray-600">
                  {dept.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Growing Team</h3>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              We&rsquo;re always looking for passionate individuals who share our vision of connecting 
              farms to global markets. Explore career opportunities with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/careers"
                className="inline-flex items-center px-8 py-3 bg-white text-emerald-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                View Open Positions
              </a>
              <a
                href="mailto:careers@pyramidagro.com"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-emerald-700 transition-colors"
              >
                Send Your Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
