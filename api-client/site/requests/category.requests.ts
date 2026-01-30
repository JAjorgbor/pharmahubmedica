import axiosInstance from '@/api-client/request-adapter'

export const getCategories = (params?: { page: number; limit?: number }) =>
  axiosInstance.get('categories', { params })

export const getCategory = (slug: string) =>
  axiosInstance.get(`categories/${slug}`)

export const getProductsForCategory = (
  slug: string,
  params?: {
    page?: number
    limit?: number
    minPrice?: number
    maxPrice?: number
    subcategories?: string[]
  }
) =>
  axiosInstance.get(`categories/${slug}/products`, {
    params,
    paramsSerializer: {
      indexes: null, // 👈 IMPORTANT
    },
  })
