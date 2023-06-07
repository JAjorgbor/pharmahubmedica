import { Box, Container, createTheme, styled } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'

const customTheme = createTheme({
  palette: {
    primary: {
        main: '#1a20f6',
    },
    secondary: {
      main: '#c91919',
    },
    // custom color variable
    complementary:{
        main:'#979797',
        light:'#f0f0f0',
        dark:'#3c3c3c'
    }
  },
  shape:{
    borderRadius:0
  }
})

const sidebarWidth = 240
const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <Sidebar
          sidebarWidth={sidebarWidth}
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

        <Box component={'main'} open={openSidebar} sx={{color:'complementary.dark'}}>
          {children}
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  )
}
export default Layout
