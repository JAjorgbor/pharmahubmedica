import { apiFetch } from '@/api-client/fetch-client'
import ProductDetails from '@/components/(site)/collections/product-details'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

interface ProductDetailsShellProps {
  slug: string
}

const ProductDetailsShell: FC<ProductDetailsShellProps> = async ({ slug }) => {
  let product
  try {
    const { data, error } = await apiFetch(`/products/${slug}`)
    if (error?.status === 404) notFound()
    product = data
  } catch (error: any) {
    throw error
  }

  return <ProductDetails product={product} />
}

export default ProductDetailsShell
