import { getTopReferralPartners } from '@/api-client/admin/requests/referral-partner.requests'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'
import useSWR from 'swr'

export const useGetTopReferralPartners = () => {
  const fetcher = async () => {
    const {
      data: { partners },
    } = await getTopReferralPartners()
    return partners
  }

  const { data, error, isLoading, mutate } = useSWR<IReferralPartner[]>(
    ['admin/referral-partners/top'],
    fetcher,
  )

  return {
    topReferralPartners: data,
    topReferralPartnersLoading: isLoading,
    topReferralPartnersError: error,
    mutateTopReferralPartners: mutate,
  }
}
