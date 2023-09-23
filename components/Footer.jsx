import useGetContactInfo from '@/hooks/useGetContactInfo'
import useGetFeaturedCategories from '@/hooks/useGetFeaturedCategories'
import logo from '@/public/png-transparent-logo.png'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const FooterNavLink = styled(Link)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  }))
  const { featuredCategories } = useGetFeaturedCategories()
  const { contactInfo } = useGetContactInfo()
  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: 'complementary.light',
          color: 'complementary.dark',
          paddingBlock: 3,
        }}
      >
        <Container>
          <Stack
            container
            alignItems={'start'}
            // columns={{ xs: 1, sm: 2, xl: 4 }}
            gap={3}
            sx={{
              flexWrap: 'wrap',
              flexDirection: {
                xs: 'column',
                justifyContent: 'space-between',
                sm: 'row',
              },
            }}
            pt={5}
          >
            <Box
              alignSelf={'center'}
              // xs={12}
              sm={'auto'}
              textAlign={{ xs: 'center', sm: 'start' }}
            >
              <FooterNavLink href="/">
                <Image src={logo} alt="Logo" width={200} height={80} />
              </FooterNavLink>
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontSize={16}
                textTransform={'uppercase'}
                fontWeight={'bold'}
                gutterBottom
              >
                Featured Categories
              </Typography>
              {featuredCategories?.map((item, index) => (
                <Typography
                  variant="caption"
                  textTransform={'uppercase'}
                  component={'p'}
                  key={index}
                >
                  <FooterNavLink href={`/collections/${item.slug.current}`}>
                    {item.name}
                  </FooterNavLink>
                </Typography>
              ))}
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontSize={16}
                textTransform={'uppercase'}
                fontWeight={'bold'}
                gutterBottom
              >
                Resources
              </Typography>
              <Typography
                variant="caption"
                component="p"
                textTransform={'uppercase'}
              >
                <FooterNavLink href={'/contact#faqs'}>
                  Frequently Asked Questions
                </FooterNavLink>
              </Typography>
              <Typography
                variant="caption"
                component="p"
                textTransform={'uppercase'}
              >
                <FooterNavLink href={'/about'}>About us</FooterNavLink>
              </Typography>
              <Typography
                variant="caption"
                component="p"
                textTransform={'uppercase'}
              >
                <FooterNavLink href={'#'}>Terms and conditions</FooterNavLink>
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontSize={16}
                textTransform={'uppercase'}
                fontWeight={'bold'}
                gutterBottom
              >
                Quick Support
              </Typography>
              <Link href="/contact">
                <Button variant="outlined" color="primary">
                  Contact Us
                </Button>
              </Link>
              <Typography
                variant="h6"
                fontSize={16}
                mt={1}
                textTransform={'uppercase'}
                fontWeight={'bold'}
                gutterBottom
              >
                Social Media
              </Typography>
              <Stack direction={'row'}>
                <FooterNavLink
                  target="_blank"
                  href={contactInfo?.facebookAccount ?? ''}
                >
                  <FacebookOutlinedIcon sx={{ fontSize: '2rem' }} />
                </FooterNavLink>
                <FooterNavLink
                  target="_blank"
                  href={contactInfo?.instagramAccount ?? ''}
                >
                  <InstagramIcon sx={{ fontSize: '2rem' }} />
                </FooterNavLink>
              </Stack>
            </Box>
          </Stack>
          <Divider sx={{ marginBlock: 5 }} />
          <Typography fontSize={12} textAlign={'center'}>
            &copy; {new Date().getFullYear()} Pharmahubmedica. All Rights
            Reserved
          </Typography>
        </Container>
      </Box>
    </>
  )
}
export default Footer
