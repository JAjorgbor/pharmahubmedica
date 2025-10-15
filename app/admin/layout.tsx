import AdminHeader from '@/components/scaffold/admin-header'
import AdminSidebar from '@/components/scaffold/admin-sidebar'
import type { FC, ReactNode } from 'react'

interface AdminlayoutProps {
  children: ReactNode
}

export const metadata = { title: { template: '%s | Admin | PharmaHub Medica' } }

const Adminlayout: FC<AdminlayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex gap-3 bg-gray-50">
        <AdminSidebar />
        <div className="flex-grow relative">
          <AdminHeader />
          {children}
        </div>
      </div>
    </>
  )
}
export default Adminlayout
