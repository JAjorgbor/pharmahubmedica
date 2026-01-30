'use client'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import { IMeta } from '@/api-client/interfaces/global.interfaces'
import { getProductsForCategory } from '@/api-client/site/requests/category.requests'
import useSWR from 'swr'
import cleanObject from '@/utils/clean-object'
interface Params {
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  subcategories?: string[]
}

interface IResult {
  products: IProduct[]
  meta: IMeta
  maxPrice: number
}

const useGetCategoryProducts = ({
  slug,
  params,
  fallbackData,
}: {
  slug: string
  fallbackData?: IResult
  params?: Params
}) => {
  const cleanedParams: Params = cleanObject(params)
  const { subcategories, ...rest } = cleanedParams
  const requestFilter = new URLSearchParams(rest as Record<string, string>)
  const subcategoriesArray = Array.isArray(subcategories)
    ? subcategories
    : subcategories
    ? [subcategories]
    : []

  const fetcher = async () => {
    const { data } = await getProductsForCategory(slug, cleanedParams)
    return data
  }
  if (subcategoriesArray.length) {
    subcategoriesArray.forEach((each) =>
      requestFilter.append('subcategories', each)
    )
  }
  const { data, isLoading, error, mutate } = useSWR<IResult>(
    `categories/${slug}/products?${requestFilter.toString()}`,
    fetcher,
    {
      fallbackData,
    }
  )

  return {
    productsData: data,
    productsLoading: isLoading,
    productsError: error,
    mutateProducts: mutate,
  }
}
export default useGetCategoryProducts
