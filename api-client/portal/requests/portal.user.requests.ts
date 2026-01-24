import axiosInstance from '@/api-client/request-adapter'

export const getPortalUser = () => axiosInstance.get(`portal/users/me`)

export const updatePortalUser = (data: any) =>
  axiosInstance.patch(`portal/users/me`, data)

export const updatePortalUserPassword = (data: any) =>
  axiosInstance.patch(`portal/users/me/password`, data)
