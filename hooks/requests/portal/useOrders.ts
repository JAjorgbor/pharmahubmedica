import { IOrder } from '@/api-client/interfaces/order.interfaces'
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
    fetcher
  )

  return {
    orders: data || [],
    ordersLoading: isLoading,
    ordersError: error,
    mutateOrders: mutate,
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
    fetcher
  )

  return {
    order: data,
    orderLoading: isLoading,
    orderError: error,
    mutateOrder: mutate,
  }
}
