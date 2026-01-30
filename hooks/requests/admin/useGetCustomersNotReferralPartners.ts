'use client'
import { ICustomer } from '@/api-client/admin/interfaces/customer.interfaces'
import { getCustomersNotReferralPartners } from '@/api-client/admin/requests/customer.requests'
import useSWR from 'swr'

export default function useGetCustomersNotReferralPartners() {
  const fetcher = async () => {
    const {
      data: { customers },
    } = await getCustomersNotReferralPartners()
    return customers.reverse()
  }

  const { data, error, isLoading, mutate } = useSWR<ICustomer[]>(
    'admin/customers/non-referral-partners',
    fetcher
  )

  return {
    customersNotReferrals: data,
    customersNotReferralsError: error,
    customersNotReferralsLoading: isLoading,
    mutateCustomersNotReferrals: mutate,
  }
}
