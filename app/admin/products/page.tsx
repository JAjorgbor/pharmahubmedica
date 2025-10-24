import ProductsSection from '@/components/admin/products/products-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = { title: 'Products' }

export default function ProductsPage() {
  return (
    <>
      <SetHeaderTitle title="Products" />
      <ProductsSection />
    </>
  )
}
