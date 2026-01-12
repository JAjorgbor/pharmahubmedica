'use client'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'
import { getReferralPartners } from '@/api-client/admin/requests/referral.requests'
import useSWR from 'swr'

export default function useGetReferralPartners(params?: any) {
  const fetcher = async () => {
    const {
      data: { partners },
    } = await getReferralPartners(params)
    return partners.reverse()
  }

  const { data, error, isLoading, mutate } = useSWR<IReferralPartner[]>(
    ['admin/referral-partners', params],
    fetcher
  )

  return {
    referralPartners: data,
    referralPartnersError: error,
    referralPartnersLoading: isLoading,
    mutateReferralPartners: mutate,
  }
}
