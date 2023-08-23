import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import ModalWrapper from './ModalWrapper'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const SignInWarning = ({ open, handleClose }) => {
  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <Box padding={1}>
          <Stack
            direction="row"
            alignItem="center"
            sx={{
              padding: 0,
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Typography
              variant={'h3'}
              fontSize={20}
              gutterBottom
              textAlign="center"
              sx={{ color: 'primary.main', fontWeight:'bold' }}
            >
              Warning
            </Typography>
            <IconButton
              variant="contained"
              size="small"
              sx={{
                position: 'absolute',
                padding: 0,
                width: '40px',
                right: 0,
                top: 0,
              }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: 'error.main' }} />
            </IconButton>
          </Stack>
          <Divider />
          <Typography variant={'body1'} fontSize={17} padding={3}>
            You have to be signed in to leave a review
          </Typography>
          <Stack
            direction="row"
            sx={{ marginTop: 3, gap: 1, justifyContent: 'end' }}
          >
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={signIn}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </ModalWrapper>
    </>
  )
}

export default SignInWarning
