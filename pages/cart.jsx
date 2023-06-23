import Meta from '@/components/Meta'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'

const Cart = () => {
  return (
    <>
      <Meta titlePrefix={'Cart'} />
      <Box my={5}>
        <Container>
          <Stack direction={{md:"row"}} gap={3}>
            <Box sx={{flexGrow:1}}>
              <Stack direction={'row'} justifyContent={'space-evenly'}>
                <Typography
                  variant="h6"
                  fontSize={16}
                  textTransform={'uppercase'}
                  fontWeight={'bold'}
                >
                  Product
                </Typography>
                <Typography
                  variant="h6"
                  fontSize={16}
                  textTransform={'uppercase'}
                  fontWeight={'bold'}
                >
                  Price
                </Typography>
                <Typography
                  variant="h6"
                  fontSize={16}
                  textTransform={'uppercase'}
                  fontWeight={'bold'}
                >
                  Quantity
                </Typography>
                <Typography
                  variant="h6"
                  fontSize={16}
                  textTransform={'uppercase'}
                  fontWeight={'bold'}
                >
                  Subtotal
                </Typography>
              </Stack>
              <Divider sx={{marginBlock:2}}/>
            </Box>
            <Box sx={{width:200, height:400,border:'1px solid red'}}>
<Typography variant='h3'>Box</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
export default Cart
