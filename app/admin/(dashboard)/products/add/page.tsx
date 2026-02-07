import AddProductSection from '@/components/admin/products/add-product-section'

export const metadata = { title: 'Add Product' }

export default function AddProductPage() {
  return (
    <div className="max-w-7xl p-5 mx-auto">
      <AddProductSection />
    </div>
  )
}
