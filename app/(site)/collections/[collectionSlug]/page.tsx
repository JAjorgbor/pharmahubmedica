import CollectionProductsSectionShell from '@/components/(site)/collections/collection-products-section-shell'
import { apiFetch } from '@/api-client/fetch-client'
import { ICategory } from '@/api-client/interfaces/category.interfaces'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collectionSlug: string }>
}): Promise<Metadata> {
  const { collectionSlug } = await params
  try {
    const { data } = await apiFetch(`/categories/${collectionSlug}`, {
      next: { revalidate: 3600 },
    })

    if (!data) return { title: 'Collection' }

    const category = data as ICategory
    return {
      title: category.name,
      description: category.description,
      openGraph: {
        images: category.image ? [category.image.url] : [],
      },
    }
  } catch (error) {
    return { title: 'Collection' }
  }
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collectionSlug: string }>
  searchParams: Promise<{ page: string; minPrice: string; maxPrice: string }>
}) {
  const paramsData = await params
  const searchParamsData = await searchParams
  return (
    <>
      <CollectionProductsSectionShell
        params={paramsData}
        searchParams={searchParamsData}
      />
    </>
  )
}
