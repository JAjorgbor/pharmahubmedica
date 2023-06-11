import { Box, Container, CssBaseline, createTheme, styled } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import BackToTopButton from './BackToTopButton'
import ContactSpeedDial from './ContactSpeedDial'

const sidebarWidth = 240
const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <>
      <CssBaseline />

      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <Sidebar
        sidebarWidth={sidebarWidth}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
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
    </>
  )
}
export default Layout
