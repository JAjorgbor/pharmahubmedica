import { apiFetch } from '@/api-client/fetch-client'
import CollectionProductsSection from '@/components/(site)/collections/collection-products-section'
import cleanObject from '@/utils/clean-object'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

interface CollectionProductsSectionShellProps {
  params: { collectionSlug: string }
  searchParams: { page: string; minPrice: string; maxPrice: string }
}

const CollectionProductsSectionShell = async ({
  params,
  searchParams,
}: CollectionProductsSectionShellProps) => {
  const cleanedParams = cleanObject(searchParams)

  const { data: category, error: categoryError } = await apiFetch(
    `/categories/${params.collectionSlug}`,
    {
      next: { revalidate: 0 },
    }
  )
  if (categoryError?.status === 404) notFound()
  if (categoryError) throw categoryError

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
    <CollectionProductsSection
      serverData={data as any}
      category={category as any}
    />
  )
}
export default CollectionProductsSectionShell
