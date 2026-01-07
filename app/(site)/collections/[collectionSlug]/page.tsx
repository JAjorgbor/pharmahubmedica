import CollectionProductsSectionShell from '@/components/(site)/collections/collection-products-section-shell'

export const metadata = { title: 'Collection Page' }

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collectionSlug: string }>
  searchParams: Promise<{ page: string; minPrice: string; maxPrice: string }>
}) {
  const paramsData = await params
  console.log(paramsData)
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
