export interface IProduct {
  image: Image
  _id: string
  name: string
  category: Category
  subcategory: Subcategory
  price: number
  description: string
  visible: boolean
  inStock: boolean
  slug: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

interface Category {
  image: Image
  _id: string
  name: string
  description: string
  visible: boolean
  subcategories: string[]
  slug: string
  createdAt: Date
  updatedAt: Date
  __v: number
  id: string
}

interface Image {
  key: string
  url: string
}

interface Subcategory {
  _id: string
  name: string
  category: string
  slug: string
  __v: number
  createdAt: Date
  updatedAt: Date
}
export interface IProductStats {
  total: number
  visible: number
  invisible: number
  instock: number
  outofstock: number
  totalInventoryUnitCost: number
}
