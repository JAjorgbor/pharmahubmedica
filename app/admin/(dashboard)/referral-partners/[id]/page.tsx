import PartnerDetailssSection from '@/components/admin/referral-partners/partner-details-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = {
  title: 'Partner Referrals',
}

export default async function PartnerReferralsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <SetHeaderTitle title="Partner Referrals" />
      <PartnerDetailssSection partnerId={id} />
    </>
  )
}
