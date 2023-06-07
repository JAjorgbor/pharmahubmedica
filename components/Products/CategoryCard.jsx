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
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Image from 'next/image'

const CustomCard = styled(Card)(({ theme }) => ({
  color: theme.palette.complementary.dark,
  zIndex: '10',
  position: 'relative',
  '&::before,::after': {
    content: "' '",
    width: '100%',
    height: '100%',
    border: `1px solid ${theme.palette.secondary.main} `,
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

const CategoryCard = ({
  alt,
  imageSrc,
  title,
  categoryName,
  ...props
}) => {
  return (
    <>
      <CustomCard
        sx={{ width: 275, borderRadius: '0' }}
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
          gutterBottom
          title={alt}
        >
          <Image alt={'alt'} src={imageSrc} fill style={{objectFit:'cover'}} />
        </CardMedia>
        <CardContent>
          <Typography
            variant="h5"
            textTransform="capitalize"
            textAlign="center"
            fontWeight={'bold'}
            fontSize={20}
            gutterBottom
          >
            {categoryName}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: 0,
              fontSize: 13,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            View Products {' '}
            <FormatListBulletedOutlinedIcon sx={{ fontSize: 16 }} />
          </Button>
        </CardActions>
      </CustomCard>
    </>
  )
}
export default CategoryCard
