'use client'
import { currencyFormatter } from '@/utils/currencyFormatter'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image as HeroUiImage,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface ProductCardProps {
  product: any
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  console.log('product', product)
  return (
    <Card className="p-0 group bg-background shadow-md transition-all transform hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <HeroUiImage
          src={product?.coverImage}
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
          color="primary"
        >
          Subcategory
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
          href={'/collections/collection-name/product'}
          size="sm"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProductCard
