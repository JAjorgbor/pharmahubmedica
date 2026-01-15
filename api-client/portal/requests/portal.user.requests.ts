import axiosInstance from '@/api-client/request-adapter'

export const getPortalUser = (id: string) =>
  axiosInstance.get(`portal/users/${id}`)
