export interface IApp {
  _id: string
  name: string
  address: string
  phoneNumber: string
  whatsAppNumber: string
  email: string
  status: {
    portal: 'online' | 'offline' | 'waitlist'
  }
  slug: string
  description?: string
  ratings?: number
  images: string[]
  branding: {
    logo?: string
    logoLight?: string
    logomark?: string
    logomarkLight?: string
  }
  createdAt: string
  updatedAt: string
}
