import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import * as React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DialogWrapper = ({ open, handleClose, children }) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
      </Dialog>
    </>
  )
}
export default DialogWrapper
