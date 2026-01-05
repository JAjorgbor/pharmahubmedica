import { apiFetch } from '@/api-client/fetch-client'
import CollectionsSection from '@/components/admin/collections/collections-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = { title: 'Collections' }

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto p-5">
      <SetHeaderTitle title="Collections" />
      <CollectionsSection />
    </div>
  )
}
