import BreadCrumbs from '@/components/BreadCrumbs'
import FAQSection from '@/components/FAQSection'
import { CartContext } from '@/components/Layout'
import Meta from '@/components/Meta'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import useGetContactInfo from '@/hooks/useGetContactInfo'
import successToast from '@/library/successToast'
import { getContact, getFaqs } from '@/utils/requests'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const ContactPage = ({ contactInfo: serverContactInfo, faqs: serverFaqs }) => {
  const { cartValue, dispatch } = useContext(CartContext)
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm()
  // submit contact form message
  const submitMessage = async (data) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(res)
      successToast('Your Message has been sent successfully.')
      // reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
      console.error(error)
    }
  }
  const { data: clientFaqs } = useSWR('api/faqs', async () => {
    const faqs = await getFaqs()
    return faqs
  })
  const { contactInfo: clientContactInfo } = useGetContactInfo()
  const handleDefaultValue = (serverValue, clientValue) => {
    return clientValue ?? serverValue
  }
  const faqs = handleDefaultValue(serverFaqs, clientFaqs)
  const contactInfo = handleDefaultValue(serverContactInfo, clientContactInfo)
  return (
    <>
      <Meta titlePrefix="Contact" />
      <Container>
        <BreadCrumbs links={[{ title: 'Contact Us', path: '/contact' }]} />
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
                {contactInfo?.address}{' '}
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
                <Link href={`tel:${contactInfo?.callNumber}`}>
                  {contactInfo?.callNumber}
                </Link>
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
                <Link href={`mailto:${contactInfo?.email}`}>
                  {contactInfo?.email}
                </Link>
              </Typography>
            </Paper>{' '}
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
              <PeopleOutlineIcon
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
                Social Media
              </Typography>
              <Typography
                varaint="body2"
                color="complementary.main"
                fontSize={14}
              >
                <Stack sx={{alignItems:'center', gap:1}}>
                  <Link
                    target="_blank"
                    style={{ display: 'flex', gap: 5 }}
                    href={contactInfo?.facebookAccount ?? ''}
                  >
                    <FacebookOutlinedIcon />
                    {contactInfo?.facebookAccount?.replace('https://', '')}
                  </Link>
                  <Link
                    target="_blank"
                    style={{ display: 'flex', gap: 5 }}
                    href={contactInfo?.instagramAccount ?? ''}
                  >
                    <InstagramIcon />
                    {contactInfo?.instagramAccount?.replace('https://', '')}
                  </Link>
                </Stack>
              </Typography>
            </Paper>{' '}
          </Stack>

          <Divider sx={{ marginBlockStart: 3, marginBlockEnd: 10 }} />
          <Stack direction={{ md: 'row' }} gap={3}>
            <Box
              component="form"
              onSubmit={handleSubmit(submitMessage)}
              // action=''
              noValidate
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
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label=" First Name"
                    {...register('firstName', {
                      required: 'Please enter your first name.',
                    })}
                    error={errors.firstName?.message}
                    helperText={errors.firstName?.message}
                    fullWidth
                  />
                  <TextField
                    label=" Last Name"
                    {...register('lastName', {
                      required: 'Please enter your lastName.',
                    })}
                    error={errors.lastName?.message}
                    helperText={errors.lastName?.message}
                    fullWidth
                  />
                </Stack>
                <TextField
                  type="email"
                  label=" Email Address"
                  {...register('email', {
                    required: 'Please enter your email address',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  error={errors.email?.message}
                  helperText={errors.email?.message}
                  fullWidth
                />
                <TextField
                  label=" Message"
                  {...register('message', {
                    required: 'Please enter a message.',
                  })}
                  error={errors.message?.message}
                  helperText={errors.message?.message}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Stack>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                size="large"
                sx={{ marginTop: 2, paddingInline: 5 }}
              >
                Send Message
              </LoadingButton>
            </Box>

            <Box component="section" id="faqs" sx={{ width: { md: '100%' } }}>
              <Typography
                variant="h3"
                fontSize={24}
                fontWeight={'bold'}
                mb={4}
                textTransform={'Capitalize'}
              >
                Frequently Asked Questions{' '}
              </Typography>
              <FAQSection faqs={faqs} />
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  )
}
export default ContactPage

export async function getStaticProps() {
  const contactInfo = await getContact()
  const faqs = await getFaqs()

  return { props: { contactInfo, faqs }, revalidate: 30 }
}
