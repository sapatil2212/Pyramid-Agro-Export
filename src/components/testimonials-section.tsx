"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Quote, Star, ArrowLeft, ArrowRight, Building, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    content: "Pyramid Agro Exports has been our trusted partner for fresh produce sourcing. Their premium quality grapes and consistent supply chain have helped us maintain excellent customer satisfaction in our retail network.",
    author: "Sarah Johnson",
    company: "Global Fresh Distributors",
    position: "Head of Procurement",
    location: "London, UK",
    rating: 5,
    image: "sarah-johnson"
  },
  {
    id: 2,
    content: "The fresh onions and green chillies we receive from Pyramid Agro Exports are of exceptional quality. Their careful handling and packaging ensure our customers receive produce that meets the highest standards.",
    author: "Ahmed Al-Rashid",
    company: "Middle East Fresh Imports",
    position: "Managing Director",
    location: "Dubai, UAE",
    rating: 5,
    image: "ahmed-rashid"
  },
  {
    id: 3,
    content: "Working with Pyramid Agro Export has transformed our supply chain efficiency. Their expertise in export documentation and logistics has saved us significant time and costs while ensuring compliance.",
    author: "Maria Santos",
    company: "Iberian Imports",
    position: "Supply Chain Manager",
    location: "Madrid, Spain",
    rating: 5,
    image: "maria-santos"
  },
  {
    id: 4,
    content: "As a specialty food retailer, quality is paramount. Pyramid Agro consistently delivers premium pulses that meet our strict standards. Their traceability system gives us complete confidence in the products.",
    author: "Hiroshi Tanaka",
    company: "Asian Specialty Foods",
    position: "Quality Director",
    location: "Tokyo, Japan",
    rating: 5,
    image: "hiroshi-tanaka"
  },
  {
    id: 5,
    content: "The partnership with Pyramid Agro has been instrumental in our growth. Their understanding of international markets and ability to source specific varieties has opened new opportunities for our business.",
    author: "Lisa Chen",
    company: "Pacific Rim Trading",
    position: "Business Development Head",
    location: "Singapore",
    rating: 5,
    image: "lisa-chen"
  }
]

const clientLogos = [
  { name: "Global Food Distributors", logo: "gfd-logo" },
  { name: "Middle East Trading Co.", logo: "metc-logo" },
  { name: "Iberian Imports", logo: "ii-logo" },
  { name: "Asian Specialty Foods", logo: "asf-logo" },
  { name: "Pacific Rim Trading", logo: "prt-logo" },
  { name: "European Organics", logo: "eo-logo" },
  { name: "Americas Food Group", logo: "afg-logo" },
  { name: "Australian Traders", logo: "at-logo" }
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
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
            <Quote className="h-4 w-4 mr-2" />
            Client Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            What Our Partners Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Hear from our global partners about their experience working with 
            Pyramid Agro Export and how we've helped grow their businesses.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-16">
              <div className="relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Quote className="h-8 w-8 text-white" />
                </div>

                {/* Testimonial Content */}
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center pt-8"
                >
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Author Image Placeholder */}
                    <div className="flex justify-center md:justify-end">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                        <Building className="h-10 w-10 text-gray-500" />
                      </div>
                    </div>

                    {/* Author Details */}
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">
                        {testimonials[currentTestimonial].author}
                      </h4>
                      <p className="text-emerald-600 font-medium mb-1">
                        {testimonials[currentTestimonial].position}
                      </p>
                      <p className="text-gray-600 mb-2">
                        {testimonials[currentTestimonial].company}
                      </p>
                      <div className="flex items-center justify-center md:justify-start space-x-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{testimonials[currentTestimonial].location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full bg-white shadow-lg hover:shadow-xl"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full bg-white shadow-lg hover:shadow-xl"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? 'bg-emerald-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Trusted by Leading Companies Worldwide
          </h3>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center justify-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border border-gray-200 group-hover:shadow-lg transition-all duration-200">
                  <Building className="h-8 w-8 text-gray-400 group-hover:text-gray-600" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-600 mt-8 max-w-2xl mx-auto"
          >
            Join our growing network of satisfied partners across 50+ countries who rely on 
            our expertise for their agricultural sourcing needs.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
