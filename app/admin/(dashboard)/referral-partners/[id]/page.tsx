import PartnerDetailssSection from '@/components/admin/referral-partners/partner-details-section'

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
      <PartnerDetailssSection partnerId={id} />
    </>
  )
}
