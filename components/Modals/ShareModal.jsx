import CloseIcon from '@mui/icons-material/Close'
import { ShareSocial } from 'react-share-social'
import ModalWrapper from './ModalWrapper'
import { useRouter } from 'next/router'
import { Box, IconButton, Typography } from '@mui/material'

const ShareModal = ({ open, handleClose }) => {
  const router = useRouter()
  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <ShareSocial
        url={`${window?.location?.origin}${router.asPath}`}
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h3"
              sx={{ fontSize: 25, fontWeight: 'bold', color: 'primary.main' }}
            >
              Share Product
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        }
        socialTypes={['facebook', 'whatsapp', 'x', 'linkedin']}
        style={{
          root: {
            borderRadius: 3,
            border: 0,
            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            maxWidth: 350,
            padding: 15,
          },
          copyContainer: {
            border: '1px solid #031d91',
            background: 'rgba(0,0,0)',
            color: '#031d91 ',
          },
          title: {
            // fontStyle: 'italic'
            // fontFamily: 'roboto'
          },
        }}
      />
    </ModalWrapper>
  )
}
export default ShareModal
