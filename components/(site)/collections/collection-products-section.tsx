'use client'
import { ICategory } from '@/api-client/interfaces/category.interfaces'
import { IMeta } from '@/api-client/interfaces/global.interfaces'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import ProductCard from '@/components/(site)/collections/product-card'
import InputField from '@/components/elements/input-field'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/elements/modal-wrapper'
import useGetCategoryProducts from '@/hooks/requests/useGetCategoryProducts'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  BreadcrumbItem,
  Breadcrumbs,
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
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { FC, useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { LuFilter, LuRefreshCcw } from 'react-icons/lu'

const CollectionProductsSection = ({
  serverData,
  category,
}: {
  serverData: { products: IProduct[]; meta: IMeta }
  category: ICategory
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const params = useParams()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const paramsFilter = { page: Number(page) || 1, limit: 10 }
  const {
    productsData: { products, meta },
    productsLoading,
    productsError,
  } = useGetCategoryProducts({
    slug: String(params.collectionSlug),
    params: paramsFilter,
    fallbackData: serverData,
  })
  const router = useRouter()
  return (
    <div className="max-w-7xl mx-auto p-5 py-10">
      <div
        className="mx-auto text-center max-w-4xl space-y-5 mb-10 px-5 py-10 bg-no-repeat text-white rounded-xl relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${category?.image?.url})` }}
      >
        <h1 className="text-4xl font-bold z-10 relative">{category?.name}</h1>
        <Breadcrumbs
          classNames={{ base: 'relative z-10', list: 'justify-center' }}
        >
          <BreadcrumbItem
            classNames={{ item: 'text-white', separator: 'text-white' }}
          >
            <FiHome />
          </BreadcrumbItem>
          <BreadcrumbItem
            classNames={{ item: 'text-white', separator: 'text-white' }}
          >
            <Link href="/collections">Collections</Link>
          </BreadcrumbItem>
          <BreadcrumbItem
            classNames={{ item: 'text-white', separator: 'text-white' }}
          >
            {category?.name}
          </BreadcrumbItem>
        </Breadcrumbs>
        <p className="md:text-lg z-10 relative">{category?.description}</p>
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
          <div
            className={`grid gap-6 ${
              products?.length > 3
                ? 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))] '
                : 'grid-cols-2 md:grid-cols-4'
            }`}
          >
            {products?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination
              total={meta?.totalPages}
              page={paramsFilter.page}
              onChange={(page) =>
                router.replace(
                  `/collections/${params.collectionSlug}?page=${page}`
                )
              }
            />
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
        <Select
          selectionMode="multiple"
          variant="bordered"
          placeholder="Select subcategories"
        >
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
    <Card className="sticky top-22 w-[280px] hidden lg:block shadow-md">
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
