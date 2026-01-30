import { apiFetch } from '@/api-client/fetch-client'
import CollectionsSection from '@/components/(site)/collections/collections-section'

const CollectionsSectionShell = async ({
  searchParams,
}: {
  searchParams: { page: string }
}) => {
  const page = searchParams.page || 1
  const { data, error } = await apiFetch(`/categories?page=${page}`, {
    next: { revalidate: 0 },
  })
  if (error) throw error
  return <CollectionsSection serverData={data as any} />
}

export default CollectionsSectionShell
