import { portalDeliveryAddressRequests } from '@/api-client/portal/requests/delivery-address.requests'
import useSWR from 'swr'

export const useGetDeliveryAddresses = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    ['portal/delivery-address', userId],
    () => portalDeliveryAddressRequests.getDeliveryAddresses(userId!)
  )

  return {
    addresses: data?.data || [],
    addressesLoading: isLoading,
    addressesError: error,
    mutateAddresses: mutate,
  }
}
