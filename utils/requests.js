import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

// Get FAQs
export const getFaqs = () => {
  return client.fetch(`*[_type=="faq"]{question, answer} `)
}

// Get About Info
export const getAbout = () => {
  return client.fetch(
    `*[_type=="about"][0]{firstBackgroundImage,content,secondBackgroundImage}`
  )
}
// Get contact info
export const getContact = () => {
  return client.fetch(
    `*[_type=="contact"][0]{email, callNumber, whatsappNumber, facebookAccount, instagramAccount,address}`
  )
}
// Get team emails
export const getTeamEmails = () => {
  return client.fetch(`*[_type=="team"][0]{emails}`)
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
    `*[_type=="category"&& status && slug.current == $categorySlug][0]{name, subcategories[]->{name, slug}, description, image}`,
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
      _id, name, price, image, category->{name,slug}, slug, 
      'reviews':reviews[]->{
        _id,
        stars
      }      
      }
  `,
    {
      categorySlug,
      pageNumber,
      itemsPerPage: Number(itemsPerPage),
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
    `*[_type == "product" && status && isNewlyStocked]  {
      _id, name, price, image, category->{name,slug}, slug, 
      'reviews':reviews[]->{
        _id,
        stars
      }      
      }
  `
  )
}

// Get product details
export const getProductDetails = (productSlug) => {
  return client.fetch(
    `*[_type=="product" && slug.current == $productSlug][0]{
      _id,
      category->{name, slug}, 
      name,
      description,
      metaDescription,
      slug,
      image,
      price,
      'subcategories':subcategories[]->name
    }`,
    {
      productSlug,
    }
  )
}
// Get Similar products for a specific product
export const getSimilarProducts = (
  categoryName,
  subcategories,
  mainProductId
) => {
  return client.fetch(
    groq`*[_type=="product" && category->name == $categoryName && _id != $mainProductId && count((subcategories[]->name)[@ in $subcategories]) > 0 ][0...9]{
      _id, name, price, image, category->{name,slug}, slug, 
      'reviews':reviews[]->{
        _id,
        stars
      }      
      }`,
    {
      categoryName,
      subcategories,
      mainProductId,
    }
  )
}

// Get All Products
export const getAllProducts = (priceRange) => {
  return client.fetch(
    groq`*[_type=='product' && status]{...,category->{name,slug,description,_id},subcategories[]->{_id, name,status,description}}`
  )
}
// Search Product
// Search Products
export const filterProducts = (
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
    groq`*[_type=="product" && status  ${
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
    }]| order(_id) [(($pageNumber - 1) * $itemsPerPage)...($pageNumber * $itemsPerPage)] {
      _id, name, price, image, category->{name,slug}, slug, 
      'reviews':reviews[]->{
        _id,
        stars
      }      
      }`,
    {
      classificationName,
      subClassifications,
      pageNumber,
      priceRange: price,
      itemsPerPage: Number(itemsPerPage),
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

// Create product review
export const createProductReview = (reviewData, productId) => {
  return client.create({ _type: 'review', ...reviewData }).then(
    (response) =>
      client
        .patch(productId) // Document ID to patch
        .setIfMissing({ reviews: [] }) // Ensure that the `reviews` array exists
        .insert('after', 'reviews[-1]', [
          {
            _type: 'reference',
            _ref: response._id,
            _key: response._id,
          },
        ]) // Add the new review to the end of the array
        .commit() // Perform the patch and return a promise
  )
}
// Get product reviews
export const getProductReviews = (productId) => {
  return client.fetch(
    groq`*[_type=='product' && _id==$productId][0]{
   'reviews':reviews[]->{
      user,
      _id,
      comment,
      replies,
      _createdAt,
      _updatedAt,
      stars
    }
  }`,
    {
      productId,
    }
  )
}

// Reply Product review
export const replyProductReview = (replyData, reviewId) => {
  return client
    .patch(reviewId)
    .setIfMissing({ replies: [] })
    .insert('after', 'replies[-1]', [replyData])
    .commit()
}
