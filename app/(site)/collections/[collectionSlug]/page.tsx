import CollectionProductsSectionShell from '@/components/(site)/collections/collection-products-section-shell'
import CollectionProductsSection from '@/components/(site)/collections/collection-products-section'

export const metadata = { title: 'Collection Page' }

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
