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
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
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

const ProductCard = ({
  alt,
  imageSrc,
  title,
  categoryName,
  price,
  starCount,
  ...props
}) => {
  const formatAmount = (amount) => {
    const result = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount)
    return result
  }
  return (
    <>
      <CustomCard
        sx={{ maxWidth: 280, borderRadius: '0' }}
        px={3}
        elevation={0}
        {...props}
      >
        <CardMedia
          sx={{
            height: 200,
            //  width: 200,
            margin: '2px',
            position: 'relative',
          }}
          title={alt}
        >
          <Image
            alt={alt}
            src={imageSrc}
            style={{objectFit:'cover'}}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardMedia>
        <CardContent>
          <Typography
            variant="body1"
            fontSize={11}
            textTransform={'uppercase'}
            textAlign="center"
            fontWeight={'bold'}
            color="complementary.main"
            gutterBottom
          >
            {categoryName}
          </Typography>
          <Typography
            variant="h5"
            textTransform="capitalize"
            textAlign="center"
            fontWeight={'bold'}
            fontSize={20}
            gutterBottom
          >
            {title}
          </Typography>
          <Box sx={{ textAlign: 'center', margin: 'auto' }}>
            <Rating
              value={starCount}
              readOnly
              size="small"
              //   sx={{ textAlign: 'center', margin: 'auto' }}
            />
          </Box>
          <Typography
            variant="h6"
            fontSize={20}
            textAlign={'center'}
            color={'primary.main'}
          >
            {' '}
            {formatAmount(price)}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            rowGap: 2,
            paddingBottom: 3,
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{
              fontSize: 13,
              textTransform: 'uppercase',
            }}
          >
            Add To Cart
            <ShoppingBagOutlinedIcon sx={{ fontSize: 16 }} />
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              fontSize: 13,
              textTransform: 'uppercase',
            }}
          >
            View Details
            <AssignmentOutlinedIcon sx={{ fontSize: 16 }} />
          </Button>
        </CardActions>
      </CustomCard>
    </>
  )
}
export default ProductCard
