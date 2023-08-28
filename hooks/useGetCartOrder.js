import { useContext } from 'react'
import { CartContext } from '@/components/Layout'

export default function () {
  const { cart } = useContext(CartContext)
  return `I would like to place an order for the following items:%0A%0A
${cart.map(
  ({ item, count }, index) =>
    `${index + 1}) *${
      item.name
    }*(quantity:${count}, url:${`https://pharmahubmedica.ng/collections/${item?.category.slug.current}/${item?.slug.current}`}%20)%0A%0A`
)}`
}
