import axiosInstance from '@/api-client/admin/request-adapter'

export const login = (data: any) => axiosInstance.post('admin/auth/login', data)

export const logout = () => axiosInstance.post('admin/auth/logout')

export const resetPassword = (data: { email: string }) =>
  axiosInstance.post('admin/auth/reset-password', data)

export const setNewPassword = (token: string, data: { password: any }) =>
  axiosInstance.post(`admin/auth/set-new-password/${token}`, data)
