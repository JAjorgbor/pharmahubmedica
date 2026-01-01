'use client'
import { getProduct } from '@/api-client/admin/requests/product.requests'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import useSWR from 'swr'

const useGetAdminProduct = (id: string) => {
  const fetcher = async () => {
    if (!id) return null
    const {
      data: { product },
    } = await getProduct(id)
    return product
  }
  const { data, isLoading, error, mutate } = useSWR<IProduct>(
    id ? `admin/products/${id}` : null,
    fetcher
  )

  return {
    product: data,
    productLoading: isLoading,
    productError: error,
    mutateProduct: mutate,
  }
}
export default useGetAdminProduct
