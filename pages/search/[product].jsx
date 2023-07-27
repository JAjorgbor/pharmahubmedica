import { useEffect, useState } from 'react'
import ProductCard from '@/components/Products/ProductCard'
import useSWR from 'swr'
import {
  Box,
  Button,
  Drawer,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Pagination,
  CircularProgress,
} from '@mui/material'
import { Alert, AlertTitle } from '@mui/lab'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import drugImage from '@/public/drug-image.jpg'
import Meta from '@/components/Meta'
import Filter from '@/components/Products/Filter'
import Link from 'next/link'
import BreadCrumbs from '@/components/BreadCrumbs'
import {
  getCategoryName,
  getProductsForCategory,
  getProductsForCategoryCount,
  searchProducts,
  searchProductsCount,
} from '@/utils/requests'
import { useRouter } from 'next/router'

const SearchPage = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const trigger = useScrollTrigger({ threshold: 220, disableHysteresis: true })
  const router = useRouter()
  const lastId = router?.query?.lastId || ''
  const { product: productName } = router?.query
  const pageNumber = Number(router?.query?.page || 1)
  const categoryName = router?.query?.category || ''

  const productsFetcher = async () => {
    const products = await searchProducts(
      productName,
      categoryName,
      pageNumber,
      1
    )
    const productsCount = await searchProductsCount(productName, categoryName)
    return { products, productsCount }
  }

  const {
    data: productsData,
    isLoading: searchResultsLoading,
    error: searchResultsError,
  } = useSWR(
    `api/${productName}?category=${categoryName}&page=${pageNumber}`,
    productsFetcher
  )

  useEffect(() => {
    console.log('searchResultsError', searchResultsError)
  }, [searchResultsError])
  return (
    <>
      <Meta titlePrefix={'Products'} />
      <Drawer
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        sx={{ display: { md: 'none' } }}
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
        />
      </Drawer>
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs links={[{ title: 'search', path: '#' }]} />
        <Toolbar
          sx={{
            width: '100%',
            display: { md: 'none' },
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
              {searchResultsLoading ? (
                <CircularProgress />
              ) : productsData?.products?.length < 1 ? (
                <Alert severity="info" variant="outlined" color="primary">
                  <AlertTitle>No Products Found</AlertTitle>
                  Oops, there are no search results for this page you can browse through our other products by going{' '}
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
                productsData?.products?.map((item, index) => (
                  <Grid item xs={''} key={index}>
                    <ProductCard
                      alt={item?.image.alt}
                      price={item.price}
                      imageSrc={item.image}
                      categoryName={item.category.name}
                      title={item.name}
                      starCount={index}
                      otherStyles={{ width: { xs: 165, sm: 200, md: 280 } }}
                    />
                  </Grid>
                ))
              )}
            </Grid>
            <Pagination
              sx={{ marginTop: 5 }}
              count={Math.ceil(productsData?.productsCount / 1)}
              color="primary"
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => {
                router.push(
                  `/search/${productName}?category=${categoryName}&page=${value}`
                )
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default SearchPage

// export async function getServerSideProps(context) {
//   const { category } = context.params
//   const pageNumber = Number(context.query?.page || 1)
//   const lastId = context?.query?.lastId || ''

//   try {
//     const productsCount = await getProductsForCategoryCount(category)
//     const categoryName = await getCategoryName(category)
//     const products = await getProductsForCategory(category, pageNumber, 2)
//     return {
//       props: { products, productsCount, categoryName: categoryName.name },
//     }
//   } catch (error) {
//     console.error(error)
//     return { props: { products: [], productsCount: 0 } }
//   }
// }
