import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultSteps = [
  { step: "01", title: "Consultation", description: "Understanding your specific requirements and market needs", icon: "message-circle", color: "emerald", order: 0 },
  { step: "02", title: "Sourcing", description: "Identifying and selecting the best quality products from trusted farmers", icon: "search", color: "blue", order: 1 },
  { step: "03", title: "Quality Testing", description: "Rigorous testing and certification to ensure international standards", icon: "test-tube", color: "purple", order: 2 },
  { step: "04", title: "Documentation", description: "Complete export documentation and regulatory compliance", icon: "file-text", color: "amber", order: 3 },
  { step: "05", title: "Logistics", description: "Efficient packaging, shipping, and delivery to your destination", icon: "package", color: "rose", order: 4 }
]

async function seedExportProcess() {
  try {
    console.log('Seeding export process...')

    // Add export-process section to HomePageContent
    const existingSection = await prisma.homePageContent.findUnique({
      where: { section: 'export-process' }
    })

    if (!existingSection) {
      await prisma.homePageContent.create({
        data: {
          section: 'export-process',
          title: 'Our Export Process',
          subtitle: 'A streamlined 5-step process',
          description: 'A streamlined 5-step process ensuring quality and efficiency from consultation to delivery',
          isActive: true
        }
      })
      console.log('Created export-process section in HomePageContent')
    }

    // Check if steps already exist
    const existingSteps = await prisma.exportProcess.count()
    
    if (existingSteps === 0) {
      for (const step of defaultSteps) {
        await prisma.exportProcess.create({ data: { ...step, isActive: true } })
      }
      console.log(`Created ${defaultSteps.length} default export process steps`)
    } else {
      console.log(`Export process steps already exist (${existingSteps} found), skipping seed`)
    }

    console.log('Export process seeding completed!')
  } catch (error) {
    console.error('Error seeding export process:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedExportProcess()
