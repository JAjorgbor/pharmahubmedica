import OrdersSection from '@/components/admin/orders/orders-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = { title: 'Orders' }

export default function OrdersPage() {
  return (
    <>
      <SetHeaderTitle title="Orders" />
      <OrdersSection />
    </>
  )
}
