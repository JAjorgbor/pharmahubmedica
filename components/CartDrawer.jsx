import { Drawer, Typography } from '@mui/material'

const CartDrawer = ({ openCartDrawer, setOpenCartDrawer }) => {
  return (
    <>
      <Drawer
        anchor={'right'}
        open={openCartDrawer}
        onClose={() => {
            setOpenCartDrawer(false)
        }}
        PaperProps={{
          sx: { width:{xs: 240, md:300} },
        }}
      >
        <Typography>this is a drawer</Typography>
      </Drawer>
    </>
  )
}
export default CartDrawer
