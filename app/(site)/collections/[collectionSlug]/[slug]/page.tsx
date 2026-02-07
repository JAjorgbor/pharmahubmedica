import ProductDetailsShell from '@/components/(site)/collections/product-details-shell'
import { ProductDetailsSkeleton } from '@/components/(site)/collections/product-details'
import { Suspense } from 'react'
import { apiFetch } from '@/api-client/fetch-client'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collectionSlug: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const { data } = await apiFetch(`/products/${slug}`, {
      next: { revalidate: 3600 },
    })

    if (!data) return { title: 'Product Details' }

    const product = data as IProduct
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        images: product.image ? [product.image.url] : [],
      },
    }
  } catch (error) {
    return { title: 'Product Details' }
  }
}

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
