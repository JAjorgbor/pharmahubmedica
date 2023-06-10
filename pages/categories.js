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
import coughAndColdColdImage from '@/public/cough_n_cold-2.jpg'
import Meta from '@/components/Meta'
import Filter from '@/components/Products/Filter'
import Link from 'next/link'
import BreadCrumbs from '@/components/BreadCrumbs'
import CategoryCard from '@/components/Products/CategoryCard'

const Categories = () => {
  return (
    <>
      <Meta titlePrefix={'Categories'} />
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs
          links={[
            { title: 'Home', path: '/' },
            { title: 'All Collections', path: '#' },
          ]}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
          }}
          py={8}
        >
          <Grid
            container
            // gap={{xs:1 ,sm:0}}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {Array(13)
              .fill(0)
              .map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CategoryCard
                    key={index}
                    alt="demo Category"
                    imageSrc={coughAndColdColdImage}
                    categoryName={'Cough and cold'}
                  />{' '}
                </Grid>
              ))}
          </Grid>
          <Pagination
            count={10}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Container>
    </>
  )
}
export default Categories
