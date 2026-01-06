import axiosInstance from '@/api-client/site/request-adapter'

export const getProduct = (slug: string) =>
  axiosInstance.get(`products/${slug}`)
