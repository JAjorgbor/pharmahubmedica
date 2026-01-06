import { apiFetch } from '@/api-client/fetch-client'
import CollectionProductsSection from '@/components/(site)/collections/collection-products-section'
import cleanObject from '@/utils/clean-object'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

interface CollectionProductsSectionShellProps {
  params: { collectionSlug: string }
  searchParams: { page: string; minPrice: string; maxPrice: string }
}

const CollectionProductsSectionShell: FC<
  CollectionProductsSectionShellProps
> = async ({ params, searchParams }) => {
  const cleanedParams = cleanObject(searchParams)
  let category
  try {
    category = await apiFetch(`/categories/${params.collectionSlug}`)
  } catch (error: any) {
    if (error.status === 404) notFound()
    throw error
  }

  const { subcategories, ...rest } = cleanedParams
  const subcategoriesArray = Array.isArray(subcategories)
    ? subcategories
    : subcategories
    ? [subcategories]
    : []
  const requestFilter = new URLSearchParams(rest)
  if (subcategoriesArray.length) {
    subcategoriesArray.forEach((each) =>
      requestFilter.append('subcategories', each)
    )
  }

  const { data, error } = await apiFetch(
    `/categories/${
      params.collectionSlug
    }/products?limit=2&${requestFilter.toString()}`,
    {
      next: { revalidate: 0 },
    }
  )
  if (error?.status === 404) notFound()
  if (error) throw error
  return (
    <CollectionProductsSection serverData={data as any} category={category} />
  )
}
export default CollectionProductsSectionShell
