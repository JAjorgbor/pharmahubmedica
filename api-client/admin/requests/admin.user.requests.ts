import axiosInstance from '@/api-client/admin/request-adapter'

export const getAdminUser = (id: string) =>
  axiosInstance.get(`admin/users/${id}`)

export const updateAdminuser = (data: any) =>
  axiosInstance.patch('/admin/users/me', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const updateAdminUserPassword = (data: any) =>
  axiosInstance.patch('/admin/users/me/password', data)
