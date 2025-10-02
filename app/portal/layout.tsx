import PortalSidebar from '@/components/scaffold/portal-sidebar'
import type { FC, ReactNode } from 'react'

interface PortallayoutProps {
  children: ReactNode
}

const Portallayout: FC<PortallayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <PortalSidebar />
        <div className="flex-grow">{children}</div>
      </div>
    </>
  )
}
export default Portallayout
