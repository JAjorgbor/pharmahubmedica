'use client'
import { IReferralUser } from '@/api-client/admin/interfaces/referral.interfaces'
import { getReferralPartnerReferrals } from '@/api-client/admin/requests/referral-partner.requests'
import useSWR from 'swr'

export default function useGetReferralPartnerReferrals(id: string) {
  const fetcher = async () => {
    const {
      data: { referrals },
    } = await getReferralPartnerReferrals(id)
    return referrals
  }

  const { data, error, isLoading, mutate } = useSWR<IReferralUser[]>(
    id ? ['admin/referral-partner-referrals', id] : null,
    fetcher,
  )

  return {
    referrals: data,
    referralsError: error,
    referralsLoading: isLoading,
    mutateReferrals: mutate,
  }
}
