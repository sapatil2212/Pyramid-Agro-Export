export const COMPANY_INFO = {
  name: "Pyramid Agro Exports",
  tagline: "Delivering Nature's Best",
  phones: ["91300 70701", "91300 70701"],
  email: "info@pyramidagroexports.com",
  address: "Office, Ground Floor, Shree Hari Plaza, Abhang Nagar, New Adgaon Naka, Panchavati, Nashik, Maharashtra, India 422003",
  googleMapsUrl: "https://maps.app.goo.gl/41wjFQCukoUpB9m29?g_st=ipc",
  whatsapp: "91300 70701"
}

export const COMPANY_DETAILS = {
  name: "Pyramid Agro Exports",
  description: "Your Trusted Partner in Agricultural Exports",
  experience: "Decades of Expertise",
  specializations: ["Fresh Fruits", "Fresh Vegetables", "Grains", "Spices"]
}

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { 
    name: "About Us", 
    href: "/about",
    hasDropdown: false
  },
  { 
    name: "Our Products", 
    href: "/products",
    hasDropdown: true,
    dropdownItems: [
      {
        id: "fresh-fruits",
        name: "Fresh Fruits",
        description: "Premium quality fresh fruits from Indian farms",
        hasSubDropdown: true,
        subItems: [
          { id: "pomegranates", name: "Pomegranates", href: "/products/pomegranates" },
          { id: "guava", name: "Guava", href: "/products/guava" },
          { id: "fresh-grapes", name: "Fresh Grapes", href: "/products/grapes" },
          { id: "banana", name: "Banana", href: "/products/banana" }
        ]
      },
      {
        id: "fresh-vegetables",
        name: "Fresh Vegetables",
        description: "Farm-fresh vegetables with international standards",
        hasSubDropdown: true,
        subItems: [
          { id: "green-chillis", name: "Green Chillis", href: "/products/green-chillis" },
          { id: "onions", name: "Onions", href: "/products/onions" },
          { id: "potatoes", name: "Potatoes", href: "/products/potatoes" },
          { id: "tomatoes", name: "Tomatoes", href: "/products/tomatoes" },
          { id: "garlics", name: "Garlics", href: "/products/garlics" }
        ]
      },
      {
        id: "grains-spices",
        name: "Grains & Spices",
        description: "Premium grains and authentic Indian spices",
        hasSubDropdown: true,
        subItems: [
          { id: "dry-turmeric", name: "Dry Turmeric", href: "/products/dry-turmeric" },
          { id: "rice", name: "Rice", href: "/products/rice" }
        ]
      }
    ]
  },
  { 
    name: "Services", 
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      {
        id: "quality-assurance",
        name: "Quality Assurance",
        description: "Rigorous quality checks and international standards",
        href: "/services#quality",
        hasSubDropdown: false
      },
      {
        id: "sustainable-sourcing",
        name: "Sustainable Sourcing",
        description: "Partnering with local farmers for sustainable practices",
        href: "/services#sourcing",
        hasSubDropdown: false
      },
      {
        id: "global-logistics",
        name: "Global Logistics",
        description: "Efficient supply chain for timely delivery worldwide",
        href: "/services#logistics",
        hasSubDropdown: false
      },
      {
        id: "custom-solutions",
        name: "Custom Solutions",
        description: "Tailored solutions to meet your specific needs",
        href: "/services#custom",
        hasSubDropdown: false
      }
    ]
  },
  { 
    name: "Testimonials", 
    href: "/testimonials",
    hasDropdown: false
  },
  { name: "Contact", href: "/contact", hasDropdown: false }
]
