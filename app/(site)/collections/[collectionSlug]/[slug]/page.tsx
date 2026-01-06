import ProductDetailsShell from '@/components/(site)/collections/product-details-shell'
import { ProductDetailsSkeleton } from '@/components/(site)/collections/product-details'
import { Suspense } from 'react'

export const metadata = { title: 'Product Details' }

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ collectionSlug: string; slug: string }>
}) {
  const { slug } = await params
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsShell slug={slug} />
    </Suspense>
  )
}
