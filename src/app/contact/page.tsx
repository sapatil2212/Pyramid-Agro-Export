"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Send,
  MessageCircle,
  Award,
} from "lucide-react"
import { useAppointmentModal } from "@/components/appointment-modal-provider"
import { useState } from "react"

// Contact form component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    productInterest: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
      productInterest: ""
    })
    setIsSubmitting(false)
    
    // Show success message (you can implement a toast notification here)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Card className="p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Your company name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-2">
            Product Interest
          </label>
          <select
            id="productInterest"
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select product category</option>
            <option value="fruits">Fresh Fruits</option>
            <option value="vegetables">Fresh Vegetables</option>
            <option value="grains">Grains & Spices</option>
            <option value="all">All Products</option>
            <option value="custom">Custom Requirements</option>
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="What is this about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Tell us about your requirements..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </div>
          )}
        </Button>
      </form>
    </Card>
  )
}

// Contact info component
function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "Office, Ground Floor, Shree Hari Plaza",
        "Abhang Nagar, New Adgaon Naka",
        "Panchavati, Nashik",
        "Maharashtra, India 422003"
      ],
      action: "Get Directions",
      actionLink: "https://maps.app.goo.gl/41wjFQCukoUpB9m29?g_st=ipc"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+91 91300 70701",
        "+91 91300 70702"
      ],
      action: "Call Now",
      actionLink: "tel:+919130070701"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [
        "info@pyramidagroexports.com",
        "sales@pyramidagroexports.com"
      ],
      action: "Send Email",
      actionLink: "mailto:info@pyramidagroexports.com"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed"
      ],
      action: null,
      actionLink: null
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
        <p className="text-gray-600 leading-relaxed mb-8">
          Ready to start your agricultural export journey? Contact us today for personalized service and competitive quotes.
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                  {item.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                      onClick={() => window.open(item.actionLink, "_blank")}
                    >
                      {item.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Quick contact options
function QuickContact() {
  const { openModal } = useAppointmentModal()

  const quickOptions = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat with us instantly",
      action: () => {
        const message = "Hello! I would like to know more about Pyramid Agro Exports products and services."
        const url = `https://wa.me/919130070701?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
      },
      color: "green"
    },
    {
      icon: Phone,
      title: "Call Now",
      description: "Speak with our experts",
      action: () => window.open("tel:+919130070701", "_self"),
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your requirements",
      action: () => window.open("mailto:info@pyramidagroexports.com", "_self"),
      color: "purple"
    },
    {
      icon: Award,
      title: "Get Quote",
      description: "Request a custom quote",
      action: openModal,
      color: "emerald"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quick Contact Options
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your preferred way to get in touch with us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={option.action}
              >
                <div className={`w-16 h-16 bg-${option.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${option.color}-200 transition-colors`}>
                  <option.icon className={`h-8 w-8 text-${option.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {option.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Ready to start your agricultural export journey? Get in touch with our team of experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
              >
                Contact Info
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>

            <motion.div
              id="contact-info"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <QuickContact />

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Located in the heart of Nashik, Maharashtra - the agricultural hub of India
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Map
              </h3>
              <p className="text-gray-600 mb-4">
                Office, Ground Floor, Shree Hari Plaza<br />
                Abhang Nagar, New Adgaon Naka, Panchavati<br />
                Nashik, Maharashtra, India 422003
              </p>
              <Button
                onClick={() => window.open("https://maps.app.goo.gl/41wjFQCukoUpB9m29?g_st=ipc", "_blank")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Open in Maps
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto px-4 sm:px-8 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Pyramid Agro Exports for their agricultural needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3"
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("tel:+919130070701", "_self")}
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3"
              >
                Call Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
