import BuyOnWhatsappButton from '@/components/BuyOnWhatsappButton'
import CustomImage from '@/components/CustomImage'
import RemoveFromCartWarning from '@/components/Dialogs/RemoveFromCartWarning'
import { CartContext } from '@/components/Layout'
import Meta from '@/components/Meta'
import CustomCounter from '@/components/Products/CustomCounter'
import useFormatAmount from '@/hooks/useFormatAmount'
import useGetCartOrder from '@/hooks/useGetCartOrder'
import useGetContactInfo from '@/hooks/useGetContactInfo'
import useTruncate from '@/hooks/useTruncate'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

const Cart = () => {
  const theme = useTheme()
  const matchMediaQuery = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  })
  const { cart, dispatch } = useContext(CartContext)
  const noOfItems = cart.reduce(
    (previousValue, currentValue) => previousValue + currentValue.count,
    0
  )
  const totalPrice = cart.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.count * currentValue.item.price,
    0
  )
  const checkoutString = useGetCartOrder()
  const { contactInfo } = useGetContactInfo()

  return (
    <>
      <Meta titlePrefix={'Cart'} />
      <Box my={5}>
        <Container>
          <Typography
            variant={'h1'}
            fontSize={25}
            fontWeight="bold"
            textAlign="center"
            mb={5}
            color="primary.main"
          >
            Shopping Cart
          </Typography>
          <Stack direction={{ md: 'row' }} gap={3}>
            <Box sx={{ flexGrow: 1 }}>
              {matchMediaQuery ? (
                // cart items for large screens is in the form of a table
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Typography
                          variant="h6"
                          fontSize={16}
                          textTransform={'uppercase'}
                          fontWeight={'bold'}
                        >
                          Product
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="h6"
                          fontSize={16}
                          textTransform={'uppercase'}
                          fontWeight={'bold'}
                        >
                          Unit Price
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="h6"
                          fontSize={16}
                          textTransform={'uppercase'}
                          fontWeight={'bold'}
                        >
                          Quantity
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          fontSize={16}
                          textTransform={'uppercase'}
                          fontWeight={'bold'}
                        >
                          Subtotal
                        </Typography>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((item, index) => (
                      <CartItemForLargeScreens key={index} product={item} />
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <List>
                  {cart.map((item, index) => (
                    <CartItemForSmallScreens key={index} product={item} />
                  ))}
                </List>
              )}
              {!cart?.length && (
                <Box
                  sx={{ display: 'grid', placeItems: 'center', minHeight: 200 }}
                >
                  <Image
                    src="/empty-cart-illustration.svg"
                    width={200}
                    height={200}
                  />
                  <Typography
                    sx={{
                      color: 'primary.main',
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Your cart is empty
                  </Typography>
                  <Stack direction="row" gap={2} marginTop={2}>
                    <Link href={'/collections'}>
                      <Button variant="contained" size="small">
                        Browse Collections
                      </Button>
                    </Link>
                    <Link href={'/'}>
                      <Button variant="outlined" size="small">
                        Go To Home Page
                      </Button>
                    </Link>
                  </Stack>
                </Box>
              )}
            </Box>
            <Box sx={{ width: { md: 300 } }}>
              <Card>
                <CardHeader
                  title="CART SUMMARY"
                  titleTypographyProps={{ fontWeight: 'bold', fontSize: 15 }}
                />
                <CardContent sx={{ paddingBlock: 1 }}>
                  <List>
                    <ListItem
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography fontWeight={'bold'}>
                        Number of items
                      </Typography>
                      <Typography fontSize={20} fontWeight="bold">
                        {noOfItems}
                      </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography fontWeight={'bold'}>Total Amount</Typography>
                      <Typography fontSize={20} fontWeight="bold">
                        {useFormatAmount(totalPrice)}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </List>
                </CardContent>
                <CardActions>
                  {
                    <BuyOnWhatsappButton
                      orderFromCart
                      text="Order On Whatsapp"
                      fullWidth
                      checkoutString={checkoutString}
                    />
                  }
                </CardActions>
              </Card>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
export default Cart

function CartItemForLargeScreens({ product }) {
  const { cart, dispatch } = useContext(CartContext)
  const { item, count: itemCount } = product
  const [openDialog, setOpenDialog] = useState(false)
  const [count, setCount] = useState(itemCount || 1)
  useEffect(() => {
    dispatch({ type: 'SET_ITEM_COUNT', payload: item, count })
  }, [count])
  return (
    <>
      <TableRow>
        <TableCell
          // bgcolor={'primary.light'}
          width={350}
        >
          <Stack direction="row" alignItems="center" width={'100%'} gap={2}>
            <Link
              href={`/collections/${item.category.slug.current}/${item.slug.current}`}
            >
              <CustomImage
                asset={item.image}
                alt={item.image.alt}
                width={100}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </Link>
            <Link
              href={`/collections/${item.category.slug.current}/${item.slug.current}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                color="primary.main"
                sx={{ maxWidth: { sm: 100, lg: 300 }, wordWrap: 'break-word' }}
              >
                {useTruncate(item.name, 40)}
              </Typography>
            </Link>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography fontSize={18}>{useFormatAmount(item.price)}</Typography>
        </TableCell>
        <TableCell>
          <CustomCounter count={count} setCount={setCount} />
        </TableCell>
        <TableCell>
          <Typography fontWeight={'bold'} fontSize={18}>
            {useFormatAmount(itemCount * item.price)}
          </Typography>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => setOpenDialog(true)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <RemoveFromCartWarning
        item={item}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  )
}

function CartItemForSmallScreens({ product }) {
  const { cart, dispatch } = useContext(CartContext)
  const { item, count: itemCount } = product
  const [openDialog, setOpenDialog] = useState(false)
  const [count, setCount] = useState(itemCount || 1)
  useEffect(() => {
    dispatch({ type: 'SET_ITEM_COUNT', payload: item, count })
  }, [count])
  return (
    <>
      <ListItem>
        <Card sx={{ display: 'flex', height: 200, width: '100%' }}>
          <CardMedia sx={{ width: { xs: 150, sm: 200 }, position: 'relative' }}>
            <Link
              href={`/collections/${item.category.slug.current}/${item.slug.current}`}
            >
              <CustomImage
                alt={item.image.alt}
                asset={item.image}
                style={{ objectFit: 'contain' }}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
          </CardMedia>
          <Box flexGrow={1}>
            <CardHeader
              action={
                <IconButton
                  aria-label="settings"
                  onClick={() => setOpenDialog(true)}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              }
              title={
                <Link
                  href={`/collections/${item.category.slug.current}/${item.slug.current}`}
                  style={{ all: 'inherit', cursor: 'pointer' }}
                >
                  <Typography
                    sx={{
                      all: 'inherit',
                      maxWidth: { xs: 200, sm: 300 },
                      wordWrap: 'break-word',
                    }}
                  >
                    {useTruncate(item.name, 30)}
                  </Typography>
                </Link>
              }
              titleTypographyProps={{
                fontSize: 18,
                // fontWeight: 'bold',
                color: 'primary.main',
              }}
              sx={{ paddingBlock: 1 }}
            />

            <CardContent sx={{ paddingBlock: 1 }}>
              <Typography fontSize={15} display={'inline'}>
                Unit Price:{' '}
              </Typography>
              <Typography display={'inline'} fontWeight="bold">
                {useFormatAmount(item.price)}
              </Typography>
              <br />
              <Typography fontSize={15} display={'inline'}>
                Subtotal:
              </Typography>
              <Typography display={'inline'} fontWeight="bold">
                {useFormatAmount(item.price * itemCount)}
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingLeft: 2 }}>
              <CustomCounter count={count} setCount={setCount} />
            </CardActions>
          </Box>
        </Card>
      </ListItem>
      <RemoveFromCartWarning
        item={item}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  )
}
