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
import { useState, useContext } from 'react'
import { CartContext } from '../Layout'
import Link from 'next/link'
import RemoveFromCartWarning from '../Dialogs/RemoveFromCartWarning'
import useTruncate from '@/hooks/useTruncate'

const CartDrawerItem = ({ product }) => {
  const { item, count } = product
  const { cart, dispatch } = useContext(CartContext)
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Card elevation={0} sx={{ width: '100%' }}>
        <CardHeader
          action={
            <IconButton
              aria-label="remove item from cart"
              onClick={() => setOpenDialog(true)}
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
          title={
            <>
              <Link
                href={`/collections/${item.category.slug.current}/${item.slug.current}`}
                style={{ all: 'inherit', cursor: 'pointer' }}
              >
                {useTruncate(item.name, 14)}
              </Link>
            </>
          }
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
      <RemoveFromCartWarning
        item={item}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  )
}
export default CartDrawerItem
