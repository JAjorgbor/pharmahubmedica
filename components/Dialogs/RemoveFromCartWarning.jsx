import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DialogWrapper from './DialogWrapper'
import { useContext } from 'react'
import { CartContext } from '../Layout'

const RemoveFromCartWarning = ({ open, handleClose, item }) => {
  const { dispatch } = useContext(CartContext)
  return (
    <>
      <DialogWrapper open={open} handleClose={handleClose}>
        <DialogTitle>{'Remove Item from cart'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to remove this item from your cart?{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              dispatch({ type: 'REMOVE_ITEM', payload: item })
              handleClose()
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </DialogWrapper>
    </>
  )
}

export default RemoveFromCartWarning
