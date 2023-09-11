import { Box, Modal } from '@mui/material'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:{sx:'80%'},
  bgcolor: 'background.paper',
  boxShadow: 24,
}

const ModalWrapper = ({ open, handleClose, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}> {children} </Box>
    </Modal>
  )
}

export default ModalWrapper
