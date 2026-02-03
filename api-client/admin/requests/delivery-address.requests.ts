import adminRequestAdapter from '@/api-client/admin/request-adapter'

export const adminDeliveryAddressRequests = {
  getDeliveryAddresses: (userId: string) =>
    adminRequestAdapter({
      method: 'GET',
      url: `/admin/customers/${userId}/addresses`,
    }),

  createDeliveryAddress: (userId: string, data: any) =>
    adminRequestAdapter({
      method: 'POST',
      url: `/admin/customers/${userId}/addresses`,
      data,
    }),

  updateDeliveryAddress: (userId: string, addressId: string, data: any) =>
    adminRequestAdapter({
      method: 'PATCH',
      url: `/admin/customers/${userId}/addresses/${addressId}`,
      data,
    }),

  deleteDeliveryAddress: (userId: string, addressId: string) =>
    adminRequestAdapter({
      method: 'DELETE',
      url: `/admin/customers/${userId}/addresses/${addressId}`,
    }),
}
