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
import Link from 'next/link'
import { toast } from 'react-toastify'
import CartToastContent from './CartToastContent'
import useTruncateText from '@/hooks/useTruncateWords'
import useFormatAmount from '@/hooks/useFormatAmount'

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
  otherStyles,
  ...props
}) => {

  return (
    <>
      <CustomCard
        sx={{ width: 300, borderRadius: '0', ...otherStyles }}
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
          <Link href="/products/product">
            <Image
              alt={alt}
              src={imageSrc}
              style={{ objectFit: 'contain' }}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </CardMedia>
        <CardContent px={0}>
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
            fontSize={17}
            gutterBottom
          >
            {useTruncateText(title, 30)}
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
            {useFormatAmount(price)}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1,
            paddingBottom: 3,
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            endIcon={<ShoppingBagOutlinedIcon fontSize="small" />}
            sx={{
              fontSize: 11,
              textTransform: 'uppercase',
            }}
            onClick={() => {
              toast(
                <CartToastContent imageSrc={imageSrc} productName={title} />,
                {
                  hideProgressBar: true,
                  autoClose: 3000,
                }
              )
            }}
          >
            Add To Cart
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            endIcon={<AssignmentOutlinedIcon fontSize="small" />}
            sx={{
              fontSize: 11,
              textTransform: 'uppercase',
              marginLeft:'0 !important'
            }}
          >
            <Link
              href="/products/product"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              View Details
            </Link>
          </Button>
        </CardActions>
      </CustomCard>
    </>
  )
}
export default ProductCard
