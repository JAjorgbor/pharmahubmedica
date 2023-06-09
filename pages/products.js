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
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import drugImage from '@/public/drug-image.jpg'
import Meta from '@/components/Meta'
import Filter from '@/components/Products/Filter'

const Products = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const trigger = useScrollTrigger({threshold:220, disableHysteresis: true })
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
          <Toolbar
            sx={{
              width: '100%',
              display: { md: 'none' },
              visibility:trigger?'hidden':'visible',
              backgroundColor: 'complementary.light',
            }}
          >
            <Container>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setOpenFilterDrawer(true)}
              >
               Filter <FilterAltOutlinedIcon sx={{fontSize:'1.1rem'}}/> 
              </Button>
            </Container>
          </Toolbar>
        <Slide direction="down" in={trigger}>
          <Toolbar
            sx={{
              position: 'fixed',
              top: 80,
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
                onClick={() => setOpenFilterDrawer(true)}
              >
                Filter <FilterAltOutlinedIcon sx={{fontSize:'1.1rem'}}/> 
              </Button>
            </Container>
          </Toolbar>
        </Slide>
        <Box sx={{ display: 'flex', position: 'relative' }} gap={4} py={10}>
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
          <Grid
            container
            // gap={2}
            rowGap={3}
            justifyContent={'center'}
            sx={{ flexGrow: 1 }}
          >
            {Array(12)
              .fill(0)
              .map((item, index) => (
                <Grid item xs={6} sm={4} >
                  <ProductCard
                    key={index}
                    alt="demo product"
                    price={1900}
                    imageSrc={drugImage}
                    categoryName={'Category Name'}
                    title={'TYLENOL Cold & Flu Severe Caplets '}
                    starCount={index}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  )
}
export default Products
