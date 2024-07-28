import { getAllProducts } from '@/utils/requests'
import useSWR from 'swr'

const useGetAllProducts = () => {
  const fetcher = async () => {
    const products = await getAllProducts()
    return products
  }
  const { data, isLoading, error } = useSWR(`api/allProducts`, fetcher)

  return {
    allProducts: data,
    allProductsLoading: isLoading,
    allProductsError: error,
  }
}
export default useGetAllProducts
