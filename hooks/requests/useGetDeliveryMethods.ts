import { siteDeliveryMethodRequests } from '@/api-client/site/requests/delivery-method.requests'
import useSWR from 'swr'

export const useGetDeliveryMethods = (params?: Record<string, any>) => {
  const { data, error, isLoading, mutate } = useSWR(
    ['delivery-methods', params],
    () => siteDeliveryMethodRequests.getDeliveryMethods(params)
  )

  return {
    deliveryMethods: data?.data || [],
    deliveryMethodsLoading: isLoading,
    deliveryMethodsError: error,
    mutateDeliveryMethods: mutate,
  }
}
