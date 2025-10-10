'use client'
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as HeroUiImage,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface CategoryCardProps {
  category: any
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card
      className="p-0 group bg-background shadow-none border border-foreground-200 hover:drop-shadow-xl transition-all transform hover:-translate-y-2"
      as={Link}
      href={'/collections/collection-name'}
    >
      <CardHeader className="p-0 relative">
        <HeroUiImage
          src={category?.coverImage}
          height={200}
          width={200}
          as={Image}
          alt={`${category?.name} image`}
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
          10 Items
        </Chip>
      </CardHeader>
      <CardBody>
        <div className="py-1 px-3 space-y-2">
          <h5 className="font-semibold text-lg text-primary">
            {category.name}
          </h5>
          <p className="text-foreground-500">{category.description}</p>
        </div>
      </CardBody>
    </Card>
  )
}
export default CategoryCard
