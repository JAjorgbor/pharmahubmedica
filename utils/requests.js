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
// Get category details
export const getCategoryDetails = (categorySlug) => {
  return client.fetch(
    `*[_type=="category"&& status && slug.current == 'first-category'][0]{name, subcategories[]->{name, slug}}`,
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
// Get subcategories for a given category
export const getSubCategories = (category) => {
  return client.fetch(
    `*[_type=="category" && name == $category && status].subcategories[]->{
    name, status
  }`,
    { category }
  )
}

// Get products for given category
export const getProductsForCategory = (
  categorySlug,
  pageNumber,
  subcategories,
  itemsPerPage,
  priceRange
) => {
  let price
  switch (priceRange) {
    case 'price < 1000':
      price = 'price < 1000'
      break
    case '1000 - 5000':
      price = 'price >= 1000 && price < 5000'
      break
    case 'price > 5000':
      price = 'price > 5000'
      break
    default:
      price = ''
      break
  }
  return client.fetch(
    `*[_type == "product" && status && category->slug.current==$categorySlug  ${
      subcategories?.length > 0
        ? '&& count((subcategories[]->name)[@ in $subcategories]) > 0'
        : ''
    } ${
      price ? `&& ${price}` : ''
    }] | order(_id) [(($pageNumber - 1) * $itemsPerPage)...($pageNumber * $itemsPerPage)] {
      _id, name, price, image, category->{name}      
      }
  `,
    {
      categorySlug,
      pageNumber,
      itemsPerPage,
      subcategories,
      priceRange: price,
    }
  )
}
// Get count of products per category
export const getProductsForCategoryCount = (
  categorySlug,
  subcategories,
  priceRange
) => {
  let price
  switch (priceRange) {
    case 'price < 1000':
      price = 'price < 1000'
      break
    case '1000 - 5000':
      price = 'price >= 1000 && price < 5000'
      break
    case 'price > 5000':
      price = 'price > 5000'
      break
    default:
      price = ''
      break
  }
  return client.fetch(
    `count(*[_type == "product" && status && category->slug.current==$categorySlug  ${
      subcategories?.length > 0
        ? '&& count((subcategories[]->name)[@ in $subcategories]) > 0'
        : ''
    } ${price ? `&& ${price}` : ''}]) 
  `,
    {
      categorySlug,
      subcategories,
      priceRange: price,
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
  classificationName,
  subClassifications,
  pageNumber,
  priceRange,
  itemsPerPage
) => {
  let price
  switch (priceRange) {
    case 'price < 1000':
      price = 'price < 1000'
      break
    case '1000 - 5000':
      price = 'price >= 1000 && price < 5000'
      break
    case 'price > 5000':
      price = 'price > 5000'
      break
    default:
      price = ''
      break
  }
  return client.fetch(
    groq`*[_type=="product" && status && name match $productName ${
      classificationName !== 'all categories'
        ? '&& category->name == $classificationName'
        : ''
    } ${
      subClassifications.length > 0 && classificationName !== 'all categories'
        ? '&& count((subcategories[]->name)[@ in $subClassifications]) > 0'
        : subClassifications.length > 0 &&
          classificationName == 'all categories'
        ? '&& category->name in $subClassifications'
        : ''
    }${
      price ? `&& ${price}` : ''
    }]| order(_id) [(($pageNumber - 1) * $itemsPerPage)...($pageNumber * $itemsPerPage)] {name, price, image, category->{name} }`,
    {
      productName,
      classificationName,
      subClassifications,
      pageNumber,
      priceRange: price,
      itemsPerPage,
    }
  )
}
// Search Products count
export const searchProductsCount = (productName, classificationName) => {
  return client.fetch(
    `count(*[_type=="product" && status && name match $productName ${
      classificationName !== 'all categories'
        ? '&& category->name == $classificationName'
        : ''
    }])`,
    {
      productName,
      classificationName,
    }
  )
}
