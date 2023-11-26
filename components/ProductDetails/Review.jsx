import useGetTeamEmails from '@/hooks/useGetTeamEmails'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReplyIcon from '@mui/icons-material/Reply'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useState } from 'react'

const Review = ({ data, setReviewrsName, reviewId, setReviewId, session }) => {
  const [openCollapse, setOpenCollapse] = useState(false)
  const filteredReplies = data?.replies?.filter((reply) => !reply.hideReply)
  const { teamEmails } = useGetTeamEmails()

  return (
    <ListItem sx={{ display: 'block' }}>
      <Card
        sx={{
          border: reviewId === data?._id ? '1px solid blue' : 'none',
        }}
      >
        <CardHeader
          sx={{ paddingBottom: 1 }}
          avatar={
            <Avatar src={data?.user?.profilePhoto} aria-label="profile photo" />
          }
          action={
            teamEmails?.includes(session?.user?.email) && (
              <Tooltip title="Reply Review" arrow placement="top">
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    setReviewrsName(data?.user?.userName)
                    setReviewId(data._id)
                  }}
                >
                  <ReplyIcon />
                </IconButton>
              </Tooltip>
            )
          }
          title={data?.user?.userName}
          subheader={
            <>
              {moment(data?._createdAt).format('MMMM D, YYYY')}
              <br />
              <Rating value={data?.stars} size="small" readOnly />
            </>
          }
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant={'body2'} color="text.secondary">
            {data?.comment}
          </Typography>
        </CardContent>
        {data?.replies && (
          <CardActions sx={{ justifyContent: 'end' }}>
            <Button size="small" onClick={() => setOpenCollapse(!openCollapse)}>
              {!openCollapse
                ? `View ${
                    data?.replies.length > 1 ? data?.replies.length : ''
                  } ${data?.replies.length > 1 ? 'Replies' : 'Reply'}`
                : `Hide ${data?.replies.length > 1 ? 'Replies' : 'Reply'}`}
            </Button>
          </CardActions>
        )}
      </Card>
      {data?.replies && (
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <Stack direction="row">
            <Divider
              orientation="vertical"
              variant="inset"
              flexItem
              sx={{ marginLeft: { xs: 2, sm: 3 } }}
            />
            <List
              component="div"
              disablePadding
              sx={{ width: '100%', flexGrow: 1 }}
            >
              {filteredReplies.map((reply, index) => (
                <ListItem key={index}>
                  <Card
                    sx={{
                      backgroundColor: 'complementary.light',
                      width: '100%',
                    }}
                  >
                    <CardHeader
                      sx={{ paddingBottom: 1 }}
                      avatar={
                        <Avatar
                          src={'/logo mark.png'}
                          aria-label="profile-image"
                        />
                      }
                      title={
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 0.5,
                              alignItems: 'center',
                            }}
                          >
                            PharmaHub Medica{' '}
                            <CheckCircleIcon
                              sx={{
                                color: 'primary.main',
                                margin: 0,
                                fontSize: 15,
                              }}
                            />
                          </Box>
                        </>
                      }
                      subheader={moment(reply?._createdAt).format(
                        'MMMM D, YYYY'
                      )}
                    />
                    <CardContent sx={{ paddingTop: 1 }}>
                      <Typography variant={'body2'} color="text.secondary">
                        {reply?.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Collapse>
      )}
    </ListItem>
  )
}

export default Review
