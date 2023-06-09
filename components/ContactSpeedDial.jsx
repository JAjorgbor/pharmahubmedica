import { SpeedDial, SpeedDialAction, Tooltip } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ChatIcon from '@mui/icons-material/Chat'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useState } from 'react'

const ContactSpeedDial = () => {
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
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
          icon={<WhatsAppIcon />}
          tooltipTitle={'Chat with us on Whatsapp'}
        />
        <SpeedDialAction icon={<LocalPhoneIcon />} tooltipTitle={'Call us'} />
      </SpeedDial>
    </>
  )
}
export default ContactSpeedDial
