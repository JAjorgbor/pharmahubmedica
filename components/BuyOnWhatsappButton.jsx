import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Button } from '@mui/material'

const BuyOnWhatsappButton = ({ endIconProps, ...props }) => {
  return (
    <>
      <Button
        endIcon={<WhatsAppIcon {...endIconProps} />}
        color="success"
        variant="contained"
        {...props}
      >
        Buy On Whatsapp
      </Button>
    </>
  )
}
export default BuyOnWhatsappButton
