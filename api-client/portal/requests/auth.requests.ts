import axiosInstance from '@/api-client/portal/request-adapter'

export const createAccount = (data: any) =>
  axiosInstance.post('portal/auth/create-account', data)

export const login = (data: any) =>
  axiosInstance.post('portal/auth/login', data)

export const logout = () => axiosInstance.post('portal/auth/logout')

export const resetPassword = (data: { email: string }) =>
  axiosInstance.post('portal/auth/reset-password', data)

export const setNewPassword = (token: string, data: { password: any }) =>
  axiosInstance.post(`portal/auth/set-new-password/${token}`, data)
