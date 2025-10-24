import AddProductSection from '@/components/admin/products/add-product-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = { title: 'Products' }

export default function AddProductPage() {
  return (
    <div className="max-w-7xl p-5 mx-auto">
      <SetHeaderTitle title="Add Product" />
      <AddProductSection />
    </div>
  )
}
