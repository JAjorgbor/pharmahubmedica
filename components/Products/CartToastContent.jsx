import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from '@mui/material'
import Link from 'next/link'
import CustomImage from '../CustomImage'
import { CartContext } from '../Layout'
import { useContext } from 'react'

const CartToastContent = ({ product }) => {
  const { cart, dispatch } = useContext(CartContext)
  return (
    <>
      <Card sx={{ display: 'flex', width: '100%' }} elevation={0}>
        <CardMedia sx={{ width: 80, position: 'relative' }}>
          <Link href="/products/product">
            <CustomImage
              asset={product.image}
              alt={product.image.alt}
              fill
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </CardMedia>
        <Box flexGrow={1}>
          <CardHeader
            title={product.name}
            subheader={
              cart.find(({ item }) => item._id == product._id).count > 1 ||
              !cart.find(({ item }) => item._id == product._id)
                ? 'Item quantity updated'
                : 'Added To Cart'
            }
            titleTypographyProps={{
              textTransform: 'uppercase',
              fontSize: 12,
              fontWeight: 'bold',
            }}
            subheaderTypographyProps={{
              fontSize: 10,
              fontWeight: '600',
              sx: {
                color: 'primary.main',
              },
            }}
            sx={{ paddingBlock: 1 }}
          />
          <CardContent sx={{ paddingBlock: 1 }}></CardContent>
          <CardActions sx={{ gap: 1, flexDirection: { sm: 'column' } }}>
            <Link href="/cart" style={{ display: 'block', width: '100%' }}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: { xs: '100%' }, fontSize: { xs: 9 } }}
                // endIcon={
                //   <ShoppingCartOutlinedIcon
                //     sx={{ fontSize: { xs: 5.5, sm: 10 } }}
                //   />
                // }
              >
                View Cart
              </Button>
            </Link>
            <Button
              size="small"
              color="success"
              variant="contained"
              sx={{ width: { xs: '100%' }, fontSize: { xs: 9 } }}
              // endIcon={<WhatsAppIcon sx={{fontSize:{xs:7.5,sm:10}}}/>}
            >
              Buy On Whatsapp
            </Button>
          </CardActions>{' '}
        </Box>
      </Card>
    </>
  )
}
export default CartToastContent
