import DeliveryMethodsSection from '@/components/admin/delivery-methods/delivery-methods-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delivery Methods',
  description: 'Manage delivery methods and shipping fees',
}

const DeliveryMethodsPage = () => {
  return <DeliveryMethodsSection />
}

export default DeliveryMethodsPage
