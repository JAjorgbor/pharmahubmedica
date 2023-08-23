import { SpeedDial, SpeedDialAction, Tooltip } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ChatIcon from '@mui/icons-material/Chat'
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
              href={`https://wa.me/${contactInfo?.phoneNumber}?text:'Hello I would like to seek for your consultancy'`}
              style={{ color: 'inherit' }}
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
              href={`tel:${contactInfo?.phoneNumber}`}
              style={{ color: 'inherit' }}
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
