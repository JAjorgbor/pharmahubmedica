import Footer from '@/components/scaffold/footer'
import Header from '@/components/scaffold/header'
import type { FC, ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
export default layout
