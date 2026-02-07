import ReferralOrderSection from '@/components/portal/referrals/referral-order-section'
import { Suspense, type FC } from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

interface Props {
  params: Promise<{ referralId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { referralId } = await params
  const { orderId } = await searchParams

  if (!orderId || typeof orderId !== 'string') {
    return { title: 'Referral Order' }
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('portalAccessToken')?.value

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/portal/referral-partners/me/referrals/${referralId}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await res.json()
    const orderNumber = data.order?.orderNumber
    return {
      title: orderNumber ? `Order #${orderNumber}` : 'Referral Order',
    }
  } catch (error) {
    return {
      title: 'Referral Order',
    }
  }
}

interface ReferralOrderDetailsPageProps {}

const ReferralOrderDetailsPage: FC<ReferralOrderDetailsPageProps> = ({}) => {
  return (
    <Suspense>
      <ReferralOrderSection />
    </Suspense>
  )
}
export default ReferralOrderDetailsPage
