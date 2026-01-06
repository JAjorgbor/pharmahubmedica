import Footer from '@/components/scaffold/footer'
import PortalHeader from '@/components/scaffold/portal-header'
import PortalSidebar from '@/components/scaffold/portal-sidebar'
import type { FC, ReactNode } from 'react'

interface PortallayoutProps {
  children: ReactNode
}

const Portallayout: FC<PortallayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex gap-3 bg-gray-50">
        <PortalSidebar />
        <div className="flex-grow relative">
          <PortalHeader />
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Portallayout
