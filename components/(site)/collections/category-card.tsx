'use client'
import { Card, CardBody, CardHeader, Image as HeroUiImage } from '@heroui/react'
import Image from 'next/image'
import type { FC } from 'react'

interface CategoryCardProps {
  category: any
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card className="p-0">
      <CardHeader className="p-0">
        <HeroUiImage
          src={category?.coverImage}
          height={200}
          width={200}
          as={Image}
          className="object-cover w-full"
          classNames={{ wrapper: 'min-w-full' }}
          isZoomed
        />
      </CardHeader>
      <CardBody>
        <div className="py-2 px-3 space-y-2">
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
