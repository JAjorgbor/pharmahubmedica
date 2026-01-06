'use client'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import { IMeta } from '@/api-client/interfaces/global.interfaces'
import { getProductsForCategory } from '@/api-client/site/requests/category.requests'
import useSWR from 'swr'

const useGetCategoryProducts = ({
  slug,
  params,
  fallbackData,
}: {
  slug: string
  fallbackData?: {
    products: IProduct[]
    meta: IMeta
  }
  params?: { page: number; limit?: number }
}) => {
  const fetcher = async () => {
    const { data } = await getProductsForCategory(slug, params)
    return data
  }
  const { data, isLoading, error, mutate } = useSWR<{
    products: IProduct[]
    meta: IMeta
  }>(
    `categories/${slug}/products?page=${params?.page}&limit=${params?.limit}`,
    fetcher,
    {
      fallbackData,
    }
  )

  return {
    productsData: data,
    productsLoading: isLoading,
    productsError: error,
    mutateProducts: mutate,
  }
}
export default useGetCategoryProducts
