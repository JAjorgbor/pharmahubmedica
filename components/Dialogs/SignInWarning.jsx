import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DialogWrapper from './DialogWrapper'
import { signIn } from 'next-auth/react'

const SignInWarning = ({ open, handleClose }) => {
  return (
    <>
      <DialogWrapper open={open} handleClose={handleClose}>
        <DialogTitle>{'You are not signed in.'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You have to be signed in to leave a review.{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={signIn}>Sign In</Button>
        </DialogActions>
      </DialogWrapper>
    </>
  )
}

export default SignInWarning
