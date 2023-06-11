import { useState } from 'react'
import ProductCard from '@/components/Products/ProductCard'
import {
  Box,
  Button,
  Drawer,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Pagination,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import drugImage from '@/public/drug-image.jpg'
import Meta from '@/components/Meta'
import Filter from '@/components/Products/Filter'
import Link from 'next/link'
import BreadCrumbs from '@/components/BreadCrumbs'

const Products = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const trigger = useScrollTrigger({ threshold: 220, disableHysteresis: true })
  return (
    <>
      <Meta titlePrefix={'Products'} />
      <Drawer
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        sx={{ display: { md: 'none' } }}
        PaperProps={{
          sx: { width: 250 },
        }}
      >
        <Filter
          sx={{
            position: 'sticky',
            top: 69,
            minHeight: 300,
            // width:240
            // border: '1px solid red',
          }}
          elevation={0}
        />
      </Drawer>
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs
          links={[
            { title: 'Home', path: '/' },
            { title: 'Products', path: '#' },
          ]}
        />
        <Toolbar
          sx={{
            width: '100%',
            display: { md: 'none' },
            visibility: trigger ? 'hidden' : 'visible',
            backgroundColor: 'complementary.light',
          }}
        >
          <Container>
            <Button
              color="primary"
              variant="outlined"
              endIcon={<FilterAltOutlinedIcon />}
              onClick={() => setOpenFilterDrawer(true)}
            >
              Filter
            </Button>
          </Container>
        </Toolbar>
        <Slide direction="down" in={trigger}>
          <Toolbar
            sx={{
              position: 'fixed',
              top: 80,
              '@media (min-width: 960px)': {
                width: '150px',
              },
              left: 0,
              width: '100%',
              display: { md: 'none' },
              zIndex: 100,
              backgroundColor: 'complementary.light',
            }}
          >
            <Container>
              <Button
                color="primary"
                variant="outlined"
                endIcon={<FilterAltOutlinedIcon />}
                onClick={() => setOpenFilterDrawer(true)}
              >
                Filter
              </Button>
            </Container>
          </Toolbar>
        </Slide>
        <Box
          sx={{ display: 'flex', position: 'relative' }}
          gap={4}
          pt={4}
          pb={10}
        >
          <Box
            sx={{
              width: 240,
              flexShrink: 0,
              position: 'relative',
              top: 0,
              display: { xs: 'none', lg: 'block' },
              // border: '1px solid black',
            }}
          >
            {/* Filter card component for large screens */}
            <Filter
              sx={{
                position: 'sticky',
                top: 69,
                minHeight: 300,

                // border: '1px solid red',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Grid
              container
              columnGap={1}
              rowGap={3}
              justifyContent={'center'}
              sx={{ flexGrow: 1 }}
            >
              {Array(13)
                .fill(0)
                .map((item, index) => (
                  <Grid item xs={''} >
                    <ProductCard
                      key={index}
                      alt="demo product"
                      price={1900}
                      imageSrc={drugImage}
                      categoryName={'Category Name'}
                      title={'TYLENOL Cold & Flu Severe Caplets '}
                      starCount={index}
                      otherStyles={{ width: { xs: 165,sm:200, md: 280 } }}
                    />
                  </Grid>
                ))}
            </Grid>
            <Pagination
              count={5}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default Products
