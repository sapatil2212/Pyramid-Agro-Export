import { Hero } from "@/components/hero"
import { AboutPreview } from "@/components/about-preview"
import { ServicesPreview } from "@/components/services-preview"
import { ProductsShowcase } from "@/components/products-showcase"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProductsShowcase />
      <WhyChooseUs />
      <TestimonialsSection />
    </>
  )
}
