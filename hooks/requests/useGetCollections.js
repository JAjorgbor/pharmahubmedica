import { getAllProducts, getCategoriesList } from '@/utils/requests'
import useSWR from 'swr'

const useGetCollections = () => {
  const fetcher = async () => {
    const collections = await getCategoriesList()
    return collections
  }
  const { data, isLoading, error } = useSWR(`api/collections`, fetcher)

  return {
    collections: data,
    collectionsLoading: isLoading,
    collectionsError: error,
  }
}
export default useGetCollections
