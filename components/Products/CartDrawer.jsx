import {
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  ListItem,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CartDrawerItem from './CartDrawerItem'
import drugImage from '@/public/drug-image.jpg'
import { Fragment } from 'react'

const CartDrawer = ({ openCartDrawer, setOpenCartDrawer }) => {
  return (
    <>
      <Drawer
        anchor={'right'}
        open={openCartDrawer}
        onClose={() => {
          setOpenCartDrawer(false)
        }}
        PaperProps={{
          sx: { width: 300 },
        }}
      >
        <Toolbar disableGutters>
          <IconButton
            onClick={() => {
              setOpenCartDrawer(false)
            }}
            // sx={{color:'#ffff',}}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Typography
          varaint="h6"
          fontSize={20}
          fontWeight="bold"
          textTransform={'capitalize'}
          textAlign="center"
          //   sx={{width:'100%'}}
        >
          Shopping Cart
        </Typography>
        <List>
          <Fragment>
            <ListItem>
              <CartDrawerItem imageSrc={drugImage} productName={'Product'} />
            </ListItem>
            <Divider />
          </Fragment>
          <Fragment>
            <ListItem>
              <CartDrawerItem imageSrc={drugImage} productName={'Product'} />
            </ListItem>
            <Divider />
          </Fragment>
          <Fragment>
            <ListItem>
              <CartDrawerItem imageSrc={drugImage} productName={'Product'} />
            </ListItem>
            <Divider />
          </Fragment>
        </List>
      </Drawer>
    </>
  )
}
export default CartDrawer
