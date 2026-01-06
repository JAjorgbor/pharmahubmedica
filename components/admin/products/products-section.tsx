'use client'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import useGetAdminCategories from '@/hooks/requests/admin/useGetAdminCategories'
import useGetAdminProducts from '@/hooks/requests/admin/useGetAdminProducts'
import DeleteProductModal from '@/components/admin/products/delete-product-modal'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LuExternalLink, LuPlus } from 'react-icons/lu'

const columnHelper = createColumnHelper<IProduct>()

const ProductsSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [visibilityFilter, setVisibilityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct>()

  const { categories, categoriesLoading } = useGetAdminCategories()
  const { products, productsLoading } = useGetAdminProducts()

  const items = products

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Product',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <img
              src={item.image?.url}
              alt={`${item.name} image`}
              width={100}
              height={100}
              className="object-cover rounded-lg size-16 object-center"
            />

            <div className="space-y-1">
              <h3 className="font-bold flex flex-col">{`${item.name}`}</h3>
              <p className="text-xs text-foreground-600">ID:[Product ID]</p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('price', {
        id: 'price',
        header: 'Price',
        cell: ({ getValue }) => currencyFormatter(getValue()),
      }),
      columnHelper.accessor('visible', {
        id: 'visible',
        header: 'Visibility',
        filterFn: (row: { original: IProduct }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : filterValue == 'visible'
            ? row.original.inStock == true
            : row.original.inStock == false
        },
        cell: ({ getValue }) => {
          return (
            <div className="capitalize">
              <Chip
                color={getValue() ? 'success' : 'warning'}
                variant="dot"
                size="sm"
              >
                {getValue() ? 'Visible' : 'Hidden'}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor('inStock', {
        id: 'inStock',
        header: 'Stock',
        filterFn: (row: { original: IProduct }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : filterValue == 'inStock'
            ? row.original.inStock == true
            : row.original.inStock == false
        },
        cell: ({ getValue }) => {
          return (
            <div className="capitalize">
              <Chip
                color={getValue() ? 'success' : 'warning'}
                variant="flat"
                size="sm"
              >
                {getValue() ? 'In Stock' : 'Out of Stock'}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor('category.name', {
        id: 'category',
        header: 'Category',
        filterFn: (row: { original: IProduct }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : filterValue == row.original.category._id
        },
        cell: ({ getValue }) => getValue(),
      }),

      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: 'Created At',
        cell: ({ getValue }) => (
          <div className="text-xs text-foreground-600 space-y-1">
            <p>{moment(getValue()).format('D MMMM, YYYY')}</p>
            <p>at {moment(getValue()).format('hh:mm A')}</p>
          </div>
        ),
      }),
      columnHelper.accessor('updatedAt', {
        id: 'updatedAt',
        header: 'Last Updated',
        cell: ({ getValue }) => (
          <div className="text-xs text-foreground-600 space-y-1">
            <p>{moment(getValue()).format('D MMMM, YYYY')}</p>
            <p>at {moment(getValue()).format('hh:mm A')}</p>
          </div>
        ),
      }),

      columnHelper.display({
        id: 'action',

        cell: ({ row: { original: item } }) => (
          <Dropdown className="min-w-max">
            <DropdownTrigger>
              <button type="button">
                <FiMoreVertical size={18} />
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="manage"
                showDivider
                as={Link}
                href={`/admin/products/${item._id}`}
              >
                Manage
              </DropdownItem>
              <DropdownItem
                key="delete"
                color="danger"
                variant="flat"
                onPress={() => {
                  setSelectedProduct(item)
                  setShowDeleteProductModal(true)
                }}
              >
                Delete Product
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [items]
  )

  return (
    <>
      <div className="space-y-6 max-w-7xl p-5 mx-auto">
        <div className="flex justify-between gap-6 items-center flex-wrap">
          <div className="space-y-1">
            <h1 className="text-3xl text-primary font-semibold">
              Product Inventory
            </h1>
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/admin/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>Products</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <Button
            color="primary"
            startContent={<LuPlus size={15} />}
            as={Link}
            href="/admin/products/add"
          >
            Add Product
          </Button>
        </div>
        <p className="text-foreground-500">
          Manage the pharmacy inventory and product catalog.
        </p>
        <Card className="p-3">
          <CardHeader className="justify-between flex-wrap gap-4 items-center">
            <Chip color="secondary" size="sm">
              Total Products : {items?.length}
            </Chip>
            <Button
              color="primary"
              variant="light"
              as={Link}
              href="/admin/collections"
              endContent={<LuExternalLink />}
              size="sm"
            >
              View Collections
            </Button>
          </CardHeader>
          <CardBody className="space-y-6">
            {' '}
            <TableWrapper
              columns={columns}
              isLoading={productsLoading}
              items={items}
              allowsSortingFor={['createdAt', 'updatedAt', 'price', 'stock']}
              topContent={({ table, searchField }) => {
                const getInStockStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else if (status == 'inStock')
                      return items.filter((each) => each.inStock).length
                    else if (status == 'outOfStock')
                      return items.filter((each) => each.inStock == false)
                        .length
                  }
                  return '-'
                }
                const getVisibilityStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else if (status == 'visible')
                      return items.filter((each) => each.visible).length
                    else if (status == 'hidden')
                      return items.filter((each) => each.visible == false)
                        .length
                  }
                  return '-'
                }

                const getCategoryCount = (value: string) => {
                  if (items) {
                    if (value == 'all') return items.length

                    return items.filter((each) => each.category.name == value)
                      .length
                  }
                  return '-'
                }

                return (
                  <div className="flex justify-between items-center w-full gap-3 flex-wrap">
                    <div className="w-full lg:w-1/4">
                      {searchField('Search inventory')}
                    </div>
                    <div className="gap-3 grid grid-cols-2 md:grid-cols-3 w-full lg:w-1/2">
                      <InputField
                        type="select"
                        controllerProps={{
                          name: 'visibility filter',
                          defaultValue: visibilityFilter,
                        }}
                        options={[
                          {
                            label: `All Visibility (${getVisibilityStatusCount(
                              'all'
                            )})`,
                            value: 'all',
                          },
                          {
                            label: `Visible (${getVisibilityStatusCount(
                              'visible'
                            )})`,
                            value: 'visible',
                          },
                          {
                            label: `Hidden (${getVisibilityStatusCount(
                              'hidden'
                            )})`,
                            value: 'hidden',
                          },
                        ]}
                        onChange={(value) => {
                          table.getColumn('visible')?.setFilterValue(value)
                          setVisibilityFilter(value)
                        }}
                      />
                      <InputField
                        type="select"
                        controllerProps={{
                          name: 'status filter',
                          defaultValue: statusFilter,
                        }}
                        options={[
                          {
                            label: `All (${getInStockStatusCount('all')})`,
                            value: 'all',
                          },
                          {
                            label: `In Stock (${getInStockStatusCount(
                              'inStock'
                            )})`,
                            value: 'inStock',
                          },
                          {
                            label: `Out of Stock (${getInStockStatusCount(
                              'outOfStock'
                            )})`,
                            value: 'outOfStock',
                          },
                        ]}
                        onChange={(value) => {
                          table.getColumn('inStock')?.setFilterValue(value)
                          setStatusFilter(value)
                        }}
                      />
                      {categoriesLoading ? (
                        <Skeleton className="h-10 rounded-lg col-span-2 md:col-span-1" />
                      ) : (
                        <InputField
                          type="select"
                          controllerProps={{
                            name: 'category filter',
                            defaultValue: statusFilter,
                          }}
                          className="col-span-2 md:col-span-1"
                          value={categoryFilter}
                          options={[
                            {
                              label: `All Categories (${getCategoryCount(
                                'all'
                              )})`,
                              value: 'all',
                            },

                            ...(categories?.map((each) => ({
                              label: `${each.name} (${getCategoryCount(
                                each.name
                              )})`,
                              value: each._id,
                            })) || ([] as any)),
                          ]}
                          onChange={(value) => {
                            table.getColumn('category')?.setFilterValue(value)

                            setCategoryFilter(value)
                          }}
                        />
                      )}
                    </div>
                    {/* </div> */}
                  </div>
                )
              }}
              bottomContent={({ rowPerPage, pagination }) => (
                <div className="flex justify-between gap-4 flex-wrap">
                  {rowPerPage}
                  {pagination}
                </div>
              )}
            />
          </CardBody>
        </Card>
      </div>
      <DeleteProductModal
        isOpen={showDeleteProductModal}
        setIsOpen={setShowDeleteProductModal}
        product={selectedProduct!}
      />
    </>
  )
}

export default ProductsSection
