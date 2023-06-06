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
import ProductCard from '@/components/Products/ProductCard'

const Index = () => {
  return (
    <>
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
                Browse Our Products
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
              Featured Products
            </Typography>
          </Divider>
          <Grid
            container
            columns={'auto'}
            mt={5}
            justifyContent={{ xs: 'center', md: 'space-between' }}
          >
            {[1, 2, 3, 4].map((item) => (
              <ProductCard
                key={item}
                alt="demo product"
                price={1900}
                imageSrc={drugImage}
                categoryName={'Category Name'}
                title={'Kip cool wallet'}
                starCount={item}
              />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
export default Index
