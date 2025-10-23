'use client'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import { categories, IProduct, products } from '@/library/dummy-data'
import { currencyFormatter } from '@/utils/currencyFormatter'
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
} from '@heroui/react'
import {
  ColumnFiltersState,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LuExternalLink, LuPlus } from 'react-icons/lu'

const items = products

const columnHelper = createColumnHelper<IProduct>()

const ProductsSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const columns = useMemo(
    () => [
      columnHelper.accessor('productName', {
        id: 'productName',
        header: 'Product',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <Image
              src={item.image}
              alt={`${item.productName} image`}
              width={100}
              height={100}
              className="object-cover rounded-lg size-16 object-center"
            />

            <div className="space-y-1">
              <h3 className="font-bold flex flex-col">{`${item.productName}`}</h3>
              <p className="text-xs text-foreground-600">ID:{item.productId}</p>
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
                variant="flat"
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
      columnHelper.accessor('category', {
        id: 'category',
        header: 'Category',
        filterFn: (row: { original: IProduct }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : filterValue == row.original.category
        },
        cell: ({ getValue }) => getValue(),
      }),

      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: 'Created At',
        cell: ({ getValue }) => (
          <span className="text-sm text-foreground-600">
            {moment(getValue()).format('D MMMM, YYYY')}
          </span>
        ),
      }),
      columnHelper.accessor('updatedAt', {
        id: 'updatedAt',
        header: 'Last Updated',
        cell: ({ getValue }) => (
          <span className="text-sm text-foreground-600">
            {moment(getValue()).format('D MMMM, YYYY')}
          </span>
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
              <DropdownItem key="delete" color="danger" variant="flat">
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
            <h1 className="text-3xl text-primary font-semibold">Products</h1>
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
          Manage your pharmacy inventory and product catalog.
        </p>
        <Card className="p-3">
          <CardHeader className="justify-between items-center">
            Product Inventory{' '}
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
                      return items.filter((each) => each.inStock).length
                    else if (status == 'hidden')
                      return items.filter((each) => each.inStock == false)
                        .length
                  }
                  return '-'
                }

                const getCategoryCount = (value: string) => {
                  if (items) {
                    if (value == 'all') return items.length

                    return items.filter((each) => each.category == value).length
                  }
                  return '-'
                }

                return (
                  <div className="flex justify-between items-center w-full gap-3 flex-wrap">
                    <div className="w-full lg:w-1/4">{searchField}</div>
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-3 w-full lg:w-1/2">
                      <InputField
                        type="select"
                        controllerProps={{
                          name: 'status filter',
                          defaultValue: statusFilter,
                        }}
                        options={[
                          {
                            label: `All Visibility(${getVisibilityStatusCount(
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
                          setStatusFilter(value)
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

                          ...(categories.map((each) => ({
                            label: `${each.name} (${getCategoryCount(
                              each.name
                            )})`,
                            value: each.name,
                          })) as any),
                        ]}
                        onChange={(value) => {
                          table.getColumn('category')?.setFilterValue(value)

                          setCategoryFilter(value)
                        }}
                      />
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
    </>
  )
}

export default ProductsSection
