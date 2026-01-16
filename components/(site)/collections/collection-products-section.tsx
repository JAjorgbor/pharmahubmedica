'use client'
import { ICategory } from '@/api-client/interfaces/category.interfaces'
import { IMeta } from '@/api-client/interfaces/global.interfaces'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import ProductCard, {
  ProductCardSkeleton,
} from '@/components/(site)/collections/product-card'
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
  Skeleton,
  Slider,
  Tooltip,
} from '@heroui/react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { FC, useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { LuFilter, LuRefreshCcw } from 'react-icons/lu'
import EmptyState from '@/components/elements/empty-state'

const CollectionProductsSection = ({
  serverData,
  category,
}: {
  serverData: { products: IProduct[]; meta: IMeta; maxPrice: number }
  category: ICategory
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const params = useParams()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const subcategorySlugs = searchParams.getAll('subcategories')
  const paramsFilter = {
    page: Number(page) || 1,
    limit: 10,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    subcategories: subcategorySlugs,
  }
  const {
    productsData: { products, meta, maxPrice: productsMaxPrice },
    productsLoading,
    productsError,
  } = useGetCategoryProducts({
    slug: String(params.collectionSlug),
    params: paramsFilter,
    fallbackData: serverData,
  })
  const router = useRouter()
  return productsLoading ? (
    <CollectionProductsSectionSkeleton />
  ) : (
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
      <div className="flex justify-between lg:justify-end items-center flex-wrap gap-4 !mb-0">
        <Button
          className="lg:hidden"
          startContent={<LuFilter />}
          onPress={() => setIsFilterOpen(true)}
        >
          Filter
        </Button>
        {/* <InputField
          type="search"
          controllerProps={{ name: 'search' }}
          placeholder="Search products..."
        /> */}
      </div>
      <div className="flex gap-8 items-start">
        {productsMaxPrice && (
          <Filter
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            category={category}
            maxPrice={productsMaxPrice}
          />
        )}
        <div className="flex-grow">
          {products?.length === 0 ? (
            <EmptyState
              title="No products found"
              description="We couldn't find any products matching your selected filters or search. Try resetting your filters."
              buttonText="Reset Filters"
              onButtonPress={() =>
                router.replace(`/collections/${params.collectionSlug}`)
              }
            />
          ) : (
            <>
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
                  onChange={(page) => {
                    const paramValues = new URLSearchParams(
                      searchParams.toString()
                    )

                    paramValues.delete('page')
                    paramValues.append('page', String(page))
                    router.replace(
                      `/collections/${
                        params.collectionSlug
                      }?${paramValues.toString()}`
                    )
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollectionProductsSection

type FilterProps = BaseModalProps & {
  state?: any
  category: ICategory
  maxPrice?: number
}

const Filter: FC<FilterProps> = ({ isOpen, setIsOpen, category, maxPrice }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paramSubcategorySlugs = searchParams.getAll('subcategories')

  const paramMin = Number(searchParams.get('minPrice') || 0)
  const paramMax = Number(searchParams.get('maxPrice') || 0)
  const defaultMin =
    typeof paramMin === 'number' ? paramMin : Math.floor(maxPrice / 4)
  const defaultMax = paramMax || Math.floor(maxPrice / 2)

  const [priceFilter, setPriceFilter] = useState([defaultMin, defaultMax])
  const [subcategorySlugs, setSubcategorySlugs] = useState<string[]>(
    paramSubcategorySlugs || []
  )

  const handleFilterApply = () => {
    const min = priceFilter[0]
    const max = priceFilter[1]

    const params = new URLSearchParams()

    // add multiple values
    subcategorySlugs.forEach((slug) => {
      params.append('subcategories', slug)
    })
    params.append('minPrice', String(min))
    params.append('maxPrice', String(max))

    router.replace(`/collections/${category?.slug}?${params.toString()}`)
    setIsOpen(false)
  }
  const handleReset = () => {
    router.replace(`/collections/${category?.slug}`)
    setIsOpen(false)
  }

  const isMobile = useMediaQuery('lg')
  const content = (
    <div className="space-y-6 py-4">
      {' '}
      <div className="space-y-2">
        <Slider
          className="max-w-md"
          defaultValue={[defaultMin, defaultMax]}
          label="Price Range"
          formatOptions={{
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'symbol',
            maximumFractionDigits: 0,
          }}
          size="sm"
          maxValue={maxPrice}
          minValue={0}
          step={50}
          onChange={(value) => setPriceFilter(value as number[])}
        />
      </div>
      <div className="space-y-2">
        <p>Subcategory</p>
        <Select
          selectionMode="multiple"
          variant="bordered"
          defaultSelectedKeys={subcategorySlugs}
          placeholder="Select subcategories"
          onSelectionChange={(value) =>
            setSubcategorySlugs(Array.from(value) as string[])
          }
        >
          {category?.subcategories?.map((each) => (
            <SelectItem key={each?.slug}>{each?.name}</SelectItem>
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
          <Button size="sm" onPress={handleReset}>
            Reset
          </Button>
          <Button size="sm" color="primary" onPress={handleFilterApply}>
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
          <button
            type="button"
            className="text-foreground-500 cursor-pointer"
            onClick={handleReset}
          >
            <LuRefreshCcw />
          </button>
        </Tooltip>
      </CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter>
        <Button fullWidth color="primary" onPress={handleFilterApply}>
          Apply Filter
        </Button>
      </CardFooter>
    </Card>
  )
}

const CollectionProductsSectionSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 py-10">
      <Skeleton className="mx-auto text-center w-full h-[250px] max-w-4xl space-y-5 mb-10 px-5 py-10 bg-no-repeat text-white rounded-xl relative overflow-hidden bg-cover bg-center" />
      <div className="flex gap-8 items-start">
        <Card className="hidden md:block w-56">
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center ">
              <Skeleton className="rounded-xl h-5 w-24" />
              <Skeleton className="rounded-full size-5 " />
            </div>

            <Skeleton className="h-8 rounded-xl w-full" />
            <Skeleton className="h-8 rounded-xl w-full" />
            <Skeleton className="h-8 rounded-xl w-full" />
          </CardBody>
        </Card>

        <div className="flex-grow">
          <div className={`grid gap-6 grid-cols-2 md:grid-cols-4`}>
            {Array.from({ length: 6 })?.map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
