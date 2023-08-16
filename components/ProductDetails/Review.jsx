import ReplyIcon from '@mui/icons-material/Reply'
import {
  Avatar,
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
import { useState } from 'react'
import moment from 'moment'

const Review = ({ data, setReviewrsName, setReviewId }) => {
  const [openCollapse, setOpenCollapse] = useState(false)
  return (
    <ListItem sx={{ display: 'block' }}>
      <Card>
        <CardHeader
          sx={{ paddingBottom: 1 }}
          avatar={
            <Avatar src={data?.user?.profilePhoto} aria-label="profile photo" />
          }
          action={
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
              {!openCollapse ? 'View' : 'Hide'} Replies
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
              sx={{width:'100%', flexGrow:1}}            >
              {data.replies.map((reply, index) => (
                <ListItem key={index}>
                  <Card
                    sx={{
                      backgroundColor: 'complementary.light',
                      width:'100%'
                    }}
                  >
                    <CardHeader
                      sx={{ paddingBottom: 1 }}
                      avatar={
                        <Avatar
                          src={reply.user.profilePhoto}
                          aria-label="profile-image"
                        />
                      }
                      title={reply.user.userName}
                      subheader={moment(reply?._createdAt).format(
                        'MMMM D, YYYY'
                      )}
                    />
                    <CardContent sx={{ paddingTop: 1 }}>
                      <Typography variant={'body2'} color="text.secondary">
                        {reply.comment}
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
