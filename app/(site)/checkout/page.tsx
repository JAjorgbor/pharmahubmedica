import CheckoutSection from '@/components/(site)/checkout/checkout-section'
import { Suspense } from 'react'

export const metadata = { title: 'Checkout' }

const CheckoutPage = () => {
  return (
    <Suspense>
      <CheckoutSection />
    </Suspense>
  )
}

export default CheckoutPage
