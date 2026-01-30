import axiosInstance from '@/api-client/admin/request-adapter'

export const getApp = () => axiosInstance.get('/app')

export const updateAppContact = (data: any) =>
  axiosInstance.patch('/app/contact', data)
