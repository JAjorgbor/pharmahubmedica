'use client'
import { adminDeliveryAddressRequests } from '@/api-client/admin/requests/delivery-address.requests'
import { IDeliveryAddress } from '@/api-client/interfaces/delivery-address.interfaces'
import useSWR from 'swr'

export function useGetAdminDeliveryAddresses(userId?: string) {
  const fetcher = async () => {
    if (!userId) return []
    const { data } =
      await adminDeliveryAddressRequests.getDeliveryAddresses(userId)
    return data
  }

  const { data, error, isLoading, mutate } = useSWR<IDeliveryAddress[]>(
    userId ? `admin/customers/${userId}/addresses` : null,
    fetcher,
  )

  return {
    addresses: data || [],
    addressesError: error,
    addressesLoading: isLoading,
    mutateAddresses: mutate,
  }
}
