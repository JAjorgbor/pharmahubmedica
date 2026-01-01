import axiosInstance from '@/api-client/admin/request-adapter'

export const login = (data: any) => axiosInstance.post('admin/auth/login', data)
