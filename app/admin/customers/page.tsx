import CustomersSection from '@/components/admin/customers/customers-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export default function UsersPage() {
  return (
    <>
      <SetHeaderTitle title="Customers" />
      <CustomersSection />
    </>
  )
}
