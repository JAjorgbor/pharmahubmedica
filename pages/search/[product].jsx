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
import Link from 'next/link'
import BreadCrumbs from '@/components/BreadCrumbs'
import {
  getCategoriesList,
  getCategoryDetails,
  getProductsForCategory,
  getProductsForCategoryCount,
  getSearchResultsCount,
  getSubCategories,
  searchProducts,
  searchProductsCount as searchResultsCount,
} from '@/utils/requests'
import { useRouter } from 'next/router'
import SearchFilter from '@/components/Search/SearchFilter'

const SearchPage = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const trigger = useScrollTrigger({ threshold: 220, disableHysteresis: true })
  const router = useRouter()
  const { product: productName } = router?.query
  const pageNumber = Number(router?.query?.page || 1)
  const classificationName = router?.query?.classification || ''
  const priceRange = router?.query?.priceRange || ''

  let subClassificationsFilter = router?.query?.subClassifications || []
  subClassificationsFilter = Array.isArray(subClassificationsFilter)
    ? subClassificationsFilter
    : [subClassificationsFilter]

  const classificationsListFetcher = async () => {
    if (classificationName == 'all categories') {
      const categoryList = await getCategoriesList()
      return categoryList
    }
    const subcategories = await getSubCategories(classificationName)
    return subcategories
  }
  const { data: classifications } = useSWR(
    `api/classifications/${classificationName}`,
    classificationsListFetcher
  )

  const searchResultsFetcher = async () => {
    const products = await searchProducts(
      productName,
      classificationName,
      subClassificationsFilter,
      pageNumber,
      priceRange,
      process.env.NEXT_PUBLIC_ITEMS_PER_PAGE_COUNT
    )
    return products
  }

  const {
    data: searchResults,
    isLoading: searchResultsLoading,
    error: searchResultsError,
  } = useSWR(
    `api/${productName}?classification=${classificationName}&&page=${pageNumber}&&subcategories=${subClassificationsFilter} && priceRange=${priceRange}`,
    searchResultsFetcher
  )

  const searchResultsCountFetcher = async () => {
    const productsCount = await searchResultsCount(
      classificationName,
      subClassificationsFilter,
      priceRange
    )
  }

  const { data: productsCount, error } = useSWR(
    `api/${productName}?category=${classificationName}`,
    searchResultsCountFetcher
  )

  useEffect(() => {
    console.error('searchResultsError', searchResultsError)
  }, [searchResultsError])
  return (
    <>
      <Meta titlePrefix={`Search "${productName}"`} />
      <Drawer
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        sx={{ display: { lg: 'none' } }}
        PaperProps={{
          sx: { width: 250 },
        }}
      >
        <SearchFilter
          sx={{
            position: 'sticky',
            top: 69,
            minHeight: 300,
          }}
          elevation={0}
          classifications={classifications}
        />
      </Drawer>
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs
          links={[
            { title: 'search', path: '#' },
            {
              title: `Search results for "${productName}"`,
              path: `/search/${productName}`,
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
            <SearchFilter
              sx={{
                position: 'sticky',
                top: 69,
                minHeight: 300,
              }}
              classifications={classifications}
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
                <Box py={15}>
                  <CircularProgress />
                </Box>
              ) : searchResults?.length < 1 ? (
                <Alert severity="info" variant="outlined" color="primary">
                  <AlertTitle>No Products Found</AlertTitle>
                  Oops, there are no search results for this page you can browse
                  through our other products by going{' '}
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
                searchResults?.map((item, index) => (
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
                      otherStyles={{ width: { xs: 165, sm: 200, md: 280 } }}
                    />
                  </Grid>
                ))
              )}
            </Grid>
            {Math.ceil(searchResultsCount / 3) > 1 && (
              <Pagination
                sx={{ marginTop: 5 }}
                count={
                  searchResultsCount >= 3
                    ? Math.ceil(searchResultsCount / 3)
                    : 1
                }
                color="primary"
                defaultPage={pageNumber}
                variant="outlined"
                shape="rounded"
                onChange={(e, value) => {
                  // setLoading(true)
                  router.push({
                    pathname: router.pathname,
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
export default SearchPage
