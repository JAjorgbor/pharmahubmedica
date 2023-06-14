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
              <Image src={imageSrc} alt={productName} fill />
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
          <Button size="small" variant="contained">
            View Cart
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
export default CartToastContent
