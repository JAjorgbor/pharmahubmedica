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
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import logo from '@/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const popularCategoriesLinks=[
    {text:'Sexual health',path:'/categories'},
    {text:'His health',path:'/categories'},
    {text:'Her health',path:'/categories'},
    {text:'Multivitamins and supplements',path:'/categories'},
  ]
  const FooterNavLink=styled(Link)(({theme})=>({
    color:'inherit',
    textDecoration:'none',
    '&:hover':{
      color:theme.palette.primary.light
    }
  }))
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
                <Image src={logo}  alt='Logo'/>
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
                Contact Info
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
                Plot C281, Ushafa New Layout, Ushafa Bwari Abuja
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
                <FooterNavLink href="tel:2340001122">+2340001122</FooterNavLink>
              </Typography>
              <Typography
                variant="h5"
                fontSize={14}
                fontWeight={'bold'}
                textTransform={'uppercase'}
              >
                Email:
              </Typography>
              <Typography variant="caption">
                <FooterNavLink href="mailto:pharmahubmedica@gmail.com">
                  pharmahubmedica@gmail.com{' '}
                </FooterNavLink>
              </Typography>
              <Stack direction={'row'} mt={2}>
                <FooterNavLink href={'#'}>
                  <FacebookOutlinedIcon sx={{ fontSize: '2rem' }} />
                </FooterNavLink>
                <FooterNavLink href={'#'}>
                  <FacebookOutlinedIcon sx={{ fontSize: '2rem' }} />
                </FooterNavLink>
                <FooterNavLink href={'#'}>
                  <FacebookOutlinedIcon sx={{ fontSize: '2rem' }} />
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
                <FooterNavLink href={'/contact#faqs'}>Help & faq questions</FooterNavLink>
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
                Popular Categories
              </Typography>
              {popularCategoriesLinks.map((link) => (
                <Typography
                  variant="caption"
                  textTransform={'uppercase'}
                  component={'p'}
                >
                  <FooterNavLink href={link.path}>{link.text}</FooterNavLink>
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Divider sx={{ marginBlock: 5 }} />
          <Typography fontSize={12} textAlign={'center'}>
            &copy; Pharmahubmedica. {new Date().getFullYear()}. All Rights
            Reserved
          </Typography>
        </Container>
      </Box>
    </>
  )
}
export default Footer
