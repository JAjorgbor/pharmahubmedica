import { ICategory } from '@/api-client/admin/interfaces/category.interfaces'
import { getCategories } from '@/api-client/admin/requests/category.requests'
import useSWR from 'swr'

const useGetCategories = () => {
  const fetcher = async () => {
    const {
      data: { categories },
    } = await getCategories()
    return categories?.reverse()
  }
  const { data, isLoading, error, mutate } = useSWR<ICategory[]>(
    `admin/categories`,
    fetcher
  )

  return {
    categories: data,
    categoriesLoading: isLoading,
    categoriesError: error,
    mutateCategories: mutate,
  }
}
export default useGetCategories
