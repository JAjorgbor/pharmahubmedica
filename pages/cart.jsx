import Meta from '@/components/Meta'
import drugImage from '@/public/drug-image.jpg'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Image from 'next/image'
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import useFormatAmount from '@/hooks/useFormatAmount'
import CustomCounter from '@/components/Products/CustomCounter'
import { useState, useEffect, useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { CartContext } from '@/components/Layout'
import CustomImage from '@/components/CustomImage'

const Cart = () => {
  const theme = useTheme()
  const matchMediaQuery = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  })
  const { cart, dispatch } = useContext(CartContext)
  const totalPrice = cart.reduce(
    (previousValue, currentValue) =>
      previousValue+
      currentValue.count * currentValue.item.price,
    0
  )
  return (
    <>
      <Meta titlePrefix={'Cart'} />
      <Box my={5}>
        <Container>
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
                      <TableCell>
                        <Typography
                          variant="h6"
                          fontSize={16}
                          textTransform={'uppercase'}
                          fontWeight={'bold'}
                        >
                          Unit Price
                        </Typography>
                      </TableCell>
                      <TableCell>
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
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography fontWeight={'bold'}>Total</Typography>
                      <Typography fontSize={20} fontWeight="bold">
                        {useFormatAmount(totalPrice)}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </List>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    endIcon={<WhatsAppIcon />}
                  >
                    Buy On Whatsapp
                  </Button>
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
          <Stack direction="row" alignItems="center" width={'100%'}>
            <CustomImage
              asset={item.image}
              alt={item.image.alt}
              width={100}
              height={80}
              style={{ objectFit: 'contain' }}
            />
            <Link href="/product" style={{ textDecoration: 'none' }}>
              <Typography color="primary.main">{item.name}</Typography>
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
          <IconButton
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

function CartItemForSmallScreens({ product }) {
  const { cart, dispatch } = useContext(CartContext)
  const { item, count: itemCount } = product
  const [count, setCount] = useState(itemCount || 1)
  useEffect(() => {
    dispatch({ type: 'SET_ITEM_COUNT', payload: item, count })
  }, [count])
  return (
    <>
      <ListItem>
        <Card sx={{ display: 'flex', height: 200, width: '100%' }}>
          <CardMedia sx={{ width: { xs: 150, sm: 200 }, position: 'relative' }}>
            <Link href="/products/product">
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
                  onClick={() =>
                    dispatch({ type: 'REMOVE_ITEM', payload: item })
                  }
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              }
              title={item.name}
              titleTypographyProps={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'primary.main',
              }}
              sx={{ paddingBlock: 1 }}
            />

            <CardContent sx={{ paddingBlock: 1 }}>
              <Typography fontSize={15} display={'inline'}>
                Unit Price:{' '}
              </Typography>
              <Typography display={'inline'} fontWeight="bold">
                {useFormatAmount(1900)}
              </Typography>
              <br />
              <Typography fontSize={15} display={'inline'}>
                Subtotal:
              </Typography>
              <Typography display={'inline'} fontWeight="bold">
                {useFormatAmount(1900 * itemCount)}
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingLeft: 2 }}>
              <CustomCounter count={count} setCount={setCount} />
            </CardActions>
          </Box>
        </Card>
      </ListItem>
    </>
  )
}
