import BreadCrumbs from '@/components/BreadCrumbs'
import Meta from '@/components/Meta'
import ProductCard from '@/components/Products/ProductCard'
import SearchFilter from '@/components/Search/SearchFilter'
import useGetCollections from '@/hooks/requests/useGetCollections'
import useGetFilterProducts from '@/hooks/requests/useGetFilteredProducts'
import useGetSubCollections from '@/hooks/requests/useGetSubCollections'
import { searchProductsCount as searchResultsCount } from '@/utils/requests'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Alert, AlertTitle } from '@mui/lab'
import {
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
import useSWR from 'swr'

const SearchPage = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [classifications, setClassifications] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const trigger = useScrollTrigger({ threshold: 220, disableHysteresis: true })
  const router = useRouter()
  const { product: productName } = router?.query
  const pageNumber = Number(router?.query?.page || 1)
  const classificationName = router?.query?.classification || ''
  const priceRange = router?.query?.priceRange || ''

  let subClassifications = router?.query?.subClassifications || []
  subClassifications = Array.isArray(subClassifications)
    ? subClassifications
    : [subClassifications]

  const { filteredProducts, filteredProductsLoading } = useGetFilterProducts(
    productName,
    classificationName,
    subClassifications,
    pageNumber,
    priceRange,
    process.env.NEXT_PUBLIC_ITEMS_PER_PAGE_COUNT
  )

  const { collections } = useGetCollections()
  const { subCollections } = useGetSubCollections(classificationName)

  useEffect(() => {
    if (classificationName == 'all categories') {
      setClassifications(collections)
    } else setClassifications(subCollections)
  }, [subCollections, collections, classificationName])

  useEffect(() => {
    if (filteredProducts) {
      const results = filteredProducts.filter((each) =>
        each.name.toLowerCase().includes(productName.toLowerCase())
      )
      setSearchResults(results)
    }
  }, [filteredProducts])

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
              {filteredProductsLoading ? (
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
