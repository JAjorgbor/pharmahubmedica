import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Rating,
  Divider,
  TextField,
  Tab,
  List,
  ListItem,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Chip,
  Collapse,
  CardActions,
  Tooltip,
} from '@mui/material'
import { TabPanel, TabContext, TabList } from '@mui/lab'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ReplyIcon from '@mui/icons-material/Reply'
import { useState, useEffect } from 'react'
import BreadCrumbs from '@/components/BreadCrumbs'
import Image from 'next/image'
import Meta from '@/components/Meta'
import HorizontalScrollSection from '@/components/HomePage/HorizontalScrollSection'
import ProductCard from '@/components/Products/ProductCard'
import Link from 'next/link'
import { toast } from 'react-toastify'
import CartToastContent from '@/components/Products/CartToastContent'
import useFormatAmount from '@/hooks/useFormatAmount'
import CustomCounter from '@/components/Products/CustomCounter'
import { getProductDetails, getSimilarProducts } from '@/utils/requests'
import CustomImage from '@/components/CustomImage'
import { PortableText } from '@portabletext/react'
import { useRouter } from 'next/router'

const ProductDetailsPage = ({ product, similarProducts }) => {
  const [count, setCount] = useState(1)
  const [openCollapse, setOpenCollapse] = useState(false)
  const [tabValue, setTabValue] = useState('description')
  const router = useRouter()
  const categorySlug = router.query.category

  return (
    <>
      <Meta titlePrefix={product.name} />
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs
          links={[
            {
              title: product.category.name,
              path: `/collections/${product.category.slug.current}`,
            },
            { title: product.name, path: '#' },
          ]}
        />
        <Box py={5}>
          <Stack direction={{ md: 'row' }} gap={4}>
            <Box
              sx={{
                position: 'relative',
                minWidth: '35%',
                minHeight: 350,
                flexGrow: 0,
              }}
            >
              <CustomImage
                asset={product.image}
                alt={product.image.alt}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ height: 250, flexGrow: 1 }}>
              <Typography
                variant="h2"
                fontWeight={'bold'}
                color="primary.main"
                fontSize={'1.8rem'}
                // gutterBottom
              >
                {product.name}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ marginBlock: 1 }}>
                {product.subcategories.map((item, index) => (
                  <Link
                    href={{
                      pathname: `/collections/${product.category.slug.current}`,
                      query: {
                        subcategories: [item],
                      },
                    }}
                    key={index}
                  >
                    <Chip
                      label={item}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ cursor: 'pointer' }}
                    />
                  </Link>
                ))}
              </Stack>
              <Rating
                value={3}
                readOnly
                size="small"
                //   sx={{ textAlign: 'center', margin: 'auto' }}
              />{' '}
              <Typography variant="caption" component="sup" fontSize={11}>
                (26)
              </Typography>
              <Typography color="primary.main" variant="h5" fontWeight={'bold'}>
                {useFormatAmount(product.price)}
              </Typography>
              <Divider sx={{ marginBlock: '1rem' }} />
              <Stack direction="row" spacing={3}>
                <CustomCounter count={count} setCount={setCount} />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ShoppingBagOutlinedIcon />}
                  sx={{
                    fontSize: 13,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    toast(
                      <CartToastContent
                        imageSrc={product.image}
                        productName={product.name}
                      />,
                      {
                        hideProgressBar: true,
                        autoClose: 3000,
                      }
                    )
                  }}
                >
                  Add To Cart
                </Button>
              </Stack>
              <Divider sx={{ marginBlock: '1rem' }} />
              <Button
                size="large"
                endIcon={<WhatsAppIcon />}
                color="success"
                variant="contained"
              >
                Buy On Whatsapp
              </Button>
            </Box>
          </Stack>
          <Box mt={15}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={(event, newValue) => {
                    setTabValue(newValue)
                  }}
                  aria-label="Product Information Tabs "
                >
                  <Tab
                    label="Description"
                    sx={{ fontWeight: 'bold' }}
                    value="description"
                  />
                  <Tab
                    label="Reviews (0)"
                    sx={{ fontWeight: 'bold' }}
                    value="Reviews"
                  />
                </TabList>
              </Box>
              <TabPanel
                value="description"
                sx={{ maxHeight: 600, overflowY: 'auto' }}
              >
                {' '}
                <PortableText value={product?.description} />
              </TabPanel>
              <TabPanel value="Reviews" sx={{}}>
                <Stack gap={3}>
                  <Stack
                    sx={{
                      border: '1px solid #f0f0f0',
                      height: { md: 400 },
                    }}
                    direction={{ md: 'row' }}
                  >
                    {/* Review Section */}
                    <Box
                      sx={{
                        overflowY: 'auto',
                        height: { xs: 400 },
                        flexGrow: 1,
                      }}
                    >
                      <Box>
                        <List>
                          <ListItem>
                            <Card>
                              <CardHeader
                                sx={{ paddingBottom: 1 }}
                                avatar={
                                  <Avatar
                                    sx={{ bgcolor: 'red' }}
                                    aria-label="recipe"
                                  >
                                    R
                                  </Avatar>
                                }
                                action={
                                  <Tooltip title='Reply Review' arrow placement='top' >
                                    <IconButton aria-label="settings">
                                      <ReplyIcon />
                                    </IconButton>
                                  </Tooltip>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader={
                                  <>
                                    September 14, 2016
                                    <br />
                                    <Rating value={3} size="small" readOnly />
                                  </>
                                }
                              />
                              <CardContent sx={{ paddingTop: 1 }}>
                                <Typography
                                  variant={'body2'}
                                  color="text.secondary"
                                >
                                  This impressive paella is a perfect party dish
                                  and a fun meal to cook together with your
                                  guests. Add 1 cup of frozen peas along with
                                  the mussels, if you like.
                                </Typography>
                              </CardContent>
                              <CardActions sx={{ justifyContent: 'end' }}>
                                <Button
                                  size="small"
                                  onClick={() => setOpenCollapse(!openCollapse)}
                                >
                                  {!openCollapse ? 'View' : 'Hide'} Replies
                                </Button>
                              </CardActions>
                            </Card>
                          </ListItem>
                          <Collapse
                            in={openCollapse}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Stack direction="row">
                              <Divider
                                orientation="vertical"
                                variant="inset"
                                flexItem
                                sx={{ marginLeft: 5 }}
                              />
                              <List
                                component="div"
                                disablePadding
                                // sx={{ marginLeft: 2 }}
                              >
                                <ListItem>
                                  <Card
                                    sx={{
                                      backgroundColor: 'complementary.light',
                                    }}
                                  >
                                    <CardHeader
                                      sx={{ paddingBottom: 1 }}
                                      avatar={
                                        <Avatar
                                          sx={{ bgcolor: 'red' }}
                                          aria-label="recipe"
                                        >
                                          R
                                        </Avatar>
                                      }
                                      title="Shrimp and Chorizo Paella"
                                      subheader={'September 14, 2016'}
                                    />
                                    <CardContent sx={{ paddingTop: 1 }}>
                                      <Typography
                                        variant={'body2'}
                                        color="text.secondary"
                                      >
                                        This impressive paella is a perfect
                                        party dish and a fun meal to cook
                                        together with your guests. Add 1 cup of
                                        frozen peas along with the mussels, if
                                        you like.
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </ListItem>
                                <ListItem>
                                  <Card
                                    sx={{
                                      backgroundColor: 'complementary.light',
                                    }}
                                  >
                                    <CardHeader
                                      sx={{ paddingBottom: 1 }}
                                      avatar={
                                        <Avatar
                                          sx={{ bgcolor: 'red' }}
                                          aria-label="recipe"
                                        >
                                          R
                                        </Avatar>
                                      }
                                      title="Shrimp and Chorizo Paella"
                                      subheader={'September 14, 2016'}
                                    />
                                    <CardContent sx={{ paddingTop: 1 }}>
                                      <Typography
                                        variant={'body2'}
                                        color="text.secondary"
                                      >
                                        This impressive paella is a perfect
                                        party dish and a fun meal to cook
                                        together with your guests. Add 1 cup of
                                        frozen peas along with the mussels, if
                                        you like.
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </ListItem>
                              </List>
                            </Stack>
                          </Collapse>
                          <ListItem>
                            <Card>
                              <CardHeader
                                sx={{ paddingBottom: 1 }}
                                avatar={
                                  <Avatar
                                    sx={{ bgcolor: 'red' }}
                                    aria-label="recipe"
                                  >
                                    R
                                  </Avatar>
                                }
                                action={
                                  <Tooltip title='Reply Review' arrow placement='top' >
                                    <IconButton aria-label="settings">
                                      <ReplyIcon />
                                    </IconButton>
                                  </Tooltip>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader={
                                  <>
                                    September 14, 2016
                                    <br />
                                    <Rating value={3} size="small" readOnly />
                                  </>
                                }
                              />
                              <CardContent sx={{ paddingTop: 1 }}>
                                <Typography
                                  variant={'body2'}
                                  color="text.secondary"
                                >
                                  This impressive paella is a perfect party dish
                                  and a fun meal to cook together with your
                                  guests. Add 1 cup of frozen peas along with
                                  the mussels, if you like.
                                </Typography>
                              </CardContent>
                            </Card>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                    {/* End of review section */}
                    {/* Review Summary */}
                    <Box
                      sx={{
                        width: { xs: '100%', md: 300 },
                        height: { xs: 340, md: '100%' },
                        backgroundColor: 'complementary.light',
                        // padding: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ width: '100%', paddingInline: 2 }}>
                        <Typography fontSize={25} fontWeight={'bold'}>
                          Ratings
                        </Typography>
                        <List sx={{ padding: 0 }}>
                          <ListItem
                            sx={{
                              justifyContent: 'space-between',
                              paddingInline: 0,
                            }}
                          >
                            <Rating value={5} readOnly />
                            <Typography variant="caption">
                              70 reviews
                            </Typography>
                          </ListItem>
                          <ListItem
                            sx={{
                              justifyContent: 'space-between',
                              paddingInline: 0,
                            }}
                          >
                            <Rating value={4} readOnly />
                            <Typography variant="caption">
                              60 reviews
                            </Typography>
                          </ListItem>
                          <ListItem
                            sx={{
                              justifyContent: 'space-between',
                              paddingInline: 0,
                            }}
                          >
                            <Rating value={3} readOnly />
                            <Typography variant="caption">
                              50 reviews
                            </Typography>
                          </ListItem>
                          <ListItem
                            sx={{
                              justifyContent: 'space-between',
                              paddingInline: 0,
                            }}
                          >
                            <Rating value={2} readOnly />
                            <Typography variant="caption">
                              40 reviews
                            </Typography>
                          </ListItem>
                          <ListItem
                            sx={{
                              justifyContent: 'space-between',
                              paddingInline: 0,
                            }}
                          >
                            <Rating value={1} readOnly />
                            <Typography variant="caption">
                              30 reviews
                            </Typography>
                          </ListItem>
                          <ListItem
                            sx={{
                              justifyContent: 'space-between',
                              paddingInline: 0,
                              borderTop: '1px solid lightgray',
                            }}
                          >
                            <Typography variant="body1" fontWeight={'bold'}>
                              Total:
                            </Typography>
                            <Typography variant="body2">20 </Typography>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                    {/* End of Review Summary */}
                  </Stack>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        // justifyContent: 'end',
                        alignItems: 'center',
                        gap: 2,
                        // textAlign: 'end',
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontSize={{ xs: 20, md: 25 }}
                        color="primary.main"
                        fontWeight={'bold'}
                        gutterBottom
                      >
                        Leave A Review
                      </Typography>
                      <Rating name="simple-controlled" />
                    </Box>
                    <TextField
                      label="Comment"
                      required
                      multiline
                      rows={4}
                      fullWidth
                      sx={{ marginTop: 1 }}
                    />
                  </Box>
                </Stack>
              </TabPanel>
            </TabContext>
          </Box>
          {similarProducts.length > 0 && (
            <Box mt={5} sx={{ position: 'relative' }}>
              <Typography
                variant="h5"
                textTransform="uppercase"
                fontWeight={'bold'}
                fontSize={20}
                gutterBottom
              >
                Similar products
              </Typography>
              <Typography
                fontWeight={'bold'}
                fontSize={14}
                variant="body1"
                textAlign="end"
                marginRight={'5.2%'}
                marginBottom={3}
                color="primary.main"
              >
                <Link
                  href={{
                    pathname: `/collections/${router.query.category}`,
                    query: { subcategories: product.subcategories },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    size="small"
                    sx={{ typography: 'caption', fontWeight: 'bold' }}
                    endIcon={<EastOutlinedIcon />}
                  >
                    View More
                  </Button>
                </Link>
              </Typography>
              <Container>
                <HorizontalScrollSection>
                  {similarProducts.map((item, index) => (
                    <ProductCard
                      alt={item?.image.alt}
                      price={item.price}
                      imageSrc={item.image}
                      categoryName={item.category.name}
                      categorySlug={item.category.slug}
                      slug={item.slug}
                      title={item.name}
                      starCount={index}
                      otherStyles={{ marginInline: 1 }}
                      key={index}
                    />
                  ))}
                </HorizontalScrollSection>
              </Container>
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}
export default ProductDetailsPage

export async function getServerSideProps(context) {
  const productSlug = context.query.product
  try {
    const product = await getProductDetails(productSlug)
    // console.log(product.category.name,
    //   product.subcategories)
    const similarProducts = await getSimilarProducts(
      product.category.name,
      product.subcategories,
      product._id
    )
    console.log('similarProducts', similarProducts)
    return {
      props: { product, similarProducts },
    }
  } catch (error) {
    console.error(error)
  }
}
