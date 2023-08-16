import {
  createProductReview,
  replyProductReview
} from '@/utils/requests'
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
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import Review from './Review'

const ReviewSection = ({ product, reviews }) => {
  const { data: session } = useSession()
  const [reviewrsName, setReviewrsName] = useState('')
  const [reviewId, setReviewId] = useState('')
  
  const {
    register,
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { stars: 1 },
  })
  //   useEffect(() => {
  //     const subscribe = watch((value) => {
  //       console.log(value)
  //     })
  //     return () => subscribe.unsubscribe()
  //   }, [])
  const submitHandler = async (data) => {
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
        console.log(res)
        toast.success('Review created successfully!!')
      } else {
        const replyData = {
          _type: 'reply',
          key: Date.now(),
          comment: data.comment,
          user: {
            userName: name,
            email,
            profilePhoto: image,
          },
        }
        const res = await replyProductReview(replyData, reviewId)
        console.log(res)
        toast.success('Your reply was sent successfully!!')
      }
      mutate(`api/${product._id}/reviews`)
      reset()
    } catch (error) {
      console.error(error)
    }
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
              order:{xs:2,md:1},
              flexGrow: 1,
            }}
          >
            <Box>
              {reviews ? (
                <List>
                  {reviews
                    .reverse()
                    .map((review, index) => (
                      <Review
                        data={review}
                        setReviewrsName={setReviewrsName}
                        setReviewId={setReviewId}
                        key={index}
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
              order:{xs:1,md:2},
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
                  <Typography variant="caption">70 reviews</Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={4} readOnly />
                  <Typography variant="caption">60 reviews</Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={3} readOnly />
                  <Typography variant="caption">50 reviews</Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={2} readOnly />
                  <Typography variant="caption">40 reviews</Typography>
                </ListItem>
                <ListItem
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingInline: 0,
                  }}
                >
                  <Rating value={1} readOnly />
                  <Typography variant="caption">30 reviews</Typography>
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
                  <Typography variant="body2">20 </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
          {/* End of Review Summary */}
        </Stack>
        {/* Start Review Form */}
        <Box component="form" noValidate onSubmit={handleSubmit(submitHandler)}>
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
              Leave A {reviewrsName?'Reply':'Review'}
            </Typography>
            {/* hide ratings when replying */}
            {!reviewrsName && (
              <Controller
                name="stars"
                control={control}
                render={({ field }) => (
                  <Rating
                    value={field.value}
                    onChange={(event, newValue) => {
                      if (newValue === null || newValue === 0) {
                        field.onChange(1)
                      } else {
                        field.onChange(newValue)
                      }
                    }}
                  />
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
      </Stack>
    </>
  )
}

export default ReviewSection
