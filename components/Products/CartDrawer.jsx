import {
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  ListItem,
  Divider,
  Button,
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
          <ListItem>
            <CartDrawerItem imageSrc={drugImage} productName={'Product'} />
          </ListItem>
          <Divider />

          <ListItem>
            <CartDrawerItem imageSrc={drugImage} productName={'Product'} />
          </ListItem>
          <Divider />

          <ListItem>
            <CartDrawerItem imageSrc={drugImage} productName={'Product'} />
          </ListItem>
          <Divider />

          <ListItem>
            <Button variant="outlined" fullWidth >
              View Cart
            </Button>
          </ListItem>
          <ListItem sx={{ paddingBlock: 0 }}>
            <Button variant="contained" color="success" fullWidth>
              Buy on WhatsApp
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
export default CartDrawer
