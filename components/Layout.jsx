import { Box, Container, CssBaseline, createTheme, styled } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useState, useEffect, createContext } from 'react'
import useUpdateCart from '@/Hooks/useUpdateCart'
import BackToTopButton from './BackToTopButton'
import ContactSpeedDial from './ContactSpeedDial'
import CartDrawer from './Products/CartDrawer'

const sidebarWidth = 240
const CartContext = createContext()

const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openCartDrawer, setOpenCartDrawer] = useState(false) //
  // cart logic hook
  const [cartValue, dispatch] = useUpdateCart()
  return (
    <>
      <CssBaseline />
      <CartContext.Provider value={{ cartValue, dispatch }}>
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} setOpenCartDrawer={setOpenCartDrawer}/>

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
      </CartContext.Provider>
    </>
  )
}
export default Layout

export { CartContext }
