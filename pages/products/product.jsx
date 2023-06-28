import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Rating,
  Divider,
  TextField,
  Tab,
} from '@mui/material'
import { TabPanel, TabContext, TabList } from '@mui/lab'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useState, useEffect } from 'react'
import drugImage from '@/public/drug-image.jpg'
import BreadCrumbs from '@/components/BreadCrumbs'
import Image from 'next/image'
import Meta from '@/components/Meta'
import HorizontalScrollSection from '@/components/HomePage/HorizontalScrollSection'
import ProductCard from '@/components/Products/ProductCard'
import Link from 'next/link'
import { toast } from 'react-toastify'
import CartToastContent from '@/components/Products/CartToastContent'
import useFormatAmount from '@/Hooks/useFormatAmount'
import CustomCounter from '@/components/Products/CustomCounter'

const Product = () => {
  const [count, setCount] = useState(1)
  const [tabValue, setTabValue] = useState('description')

  return (
    <>
      <Meta titlePrefix={'Product Name'} />
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs
          links={[
            { title: 'Home', path: '/' },
            { title: 'Products', path: '/products' },
            { title: 'Product Name', path: '#' },
          ]}
        />
        <Box py={5}>
          <Stack direction={{ md: 'row' }} gap={4}>
            <Box
              sx={{
                position: 'relative',
                minWidth: '35%',
                minHeight: 350,
                flexGrow: 0,
              }}
            >
              <Image
                src={drugImage}
                alt={'product image'}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ height: 250, flexGrow: 1 }}>
              <Typography
                variant="h2"
                fontWeight={'bold'}
                color="primary.main"
                fontSize={'1.8rem'}
                gutterBottom
              >
                TYLENOL Cold & Flu Severe Caplets
              </Typography>
              <Rating
                value={3}
                readOnly
                size="small"
                //   sx={{ textAlign: 'center', margin: 'auto' }}
              />{' '}
              <Typography variant="caption" component="sup" fontSize={11}>
                (26)
              </Typography>
              <Typography color="primary.main" variant="h5" fontWeight={'bold'}>
                {useFormatAmount(1900)}
              </Typography>
              <Divider sx={{ marginBlock: 3 }} />
              <Stack direction="row" spacing={3}>
              <CustomCounter count={count} setCount={setCount} />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ShoppingBagOutlinedIcon />}
                  sx={{
                    fontSize: 13,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    toast(
                      <CartToastContent
                        imageSrc={drugImage}
                        productName={'TYLENOL Cold & Flu Severe Caplets'}
                      />,
                      {
                        hideProgressBar: true,
                        autoClose: 3000,
                      }
                    )
                  }}
                >
                  Add To Cart
                </Button>
              </Stack>
              <Divider sx={{ marginBlock: 3 }} />
              <Button
                size="large"
                endIcon={<WhatsAppIcon />}
                color="success"
                variant="contained"
              >
                Buy On Whatsapp
              </Button>
            </Box>
          </Stack>
          <Box mt={15}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={(event, newValue) => {
                    setTabValue(newValue)
                  }}
                  aria-label="Product Information Tabs "
                >
                  <Tab
                    label="Description"
                    sx={{ fontWeight: 'bold' }}
                    value="description"
                  />
                  <Tab
                    label="Reviews(0)"
                    sx={{ fontWeight: 'bold' }}
                    value="Reviews"
                  />
                </TabList>
              </Box>
              <TabPanel value="description">
                {' '}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis ullam alias possimus necessitatibus natus aliquam
                velit, beatae quam animi fugit, et laborum modi laudantium
                exercitationem ipsum pariatur rem in nam.
              </TabPanel>
              <TabPanel value="Reviews">Reviews</TabPanel>
            </TabContext>
          </Box>
          <Box mt={5} sx={{ position: 'relative' }}>
            <Typography
              variant="h5"
              textTransform="uppercase"
              fontWeight={'bold'}
              fontSize={20}
              gutterBottom
            >
              Similar products
            </Typography>
            <Typography
              fontWeight={'bold'}
              fontSize={14}
              variant="body1"
              textAlign="end"
              marginRight={'5.2%'}
              marginBottom={3}
              color="primary.main"
            >
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <Button
                  size="small"
                  sx={{ typography: 'caption', fontWeight: 'bold' }}
                  endIcon={<EastOutlinedIcon />}
                >
                  View More
                </Button>
              </Link>
            </Typography>
            <Container>
              <HorizontalScrollSection>
                {Array(8)
                  .fill(0)
                  .map((item, index) => (
                    <ProductCard
                      key={index}
                      alt="demo product"
                      price={1900}
                      imageSrc={drugImage}
                      categoryName={'Category Name'}
                      title={'TYLENOL Cold & Flu Severe Caplets |'}
                      starCount={index}
                      otherStyles={{ marginInline: 1 }}
                      // sx={{ marginInline: 1 }}
                    />
                  ))}
              </HorizontalScrollSection>
            </Container>
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default Product
