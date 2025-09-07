export interface Product {
  id: string
  name: string
  category: string
  description: string
  image: string
  specifications: { [key: string]: string }
  origin: string
  seasons: string[]
  minOrderQuantity: string
  packaging: string[]
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  image: string
  products: Product[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
  expertise: string[]
}

export interface Testimonial {
  id: string
  content: string
  author: string
  company: string
  position: string
  rating: number
  image?: string
}

export interface OfficeLocation {
  id: string
  name: string
  address: string
  phone: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  country: string
  productInterest: string[]
  message: string
  quantity?: string
  budget?: string
}

export interface Certification {
  id: string
  name: string
  description: string
  image: string
  issuer: string
  validUntil?: string
}
