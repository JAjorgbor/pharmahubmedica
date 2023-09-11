import { ShareSocial } from 'react-share-social'
import ModalWrapper from './ModalWrapper'
import { useRouter } from 'next/router'

const ShareModal = ({ open, handleClose }) => {
    const router = useRouter()
  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <ShareSocial
        url={ `${window?.location?.origin}${router.asPath}`}
        socialTypes={['facebook', 'twitter', 'whatsapp', 'linkedin']}
      />
    </ModalWrapper>
  )
}
export default ShareModal
