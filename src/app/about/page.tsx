import { Metadata } from "next"
import { CompanyStory } from "@/components/about/company-story"
import { Values } from "@/components/about/values"
import { TeamSection } from "@/components/about/team-section"
import { CertificationsSection } from "@/components/about/certifications-section"

export const metadata: Metadata = {
  title: "About Us - Pyramid Agro Export | Premium Agricultural Exports",
  description: "Learn about Pyramid Agro Export's 15+ years journey in connecting Indian farms to global markets. Discover our values, team, and commitment to quality.",
  keywords: ["about pyramid agro", "agricultural export company", "indian farm exports", "company history", "export team"],
}

export default function AboutPage() {
  return (
    <>
      <CompanyStory />
      <Values />
      <TeamSection />
      <CertificationsSection />
    </>
  )
}
