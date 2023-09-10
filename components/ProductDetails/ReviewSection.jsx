import successToast from '@/library/successToast'
import { createProductReview, replyProductReview } from '@/utils/requests'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  List,
  ListItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import SignInWarning from '../Dialogs/SignInWarning'
import Review from './Review'

const ReviewSection = ({ product, reviews, session }) => {
  const [reviewrsName, setReviewrsName] = useState('')
  const [reviewId, setReviewId] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [starError, setStarError] = useState(false)

  const router = useRouter()
  const {
    register,
    watch,
    trigger,
    setFocus,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { stars: 0 },
  })

  const starsCount = watch('stars')
  useEffect(() => {
    // clear review form on route change
    const handleRouteComplete = () => {
      reset()
      setStarError(false)
    }
    router.events.on('routeChangeComplete', handleRouteComplete)
    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  useEffect(() => {
    const resetReviewer = () => {
      setReviewrsName('')
      setReviewId('')
    }
    router.events.on('routeChangeStart', resetReviewer)

    return () => {
      router.events.off('routeChangeStart', resetReviewer)
    }
  }, [])
  useEffect(() => {
    if (reviewrsName) {
      setFocus('comment')
    }
  }, [reviewrsName])
  const FilteredReviews = reviews?.filter(
    (review) => review.hideReview !== true
  )
  const submitHandler = async (data) => {
    if (Number(data.stars) == 0) {
      setStarError(true)
      return
    }
    setStarError(false)
    if (!session?.user) {
      setOpenDialog(true)
      return
    }
    try {
      const { name, email, image } = session.user

      if (!reviewrsName) {
        const reviewData = {
          ...data,
          user: {
            userName: name,
            email,
            profilePhoto: image,
          },
        }
        const res = await createProductReview(reviewData, product._id)
        successToast('Review created successfully!!')
      } else {
        const replyData = {
          _type: 'reply',
          _key: Date.now(),
          comment: data.comment,
          // user: {
          //   userName: name,
          //   email,
          //   profilePhoto: image,
          // },
        }
        const res = await replyProductReview(replyData, reviewId)
        console.log(res)
        successToast('Your reply was sent successfully!!')
      }
      mutate(`api/${product._id}/reviews`)
      reset()
    } catch (error) {
      console.error(error)
    }
  }
  const renderReviewCount = (starCount) => {
    return reviews?.filter((review) => review.stars == starCount)?.length ?? 0
  }
  return (
    <>
      <Stack gap={3}>
        <Stack
          sx={{
            border: '1px solid #f0f0f0',
            maxHeight: { md: 500 },
          }}
          direction={{ md: 'row' }}
          spacing={1}
        >
          <Box
            sx={{
              overflowY: 'auto',
              maxHeight: { xs: 450 },
              order: { xs: 2, md: 1 },
              flexGrow: 1,
            }}
          >
            <Box>
              {FilteredReviews ? (
                <List>
                  {FilteredReviews.reverse().map((review, index) => (
                    <Review
                      data={review}
                      setReviewrsName={setReviewrsName}
                      reviewrsName={reviewrsName}
                      setReviewId={setReviewId}
                      reviewId={reviewId}
                      key={index}
                      session={session}
                    />
                  ))}
                </List>
              ) : (
                <Alert severity="info" variant="outlined" color="primary">
                  <AlertTitle>No Reviews Yet</AlertTitle>
                  Be the first person to leave a review.
                </Alert>
              )}
            </Box>
          </Box>
          {/* Review Summary */}
          <Box
            sx={{
              width: { xs: '100%', md: 300 },
              height: { xs: 340, md: 400 },
              order: { xs: 1, md: 2 },
              backgroundColor: 'complementary.light',
              // padding: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: '100%', paddingInline: 2 }}>
              <Typography fontSize={25} fontWeight={'bold'}>
                Ratings
              </Typography>
              <List sx={{ padding: 0 }}>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={5} readOnly />
                  <Typography variant="caption">
                    {`${renderReviewCount(5)} ${
                      renderReviewCount(5) == 1 ? 'review' : 'reviews'
                    }`}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={4} readOnly />
                  <Typography variant="caption">
                    {`${renderReviewCount(4)} ${
                      renderReviewCount(4) == 1 ? 'review' : 'reviews'
                    }`}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={3} readOnly />
                  <Typography variant="caption">
                    {`${renderReviewCount(3)} ${
                      renderReviewCount(3) == 1 ? 'review' : 'reviews'
                    }`}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={2} readOnly />
                  <Typography variant="caption">
                    {`${renderReviewCount(2)} ${
                      renderReviewCount(2) == 1 ? 'review' : 'reviews'
                    }`}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={1} readOnly />
                  <Typography variant="caption">
                    {`${renderReviewCount(1)} ${
                      renderReviewCount(1) == 1 ? 'review' : 'reviews'
                    }`}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    paddingInline: 0,
                    borderTop: '1px solid lightgray',
                  }}
                >
                  <Typography variant="body1" fontWeight={'bold'}>
                    Total:
                  </Typography>
                  <Typography variant="caption">
                    {[
                      renderReviewCount(5),
                      renderReviewCount(4),
                      renderReviewCount(3),
                      renderReviewCount(2),
                      renderReviewCount(1),
                    ].reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )}{' '}
                    reviews{' '}
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
          {/* End of Review Summary */}
        </Stack>
        <Box>
          {/* Start Review Form */}
          <Box
            component="form"
            sx={{ maxWidth: 900, margin:'auto' }}
            noValidate
            onSubmit={handleSubmit(submitHandler)}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography
                variant="h4"
                fontSize={{ xs: 20, md: 25 }}
                color="primary.main"
                fontWeight={'bold'}
                gutterBottom
              >
                Leave A {reviewrsName ? 'Reply' : 'Review'}
              </Typography>
              {/* hide ratings when replying */}
              {!reviewrsName && (
                <Controller
                  name="stars"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Stack sx={{ textAlign: 'center' }}>
                        <Rating
                          value={Number(field.value)}
                          onChange={(e) => {
                            if (Number(e.target.value) == 0) {
                              console.log('errors')
                              setStarError(true)
                            } else {
                              setStarError(false)
                            }
                            field.onChange(Number(e.target.value))
                          }}
                        />
                        <Typography variant="caption" color="error">
                          {starError && 'Please leave a rating.'}
                        </Typography>
                      </Stack>
                    </>
                  )}
                />
              )}
            </Box>
            <TextField
              label={reviewrsName ? `Reply to ${reviewrsName}` : 'Comment'}
              required
              {...register('comment', { required: 'Please enter a comment' })}
              error={!!errors.comment?.message}
              helperText={errors.comment?.message}
              multiline
              rows={4}
              fullWidth
              sx={{ marginBlock: 2 }}
            />
            <LoadingButton
              variant="contained"
              // manualling triggering rating count validation because react-hook-form for some reason isn't able to do the automatic validation rule for the rating field
              onClick={() => {
                if (Number(starsCount) == 0) {
                  setStarError(true)
                } else {
                  setStarError(false)
                }
              }}
              loading={isSubmitting}
              size="large"
              type="submit"
              sx={{ marginRight: 2 }}
            >
              Submit
            </LoadingButton>
            {reviewrsName && (
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={() => {
                  setReviewrsName('')
                  setReviewId('')
                }}
              >
                Cancel
              </Button>
            )}
          </Box>
          {/* End Review Form */}
        </Box>
      </Stack>
      <SignInWarning
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  )
}

export default ReviewSection
