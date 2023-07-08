import useSWR from 'swr'
import { getCategoriesList } from '../utils/requests'

export default function useGetCategories () {
const fetcher = async ()=>{
   
        const res = await getCategoriesList()
        return res
   
}
    const { data, error, isLoading } = useSWR(`/api/categories`, fetcher)
   
    return {
      categories: data,
      isLoading,
      isError: error
    }
  }