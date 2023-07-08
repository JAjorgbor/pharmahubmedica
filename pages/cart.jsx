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
import useFormatAmount from '@/hooks2/useFormatAmount'
import CustomCounter from '@/components/Products/CustomCounter'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'

const Cart = () => {
  const theme = useTheme()
  const matchMediaQuery = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  })

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
                    <CartItemForLargeScreens />
                  </TableBody>
                </Table>
              ) : (
                <List>
                  <CartItemForSmallScreens />
                  <CartItemForSmallScreens />
                  <CartItemForSmallScreens />
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
                        {useFormatAmount(20000)}
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

function CartItemForLargeScreens() {
  const [count, setCount] = useState(1)
  return (
    <>
      <TableRow>
        <TableCell
          // bgcolor={'primary.light'}
          width={350}
        >
          <Stack direction="row" alignItems="center" width={'100%'}>
            <Image
              src={drugImage}
              width={100}
              height={80}
              style={{ objectFit: 'contain' }}
            />
            <Link href="/product" style={{ textDecoration: 'none' }}>
              <Typography color="primary.main">
                TYLENOL Cold & Flu Severe Caplets
              </Typography>
            </Link>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography fontSize={18}>{useFormatAmount(1900)}</Typography>
        </TableCell>
        <TableCell>
          <CustomCounter count={count} setCount={setCount} />
        </TableCell>
        <TableCell>
          <Typography fontWeight={'bold'} fontSize={18}>
            {useFormatAmount(1900)}
          </Typography>
        </TableCell>
        <TableCell>
          <IconButton>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

function CartItemForSmallScreens() {
  const [count, setCount] = useState(1)
  return (
    <>
      <ListItem>
        <Card sx={{ display: 'flex', height: 200, width: '100%' }}>
          <CardMedia sx={{ width: { xs: 150, sm: 200 }, position: 'relative' }}>
            <Link href="/products/product">
              <Image
                alt={'alt'}
                src={drugImage}
                style={{ objectFit: 'contain' }}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
          </CardMedia>
          <Box flexGrow={1}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              }
              title="TYLENOL Cold & Flu Severe Caplets"
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
                {useFormatAmount(1900 * count)}
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
