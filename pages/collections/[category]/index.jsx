import BreadCrumbs from '@/components/BreadCrumbs'
import Meta from '@/components/Meta'
import Filter from '@/components/Products/Filter'
import ProductCard from '@/components/Products/ProductCard'
import { urlForImage } from '@/sanity/lib/image'
import {
  getCategoryDetails,
  getProductsForCategory,
  getProductsForCategoryCount,
} from '@/utils/requests'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  Pagination,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR, { SWRConfig } from 'swr'

const Products = ({
  categoryName,
  categoryImage,
  subcategories,
  products,
  productsCount,
  description,
}) => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [loading, setLoading] = useState(false)
  const trigger = useScrollTrigger({ threshold: 220, disableHysteresis: true })
  const router = useRouter()
  const asPath = router.asPath
  const { category, ...queryParameters } = router.query

  const { category: categorySlug } = router?.query
  const pageNumber = Number(router.query?.page || 1)
  useEffect(() => {
    setLoading(false)
    setOpenFilterDrawer(false)
  }, [asPath])

  return (
    <>
      <Meta
        titlePrefix={'Products'}
        description={description}
        ogImage={categoryImage && urlForImage(categoryImage).url()}
      />
      <Drawer
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        sx={{ display: { lg: 'none' } }}
        PaperProps={{
          sx: { width: 250 },
        }}
      >
        <Filter
          sx={{
            position: 'sticky',
            top: 69,
            minHeight: 300,
            // width:240
            // border: '1px solid red',
          }}
          elevation={0}
          subcategories={subcategories}
          setSpinner={() => setLoading(true)}
        />
      </Drawer>
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs
          links={[
            { title: 'collections', path: '/collections' },
            {
              title: categoryName ?? categorySlug,
              path: `/collections/${categorySlug}`,
            },
          ]}
        />
        <Toolbar
          sx={{
            width: '100%',
            display: { lg: 'none' },
            visibility: trigger ? 'hidden' : 'visible',
            backgroundColor: 'complementary.light',
          }}
        >
          <Container>
            <Button
              color="primary"
              variant="outlined"
              endIcon={<FilterAltOutlinedIcon />}
              onClick={() => setOpenFilterDrawer(true)}
            >
              Filter
            </Button>
          </Container>
        </Toolbar>
        <Slide direction="down" in={trigger}>
          <Toolbar
            sx={{
              position: 'fixed',
              top: 80,
              '@media (min-width: 960px)': {
                width: '150px',
              },
              left: 0,
              width: '100%',
              display: { md: 'none' },
              zIndex: 100,
              backgroundColor: 'complementary.light',
            }}
          >
            <Container>
              <Button
                color="primary"
                variant="outlined"
                endIcon={<FilterAltOutlinedIcon />}
                onClick={() => setOpenFilterDrawer(true)}
              >
                Filter
              </Button>
            </Container>
          </Toolbar>
        </Slide>
        <Box
          sx={{ display: 'flex', position: 'relative' }}
          gap={4}
          pt={4}
          pb={10}
        >
          <Box
            sx={{
              width: 240,
              flexShrink: 0,
              position: 'relative',
              top: 0,
              display: { xs: 'none', lg: 'block' },
              // border: '1px solid black',
            }}
          >
            {/* Filter card component for large screens */}
            <Filter
              sx={{
                position: 'sticky',
                top: 69,
                minHeight: 300,

                // border: '1px solid red',
              }}
              subcategories={subcategories}
              setSpinner={() => setLoading(true)}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Grid
              container
              columnGap={1}
              rowGap={3}
              justifyContent={'center'}
              sx={{ width: '100%' }}
            >
              {loading ? (
                <Box py={15}>
                  <CircularProgress />
                </Box>
              ) : products?.length < 1 ? (
                <Alert severity="info" variant="outlined" color="primary">
                  <AlertTitle>No Products Available</AlertTitle>
                  Oops, there are no products for this page you can browse other
                  products by going{' '}
                  <Typography
                    color="primary.main"
                    fontWeight="bold"
                    variant="strong"
                  >
                    <Link href={`/collections`} style={{ color: 'inherit' }}>
                      Here{' '}
                    </Link>
                  </Typography>
                </Alert>
              ) : (
                products?.map((item, index) => (
                  <Grid item xs={''} key={index}>
                    <ProductCard
                      product={item}
                      alt={item?.image.alt}
                      price={item.price}
                      imageSrc={item.image}
                      reviews={item.reviews}
                      categoryName={item.category.name}
                      categorySlug={item.category.slug}
                      slug={item.slug}
                      title={item.name}
                      starCount={index}
                      otherStyles={{ width: { xs: 165, sm: 200, md: 280 } }}
                    />
                  </Grid>
                ))
              )}
            </Grid>

            {Math.ceil(productsCount / 3) > 1 && (
              <Pagination
                sx={{ marginTop: 5 }}
                count={Math.ceil(productsCount / 3)}
                color="primary"
                defaultPage={pageNumber}
                variant="outlined"
                shape="rounded"
                onChange={(e, value) => {
                  if (value == pageNumber) return
                  setLoading(true)
                  router.push({
                    pathname: `/collections/${categorySlug}`,
                    query: { ...queryParameters, page: value },
                  })
                }}
              />
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default Products

export async function getServerSideProps(context) {
  const { category } = context.params
  let subcategoriesFilter = context?.query?.subcategories || []
  subcategoriesFilter = Array.isArray(subcategoriesFilter)
    ? subcategoriesFilter
    : [subcategoriesFilter]
  const pageNumber = Number(context.query?.page || 1)
  const priceRange = context?.query?.priceRange || ''

  const productsCount = await getProductsForCategoryCount(
    category,
    subcategoriesFilter,
    priceRange
  )
  const categoryDetails = await getCategoryDetails(category)
  if (! categoryDetails) {
    return { notFound: true }
  }
  const {
    name: categoryName,
    subcategories,
    description,
    image: categoryImage,
  } = categoryDetails
  const products = await getProductsForCategory(
    category,
    pageNumber,
    subcategoriesFilter,
    3,
    priceRange
  )
  return {
    props: {
      products,
      productsCount,
      categoryName,
      subcategories,
      description,
      categoryImage,
    },
  }
}
