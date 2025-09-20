import { Hero } from "@/components/hero"
import { AboutPreview } from "@/components/about-preview"
import { ServicesPreview } from "@/components/services-preview"
import { ProductsPreview } from "@/components/products-preview"
import { InteractiveGallery } from "@/components/interactive-gallery"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ExportProcessSection } from "@/components/export-process-section"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProductsPreview />
      <ExportProcessSection />
      <ServicesPreview />
     
      <InteractiveGallery />
     
      <TestimonialsSection />
    </>
  )
}
