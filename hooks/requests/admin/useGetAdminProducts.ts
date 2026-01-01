'use client'
import { getProducts } from '@/api-client/admin/requests/product.requests'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import useSWR from 'swr'

const useGetAdminProducts = () => {
  const fetcher = async () => {
    const {
      data: { products },
    } = await getProducts()
    return products.reverse()
  }
  const { data, isLoading, error, mutate } = useSWR<IProduct[]>(
    `admin/products`,
    fetcher
  )

  return {
    products: data,
    productsLoading: isLoading,
    productsError: error,
    mutateProducts: mutate,
  }
}
export default useGetAdminProducts
