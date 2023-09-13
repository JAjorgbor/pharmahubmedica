import useGetContactInfo from '@/hooks/useGetContactInfo'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Button } from '@mui/material'
import { useState, useEffect,useContext } from 'react'
import { CartContext } from './Layout'
import Link from 'next/link'

const BuyOnWhatsappButton = ({ endIconProps, product, ...props }) => {
  const [hostUrl, setHostUrl] = useState('')
  useEffect(() => {
    setHostUrl(window?.location?.origin)
  }, [])
  
  const { contactInfo } = useGetContactInfo()
  const { cart } = useContext(CartContext)
  const itemInCart = cart?.find(({ item }) => item?._id === product._id)

  const item = itemInCart ? itemInCart.item : product
  const count = itemInCart?.count
  return (
    <>
      <Link
        target="_blank"
        href={`https://wa.me/${
          contactInfo?.whatsappNumber
        }?text=${`I would like to place an order for *${
          item.name
        }*(quantity: ${
          count ?? 1
        }, url: ${`${hostUrl}/${item?.category.slug.current}/${item?.slug.current}`}%20)`}`}
        // style={{ width: '100%' }}
      >
        <Button
          endIcon={<WhatsAppIcon {...endIconProps} />}
          color="success"
          variant="contained"
          {...props}
        >
          Buy On Whatsapp
        </Button>
      </Link>
    </>
  )
}
export default BuyOnWhatsappButton
