'use client'
import CategoryCard from '@/components/(site)/collections/category-card'
import InputField from '@/components/elements/input-field'
import { Pagination } from '@heroui/react'
import React from 'react'

const CollectionsSection = () => {
  return (
    <div className="max-w-7xl space-y-10 mx-auto p-5 min-h-screen">
      <div className="space-y-8">
        <div className="flex justify-center sm:justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-primary">
            Shop by Category
          </h2>
          <InputField
            type="search"
            controllerProps={{ name: 'search' }}
            placeholder="Search categories..."
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {Array(10)
            .fill(null)
            .map((each, index) => (
              <CategoryCard
                key={index}
                category={{
                  name: 'Medicines',
                  description: 'Over-the-counter and prescription medications.',
                  coverImage: 'https://dummyimage.com/200x150',
                }}
              />
            ))}
        </div>

        <div className="flex justify-center">
          <Pagination total={10} />
        </div>
      </div>
    </div>
  )
}

export default CollectionsSection
