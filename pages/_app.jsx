import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#031d91',
      },
      secondary: {
        main: '#c91919',
      },
      // custom color variable
      complementary: {
        main: '#979797',
        light: '#f0f0f0',
        dark: '#3c3c3c',
      },
    },
    shape: {
      borderRadius: 0,
    },
  })

  if (Component.dontShowLayout) {
    return (
      <>
        <ToastContainer />
        <ThemeProvider theme={customTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
  return (
    <>
      <ThemeProvider theme={customTheme}>
    <ToastContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
