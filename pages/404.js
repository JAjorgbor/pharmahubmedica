import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import pageNotFoundIllustration from '@/public/404-illustration.svg'
import Link from 'next/link'

const Error404Page = () => {
  return (
    <>
      <Container>
        <Grid
          container
          //   columns={{ xs: 1, sm: 2 }}
          justifyContent={'space-between'}
          alignItems={'center'}
          py={8}
        >
          <Grid order={{ xs: 2, md: 1 }}>
            <Typography
              variant="h6"
              fontSize={30}
              fontWeight="bold"
              color={'complementary.dark'}
              gutterBottom
            >
              Oops!!
            </Typography>
            <Typography variant="body1" gutterBottom>
              The page your looking for does not exist.<br />
              But you can go to:
            </Typography>
            <Stack direction={'row'} spacing={3}>
              <Link href="/">
                <Button
                  variant="contained"
                  color="info"
                  sx={{ borderRadius: '0' }}
                >
                  Home Page
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ borderRadius: '0' }}
                >
                  Products
                </Button>
              </Link>
            </Stack>
          </Grid>
          <Grid
            order={{ xs: 1, md: 2 }}
            sx={{
              width: { xs: '100%', md: '50%' },
              position: 'relative',
              height: { xs: '40vh', md: '60vh' },
            }}
          >
            <Image src={pageNotFoundIllustration} fill alt="404 illustration" />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
export default Error404Page
