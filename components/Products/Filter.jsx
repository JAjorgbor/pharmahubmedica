import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Filter = ({ ...props }) => {
  return (
    <>
      <Paper {...props}>
        <Box p={2} border={'1px solid lightgray'}>
            <Button textTransform='uppercase' variant='contained' color='primary'>Reset All Filters</Button>
        </Box>
        <Accordion
          elevation={0}
          sx={{ color:'complementary.dark' }}
          
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{borderBottom: '1px solid lightgray'}}
          >
            <Typography sx={{ textTransform: 'uppercase', fontWeight:'bold' }}>price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                defaultValue="above 5000"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="under 1000"
                  control={<Radio />}
                  label="Under 1000"
                />
                <FormControlLabel
                  value="1000 - 4000"
                  control={<Radio />}
                  label="1000 - 4000"
                />
                <FormControlLabel
                  value="above 5000"
                  control={<Radio />}
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
            <Typography sx={{textTransform:'uppercase', fontWeight:'bold'}}>Category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                defaultValue="cough and cold"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="cough and cold"
                  control={<Radio />}
                  label="cough and cold"
                />
                <FormControlLabel
                  value="pain killers"
                  control={<Radio />}
                  label="Pain Killers"
                />
                <FormControlLabel
                  value="sexual health"
                  control={<Radio />}
                  label="Sexual Health"
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}
export default Filter
