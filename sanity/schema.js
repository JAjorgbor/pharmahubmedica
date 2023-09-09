import about from './schemas/about'
import blockContent from './schemas/blockContent'
import category from './schemas/category'
import contact from './schemas/contact'
import faq from './schemas/faq'
import homepage from './schemas/homepage'
import product from './schemas/product'
import review from './schemas/review'
import subcategory from './schemas/subcategory'
import team from './schemas/team'

export const schema = {
  types: [
    homepage,
    category,
    product,
    subcategory,
    about,
    contact,
    faq,
    team,
    review,
    blockContent,
  ],
}
