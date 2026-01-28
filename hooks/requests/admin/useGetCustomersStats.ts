import { getCustomersStats } from '@/api-client/admin/requests/customer.requests'
import { ICustomerStats } from '@/api-client/admin/interfaces/customer.interfaces'
import useSWR from 'swr'

export const useGetCustomersStats = () => {
  const fetcher = async () => {
    const {
      data: { stats },
    } = await getCustomersStats()
    return stats
  }

  const { data, error, isLoading, mutate } = useSWR<ICustomerStats>(
    ['admin/customers/stats'],
    fetcher,
  )

  return {
    customersStats: data,
    customersStatsLoading: isLoading,
    customersStatsError: error,
    mutateCustomersStats: mutate,
  }
}
