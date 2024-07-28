import { filterProducts, getAllProducts } from '@/utils/requests'
import useSWR from 'swr'

const useGetFilterProducts = (
  productName,
  classificationName,
  subClassifications,
  pageNumber,
  priceRange,
  itemsPerPage
) => {
  const fetcher = async () => {
    const products = await filterProducts(
      classificationName,
      subClassifications,
      pageNumber,
      priceRange,
      itemsPerPage
    )
    return products
  }
  const { data, isLoading, error } = useSWR(
    `api/${productName}?classification=${classificationName}&&page=${pageNumber}&&subcategories=${subClassifications} && priceRange=${priceRange}`,
    fetcher
  )

  return {
    filteredProducts: data,
    filteredProductsLoading: isLoading,
    filteredProductsError: error,
  }
}
export default useGetFilterProducts
