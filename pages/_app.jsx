import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps, session }) {
  const router = useRouter()
  NProgress.configure({ showSpinner: false })

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])
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
        <ThemeProvider theme={customTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider theme={customTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}
