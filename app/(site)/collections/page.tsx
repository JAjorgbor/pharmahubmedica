import CollectionsSection from '@/components/(site)/collections/collections-section'

export const metadata = { title: 'Collections' }

export default function CollectionsPage() {
  return (
    <div className="py-10">
      <div className="px-5">
        <div className="mx-auto text-center max-w-4xl space-y-5 mb-5 px-5 py-10 bg-primary-gradient text-white rounded-xl relative overflow-hidden">
          <h1 className="text-4xl font-bold">Our Collections</h1>
          <p className="md:text-lg">
            Browse our comprehensive range of healthcare products organized by
            category for easy shopping.
          </p>
        </div>
      </div>
      <CollectionsSection />
    </div>
  )
}
