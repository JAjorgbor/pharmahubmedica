'use client'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'
import { getReferralPartner } from '@/api-client/admin/requests/referral-partner.requests'
import useSWR from 'swr'

export default function useGetReferralPartner(id: string) {
  const fetcher = async () => {
    const {
      data: { partner },
    } = await getReferralPartner(id)
    return partner
  }

  const { data, error, isLoading, mutate } = useSWR<IReferralPartner>(
    id ? ['admin/referral-partner', id] : null,
    fetcher,
  )

  return {
    referralPartner: data,
    referralPartnerError: error,
    referralPartnerLoading: isLoading,
    mutateReferralPartner: mutate,
  }
}
