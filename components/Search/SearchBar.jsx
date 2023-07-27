import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material'
import { useState } from 'react'
import useGetCategoriesList from '@/hooks/useGetCategoriesList'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

const SearchField = styled('input')(({ theme }) => ({
  border: `0.5px solid ${theme.palette.complementary.main}`,
  borderRight: 'none',
  borderRadius: '50px 0 0 50px',
  outline: 'none',
  padding: '0.3rem',
  paddingInline: '1rem',
}))

const SearchBar = ({ searchValue, setSearchValue, styles, ...props }) => {
  const [category, setCategory] = useState('all categories')
  const { categories, isError } = useGetCategoriesList()
  const { register, handleSubmit, control } = useForm()
  const router = useRouter()
  const onSubmit = (data) => {
    router.push(`/search/${data.productName}?category=${data.categoryName}`)
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ ...styles }}
      >
        <Stack
          direction="row"
          sx={{
            width: '100%',
            height: 30,
            backgroundColor: 'white',
            borderRadius: '50px',
          }}
          {...props}
        >
          <SearchField
            type="text"
            required
            {...register('productName')}
            placeholder="Search Products"
            sx={{ flexGrow: 1 }}
            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
          />
          <FormControl sx={{}}>
            <Select
              color="complementary"
              defaultValue='all categories'
              inputProps={{
                sx: { padding: 0.5, border: 'none ' },
              }}
              {...register('categoryName')}
            >
              <MenuItem value="all categories">All Categories</MenuItem>
              {categories?.map((category, index) => (
                <MenuItem key={index} value={category?.name}>
                  {category?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            component={'button'}
            bgcolor={'primary.main'}
            sx={{
              borderRadius: '0 50px 50px 0',
              outline: 'none',
              border: 'none',
            }}
          >
            <IconButton
              sx={{
                padding: 0,
              }}
              // onClick={() => {
              //   router.push(`/search?product={}`)
              // }}
              type="submit"
            >
              <SearchIcon fontSize="small" sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
export default SearchBar
