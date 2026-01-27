import { IOrder, IOrderStats } from '@/api-client/interfaces/order.interfaces'
import { orderRequests } from '@/api-client/portal/requests/order.requests'
import useSWR from 'swr'

export const useGetPortalOrders = (params?: any) => {
  const fetcher = async () => {
    const {
      data: { orders },
    } = await orderRequests.getOrders(params)
    return orders
  }
  const { data, error, isLoading, mutate } = useSWR<IOrder[]>(
    ['portal/orders', params],
    fetcher,
  )

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    mutateOrders: mutate,
  }
}
export const useGetPortalRecentOrders = () => {
  const fetcher = async () => {
    const {
      data: { orders },
    } = await orderRequests.getRecentOrders()
    return orders
  }
  const { data, error, isLoading, mutate } = useSWR<IOrder[]>(
    ['portal/orders/recent'],
    fetcher,
  )

  return {
    recentOrders: data || [],
    recentOrdersLoading: isLoading,
    recentOrdersError: error,
    mutateRecentOrders: mutate,
  }
}

export const useGetPortalOrder = (orderId: string) => {
  const fetcher = async () => {
    const {
      data: { order },
    } = await orderRequests.getOrder(orderId)
    return order
  }

  const { data, error, isLoading, mutate } = useSWR<IOrder>(
    orderId ? [`portal/orders`, orderId] : null,
    fetcher,
  )

  return {
    order: data,
    orderLoading: isLoading,
    orderError: error,
    mutateOrder: mutate,
  }
}

export const useGetPortalOrderStats = () => {
  const fetcher = async () => {
    const {
      data: { stats },
    } = await orderRequests.getOrderStats()
    return stats
  }

  const { data, error, isLoading, mutate } = useSWR<IOrderStats>(
    [`portal/orders/stats`],
    fetcher,
  )

  return {
    orderStats: data,
    orderStatsLoading: isLoading,
    orderStatsError: error,
    mutateOrderStats: mutate,
  }
}
