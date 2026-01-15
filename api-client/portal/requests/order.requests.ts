import axiosInstance from '@/api-client/request-adapter'

export const createOrder = (data: any) =>
  axiosInstance.post('/portal/orders', data)
