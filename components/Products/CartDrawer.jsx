import CloseIcon from '@mui/icons-material/Close'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography
} from '@mui/material'
import CartDrawerItem from './CartDrawerItem'

import Link from 'next/link'
import { Fragment, useContext } from 'react'
import BuyOnWhatsappButton from '../BuyOnWhatsappButton'
import { CartContext } from '../Layout'

const CartDrawer = ({ openCartDrawer, setOpenCartDrawer }) => {
  const { cart, dispatch } = useContext(CartContext)
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
          {cart.length ? (
            <>
              {cart?.map((item, index) => (
                <Fragment key={index}>
                  <ListItem>
                    <CartDrawerItem product={item} />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
              <ListItem>
                <Link href="/cart" style={{width:'100%',}}>
                  <Button
                    variant="outlined"
                    fullWidth
                    endIcon={
                      <ShoppingCartOutlinedIcon sx={{ fontSize: '1.8rem' }} />
                    }
                  >
                    View Cart
                  </Button>
                </Link>
              </ListItem>
              <ListItem sx={{ paddingBlock: 0 }}>
                <BuyOnWhatsappButton fullWidth/>
              </ListItem>
            </>
          ) : (
            <Typography
              color="complimentary.light"
              my={5}
              textAlign="center"
              fontSize={18}
              sx={{ opacity: 0.5, fontStyle: 'italic' }}
            >
              Cart is empty...
            </Typography>
          )}
        </List>
      </Drawer>
    </>
  )
}
export default CartDrawer
