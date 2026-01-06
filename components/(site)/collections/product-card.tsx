'use client'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image as HeroUiImage,
  Skeleton,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface ProductCardProps {
  product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="p-0 group bg-background shadow-md transition-all transform hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <HeroUiImage
          src={product?.image.url}
          height={200}
          width={200}
          as={Image}
          radius="none"
          alt={`${product?.name} image`}
          className="object-cover w-full group-hover:scale-125"
          classNames={{ wrapper: 'min-w-full' }}
          isZoomed
        />
        <Chip
          size="sm"
          variant="dot"
          className="absolute top-3 right-3 z-20 bg-white text-primary"
          classNames={{ content: 'max-w-24 truncate' }}
          color="primary"
        >
          {product?.subcategory?.name}
        </Chip>
      </CardHeader>
      <CardBody>
        <div className="py-1 px-3 space-y-2">
          <h5 className="font-semibold text-foreground-700 text-lg group-hover:text-primary max-w-56 truncate">
            {product.name}
          </h5>
          <p className="text-primary font-semibold text-xl">
            {currencyFormatter(product.price)}
          </p>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          color="primary"
          as={Link}
          href={`/collections/${product.category.slug}/${product.slug}`}
          size="sm"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProductCard

export const ProductCardSkeleton = () => {
  return (
    <Card className="p-0 group bg-background shadow-md transition-all transform hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <Skeleton className="h-48 rounded-t-xl w-full block" />
      </CardHeader>
      <CardBody>
        <div className="py-1 px-3 space-y-2">
          <Skeleton className="h-6 rounded-xl w-full" />
          <Skeleton className="h-4 rounded-xl w-2/3" />
        </div>
      </CardBody>
      <CardFooter>
        <Skeleton className="h-8 rounded-xl w-full" />
      </CardFooter>
    </Card>
  )
}
