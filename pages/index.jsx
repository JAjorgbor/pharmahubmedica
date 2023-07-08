import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import Image from 'next/image'
import bannerImage from '@/public/pharmarcist.jpg'
import drugImage from '@/public/drug-image.jpg'
import coughAndColdColdImage from '@/public/cough_n_cold-2.jpg'
import ProductCard from '@/components/Products/ProductCard'
import HorizontalScrollSection from '@/components/HomePage/HorizontalScrollSection'
import Link from 'next/link'
import CategoryCard from '@/components/Products/CategoryCard'
import FAQSection from '@/components/FAQSection'
import Meta from '@/components/Meta'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import {
  getCategories,
  getFaqs,
  getFeaturedCategories,
  getHeroInfo,
} from '@/utils/requests'
import { urlForImage } from '@/sanity/lib/image'

const HomePage = ({ heroInfo, faqs, featuredCategories }) => {
  useEffect(()=>{
    console.log(featuredCategories)
  },[featuredCategories])
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
              <Button
                variant="contained"
                color={'primary'}
                endIcon={<FormatListBulletedOutlinedIcon />}
                sx={{ borderRadius: '0' }}
              >
                View Products
              </Button>
              <Button
                variant="outlined"
                color={'primary'}
                endIcon={<LocalPhoneIcon />}
                sx={{ borderRadius: '0' }}
                onClick={() => {
                  toast("what's up danger")
                }}
              >
                Speak To A Pharmarcist
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ position: 'relative', width: '100%', height: '400px' }}>
            <Image
              // src={bannerImage}
              src={urlForImage(heroInfo?.image).url()}
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
              <Link href="/categories" style={{ textDecoration: 'none' }}>
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
              {featuredCategories
                .map((item, index) => (
                  <CategoryCard
                    key={index}
                    alt="demo Category"
                    imageSrc={urlForImage(item?.image).url()}
                    title={item?.title}
                    slug={item?.slug}
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
            <Typography
              fontWeight={'bold'}
              fontSize={14}
              variant="body1"
              textAlign="end"
              marginRight={'5.2%'}
              marginBottom={3}
              color="primary.main"
            >
              <Link href="/products" style={{ textDecoration: 'none' }}>
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
                {Array(8)
                  .fill(0)
                  .map((item, index) => (
                    <ProductCard
                      key={index}
                      alt="demo product"
                      price={1900}
                      imageSrc={drugImage}
                      categoryName={'Category Name'}
                      title={'TYLENOL Cold & Flu Severe Caplets |'}
                      starCount={index}
                      otherStyles={{ width: 300, marginInline: 1 }}
                      // sx={{ marginInline: 1 }}
                    />
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
    const featuredCategories = await getFeaturedCategories()
    return { props: { heroInfo, faqs, featuredCategories } }
  } catch (error) {
    console.error(error)
    return { props: { heroInfo: {}, faqs: [], featuredCategories: [] } }
  }
}
