import { apiFetch } from '@/api-client/fetch-client'
import CollectionsSection from '@/components/(site)/collections/collections-section'

const CollectionsSectionShell = async ({
  searchParams,
}: {
  searchParams: { page: string }
}) => {
  const page = searchParams.page || 1
  const data = await apiFetch(`/categories?page=${page}`, {
    next: { revalidate: 0 },
  })
  return <CollectionsSection serverData={data} />
}

export default CollectionsSectionShell
