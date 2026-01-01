import axiosInstance from '@/api-client/admin/request-adapter'

export const createProduct = (data: any) =>
  axiosInstance.post('admin/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const updateProduct = (id: string, data: any) =>
  axiosInstance.patch(`admin/products/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const deleteProduct = (id: string) =>
  axiosInstance.delete(`admin/products/${id}`)

export const getProducts = () => axiosInstance.get('admin/products')
export const getProduct = (id: string) =>
  axiosInstance.get(`admin/products/${id}`)
