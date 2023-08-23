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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Image from 'next/image'
import useFormatAmount from '@/hooks/useFormatAmount'
import CustomImage from '../CustomImage'
import { useContext } from 'react'
import { CartContext } from '../Layout'
import Link from 'next/link'

const CartDrawerItem = ({ product }) => {
  const { item, count } = product
  const { cart, dispatch } = useContext(CartContext)

  return (
    <Card elevation={0} sx={{ width: '100%' }}>
      <CardHeader
        action={
          <IconButton
            aria-label="remove item from cart"
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
          >
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
            <Link
              href={`/collections/${item.category.slug.current}/${item.slug.current}`}
            >
              <CustomImage asset={item.image} alt={item.image.alt} fill />
            </Link>
          </Avatar>
        }
        title={item.name}
        subheader={`${count} x ${useFormatAmount(item.price)}`}
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
