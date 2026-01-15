import { adminDeliveryMethodRequests } from '@/api-client/admin/requests/admin.delivery-method.requests'
import useSWR from 'swr'

export const useGetAdminDeliveryMethods = (params?: Record<string, any>) => {
  const { data, error, isLoading, mutate } = useSWR(
    ['admin/delivery-methods', params],
    () => adminDeliveryMethodRequests.getDeliveryMethods(params)
  )

  return {
    deliveryMethods: data?.data || [],
    deliveryMethodsLoading: isLoading,
    deliveryMethodsError: error,
    mutateDeliveryMethods: mutate,
  }
}
