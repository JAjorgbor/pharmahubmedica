import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import pageNotFoundIllustration from '@/public/404-illustration.svg'
import Link from 'next/link'
import Meta from '@/components/Meta'

const Error404Page = () => {
  return (
    <>
    <Meta titlePrefix='Page Not Found'/>
      <Container>
        <Stack
          //   columns={{ xs: 1, sm: 2 }}
          justifyContent={'space-between'}
          alignItems={'center'}
          direction={{md:'row'}}
          py={8}
        >
          <Box order={{ xs: 2, md: 1 }} sx={{flexGrow:0}}>
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
                  color="primary"
                  sx={{ borderRadius: '0' }}
                >
                  Home Page
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ borderRadius: '0' }}
                >
                  Products
                </Button>
              </Link>
            </Stack>
          </Box>
          <Box
            order={{ xs: 1, md: 2 }}
            sx={{
              width: {xs:'100%',md:'auto'},
              flexGrow:1,
              position: 'relative',
              height: { xs: '40vh', md: '60vh' },
            }}
          >
            <Image src={pageNotFoundIllustration} fill alt="404 illustration" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
export default Error404Page

Error404Page.dontShowLayout=true