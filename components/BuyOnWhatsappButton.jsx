import useGetContactInfo from '@/hooks/useGetContactInfo'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Button } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from './Layout'
import Link from 'next/link'

const BuyOnWhatsappButton = ({
  endIconProps,
  orderFromCart = false,
  fullWidth = false,
  checkoutString = '',
  product,
  text = 'Buy on Whatsapp',
  ...props
}) => {
  const [hostUrl, setHostUrl] = useState('')
  useEffect(() => {
    setHostUrl(window?.location?.origin)
  }, [])

  const { contactInfo } = useGetContactInfo()
  const { cart } = useContext(CartContext)
  const itemInCart = cart?.find(({ item }) => item?._id === product?._id)

  const item = itemInCart ? itemInCart.item : product
  const count = itemInCart?.count

  const orderFromCartString = `whatsapp://send?phone=${contactInfo?.whatsappNumber}&text=${checkoutString}`
  const singleOrderString = `whatsapp://send?phone=${
    contactInfo?.whatsappNumber
  }&text=${`I would like to place an order for *${item?.name}*(quantity: ${
    count ?? 1
  }, url: ${`${hostUrl}/${item?.category.slug.current}/${item?.slug.current}`}%20)`}`
  return (
    <>
      <Link
        target="_blank"
        href={orderFromCart ? orderFromCartString : singleOrderString}
        style={{ width: fullWidth && '100%' }}
      >
        <Button
          endIcon={<WhatsAppIcon {...endIconProps} />}
          color="success"
          variant="contained"
          fullWidth={fullWidth}
          {...props}
        >
          {text}
        </Button>
      </Link>
    </>
  )
}
export default BuyOnWhatsappButton
