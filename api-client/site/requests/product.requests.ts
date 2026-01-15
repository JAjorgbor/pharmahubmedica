import axiosInstance from '@/api-client/request-adapter'

export const getProduct = (slug: string) =>
  axiosInstance.get(`products/${slug}`)
