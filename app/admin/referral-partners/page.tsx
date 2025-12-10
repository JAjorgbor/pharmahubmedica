import ReferralPartnersSection from '@/components/admin/referral-partners/referral-partners-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = {
  title: 'Referral Partners',
}
export default function ReferralPartnerPage() {
  return (
    <>
      <SetHeaderTitle title="Referral Partners" />
      <ReferralPartnersSection />
    </>
  )
}
