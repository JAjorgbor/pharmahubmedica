import BreadCrumbs from '@/components/BreadCrumbs'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'

const Contact = () => {
  return (
    <>
      <Container>
        <BreadCrumbs
          links={[
            { title: 'Home', path: '/' },
            { title: 'Contact Us', path: '/contact' },
          ]}
        />
        <Box my={5}>
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
                    duration: (theme) => theme.transitions.duration.short,
                  }),
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[3],
                },
              }}
            >
              <LocationOnOutlinedIcon
                sx={{
                  fontSize: 50,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              />
              <Typography
                variant={'h3'}
                fontSize={25}
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
                    duration: (theme) => theme.transitions.duration.short,
                  }),
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[3],
                },
              }}
            >
              <PhoneAndroidOutlinedIcon
                sx={{
                  fontSize: 50,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              />
              <Typography
                variant={'h3'}
                fontSize={25}
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
                  duration: (theme) => theme.transitions.duration.short,
                }),
              '&:hover': {
                boxShadow: (theme) => theme.shadows[3],
              },
            }}>
              <PhoneAndroidOutlinedIcon
                sx={{
                  fontSize: 50,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              />
              <Typography
                variant={'h3'}
                fontSize={25}
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
        </Box>
      </Container>
    </>
  )
}
export default Contact
