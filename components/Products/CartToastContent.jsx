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
      {/* <Card elevation={0}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                height: 50,
                width: 50,
                borderRadius: 0,
                // backgroundColor: '',
                // marginRight: -2,
              }}
            >
              <CustomImage asset={imageSrc} alt={productName} fill />
            </Avatar>
          }
          title={productName}
          subheader="Added To Cart"
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
        />
        <CardActions>
          <Button
            size="small"
            variant="contained"
            sx={{ fontSize: 10 }}
            endIcon={<ShoppingCartOutlinedIcon />}
          >
            View Cart
          </Button>
          <Button
            size="small"
            color="success"
            variant="contained"
            sx={{ fontSize: 10 }}
            endIcon={<WhatsAppIcon />}
          >
            Buy On Whatsapp
          </Button>
        </CardActions>
      </Card> */}
      <Card sx={{ display: 'flex', width: '100%' }} elevation={0}>
        <CardMedia sx={{ width: 80, position: 'relative' }}>
          <Link href="/products/product">
            <CustomImage
              asset={product.image}
              alt={product.image.alt}
              fill
              style={{ objectFit: 'cover' }}
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
          <CardActions>
            <Link href = '/cart'>
            <Button
              size="small"
              variant="contained"
              sx={{ fontSize: 8 }}
              // endIcon={<ShoppingCartOutlinedIcon />}
            >
              View Cart
            </Button>
            </Link>
            <Button
              size="small"
              color="success"
              variant="contained"
              sx={{ fontSize: 8 }}
              // endIcon={<WhatsAppIcon />}
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
