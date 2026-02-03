import adminRequestAdapter from '@/api-client/admin/request-adapter'

export const adminOrderRequests = {
  getOrders: (params?: any) =>
    adminRequestAdapter({
      method: 'GET',
      url: '/admin/orders',
      params,
    }),

  getOrder: (orderId: string) =>
    adminRequestAdapter({
      method: 'GET',
      url: `/admin/orders/${orderId}`,
    }),

  getOrderStats: () =>
    adminRequestAdapter({
      method: 'GET',
      url: `/admin/orders/stats`,
    }),

  updateOrderStatus: (orderId: string, data: any) =>
    adminRequestAdapter({
      method: 'PATCH',
      url: `/admin/orders/${orderId}`,
      data,
    }),

  updateOrderProducts: (
    orderId: string,
    products: { productId: string; quantity: number }[],
  ) =>
    adminRequestAdapter({
      method: 'PATCH',
      url: `/admin/orders/${orderId}/products`,
      data: { products },
    }),

  createOrder: (data: any) =>
    adminRequestAdapter({
      method: 'POST',
      url: '/admin/orders',
      data,
    }),
}

export default adminOrderRequests
