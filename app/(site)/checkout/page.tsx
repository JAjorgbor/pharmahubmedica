import CheckoutSection from '@/components/(site)/checkout/checkout-section'
import { Suspense } from 'react'

const CheckoutPage = () => {
  return (
    <Suspense>
      <CheckoutSection />
    </Suspense>
  )
}

export default CheckoutPage
