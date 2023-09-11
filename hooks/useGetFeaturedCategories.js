import { getTopCategories } from '@/utils/requests'
import useSWR from 'swr'

export default function () {
  const fetcher = async () => {
    const contact =await getTopCategories()
    return contact
  }
  const {data, error, isLoading} = useSWR('api/featuredCategories', fetcher)

  return {
    featuredCategories:data,
    featuredCategoriesError: error,
    featuredCategoriesLoading: isLoading
  }
}
