import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        elevation={0}
        sx={{borderTop:'1px solid lightgray'}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: 15,
              textTransform: 'capitalize',
            }}
          >
            Is Pharmahubmedica a Registered Nigerian Pharmarcy
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='complementary.main'>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        elevation={0}
        sx={{borderTop:'1px solid lightgray'}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: 15,
              textTransform: 'capitalize',
            }}
          >
            Can I make payments on this website
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='complementary.main'>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        elevation={0}
        sx={{borderTop:'1px solid lightgray'}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: 15,
              textTransform: 'capitalize',
            }}
          >
            Do you make deliveries
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='complementary.main'>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        elevation={0}
        sx={{borderTop:'1px solid lightgray'}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: 15,
              textTransform: 'capitalize',
            }}
          >
            Do you deliver outside abuja
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='complementary.main'>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default FAQSection
