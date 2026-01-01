import DashboardSection from '@/components/admin/dashboard/dashboard-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <>
      <SetHeaderTitle title="Dashboard" />
      <DashboardSection />
    </>
  )
}
