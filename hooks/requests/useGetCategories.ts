'use client'
import { ICategory } from '@/api-client/interfaces/category.interfaces'
import { IMeta } from '@/api-client/interfaces/global.interfaces'
import { getCategories } from '@/api-client/site/requests/category.requests'
import useSWR from 'swr'

const useGetCategories = ({
  fallbackData,
  params,
}: {
  fallbackData?: {
    categories: ICategory[]
    meta: IMeta
  }
  params?: { page: number; limit?: number }
}) => {
  const fetcher = async () => {
    const { data } = await getCategories(params)
    return data
  }
  const { data, isLoading, error, mutate } = useSWR<{
    categories: ICategory[]
    meta: IMeta
  }>(`categories?page=${params?.page}&limit=${params?.limit}`, fetcher, {
    fallbackData,
  })

  return {
    categoriesData: data,
    categoriesLoading: isLoading,
    categoriesError: error,
    mutateCategories: mutate,
  }
}
export default useGetCategories
