import useManageCart from '@/hooks/useManageCart'
import { Box, CssBaseline } from '@mui/material'
import { createContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import BackToTopButton from './BackToTopButton'
import ContactSpeedDial from './ContactSpeedDial'
import Footer from './scaffold/Footer'
import Header from './scaffold/Header'
import CartDrawer from './Products/CartDrawer'
import Sidebar from './scaffold/Sidebar'

const sidebarWidth = 240
export const CartContext = createContext()

const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openCartDrawer, setOpenCartDrawer] = useState(false) //
  // cart logic hook
  const [cart, dispatch] = useManageCart()
  return (
    <>
      <CssBaseline />
      <CartContext.Provider value={{ cart, dispatch }}>
        <Box>
          <Header
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            setOpenCartDrawer={setOpenCartDrawer}
          />
          <ToastContainer />
          <Sidebar
            sidebarWidth={sidebarWidth}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
          <CartDrawer
            openCartDrawer={openCartDrawer}
            setOpenCartDrawer={setOpenCartDrawer}
          />
          <Box
            component={'main'}
            open={openSidebar}
            sx={{ color: 'complementary.dark' }}
          >
            {children}
          </Box>
          <ContactSpeedDial />
          <BackToTopButton />
          <Footer />
        </Box>
      </CartContext.Provider>
    </>
  )
}
export default Layout
