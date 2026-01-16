import {
  IOrder,
  IUpdateOrderStatus,
} from '@/api-client/interfaces/order.interfaces'
import adminRequestAdapter from '@/api-client/admin/request-adapter'

export const adminOrderRequests = {
  getOrders: () =>
    adminRequestAdapter({
      method: 'GET',
      url: '/admin/orders',
    }),

  getOrder: (orderId: string) =>
    adminRequestAdapter({
      method: 'GET',
      url: `/admin/orders/${orderId}`,
    }),

  updateOrderStatus: (orderId: string, data: any) =>
    adminRequestAdapter({
      method: 'PATCH',
      url: `/admin/orders/${orderId}`,
      data,
    }),

  updateOrderProducts: (
    orderId: string,
    products: { productId: string; quantity: number }[]
  ) =>
    adminRequestAdapter({
      method: 'PATCH',
      url: `/admin/orders/${orderId}/products`,
      data: { products },
    }),
}

export default adminOrderRequests
