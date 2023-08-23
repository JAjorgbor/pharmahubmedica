import BreadCrumbs from '@/components/BreadCrumbs'
import BuyOnWhatsappButton from '@/components/BuyOnWhatsappButton'
import CustomImage from '@/components/CustomImage'
import HorizontalScrollSection from '@/components/HomePage/HorizontalScrollSection'
import { CartContext } from '@/components/Layout'
import Meta from '@/components/Meta'
import ReviewSection from '@/components/ProductDetails/ReviewSection'
import CartToastContent from '@/components/Products/CartToastContent'
import CustomCounter from '@/components/Products/CustomCounter'
import ProductCard from '@/components/Products/ProductCard'
import useFormatAmount from '@/hooks/useFormatAmount'
import useGetReviewStarCount from '@/hooks/useGetReviewStarCount'
import {
  getProductDetails,
  getProductReviews,
  getSimilarProducts,
} from '@/utils/requests'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Rating,
  Stack,
  Tab,
  Typography,
} from '@mui/material'
import { PortableText } from '@portabletext/react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { urlForImage } from '@/sanity/lib/image'

const ProductDetailsPage = ({ product, similarProducts, session, reviews }) => {
  const [count, setCount] = useState(1)
  const [tabValue, setTabValue] = useState('description')
  const clientSideReviewsDataFetcher = async () => {
    const { reviews } = await getProductReviews(product._id)
    return reviews
  }
  const { data: clientSideReviews } = useSWR(
    `api/${product._id}/reviews`,
    clientSideReviewsDataFetcher
  )
  const displayedReviews = (serverSideRendered, clientSideRendered) => {
    return clientSideRendered ?? serverSideRendered
  }
  const router = useRouter()
  const categorySlug = router.query.category
  const starsCount = useGetReviewStarCount()
  const { cart, dispatch } = useContext(CartContext)
  console.log(urlForImage(product.image).url())

  return (
    <>
      <Meta
        titlePrefix={product.name}
        ogImage={urlForImage(product.image).url()}
        description={product.metaDescription}
      />
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
              <Stack
                direction="row"
                sx={{ marginBlock: 1, flexWrap: 'wrap', gap: 1 }}
              >
                {product?.subcategories?.map((item, index) => (
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
                value={starsCount(displayedReviews(reviews, clientSideReviews))}
                readOnly
                size="small"
                //   sx={{ textAlign: 'center', margin: 'auto' }}
              />{' '}
              <Typography variant="caption" component="sup" fontSize={11}>
                ({displayedReviews(reviews, clientSideReviews)?.length ?? 0}{' '}
                {` ${
                  displayedReviews(reviews, clientSideReviews)?.length == 1
                    ? 'review'
                    : 'reviews'
                }`}
                )
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
                    fontSize: 15,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    dispatch({ type: 'ADD_ITEM', payload: product, count })
                    toast(<CartToastContent product={product} />, {
                      hideProgressBar: true,
                      autoClose: 3000,
                    })
                  }}
                >
                  Add To Cart
                </Button>
              </Stack>
              <Divider sx={{ marginBlock: '1rem' }} />
              <BuyOnWhatsappButton size="large" />
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
                    label={`Reviews (${
                      displayedReviews(reviews, clientSideReviews)?.length ?? 0
                    })`}
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
              <TabPanel value="Reviews" sx={{ paddingInline: 0 }}>
                {/* Review Section */}
                <ReviewSection
                  product={product}
                  reviews={displayedReviews(reviews, clientSideReviews)}
                />
                {/* End of review section */}
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
                      reviews={item.reviews}
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
  const session = await getSession(context)
  const productSlug = context.query.product
  const product = await getProductDetails(productSlug)

  if (!product) {
    return { notFound: true }
  }
  const { reviews } = await getProductReviews(product._id)
  const similarProducts = await getSimilarProducts(
    product.category.name,
    product.subcategories,
    product._id
  )
  return {
    props: { product, similarProducts, session, reviews },
  }
}
