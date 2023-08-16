import blockContent from './schemas/blockContent'
import category from './schemas/category'
import homepage from './schemas/homepage'
import subcategory from './schemas/subcategory'
import product from './schemas/product'
import faq from './schemas/faq'
import contact from './schemas/contact'
import about from './schemas/about'
import productTag from './schemas/productTag'
import review from './schemas/review'

export const schema = {
  types: [
    homepage,
    category,
    product,
    subcategory,
    productTag,
    about,
    contact,
    faq,
    review,
    blockContent,
  ],
}
