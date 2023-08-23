import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQSection = ({ faqs }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <>
      {faqs &&
        faqs.map((faq,index) => {
          return (
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              elevation={0}
              sx={{ borderTop: '1px solid lightgray' }}
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
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="complementary.main">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}
    </>
  )
}
export default FAQSection
