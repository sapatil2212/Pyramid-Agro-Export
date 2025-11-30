import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultServices = [
  {
    title: "Quality Assurance",
    description: "Comprehensive testing and certification to meet international food safety standards",
    icon: "shield",
    color: "from-emerald-500 to-emerald-600",
    features: JSON.stringify([
      "ISO 22000 Certified Processes",
      "Third-party Laboratory Testing",
      "Traceability Documentation",
      "Quality Control at Every Stage"
    ]),
    order: 0,
    isActive: true
  },
  {
    title: "Sustainable Sourcing",
    description: "Direct partnerships with farmers ensuring ethical practices and premium quality",
    icon: "users",
    color: "from-amber-500 to-amber-600",
    features: JSON.stringify([
      "Fair Trade Practices",
      "Sustainable Farming Support",
      "Direct Farmer Relationships",
      "Organic Certification Support"
    ]),
    order: 1,
    isActive: true
  },
  {
    title: "Global Reach",
    description: "Extensive network covering 50+ countries with reliable supply chain management",
    icon: "globe",
    color: "from-blue-500 to-blue-600",
    features: JSON.stringify([
      "Worldwide Distribution",
      "Multi-language Support",
      "Currency Flexibility",
      "Local Market Expertise"
    ]),
    order: 2,
    isActive: true
  },
  {
    title: "Export Documentation",
    description: "Complete documentation support for hassle-free international trade",
    icon: "file-check",
    color: "from-purple-500 to-purple-600",
    features: JSON.stringify([
      "Export-Import Documentation",
      "Customs Clearance Support",
      "Phytosanitary Certificates",
      "Insurance & Logistics"
    ]),
    order: 3,
    isActive: true
  },
  {
    title: "Logistics & Shipping",
    description: "End-to-end logistics solutions ensuring timely and safe delivery worldwide",
    icon: "truck",
    color: "from-red-500 to-red-600",
    features: JSON.stringify([
      "Temperature-controlled Transport",
      "Real-time Tracking",
      "Multiple Shipping Options",
      "Warehousing Solutions"
    ]),
    order: 4,
    isActive: true
  },
  {
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance to address all your queries and concerns",
    icon: "clock",
    color: "from-indigo-500 to-indigo-600",
    features: JSON.stringify([
      "Dedicated Account Managers",
      "Multi-channel Support",
      "Quick Response Time",
      "Technical Assistance"
    ]),
    order: 5,
    isActive: true
  }
]

async function seedServices() {
  try {
    console.log('Seeding services...')

    // First, add the services section to HomePageContent if it doesn't exist
    const existingSection = await prisma.homePageContent.findUnique({
      where: { section: 'services' }
    })

    if (!existingSection) {
      await prisma.homePageContent.create({
        data: {
          section: 'services',
          title: 'Our Core Services',
          subtitle: 'Comprehensive Export Solutions',
          description: 'From farm to your doorstep, we provide end-to-end services that ensure quality, compliance, and reliable delivery of premium agricultural products.',
          isActive: true
        }
      })
      console.log('Created services section in HomePageContent')
    }

    // Check if services already exist
    const existingServices = await prisma.service.count()
    
    if (existingServices === 0) {
      // Create default services
      for (const service of defaultServices) {
        await prisma.service.create({
          data: service
        })
      }
      console.log(`Created ${defaultServices.length} default services`)
    } else {
      console.log(`Services already exist (${existingServices} found), skipping seed`)
    }

    console.log('Services seeding completed!')
  } catch (error) {
    console.error('Error seeding services:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedServices()
