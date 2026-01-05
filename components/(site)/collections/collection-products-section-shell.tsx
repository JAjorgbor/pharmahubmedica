import { apiFetch } from '@/api-client/fetch-client'
import CollectionProductsSection from '@/components/(site)/collections/collection-products-section'
import type { FC } from 'react'

interface CollectionProductsSectionShellProps {
  params: { collectionSlug: string }
  searchParams: { page: string }
}

const CollectionProductsSectionShell: FC<
  CollectionProductsSectionShellProps
> = async ({ params, searchParams }) => {
  const page = searchParams.page || 1
  const category = await apiFetch(`/categories/${params.collectionSlug}`)
  const data = await apiFetch(
    `/categories/${params.collectionSlug}/products?page=${page}`,
    {
      next: { revalidate: 0 },
    }
  )
  return <CollectionProductsSection serverData={data} category={category} />
}
export default CollectionProductsSectionShell
