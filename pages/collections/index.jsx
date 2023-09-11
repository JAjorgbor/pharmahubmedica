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
import { getCategories } from '@/utils/requests'
import { urlForImage } from '@/sanity/lib/image'
import { useEffect } from 'react'
import useSWR from 'swr'

const Collections = ({ serverCategories }) => {
  const categoriesFetcher = async () => {
    const data = await getCategories()
    return data
  }
  const { data: clientCategories } = useSWR('api/categories', categoriesFetcher)
  const setDefaultValue = (clientValue, serverValue) =>
    clientValue ?? serverValue

  return (
    <>
      <Meta titlePrefix={'Collections'} />
      <Container>
        {/* Breadcrumbs */}
        <BreadCrumbs links={[{ title: 'All Collections', path: '#' }]} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
          }}
          py={8}
        >
          <Grid container gap={{ xs: 1, sm: 2 }} justifyContent={'center'}>
            {setDefaultValue(clientCategories,serverCategories).map(
              (category, index) => (
                <Grid
                  item
                  xs={''}
                  sm={5}
                  md={4}
                  lg={3}
                  sx={{ justifySelf: 'center' }}
                  key={index}
                >
                  <CategoryCard
                    alt={category?.image.alt}
                    imageSrc={urlForImage(category.image).url()}
                    slug={category?.slug}
                    title={category?.name}
                    sx={{
                      width: { xs: 300, sm: 'auto' },
                    }}
                  />{' '}
                </Grid>
              )
            )}
          </Grid>
          {/* <Pagination
            count={5}
            color="primary"
            variant="outlined"
            shape="rounded"
          /> */}
        </Box>
      </Container>
    </>
  )
}
export default Collections

export async function getStaticProps() {
  try {
    const categories = await getCategories()
    return {
      props: {
        serverCategories: categories,
      },
      revalidate: 30,
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        categories: [],
      },
    }
  }
}
