import axiosInstance from '@/api-client/admin/request-adapter'

export const getCategories = () => axiosInstance.get('admin/categories')

export const createCategory = (data: any) =>
  axiosInstance.post('admin/categories', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
export const updateCategory = (id: string, data: any) =>
  axiosInstance.patch(`admin/categories/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const deleteCategory = (id: string) =>
  axiosInstance.delete(`admin/categories/${id}`)
