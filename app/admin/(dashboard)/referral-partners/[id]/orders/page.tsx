import PartnerOrdersSection from '@/components/admin/referral-partners/partner-orders-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'
import { Suspense } from 'react'

export const metadata = {
  title: 'Referral Orders',
}

export default async function ReferralOrdersPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <SetHeaderTitle title="Referral Orders" />
      <Suspense>
        <PartnerOrdersSection partnerId={id} />
      </Suspense>
    </>
  )
}
