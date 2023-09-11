import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram';
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import logo from '@/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import useGetFeaturedCategories from '@/hooks/useGetFeaturedCategories'
import useGetContactInfo from '@/hooks/useGetContactInfo'

const Footer = () => {
  const FooterNavLink=styled(Link)(({theme})=>({
    color:'inherit',
    textDecoration:'none',
    '&:hover':{
      color:theme.palette.primary.light
    }
  }))
  const {featuredCategories} = useGetFeaturedCategories()
  const {contactInfo} = useGetContactInfo()
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
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'start'}
            columns={{ xs: 1, sm: 2, xl: 4 }}
            spacing={3}
            pt={5}
          >
            <Grid alignSelf={'center'} xs={12} sm={'auto'} textAlign={{xs:'center',sm:'start'}} >
              <FooterNavLink href="/">
                <Image src={logo}  alt='Logo' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
              </FooterNavLink>
            </Grid>
            <Grid>
              <Typography
                variant="h6"
                fontSize={16}
                textTransform={'uppercase'}
                gutterBottom
                fontWeight={'bold'}
              >
                Quick Links
              </Typography>
              <Typography
                variant="h5"
                fontSize={14}
                fontWeight={'bold'}
                textTransform={'uppercase'}
              >
                Address:
              </Typography>
              <Typography
                variant="caption"
                textTransform={'uppercase'}
                gutterBottom
                >
                {contactInfo?.address}
              </Typography>
              <Typography
                variant="h5"
                fontSize={14}
                fontWeight={'bold'}
                textTransform={'uppercase'}
              >
                Phone:
              </Typography>
              <Typography
                variant="caption"
                textTransform={'uppercase'}
                gutterBottom
                >
                <FooterNavLink target='_blank' href={`tel:${contactInfo?.phoneNumber}`}>{contactInfo?.callNumber}</FooterNavLink>
              </Typography>
              <Typography
                variant="h5"
                fontSize={14}
                fontWeight=
                {'bold'}
                textTransform={'uppercase'}
                >
                Email:
                  
              </Typography>
              <Typography variant="caption" gutterBottom>
                <FooterNavLink target='_blank' href={`mailto:${contactInfo?.email}`}>
                {contactInfo?.email}{' '}
                </FooterNavLink>
              </Typography>
              <Stack direction={'row'} mt={2}>
                <FooterNavLink target='_blank' href={contactInfo?.facebookAccount??''}>
                  <FacebookOutlinedIcon sx={{ fontSize: '2rem' }} />
                </FooterNavLink>
                <FooterNavLink target='_blank' href={contactInfo?.instagramAccount??''}>
                  <InstagramIcon sx={{ fontSize: '2rem' }} />
                </FooterNavLink>
              </Stack>
            </Grid>
            <Grid>
              <Typography
                variant="h6"
                fontSize={16}
                textTransform={'uppercase'}
                fontWeight={'bold'}
                gutterBottom
              >
                Support
              </Typography>
              <Typography
                variant="caption"
                component="p"
                textTransform={'uppercase'}
              >
                <FooterNavLink href={'/contact#faqs'}>Frequently Asked Questions</FooterNavLink>
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
            </Grid>
            <Grid>
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
                  <FooterNavLink href={`/collections/${item.slug.current}`}>{item.name}</FooterNavLink>
                </Typography>
              ))}
            </Grid>
          </Grid>
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
