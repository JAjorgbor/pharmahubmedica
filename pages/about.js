import BreadCrumbs from '@/components/BreadCrumbs'
import Meta from '@/components/Meta'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'

const About = () => {
  return (
    <>
    <Meta titlePrefix={'About'}/>
      <Box mb={10}>
        <Box py={8} bgcolor={'complementary.light'}>
          <Container>
            <Typography fontWeight={'bold'} fontSize={20}>
              About Us
            </Typography>
            <Typography
              variant="h1"
              fontSize={45}
              fontWeight="bold"
              textTransform={'capitalize'}
              gutterBottom
            >
              Your One step Destination for quality medicines
              {/* Pharmahubmedica: */}
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
      </Box>
    </>
  )
}
export default About
