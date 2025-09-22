import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating hero section with second button...');

  try {
    // Update the hero section to include the second button
    const updatedHero = await prisma.homePageContent.update({
      where: { section: 'hero' },
      data: {
        button2Text: 'Get Quote',
        button2Link: '/contact'
      }
    });

    console.log('✅ Hero section updated successfully!');
    console.log('Updated hero section:', {
      buttonText: updatedHero.buttonText,
      buttonLink: updatedHero.buttonLink,
      button2Text: updatedHero.button2Text,
      button2Link: updatedHero.button2Link
    });
  } catch (error) {
    console.error('❌ Error updating hero section:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
