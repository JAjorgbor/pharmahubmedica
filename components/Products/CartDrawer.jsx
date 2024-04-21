import CloseIcon from '@mui/icons-material/Close'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material'
import CartDrawerItem from './CartDrawerItem'

import Link from 'next/link'
import { useEffect, Fragment, useContext } from 'react'
import { CartContext } from '../Layout'
import { useRouter } from 'next/router'
import useGetCartOrder from '@/hooks/useGetCartOrder'
import useGetContactInfo from '@/hooks/useGetContactInfo'
import BuyOnWhatsappButton from '../BuyOnWhatsappButton'

const CartDrawer = ({ openCartDrawer, setOpenCartDrawer }) => {
  const { cart, dispatch } = useContext(CartContext)
  const router = useRouter()
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setOpenCartDrawer(false)
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router])
  const checkoutString = useGetCartOrder()
  const { contactInfo } = useGetContactInfo()

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
          Cart Summary
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
                <Link href="/cart" style={{ width: '100%' }}>
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
              {cart?.length > 0 && (
                <ListItem sx={{ paddingBlock: 0 }}>
                  <BuyOnWhatsappButton
                    orderFromCart
                    text="Order On Whatsapp"
                    fullWidth
                    checkoutString={checkoutString}
                  />
                </ListItem>
              )}
            </>
          ) : (
            <>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  color="complimentary.light"
                  my={5}
                  textAlign="center"
                  fontSize={18}
                  sx={{ opacity: 0.5, fontStyle: 'italic' }}
                >
                  Cart is empty...
                </Typography>
                <Link href="/cart" style={{ width: '100%' }}>
                  <Button
                    variant="outlined"
                    sx={{ width: '90%' }}
                    endIcon={
                      <ShoppingCartOutlinedIcon sx={{ fontSize: '1.8rem' }} />
                    }
                  >
                    View Cart
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </List>
      </Drawer>
    </>
  )
}
export default CartDrawer
