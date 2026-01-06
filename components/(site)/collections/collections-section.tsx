'use client'
import { ICategory } from '@/api-client/interfaces/category.interfaces'
import { IMeta } from '@/api-client/interfaces/global.interfaces'
import CategoryCard, {
  CategoryCardSkeleton,
} from '@/components/(site)/collections/category-card'
import InputField from '@/components/elements/input-field'
import useGetCategories from '@/hooks/requests/useGetCategories'
import { Pagination } from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FC } from 'react'

const CollectionsSection: FC<{
  serverData: { categories: ICategory[]; meta: IMeta }
}> = ({ serverData }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const paramsFilter = { page: Number(page) || 1, limit: 10 }
  const {
    categoriesData: { categories, meta },
    categoriesLoading,
  } = useGetCategories({
    fallbackData: serverData,
    params: paramsFilter,
  })
  const router = useRouter()

  return categoriesLoading ? (
    <CollectionsSectionSkeleton />
  ) : (
    <div className="max-w-7xl space-y-10 mx-auto p-5 min-h-[80vh]">
      <div className="space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-primary">
            Shop by Category
          </h2>
          <InputField
            type="search"
            controllerProps={{ name: 'search' }}
            placeholder="Search categories..."
          />
        </div>
        <div
          className={`grid gap-6 ${
            categories?.length > 3
              ? 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))] '
              : 'grid-cols-2 md:grid-cols-4'
          }`}
        >
          {categories?.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>

        <div className="flex justify-center">
          <Pagination
            total={meta.totalPages}
            page={paramsFilter.page}
            onChange={(value) => router.replace(`/collections?page=${value}`)}
          />
        </div>
      </div>
    </div>
  )
}

export default CollectionsSection

export const CollectionsSectionSkeleton = () => {
  return (
    <div className="max-w-7xl space-y-10 mx-auto p-5 min-h-screen">
      <div className="space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-primary">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
