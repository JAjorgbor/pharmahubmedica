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

const SearchFilter = ({ setSpinner = () => {}, classifications, ...props }) => {
  const router = useRouter()
  const { product, ...queryParameters } = router.query
  const { pathname } = router
  const { asPath } = router
  const productName = router.query?.product
  const [priceRange, setPriceRange] = useState(queryParameters.priceRange ?? '')
  const [subClassificationsList, setSubClassificationsList] = useState(
    queryParameters.subClassifications ?? []
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
          {(priceRange || subClassificationsList.length > 0) && (
            <>
              <Button
                textTransform="uppercase"
                variant="contained"
                size="small"
                color="primary"
                sx={{ marginBottom: 1 }}
                onClick={() => {
                  // setSpinner()
                  console.log(productName)

                  router.replace({
                    pathname: `/search/${productName}`,
                    query: {
                      ...queryParameters,
                      priceRange: priceRange,
                      subClassifications: subClassificationsList,
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
                    !queryParameters?.subClassifications
                  ) {
                    setPriceRange('')
                    setSubClassificationsList([])
                    return
                  }
                  setSpinner()
                  router.replace({
                    pathname: `/search/${productName}`,
                    query: {
                      classification: queryParameters.classification,
                      page: queryParameters.page || 1,
                    },
                  })
                  setPriceRange('')
                  setSubClassificationsList([])
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
                defaultValue={queryParameters?.priceRange || ''}
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
              {router.query.classification == 'all categories'
                ? 'Categories'
                : 'Subcategories'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <FormGroup
                name="radio-buttons-group"
                onChange={(e) => {
                  setSubClassificationsList((prevState) => {
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
                {classifications?.map((subcategory, index) => (
                  <FormControlLabel
                    value={subcategory?.name}
                    control={
                      <Checkbox
                        checked={subClassificationsList.includes(
                          subcategory?.name
                        )}
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
export default SearchFilter
