import ReferralDetailsSection from '@/components/portal/referrals/referral-details-section'
import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ referralId: string }>
}): Promise<Metadata> {
  const { referralId } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('portalAccessToken')?.value

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/portal/referral-partners/me/referrals/${referralId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await res.json()
    const user = data.user
    return {
      title: user ? `${user.firstName} ${user.lastName}` : 'Referral Details',
    }
  } catch (error) {
    return {
      title: 'Referral Details',
    }
  }
}

const ReferralDetailsPage = () => {
  return <ReferralDetailsSection />
}

export default ReferralDetailsPage
