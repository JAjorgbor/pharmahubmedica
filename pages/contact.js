import BreadCrumbs from '@/components/BreadCrumbs'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Meta from '@/components/Meta'
import FAQSection from '@/components/FAQSection'
import { useContext } from 'react'
import { CartContext } from '@/components/Layout'

const Contact = () => {
  const { cartValue, dispatch } = useContext(CartContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch('SHOW')

  }
  
  return (
    <>
      <Meta titlePrefix="Contact" />
      <Container>
        <BreadCrumbs
          links={[
            { title: 'Home', path: '/' },
            { title: 'Contact Us', path: '/contact' },
          ]}
        />
        <Box my={5}>
          <Typography
            varaint="h1"
            fontSize={24}
            textAlign="center"
            fontWeight={'bold'}
            marginBottom={5}
          >
            We Can't Wait to Hear From You
          </Typography>
          <Stack
            direction={{ md: 'row' }}
            sx={{ width: '100%', color: 'complementary.main' }}
            gap={0.5}
          >
            <Paper
              elevation={0}
              sx={{
                textAlign: 'center',
                width: '100%',
                padding: 3,
                transition: (theme) =>
                  theme.transitions.create(['box-shadow'], {
                    duration: theme.transitions.duration.standard,
                  }),
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[3],
                  '& .cardIcon': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <LocationOnOutlinedIcon
                className="cardIcon"
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
                Address
              </Typography>
              <Typography
                varaint="body2"
                color="complementary.main"
                fontSize={14}
              >
                PLOT C281, USHAFA NEW LAYOUT, USHAFA BWARI ABUJA
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                textAlign: 'center',
                width: '100%',
                padding: 3,
                transition: (theme) =>
                  theme.transitions.create(['box-shadow'], {
                    duration: theme.transitions.duration.short,
                  }),
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[3],
                  '& .cardIcon': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <PhoneAndroidOutlinedIcon
                className="cardIcon"
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
                Phone Number
              </Typography>
              <Typography
                varaint="body2"
                color="complementary.main"
                fontSize={14}
              >
                +2340001122
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                textAlign: 'center',
                width: '100%',
                padding: 3,
                transition: (theme) =>
                  theme.transitions.create(['box-shadow'], {
                    duration: theme.transitions.duration.short,
                  }),
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[3],
                  '& .cardIcon': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <EmailOutlinedIcon
                className="cardIcon"
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
                E-mail Address
              </Typography>
              <Typography
                varaint="body2"
                color="complementary.main"
                fontSize={14}
              >
                pharmahubmedica@gmail.com
              </Typography>
            </Paper>{' '}
          </Stack>
          <Divider sx={{ marginBlockStart: 5, marginBlockEnd: 10 }} />
          <Stack direction={{ md: 'row' }} gap={3}>
            <Box
              component={'section'}
              mb={{ xs: 4, md: 0 }}
              sx={{ width: '100%' }}
            >
              <Typography
                variant="h3"
                fontSize={24}
                fontWeight={'bold'}
                mb={4}
                textTransform={'Capitalize'}
              >
                Send Us A Message
              </Typography>
              <Stack
                spacing={2}
                component="form"
                // onSubmit={handleSubmit}
              >
                <TextField label=" Name" required fullWidth />
                <TextField type="email" label=" E-mail" required fullWidth />
                <TextField
                  label=" Message"
                  required
                  multiline
                  rows={4}
                  fullWidth
                />
              </Stack>
              <Button
                // type="submit"
                onClick={handleSubmit}
                variant="contained"
                size="large"
                sx={{ marginTop: 2, paddingInline: 5 }}
              >
                Send A Message
              </Button>
            </Box>

            <Box component="section" id="faqs">
              <Typography
                variant="h3"
                fontSize={24}
                fontWeight={'bold'}
                mb={4}
                textTransform={'Capitalize'}
              >
                Frequently Asked Questions{' '}
              </Typography>
              <FAQSection />
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  )
}
export default Contact
