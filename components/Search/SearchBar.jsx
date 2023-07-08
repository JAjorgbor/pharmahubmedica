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
  return (
    <>
      <Stack
        direction="row"
        sx={{ width: '100%', height: 30, backgroundColor: 'white', ...styles }}
        {...props}
      >
        <SearchField
          type="text"
          placeholder="Search Products"
          sx={{ flexGrow: 1 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FormControl sx={{}}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            color="complementary"
            inputProps={{
              sx: { padding: 0.5, border: 'none ' },
            }}
          >
            <MenuItem value="all categories">All Categories</MenuItem>
            <MenuItem value="sexual health">Sexual health</MenuItem>
            <MenuItem value="cough and cold">Cough and cold</MenuItem>
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
          >
            <SearchIcon fontSize="small" sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Stack>
    </>
  )
}
export default SearchBar
