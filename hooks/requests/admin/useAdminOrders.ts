import { adminOrderRequests } from '@/api-client/admin/requests/order.requests'
import { IOrder, IOrderStats } from '@/api-client/interfaces/order.interfaces'
import useSWR from 'swr'

export const useGetAdminOrders = (params?: any) => {
  const fetcher = async () => {
    const {
      data: { orders },
    } = await adminOrderRequests.getOrders(params)
    return orders
  }

  const { data, error, isLoading, mutate } = useSWR<IOrder[]>(
    ['admin/orders', params],
    fetcher,
  )

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    mutateOrders: mutate,
  }
}

export const useGetAdminOrder = (orderId: string) => {
  const fetcher = async () => {
    const {
      data: { order },
    } = await adminOrderRequests.getOrder(orderId)
    return order
  }
  const { data, error, isLoading, mutate } = useSWR<IOrder>(
    orderId ? ['admin/orders', orderId] : null,
    fetcher,
  )

  return {
    order: data,
    orderLoading: isLoading,
    orderError: error,
    mutateOrder: mutate,
  }
}

export const useGetAdminOrderStats = () => {
  const fetcher = async () => {
    const {
      data: { stats },
    } = await adminOrderRequests.getOrderStats()
    return stats
  }

  const { data, error, isLoading, mutate } = useSWR<IOrderStats>(
    ['admin/orders/stats'],
    fetcher,
  )

  return {
    orderStats: data,
    orderStatsLoading: isLoading,
    orderStatsError: error,
    mutateOrderStats: mutate,
  }
}
