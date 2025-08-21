import { SpeedDial, SpeedDialAction, Tooltip } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ChatIcon from '@mui/icons-material/Chat'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useState } from 'react'
import Link from 'next/link'
import useGetContactInfo from '@/hooks/useGetContactInfo'

const ContactSpeedDial = () => {
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const { contactInfo } = useGetContactInfo()
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, left: 20 }}
        icon={
          <Tooltip title="Contact Us" placement="right">
            <ChatIcon />
          </Tooltip>
        }
        open={openSpeedDial}
        onClick={() => setOpenSpeedDial(!openSpeedDial)}
        FabProps={{
          color: 'primary',
        }}
      >
        <SpeedDialAction
          //   sx={{height:50}}

          icon={
            <Link
              target="_blank"
              href={contactInfo?.facebookAccount ?? '#'}
              style={{
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FacebookIcon />
            </Link>
          }
          tooltipTitle={'Connect with us on Facebook'}
        />
        <SpeedDialAction
          //   sx={{height:50}}

          icon={
            <Link
              target="_blank"
              href={contactInfo?.InstagramAccount ?? '#'}
              style={{
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InstagramIcon />
            </Link>
          }
          tooltipTitle={'Connect with us on Instagram'}
        />
        <SpeedDialAction
          //   sx={{height:50}}

          icon={
            <Link
              target="_blank"
              href={`whatsapp://?phone=${contactInfo?.whatsappNumber}&text:'Hello I would like to seek for your consultancy'`}
              style={{
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <WhatsAppIcon />
            </Link>
          }
          tooltipTitle={'Chat with us on Whatsapp'}
        />
        <SpeedDialAction
          icon={
            <Link
              target="_blank"
              href={`tel:${contactInfo?.callNumber}`}
              style={{
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LocalPhoneIcon />
            </Link>
          }
          tooltipTitle={'Call us'}
        />
      </SpeedDial>
    </>
  )
}
export default ContactSpeedDial
