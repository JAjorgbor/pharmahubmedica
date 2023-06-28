import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  styled,
} from '@mui/material'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import Link from 'next/link'
import Image from 'next/image'

const CustomCard = styled(Card)(({ theme }) => ({
  color: theme.palette.complementary.dark,
  zIndex: '10',
  position: 'relative',
  '&::before,::after': {
    content: "' '",
    width: '100%',
    height: '100%',
    border: `1px solid ${theme.palette.primary.main} `,
    position: 'absolute',
    opacity: '0',
    transition: '1s ease-in-out',
    zIndex: '-1',
  },
  '&::before': {
    top: '0',
    left: '0',
    borderRight: 'none',
    borderBottom: 'none',
    transform: 'scale(0)',
    transformOrigin: 'top left',
  },
  '&::after': {
    bottom: '0',
    right: '0',
    borderLeft: 'none',
    borderTop: 'none',
    transform: 'scale(0)',
    transformOrigin: 'bottom right',
  },

  '&:hover': {
    cursor: 'pointer',
    '&::before,::after': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
}))

const CategoryCard = ({ alt, imageSrc, title, ...props }) => {
  return (
    <>
      <CustomCard
        sx={{ maxWidth: 260, borderRadius: '0', position: 'relative' }}
        px={3}
        elevation={0}
        {...props}
      >
        <CardMedia
          sx={{
            height: 220,
            //  width: 200,
            margin: '2px',
            position: 'relative',
          }}
          title={alt}
        >
          <Link href='/products'>
          <Image
            alt={title}
            src={imageSrc}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            </Link>
        </CardMedia>
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundImage: 'linear-gradient( transparent , rgba(0,0,0,0.8) 90%)',
            color: 'white',
          }}
        >
          <Typography
            variant="h5"
            textTransform="capitalize"
            // textAlign="center"
            fontWeight={'bold'}
            fontSize={20}
            gutterBottom
          >
            {title}
          </Typography>
        </CardContent>
        {/* <CardActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            endIcon={<FormatListBulletedOutlinedIcon fontSize='small' />}
            sx={{
              borderRadius: 0,
              fontSize: 13,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            View Products
            
          </Button>
        </CardActions> */}
      </CustomCard>
    </>
  )
}
export default CategoryCard
