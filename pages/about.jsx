import BreadCrumbs from '@/components/BreadCrumbs'
import Meta from '@/components/Meta'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Link from 'next/link'

const About = () => {
  return (
    <>
    <Meta titlePrefix={'About'}/>
      <Box mb={10}>
        <Box py={8} bgcolor={'complementary.light'} component='section'>
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
          <BreadCrumbs
            links={[
              { title: 'Home', path: '/' },
              ,
              { title: 'About Us', path: '/about ' },
            ]}
          />
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
          <Typography variant='body1' my={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            sunt facere ipsum recusandae libero similique non dicta nam amet
            provident, est iure. Commodi, non assumenda hic magnam sapiente amet
            totam modi dignissimos cumque distinctio cupiditate nostrum, eum,
            perferendis at quia odio soluta deserunt. Ipsum illum officia
            explicabo, esse minus laborum accusantium, vitae praesentium alias
            laboriosam eaque obcaecati quos iste consectetur? Ullam, commodi
            provident, magni id voluptatum debitis suscipit neque totam sit ut
            hic velit consequatur dignissimos deserunt repudiandae.
          </Typography>
          <Typography variant='body1' my={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat et
            nemo aliquid alias dolorum, veritatis tempora officiis esse
            dignissimos hic autem, ducimus ipsam iusto ea rerum distinctio
            mollitia quo cum.
          </Typography>
          <Typography variant='body1' my={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            maiores eaque porro inventore, necessitatibus temporibus voluptatum
            possimus quia laudantium praesentium, quod qui, eos eligendi
            voluptatibus autem harum consequuntur ab laboriosam vel. Voluptate
            minima reiciendis vero at! Consequuntur nam quidem dolores beatae
            illum. Officia alias ipsam ab sed soluta. Animi veritatis explicabo
            ullam quo earum ipsam deleniti excepturi!
          </Typography>
        </Container>
        <Box py={8} bgcolor={'complementary.light'} component='section'>
          <Container>
            <Typography fontWeight={'bold'} fontSize={20} mb={4}>
              Our Values
            </Typography>
            <Stack direction={{md:'row'}} gap={3}>
            <Paper
              elevation={0}
              sx={{
                
                width: '100%',
                padding: 3,
                
              }}
            >
              <AccessTimeOutlinedIcon
                className="cardIcon"
                color='primary'
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
              Pharmahubmedica prioritizes convenience by offering easy online ordering, home delivery options, and streamlined in-store experiences. 
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
                color='primary'
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
                At Pharmahubmedica, our customers are at the heart of everything we do. We provide personalized care, attentive service, and a supportive environment. 
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
                color='primary'
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
                Pharmahubmedica operates with high ethical standards. We adhere to legal and regulatory requirements, maintain transparent pricing, and actively promote sustainable and environmentally friendly practices. 
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
