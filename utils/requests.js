import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

// Get FAQs
export const getFaqs = () => {
  return client.fetch(`*[_type=="faq"]{question, answer} `)
}

// Get About Info
export const getAbout = () => {
  return client.fetch(`*[_type=="about"][0]{content}`)
}

// Get home page hero info
export const getHeroInfo = () => {
  return client.fetch(
    `*[_type=='homepage']{mainHeading, subheading, description, image}[0]`
  )
}

// Get categories
export const getCategories = () => {
  return client.fetch(`*[_type=="category"&& status]{name,image,slug}`)
}
// Get category name
export const getCategoryName = (categorySlug) => {
  return client.fetch(
    `*[_type=="category"&& status && slug.current== $categorySlug][0]{name}`,
    { categorySlug }
  )
}
// Get categories (list)
export const getCategoriesList = () => {
  return client.fetch(`*[_type=="category" && status]{name, slug}`)
}
// Get Top categories
export const getTopCategories = () => {
  return client.fetch(`*[_type=="category" && isTopCategory && status]{
    name, image, slug
  }`)
}

// Get products for given category
export const getProductsForCategory = (
  categorySlug,
  pageNumber,
  itemsPerPage
) => {
  return client.fetch(
    `*[_type == "product" && status && category->slug.current==$categorySlug] | order(_id) [(($pageNumber - 1) * $itemsPerPage)...($pageNumber * $itemsPerPage)] {
      _id, name, price, image, category->{name}      
      }
  `,
    {
      categorySlug,
      pageNumber,
      itemsPerPage,
    }
  )
}
// Get count of products per category
export const getProductsForCategoryCount = (categorySlug) => {
  return client.fetch(
    `count(*[_type == "product" && status && category->slug.current==$categorySlug])`,
    {
      categorySlug,
    }
  )
}
// Get newly stocked products
export const getNewlyStockedProducts = () => {
  return client.fetch(
    `*[_type == "product" && status] | order(_createdAt desc) [0..9] {name, price, image, category->{name}, subcategories }
  `
  )
}

// Get product details
export const getProductDetails = (productSlug) => {
  return client.fetch(`*[_type=="product" && slug.current == $productSlug]`, {
    productSlug,
  })
}

// Search Products
export const searchProducts = (
  productName,
  categoryName,
  pageNumber,
  itemsPerPage
) => {
  return client.fetch(
    `*[_type=="product" && status && name match $productName ${
      categoryName !== 'all categories'
        ? '&& category->name == $categoryName'
        : ''
    }]| order(_id) [(($pageNumber - 1) * $itemsPerPage)...($pageNumber * $itemsPerPage)] {name, price, image, category->{name} }`,
    {
      productName,
      categoryName,
      pageNumber,
      itemsPerPage,
    }
  )
}
// Search Products count
export const searchProductsCount = (productName, categoryName) => {
  return client.fetch(
    `count(*[_type=="product" && status && name match $productName ${
      categoryName !== 'all categories'
        ? '&& category->name == $categoryName'
        : ''
    }])`,
    {
      productName,
      categoryName,
    }
  )
}
