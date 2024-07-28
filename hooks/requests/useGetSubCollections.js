import {
  getAllProducts,
  getCategoriesList,
  getSubCategories,
} from '@/utils/requests'
import useSWR from 'swr'

const useGetSubCollections = (collectionName) => {
  const fetcher = async () => {
    if (collectionName) {
      const subcategories = await getSubCategories(collectionName)
      return subcategories
    }
  }
  const { data, isLoading, error } = useSWR(
    `api/${collectionName}/subCollections`,
    fetcher
  )

  return {
    subCollections: data,
    subCollectionsLoading: isLoading,
    subCollectionsError: error,
  }
}
export default useGetSubCollections
