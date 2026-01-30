import { ICreateOrder, IOrder } from '@/api-client/interfaces/order.interfaces'
import axiosInstance from '@/api-client/request-adapter'

export const orderRequests = {
  createOrder: (data: ICreateOrder) =>
    axiosInstance({
      method: 'POST',
      url: '/portal/orders',
      data,
    }),

  getOrders: (params?: any) =>
    axiosInstance({
      method: 'GET',
      url: '/portal/orders',
      params,
    }),
  getRecentOrders: () =>
    axiosInstance({
      method: 'GET',
      url: '/portal/orders/recent',
    }),
  getOrderStats: () =>
    axiosInstance({
      method: 'GET',
      url: '/portal/orders/stats',
    }),

  getOrder: (orderId: string) =>
    axiosInstance({
      method: 'GET',
      url: `/portal/orders/${orderId}`,
    }),
}
