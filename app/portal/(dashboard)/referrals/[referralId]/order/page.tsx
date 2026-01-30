import ReferralOrderSection from '@/components/portal/referrals/referral-order-section'
import { Suspense, type FC } from 'react'

interface ReferralOrderDetailsPageProps {}

const ReferralOrderDetailsPage: FC<ReferralOrderDetailsPageProps> = ({}) => {
  return (
    <Suspense>
      <ReferralOrderSection />
    </Suspense>
  )
}
export default ReferralOrderDetailsPage
