import { getProductsStats } from '@/api-client/admin/requests/product.requests'
import { IProductStats } from '@/api-client/interfaces/product.interfaces'
import useSWR from 'swr'

export const useGetProductsStats = () => {
  const fetcher = async () => {
    const {
      data: { stats },
    } = await getProductsStats()
    return stats
  }

  const { data, error, isLoading, mutate } = useSWR<IProductStats>(
    ['admin/products/stats'],
    fetcher,
  )

  return {
    productsStats: data,
    productsStatsLoading: isLoading,
    productsStatsError: error,
    mutateProductsStats: mutate,
  }
}
