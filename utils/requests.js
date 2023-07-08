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
  return client.fetch(`*[_type=="category"]`)
}
// Get categories (list)
export const getCategoriesList = () => {
  return client.fetch(`*[_type=="category"]{title, slug}`)
}
// Get featured categories
export const getFeaturedCategories = () => {
  return client.fetch(`*[_type=="category" && isFeaturedCategory]{
    title, image, slug
  }`)
}

// Get products for given category
export const getProductsForCategory = (categorySlug) => {
  return client.fetch(
    `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)]
  `,
    {
      categorySlug,
    }
  )
}

// Get products for given category
export const getProduct = (productSlug) => {
  return client.fetch(`*[_type=="product" && slug.current == $productSlug]`, {
    productSlug,
  })
}
