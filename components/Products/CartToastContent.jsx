import {
  Avatar,
  Divider,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import CustomImage from '../CustomImage'

const CartToastContent = ({ imageSrc, productName }) => {
  return (
    <>
      <Card elevation={0}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Call Us"
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
      </Card>
    </>
  )
}
export default CartToastContent
