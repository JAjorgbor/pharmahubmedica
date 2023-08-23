import BreadCrumbs from '@/components/BreadCrumbs'
import Meta from '@/components/Meta'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { getAbout } from '@/utils/requests'
import useSWR from 'swr'

const About = ({ about: serverAbout }) => {
  const { data: clientAbout } = useSWR('api/about', async () => {
    const about = await getAbout()
    return about
  })
  const handleDefaultValue = (serverValue, clientValue) => {
    return clientValue ?? serverValue
  }
  const about = handleDefaultValue(serverAbout, clientAbout)
  return (
    <>
      <Meta titlePrefix={'About'} />
      <Box mb={10}>
        <Box py={8} bgcolor={'complementary.light'} component="section">
          <Container>
            <Typography fontWeight={'bold'} fontSize={20} mb={4}>
              About Us
            </Typography>
            <Link href="/contact" styles={{ color: 'auto' }}>
              <Button variant="contained" size="large">
                Contact Us
              </Button>
            </Link>{' '}
          </Container>
        </Box>
        <Container>
          <BreadCrumbs links={[{ title: 'About Us', path: '#' }]} />
          <Typography
            textAlign={'center'}
            variant="h3"
            fontSize={25}
            mt={5}
            fontWeight="bold"
            gutterBottom
          >
            Our Story
          </Typography>
          <Box sx={{ paddingBottom: 4 }}>
            {about?.content && <PortableText value={about?.content} />}
          </Box>
        </Container>
        <Box py={8} bgcolor={'complementary.light'} component="section">
          <Container>
            <Typography fontWeight={'bold'} fontSize={20} mb={4}>
              Our Values
            </Typography>
            <Stack direction={{ md: 'row' }} gap={3}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  padding: 3,
                }}
              >
                <AccessTimeOutlinedIcon
                  className="cardIcon"
                  color="primary"
                  sx={{
                    fontSize: 60,
                  }}
                />
                <Typography
                  variant={'h3'}
                  fontSize={22}
                  textTransform={'capitalize'}
                  fontWeight="bold"
                  color="complementary.dark"
                  gutterBottom
                >
                  Convenience
                </Typography>
                <Typography
                  varaint="body2"
                  color="complementary.main"
                  fontSize={14}
                >
                  Pharmahubmedica prioritizes convenience by offering easy
                  online ordering, home delivery options, and streamlined
                  in-store experiences.
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  padding: 3,
                }}
              >
                <HandshakeOutlinedIcon
                  className="cardIcon"
                  color="primary"
                  sx={{
                    fontSize: 50,
                  }}
                />
                <Typography
                  variant={'h3'}
                  fontSize={22}
                  textTransform={'capitalize'}
                  fontWeight="bold"
                  color="complementary.dark"
                  gutterBottom
                >
                  Customer-Centric
                </Typography>
                <Typography
                  varaint="body2"
                  color="complementary.main"
                  fontSize={14}
                >
                  At Pharmahubmedica, our customers are at the heart of
                  everything we do. We provide personalized care, attentive
                  service, and a supportive environment.
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  padding: 3,
                }}
              >
                <DoneAllOutlinedIcon
                  // className="cardIcon"
                  color="primary"
                  sx={{
                    fontSize: 50,
                  }}
                />
                <Typography
                  variant={'h3'}
                  fontSize={22}
                  textTransform={'capitalize'}
                  fontWeight="bold"
                  color="complementary.dark"
                  gutterBottom
                >
                  Ethical
                </Typography>
                <Typography
                  varaint="body2"
                  color="complementary.main"
                  fontSize={14}
                >
                  Pharmahubmedica operates with high ethical standards. We
                  adhere to legal and regulatory requirements, maintain
                  transparent pricing, and actively promote sustainable and
                  environmentally friendly practices.
                </Typography>
              </Paper>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  )
}
export default About

export async function getStaticProps() {
  const about = await getAbout()

  return {
    props: {
      about: about,
    },
    revalidate: 30,
  }
}
