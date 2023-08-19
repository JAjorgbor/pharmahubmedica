import CustomImage from '@/components/CustomImage'
import FAQSection from '@/components/FAQSection'
import HorizontalScrollSection from '@/components/HomePage/HorizontalScrollSection'
import Meta from '@/components/Meta'
import CategoryCard from '@/components/Products/CategoryCard'
import ProductCard from '@/components/Products/ProductCard'
import { urlForImage } from '@/sanity/lib/image'
import {
  getFaqs,
  getHeroInfo,
  getNewlyStockedProducts,
  getTopCategories,
} from '@/utils/requests'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const HomePage = ({
  heroInfo,
  faqs,
  featuredCategories,
  newlyStockedProducts,
}) => {
  useEffect(() => {
    console.log(featuredCategories)
  }, [featuredCategories])
  return (
    <>
      <Meta titlePrefix={'Home'} />
      {/* Start Hero Section */}
      <Container component={'section'} sx={{ marginBlock: { xs: 5, md: 0 } }}>
        <Stack
          container
          gap={4}
          direction={{ md: 'row' }}
          alignItems={'center'}
        >
          <Grid>
            <Typography
              variant="h1"
              fontSize={35}
              fontWeight={'bold'}
              color={'primary.main'}
              gutterBottom
            >
              {/* Your Health, Our Priority: */}
              {heroInfo?.mainHeading}
            </Typography>
            <Typography
              variant="h2"
              color="complimentary.main"
              fontWeight="bold"
              fontSize={25}
            >
              {' '}
              {/* Discover Exceptional Pharmacy Services at Pharmahubmedica{' '} */}
              {heroInfo?.subheading}
            </Typography>
            <Typography gutterBottom>
              {/* At Pharmahubmedica, we are dedicated to delivering top-quality
              medications and affordable products, ensuring your health and
              well-being are our top priorities. */}
              {heroInfo?.description}
            </Typography>
            <Grid container mt={4} gap={3} columns={2}>
              <Link href="/collections">
                <Button
                  variant="contained"
                  color={'primary'}
                  endIcon={<FormatListBulletedOutlinedIcon />}
                  sx={{ borderRadius: '0' }}
                >
                  View Collections
                </Button>
              </Link>
              <Button
                variant="outlined"
                color={'primary'}
                endIcon={<LocalPhoneIcon />}
                target='_blank'
                href={`https://wa.me/${'08084465610'}?text=what's up danger.`}
                sx={{ borderRadius: '0' }}
              >
                Speak To A Pharmacist
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ position: 'relative', width: '100%', height: '400px' }}>
            <CustomImage
              asset={heroInfo?.image}
              // src={urlForImage(heroInfo?.image).url()}
              alt={'picture of pharmarcist'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Grid>
        </Stack>
      </Container>

      <Box
        component={'section'}
        my={10}
        py={10}
        backgroundColor={'complementary.light'}
      >
        <Container>
          <Divider>
            <Typography
              variant="h3"
              fontSize={18}
              fontWeight={'bold'}
              textTransform={'uppercase'}
            >
              Top Categories
            </Typography>
          </Divider>
          <Box mt={5} sx={{ position: 'relative' }}>
            <Typography
              fontWeight={'bold'}
              fontSize={14}
              variant="body1"
              textAlign="end"
              marginRight={'5.2%'}
              marginBottom={3}
              color="primary.main"
            >
              <Link href="/collections" style={{ textDecoration: 'none' }}>
                <Button
                  size="small"
                  sx={{ typography: 'caption', fontWeight: 'bold' }}
                  endIcon={<EastOutlinedIcon />}
                >
                  View More
                </Button>
              </Link>
            </Typography>
            <HorizontalScrollSection>
              {featuredCategories?.map((category, index) => (
                <CategoryCard
                  alt={category?.image.alt}
                  imageSrc={urlForImage(category.image).url()}
                  slug={category?.slug}
                  title={category?.name}
                  sx={{ marginInline: 1, width: 270 }}
                />
              ))}
            </HorizontalScrollSection>
          </Box>
        </Container>
      </Box>
      <Box
        component={'section'}
        my={10}
        py={10}
        backgroundColor={'complementary.light'}
      >
        <Container>
          <Divider>
            <Typography
              variant="h3"
              fontSize={18}
              fontWeight={'bold'}
              textTransform={'uppercase'}
            >
              Newly Stocked Products
            </Typography>
          </Divider>
          <Box mt={5} sx={{ position: 'relative' }}>
            <Container>
              <HorizontalScrollSection>
                {newlyStockedProducts?.map((item, index) => (
                  <Grid item xs={''}>
                    <ProductCard
                      key={index}
                      alt={item?.image.alt}
                      price={item.price}
                      imageSrc={item.image}
                      reviews={item.reviews}
                      categoryName={item.category.name}
                      categorySlug={item.category.slug}
                      slug={item.slug}
                      title={item.name}
                      starCount={index}
                      otherStyles={{ width: 300, marginInline: 1 }}
                    />
                  </Grid>
                ))}
              </HorizontalScrollSection>
            </Container>
          </Box>
        </Container>
      </Box>
      <Box component="section" mb={10}>
        <Container maxWidth="md">
          <Typography variant="h4" mb={4} fontWeight={'bold'}>
            Frequently Asked Questions
          </Typography>
          <FAQSection faqsList={faqs} />
        </Container>
      </Box>
    </>
  )
}
export default HomePage

export async function getStaticProps() {
  try {
    const heroInfo = await getHeroInfo()
    const faqs = await getFaqs()
    const featuredCategories = await getTopCategories()
    const newlyStockedProducts = await getNewlyStockedProducts()
    return {
      props: { heroInfo, faqs, featuredCategories, newlyStockedProducts },
      revalidate: 30,
    }
  } catch (error) {
    console.error(error)
    return { props: { heroInfo: {}, faqs: [], featuredCategories: [] } }
  }
}
