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
          { id: "tomatoes", name: "Tomatoes", href: "/products/tomatoes" }
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
  { name: "Contact", href: "/contact", hasDropdown: false }
]
