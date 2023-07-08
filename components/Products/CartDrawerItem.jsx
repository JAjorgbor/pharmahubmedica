import {
  Avatar,
  Divider,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Image from 'next/image'
import useFormatAmount from '@/hooks2/useFormatAmount'

const CartDrawerItem = ({ imageSrc, productName }) => {
  return (
    <Card elevation={0} sx={{ width:'100%'}}>
      <CardHeader
        action={
          <IconButton aria-label="remove item from cart">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        }
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
        subheader={`2 x ${useFormatAmount(500)}`}
        titleTypographyProps={{
          color: 'primary.main',
          textTransform: 'uppercase',
          fontSize: 15,
          // fontWeight: 'bold',
        }}
        subheaderTypographyProps={{
          fontSize: 13,
          // fontWeight: '600',
          sx: {},
        }}
      />
    </Card>
  )
}
export default CartDrawerItem
