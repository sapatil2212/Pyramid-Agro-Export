import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultContactInfo = {
  phone: "+91 91300 70701",
  whatsapp: "+91 91300 70701",
  email: "pyramidagroexports@gmail.com",
  address: "Office, Ground Floor, Shree Hari Plaza, Abhang Nagar, New Adgaon Naka, Panchavati, Nashik, Maharashtra 422003",
  city: "Nashik",
  mapUrl: "https://maps.app.goo.gl/41wjFQCukoUpB9m29?g_st=ipc",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: ""
};

async function seedSiteSettings() {
  console.log("Seeding site settings...");

  // Seed default logos (using existing public images)
  const logoSettings = [
    {
      key: "navbar_logo",
      value: "/Logo_v1.png",
      type: "image",
      description: "Navbar logo displayed in the main navigation"
    },
    {
      key: "footer_logo",
      value: "/Logo_v1.png",
      type: "image",
      description: "Footer logo displayed on desktop"
    },
    {
      key: "footer_logo_mobile",
      value: "/Logo_v2.png",
      type: "image",
      description: "Footer logo displayed on mobile"
    },
    {
      key: "contact_info",
      value: JSON.stringify(defaultContactInfo),
      type: "json",
      description: "Contact information for footer and contact page"
    }
  ];

  for (const setting of logoSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value,
        type: setting.type,
        description: setting.description
      },
      create: {
        key: setting.key,
        value: setting.value,
        type: setting.type,
        description: setting.description
      }
    });
    console.log(`  ✓ Seeded: ${setting.key}`);
  }

  console.log("Site settings seeded successfully!");
}

seedSiteSettings()
  .catch((e) => {
    console.error("Error seeding site settings:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
