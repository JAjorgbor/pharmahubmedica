import { Fab, Fade, Slide, useScrollTrigger } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const BackToTopButton = () => {
  const trigger = useScrollTrigger({
    threshold: 200, // Pixels scrolled before trigger is activated
    disableHysteresis: true, // Disable the "hysteresis" effect
  })
  return (
    <>
      <Slide in={trigger}>
        <Fab
          aria-label="scroll back to top"
          //   size={{ xs: 'small', md: 'medium', lg: 'large' }}
          size="medium"
          color="primary"
          sx={{ position: 'fixed', bottom: 0, right: 16, borderRadius: 10 }}
          onClick={() => {
            document
              .getElementById('header')
              .scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: '2.5rem' }} />
        </Fab>
      </Slide>
    </>
  )
}
export default BackToTopButton
