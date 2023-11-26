import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Filter = ({ setSpinner = () => {}, subcategories, ...props }) => {
  const router = useRouter()
  const { category, ...queryParameters } = router.query
  const { pathname } = router
  const { asPath } = router
  const categorySlug = router.query?.category
  const [priceRange, setPriceRange] = useState(queryParameters.priceRange ?? '')
  const [subcategoryList, setSubcategoryList] = useState(
    queryParameters.subcategories ?? []
  )
  return (
    <>
      <Paper {...props}>
        <Box p={1} border={'1px solid lightgray'}>
          <Typography
            component="h3"
            fontSize={15}
            fontWeight={'bold'}
            textAlign="center"
            color="primary"
            marginBottom={1}
          >
            <Button color="primary" endIcon={<FilterAltOutlinedIcon />}>
              Filters
            </Button>
          </Typography>
          {(priceRange || subcategoryList.length > 0) && (
            <>
              <Button
                textTransform="uppercase"
                variant="contained"
                size="small"
                color="primary"
                sx={{ marginBottom: 1 }}
                onClick={() => {
                  let {
                    priceRange: queryPriceRange,
                    subcategories: querySubcategories,
                  } = router.query
                  querySubcategories = querySubcategories ?? ''
                  if (
                    queryPriceRange == priceRange &&
                    querySubcategories === subcategoryList.join()
                  ) {
                    return
                  }
                  setSpinner()
                  router.replace({
                    pathname: `/collections/${category}`,
                    query: {
                      ...queryParameters,
                      priceRange: priceRange,
                      subcategories: subcategoryList,
                    },
                  })
                }}
              >
                Set Filters
              </Button>
              <Button
                textTransform="uppercase"
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                  if (
                    !queryParameters?.priceRange &&
                    !queryParameters?.subcategories
                  ) {
                    setPriceRange('')
                    setSubcategoryList([])
                    return
                  }
                  setSpinner()
                  router.replace({
                    pathname: `/collections/${categorySlug}`,
                    query: {
                      page: queryParameters.page,
                    },
                  })
                  setPriceRange('')
                  setSubcategoryList([])
                }}
              >
                Reset All Filters
              </Button>
            </>
          )}
        </Box>
        <Accordion elevation={0} sx={{ color: 'complementary.dark' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ borderBottom: '1px solid lightgray' }}
          >
            <Typography
              sx={{
                fontSize: 14,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              price
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                name="radio-buttons-group"
                onChange={(e) => {
                  setPriceRange(e.target.value)
                }}
              >
                <FormControlLabel
                  value="price < 1000"
                  control={<Radio checked={priceRange == 'price < 1000'} />}
                  label="Below 1000"
                />
                <FormControlLabel
                  value="1000 - 5000"
                  control={<Radio checked={priceRange == '1000 - 5000'} />}
                  label="1000 - 5000"
                />
                <FormControlLabel
                  value="price > 5000"
                  control={<Radio checked={priceRange == 'price > 5000'} />}
                  label="Above 5000"
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          //   sx={{ border: '1px solid lightgray' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ borderBottom: '1px solid lightgray' }}
          >
            <Typography
              sx={{
                fontSize: 14,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              Subcategories
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <FormGroup
                defaultValue="cough and cold"
                name="radio-buttons-group"
                onChange={(e) => {
                  setSubcategoryList((prevState) => {
                    const array = [...prevState]
                    if (!e.target.checked) {
                      array.splice(
                        prevState.indexOf(e.target.value),
                        prevState.indexOf(e.target.value) + 1
                      )
                    } else {
                      array.push(e.target.value)
                    }
                    return array
                  })
                }}
              >
                {subcategories?.map((subcategory, index) => (
                  <FormControlLabel
                    value={subcategory?.name}
                    control={
                      <Checkbox
                        checked={subcategoryList.includes(subcategory?.name)}
                      />
                    }
                    label={subcategory?.name}
                    key={index}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}
export default Filter
