import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
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

const Index = () => {
  return (
    <>
      <Meta titlePrefix={'Home'}/>
      {/* Start Hero Section */}
      <Container component={'Section'} my={5}>
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
              color={'primary.dark'}
              gutterBottom

              // sx={{ width: '50%' }}
            >
              Your Health, Our Priority: Discover Exceptional Pharmacy Services
              at Pharmahubmedica{' '}
            </Typography>
            <Typography gutterBottom>
              At Pharmahubmedica, we are dedicated to delivering top-quality
              medications and affordable products, ensuring your health and
              well-being are our top priorities.
            </Typography>
            <Grid container mt={4} gap={3} columns={2}>
              <Button
                variant="contained"
                color={'secondary'}
                sx={{ borderRadius: '0' }}
              >
                View Products
              </Button>
              <Button
                variant="outlined"
                color={'secondary'}
                sx={{ borderRadius: '0' }}
              >
                Speak To A Pharmarcist
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ position: 'relative', width: '100%', height: '400px' }}>
            <Image src={bannerImage} fill style={{ objectFit: 'cover' }} />
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
              Shop by category
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
              color="secondary.main"
            >
              <Link
                href="#"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                View More
              </Link>
            </Typography>
            <HorizontalScrollSection>
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <CategoryCard
                    key={index}
                    alt="demo Category"
                    imageSrc={coughAndColdColdImage}
                    categoryName={'Cough and cold'}
                    sx={{ marginInline: 2, width: 270 }}
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
              Featured Products
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
              color="secondary.main"
            >
              <Link
                href="#"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                View More
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
                      sx={{ marginInline: 2, width: 270 }}
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
          <FAQSection />
        </Container>
      </Box>
    </>
  )
}
export default Index
