'use client'
import ProductCard from '@/components/(site)/collections/product-card'
import InputField from '@/components/elements/input-field'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/elements/modal-wrapper'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
  Select,
  SelectItem,
  Slider,
  Tooltip,
} from '@heroui/react'
import React, { FC, useState } from 'react'
import { LuFilter, LuRefreshCcw, LuRefreshCcwDot } from 'react-icons/lu'

const CollectionProductsSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  return (
    <div className="max-w-7xl mx-auto p-5 py-10">
      <div
        className="mx-auto text-center max-w-4xl space-y-5 mb-10 px-5 py-10 bg-no-repeat text-white rounded-xl relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/multivitamin-tablets-bottle.jpg)' }}
      >
        <h1 className="text-4xl font-bold z-10 relative">Medicines</h1>
        <p className="md:text-lg z-10 relative">
          Over-the-counter and prescription medications.
        </p>
        <div className="bg-primary/40 absolute inset-0 w-full-h-full " />
      </div>
      <div className="flex justify-between lg:justify-end items-center flex-wrap gap-4 mb-8">
        <Button
          className="lg:hidden"
          startContent={<LuFilter />}
          onPress={() => setIsFilterOpen(true)}
        >
          Filter
        </Button>
        <InputField
          type="search"
          controllerProps={{ name: 'search' }}
          placeholder="Search products..."
        />
      </div>
      <div className="flex gap-8 items-start">
        <Filter isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
        <div className="flex-grow">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
            {Array(10)
              .fill(null)
              .map((each, index) => (
                <ProductCard
                  key={index}
                  product={{
                    name: 'Tylenol',
                    price: 3000,
                    coverImage: 'https://dummyimage.com/200x150',
                  }}
                />
              ))}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination total={10} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionProductsSection

type FilterProps = BaseModalProps & {
  state?: any
}

const Filter: FC<FilterProps> = ({ isOpen, setIsOpen }) => {
  const animals = [
    { key: 'cat', label: 'Cat' },
    { key: 'dog', label: 'Dog' },
    { key: 'elephant', label: 'Elephant' },
    { key: 'lion', label: 'Lion' },
    { key: 'tiger', label: 'Tiger' },
    { key: 'giraffe', label: 'Giraffe' },
    { key: 'dolphin', label: 'Dolphin' },
    { key: 'penguin', label: 'Penguin' },
    { key: 'zebra', label: 'Zebra' },
    { key: 'shark', label: 'Shark' },
    { key: 'whale', label: 'Whale' },
    { key: 'otter', label: 'Otter' },
    { key: 'crocodile', label: 'Crocodile' },
  ]
  const isMobile = useMediaQuery('lg')
  const content = (
    <div className="space-y-6 py-4">
      {' '}
      <div className="space-y-2">
        <Slider
          className="max-w-md"
          defaultValue={[5000, 20000]}
          label="Price Range"
          formatOptions={{
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'symbol',
            maximumFractionDigits: 0,
          }}
          size="sm"
          maxValue={50000}
          minValue={0}
          step={50}
        />
      </div>
      <div className="space-y-2">
        <p>Subcategory</p>
        <Select selectionMode="multiple" variant="bordered">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
  return isMobile ? (
    <ModalWrapper
      title="Filter"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={
        <div className="flex justify-end gap-4">
          <Button size="sm">Reset</Button>
          <Button size="sm" color="primary">
            Apply
          </Button>
        </div>
      }
    >
      {content}
    </ModalWrapper>
  ) : (
    <Card className="sticky top-22 w-[300px] hidden lg:block shadow-md">
      <CardHeader className=" font-semibold text-lg justify-between">
        <div className="flex gap-2 items-center text-primary">
          Filter <LuFilter size={15} />
        </div>
        <Tooltip content="Reset Filter" showArrow>
          <button type="button" className="text-foreground-500 cursor-pointer">
            <LuRefreshCcw />
          </button>
        </Tooltip>
      </CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter>
        <Button fullWidth color="primary">
          Apply Filter
        </Button>
      </CardFooter>
    </Card>
  )
}
