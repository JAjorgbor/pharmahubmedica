'use client'
import { ICategory } from '@/api-client/interfaces/category.interfaces'
import { getCategories } from '@/api-client/admin/requests/category.requests'
import useSWR from 'swr'

const useGetAdminCategories = () => {
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
export default useGetAdminCategories
