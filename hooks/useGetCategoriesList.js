import useSWR from 'swr'
import { getCategoriesList } from '../utils/requests'

export default function useGetCategoriesList() {
  const fetcher = async () => {
    const res = await getCategoriesList()
    return res
  }
  const { data, error, isLoading } = useSWR(`/api/categoriesList`, fetcher)

  return {
    categories: data,
    isLoading,
    isError: error,
  }
}
