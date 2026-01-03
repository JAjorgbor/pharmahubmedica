import axiosInstance from '@/api-client/admin/request-adapter'

export const getAdminUser = (id: string) =>
  axiosInstance.get(`admin/users/${id}`)
