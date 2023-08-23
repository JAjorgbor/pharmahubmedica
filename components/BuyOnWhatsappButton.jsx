import useGetContactInfo from '@/hooks/useGetContactInfo'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Button } from '@mui/material'
import Link from 'next/link'

const BuyOnWhatsappButton = ({ endIconProps, product, quantity, ...props }) => {
  const { contactInfo } = useGetContactInfo()
  return (
    <>
      <Link
      target='_blank'
        href={`https://wa.me/${
          contactInfo?.phoneNumber
        }?text=${`I would like to place an order for ${
          product?.name
        }: [url:${`https://pharmahubmedica.ng/collections/${product?.category.slug.current}/${product?.slug.current}`}\n,quantity:${
          quantity ?? 1
        }]`}`}
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
