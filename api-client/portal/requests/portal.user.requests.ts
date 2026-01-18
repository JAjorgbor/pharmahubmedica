import axiosInstance from '@/api-client/request-adapter'

export const getPortalUser = () => axiosInstance.get(`portal/users/me`)
