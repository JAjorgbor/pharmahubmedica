export interface ICategory {
  image: Image
  _id: string
  name: string
  description: string
  visible: boolean
  subcategories: Subcategory[]
  slug: string
  productsCount: number
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface Image {
  url: string
  key: string
}

export interface Subcategory {
  _id: string
  name: string
  category: string
  slug: string
  __v: number
  createdAt: Date
  updatedAt: Date
}
