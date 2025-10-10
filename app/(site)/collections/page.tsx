import CollectionsSection from '@/components/(site)/collections/collections-section'

export const metadata = { title: 'Collections' }

export default function CollectionsPage() {
  return (
    <div className="py-10">
      <div className="mx-auto text-center max-w-xl space-y-5 mb-10 px-5">
        <h1 className="text-primary text-4xl font-bold">Our Collections</h1>
        <p className="text-foreground-500 md:text-lg">
          Browse our comprehensive range of healthcare products organized by
          category for easy shopping.
        </p>
      </div>
      <CollectionsSection />
    </div>
  )
}
