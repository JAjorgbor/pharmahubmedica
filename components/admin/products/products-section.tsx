'use client'
import InputField from '@/components/elements/input-field'
import moment from 'moment'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LuPlus, LuSearch } from 'react-icons/lu'
import Image from 'next/image'
import { currencyFormatter } from '@/utils/currencyFormatter'

interface IProduct {
  _id: string
  image: string
  productName: string
  productSlug: string
  productId: string
  category: string
  price: number
  updatedAt: string
  createdAt: string
  inStock: boolean
}

const items: IProduct[] = [
  {
    _id: '1',
    image: 'https://dummyimage.com/600x400/009688/fff&text=Pain+Relief',
    productName: 'Ibuprofen 200mg Tablets',
    productSlug: 'ibuprofen-200mg-tablets',
    productId: 'PHR001',
    category: 'Pain Relief',
    price: 6.99 * 1000,
    updatedAt: '2025-10-01T12:00:00Z',
    createdAt: '2025-09-15T09:30:00Z',
    inStock: true,
  },
  {
    _id: '2',
    image: 'https://dummyimage.com/600x400/3f51b5/fff&text=Vitamins',
    productName: 'Vitamin C 1000mg',
    productSlug: 'vitamin-c-1000mg',
    productId: 'PHR002',
    category: 'Vitamins & Supplements',
    price: 12.5 * 1000,
    updatedAt: '2025-10-02T08:45:00Z',
    createdAt: '2025-09-16T10:00:00Z',
    inStock: true,
  },
  {
    _id: '3',
    image: 'https://dummyimage.com/600x400/8bc34a/fff&text=First+Aid',
    productName: 'Adhesive Bandages Pack',
    productSlug: 'adhesive-bandages-pack',
    productId: 'PHR003',
    category: 'First Aid',
    price: 3.99 * 1000,
    updatedAt: '2025-10-03T14:10:00Z',
    createdAt: '2025-09-17T08:20:00Z',
    inStock: true,
  },
  {
    _id: '4',
    image: 'https://dummyimage.com/600x400/f44336/fff&text=Cold+Flu',
    productName: 'Cold & Flu Relief Capsules',
    productSlug: 'cold-flu-relief-capsules',
    productId: 'PHR004',
    category: 'Cold & Flu',
    price: 8.49 * 1000,
    updatedAt: '2025-10-04T11:25:00Z',
    createdAt: '2025-09-18T07:00:00Z',
    inStock: true,
  },
  {
    _id: '5',
    image: 'https://dummyimage.com/600x400/9c27b0/fff&text=Personal+Care',
    productName: 'Aloe Vera Moisturizing Lotion',
    productSlug: 'aloe-vera-moisturizing-lotion',
    productId: 'PHR005',
    category: 'Personal Care',
    price: 7.25 * 1000,
    updatedAt: '2025-10-05T15:40:00Z',
    createdAt: '2025-09-19T09:50:00Z',
    inStock: true,
  },
  {
    _id: '6',
    image: 'https://dummyimage.com/600x400/ff9800/fff&text=Vitamins',
    productName: 'Multivitamin Gummies',
    productSlug: 'multivitamin-gummies',
    productId: 'PHR006',
    category: 'Vitamins & Supplements',
    price: 14.99 * 1000,
    updatedAt: '2025-10-06T10:30:00Z',
    createdAt: '2025-09-20T11:10:00Z',
    inStock: true,
  },
  {
    _id: '7',
    image: 'https://dummyimage.com/600x400/00bcd4/fff&text=Skin+Care',
    productName: 'Sunscreen SPF 50',
    productSlug: 'sunscreen-spf-50',
    productId: 'PHR007',
    category: 'Skin Care',
    price: 11.49 * 1000,
    updatedAt: '2025-10-07T13:00:00Z',
    createdAt: '2025-09-21T08:00:00Z',
    inStock: true,
  },
  {
    _id: '8',
    image: 'https://dummyimage.com/600x400/4caf50/fff&text=Baby+Care',
    productName: 'Baby Wipes 80ct',
    productSlug: 'baby-wipes-80ct',
    productId: 'PHR008',
    category: 'Baby Care',
    price: 5.99 * 1000,
    updatedAt: '2025-10-08T09:15:00Z',
    createdAt: '2025-09-22T07:45:00Z',
    inStock: true,
  },
  {
    _id: '9',
    image: 'https://dummyimage.com/600x400/cddc39/fff&text=Pain+Relief',
    productName: 'Acetaminophen 500mg',
    productSlug: 'acetaminophen-500mg',
    productId: 'PHR009',
    category: 'Pain Relief',
    price: 6.25 * 1000,
    updatedAt: '2025-10-09T12:00:00Z',
    createdAt: '2025-09-23T09:30:00Z',
    inStock: true,
  },
  {
    _id: '10',
    image: 'https://dummyimage.com/600x400/ff5722/fff&text=Cold+Flu',
    productName: 'Cough Syrup for Adults',
    productSlug: 'cough-syrup-for-adults',
    productId: 'PHR010',
    category: 'Cold & Flu',
    price: 9.99 * 1000,
    updatedAt: '2025-10-10T14:25:00Z',
    createdAt: '2025-09-24T08:55:00Z',
    inStock: false,
  },
  {
    _id: '11',
    image: 'https://dummyimage.com/600x400/607d8b/fff&text=First+Aid',
    productName: 'Antiseptic Cream 30g',
    productSlug: 'antiseptic-cream-30g',
    productId: 'PHR011',
    category: 'First Aid',
    price: 4.75 * 1000,
    updatedAt: '2025-10-11T10:40:00Z',
    createdAt: '2025-09-25T07:30:00Z',
    inStock: true,
  },
  {
    _id: '12',
    image: 'https://dummyimage.com/600x400/795548/fff&text=Digestive+Health',
    productName: 'Probiotic Capsules',
    productSlug: 'probiotic-capsules',
    productId: 'PHR012',
    category: 'Digestive Health',
    price: 18.99 * 1000,
    updatedAt: '2025-10-12T11:50:00Z',
    createdAt: '2025-09-26T10:00:00Z',
    inStock: true,
  },
  {
    _id: '13',
    image: 'https://dummyimage.com/600x400/e91e63/fff&text=Personal+Care',
    productName: 'Toothpaste Whitening 100ml',
    productSlug: 'toothpaste-whitening-100ml',
    productId: 'PHR013',
    category: 'Personal Care',
    price: 3.99 * 1000,
    updatedAt: '2025-10-13T09:10:00Z',
    createdAt: '2025-09-27T08:10:00Z',
    inStock: true,
  },
  {
    _id: '14',
    image: 'https://dummyimage.com/600x400/9e9e9e/fff&text=Skin+Care',
    productName: 'Hydrating Face Wash',
    productSlug: 'hydrating-face-wash',
    productId: 'PHR014',
    category: 'Skin Care',
    price: 8.75 * 1000,
    updatedAt: '2025-10-14T13:25:00Z',
    createdAt: '2025-09-28T07:15:00Z',
    inStock: true,
  },
  {
    _id: '15',
    image: 'https://dummyimage.com/600x400/673ab7/fff&text=Sexual+Wellness',
    productName: 'Lubricant Gel 100ml',
    productSlug: 'lubricant-gel-100ml',
    productId: 'PHR015',
    category: 'Sexual Wellness',
    price: 9.49 * 1000,
    updatedAt: '2025-10-15T15:40:00Z',
    createdAt: '2025-09-29T09:45:00Z',
    inStock: true,
  },
  {
    _id: '16',
    image: 'https://dummyimage.com/600x400/ffeb3b/000&text=Vitamins',
    productName: 'Vitamin D3 2000IU',
    productSlug: 'vitamin-d3-2000iu',
    productId: 'PHR016',
    category: 'Vitamins & Supplements',
    price: 10.99 * 1000,
    updatedAt: '2025-10-16T11:00:00Z',
    createdAt: '2025-09-30T08:00:00Z',
    inStock: true,
  },
  {
    _id: '17',
    image: 'https://dummyimage.com/600x400/4caf50/fff&text=Baby+Care',
    productName: 'Baby Shampoo 250ml',
    productSlug: 'baby-shampoo-250ml',
    productId: 'PHR017',
    category: 'Baby Care',
    price: 6.49 * 1000,
    updatedAt: '2025-10-17T10:20:00Z',
    createdAt: '2025-10-01T07:40:00Z',
    inStock: true,
  },
  {
    _id: '18',
    image: 'https://dummyimage.com/600x400/2196f3/fff&text=Respiratory+Care',
    productName: 'Saline Nasal Spray',
    productSlug: 'saline-nasal-spray',
    productId: 'PHR018',
    category: 'Respiratory Care',
    price: 5.99 * 1000,
    updatedAt: '2025-10-18T09:50:00Z',
    createdAt: '2025-10-02T09:00:00Z',
    inStock: true,
  },
  {
    _id: '19',
    image: 'https://dummyimage.com/600x400/ffc107/000&text=Pain+Relief',
    productName: 'Pain Relief Cream 50g',
    productSlug: 'pain-relief-cream-50g',
    productId: 'PHR019',
    category: 'Pain Relief',
    price: 7.99 * 1000,
    updatedAt: '2025-10-19T12:00:00Z',
    createdAt: '2025-10-03T08:30:00Z',
    inStock: true,
  },
  {
    _id: '20',
    image: 'https://dummyimage.com/600x400/009688/fff&text=Medical+Devices',
    productName: 'Digital Thermometer',
    productSlug: 'digital-thermometer',
    productId: 'PHR020',
    category: 'Medical Devices',
    price: 13.5 * 1000,
    updatedAt: '2025-10-20T08:15:00Z',
    createdAt: '2025-10-04T09:10:00Z',
    inStock: true,
  },
]

const categories = [
  {
    _id: 'c1',
    name: 'Pain Relief',
    slug: 'pain-relief',
    description: 'Medications and creams to reduce pain and inflammation.',
    image: 'https://dummyimage.com/600x400/ffc107/000&text=Pain+Relief',
  },
  {
    _id: 'c2',
    name: 'Vitamins & Supplements',
    slug: 'vitamins-and-supplements',
    description:
      'Essential vitamins, minerals, and daily supplements for overall health.',
    image:
      'https://dummyimage.com/600x400/ffeb3b/000&text=Vitamins+%26+Supplements',
  },
  {
    _id: 'c3',
    name: 'First Aid',
    slug: 'first-aid',
    description: 'Supplies and creams for minor cuts, burns, and injuries.',
    image: 'https://dummyimage.com/600x400/8bc34a/fff&text=First+Aid',
  },
  {
    _id: 'c4',
    name: 'Cold & Flu',
    slug: 'cold-and-flu',
    description: 'Relief products for cough, fever, and flu symptoms.',
    image: 'https://dummyimage.com/600x400/f44336/fff&text=Cold+%26+Flu',
  },
  {
    _id: 'c5',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Everyday hygiene and body care essentials.',
    image: 'https://dummyimage.com/600x400/9c27b0/fff&text=Personal+Care',
  },
  {
    _id: 'c6',
    name: 'Skin Care',
    slug: 'skin-care',
    description:
      'Moisturizers, sunscreens, and facial cleansers for healthy skin.',
    image: 'https://dummyimage.com/600x400/00bcd4/fff&text=Skin+Care',
  },
  {
    _id: 'c7',
    name: 'Baby Care',
    slug: 'baby-care',
    description: 'Gentle and safe products for babies and infants.',
    image: 'https://dummyimage.com/600x400/4caf50/fff&text=Baby+Care',
  },
  {
    _id: 'c8',
    name: 'Digestive Health',
    slug: 'digestive-health',
    description: 'Probiotics and aids for digestive balance and gut health.',
    image: 'https://dummyimage.com/600x400/795548/fff&text=Digestive+Health',
  },
  {
    _id: 'c9',
    name: 'Sexual Wellness',
    slug: 'sexual-wellness',
    description:
      'Products promoting intimacy, safety, and reproductive health.',
    image: 'https://dummyimage.com/600x400/673ab7/fff&text=Sexual+Wellness',
  },
  {
    _id: 'c10',
    name: 'Respiratory Care',
    slug: 'respiratory-care',
    description: 'Sprays and treatments for nasal and respiratory relief.',
    image: 'https://dummyimage.com/600x400/2196f3/fff&text=Respiratory+Care',
  },
  {
    _id: 'c11',
    name: 'Medical Devices',
    slug: 'medical-devices',
    description:
      'Digital thermometers, blood pressure monitors, and other home-use devices.',
    image: 'https://dummyimage.com/600x400/009688/fff&text=Medical+Devices',
  },
]

const columnHelper = createColumnHelper<IProduct>()

const ProductsSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

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
      columnHelper.accessor('category', {
        id: 'category',
        header: 'Category',
        filterFn: 'categoryFilter' as any,
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
      columnHelper.accessor('inStock', {
        id: 'inStock',
        header: 'Stock',
        filterFn: 'statusFilter' as any,
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

  const table = useReactTable({
    data: items || [],
    columns,
    state: {
      globalFilter,
      columnFilters,
      pagination,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    getSortedRowModel: getSortedRowModel(), // Enables sorting functionality
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    filterFns: {
      statusFilter: (row: { original: IProduct }, columnId, filterValue) => {
        if (typeof filterValue == 'undefined') return false

        return filterValue == 'all'
          ? true
          : filterValue == 'inStock'
          ? row.original.inStock == true
          : row.original.inStock == false
      },
      categoryFilter: (row: { original: IProduct }, columnId, filterValue) => {
        if (typeof filterValue == 'undefined') return false

        return filterValue == 'all'
          ? true
          : filterValue == row.original.category
      },
    },
  })

  const getSubscriberStatusCount = useCallback(
    (status: string) => {
      if (items) {
        if (status == 'all') return items.length
        else if (status == 'inStock')
          return items.filter((each) => each.inStock).length
        else if (status == 'outOfStock')
          return items.filter((each) => each.inStock == false).length
      }
      return '-'
    },
    // eslint-disable-next-line
    [items, table.getColumn('inStock')?.getFilterValue()]
  )

  const getCategoryCount = useCallback(
    (value: string) => {
      if (items) {
        if (value == 'all') return items.length

        return items.filter((each) => each.category == value).length
      }
      return '-'
    },
    // eslint-disable-next-line
    [items, table.getColumn('category')?.getFilterValue()]
  )

  return (
    <>
      <div className="space-y-6 max-w-7xl px-5 mx-auto">
        <div className="flex justify-between gap-6 items-center py-5 flex-wrap">
          <div className="space-y-1">
            <h1 className="text-3xl text-primary font-semibold">Products</h1>
            <p className="text-foreground-500">
              Manage your pharmacy inventory and product catalog.
            </p>
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
        <Card className="p-3">
          <CardHeader className="font-bold">Product Inventory</CardHeader>
          <CardBody className="space-y-6">
            {' '}
            <div className="flex justify-between items-center w-full gap-3 flex-wrap">
              <InputField
                controllerProps={{ name: 'search field' }}
                type="search"
                classNames={{ base: 'w-full md:w-1/3' }}
                className="w-full md:w-44"
                placeholder="Search inventory"
                startContent={<LuSearch className="w-4 h-4" />}
                onChange={(value) => setGlobalFilter(value)}
              />
              <div className="gap-4 grid grid-cols-2 w-full md:w-1/3">
                <InputField
                  type="select"
                  controllerProps={{
                    name: 'status filter',
                    defaultValue: statusFilter,
                  }}
                  options={[
                    {
                      label: `All (${getSubscriberStatusCount('all')})`,
                      value: 'all',
                    },
                    {
                      label: `In Stock (${getSubscriberStatusCount(
                        'inStock'
                      )})`,
                      value: 'inStock',
                    },
                    {
                      label: `Out of Stock (${getSubscriberStatusCount(
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
                  value={categoryFilter}
                  options={[
                    {
                      label: `All Categories (${getCategoryCount('all')})`,
                      value: 'all',
                    },

                    ...(categories.map((each) => ({
                      label: `${each.name} (${getCategoryCount(each.name)})`,
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
            <div className="overflow-hidden">
              <div className="min-w-full max-w-0 overflow-auto">
                <Table
                  removeWrapper
                  classNames={{
                    tbody: 'divide-y divide-foreground-200',
                    table: 'w-max',
                  }}
                  //   topContent={

                  //   }
                  //   bottomContent={

                  //   }
                >
                  <TableHeader className="border-b">
                    {
                      table.getHeaderGroups().map((headerGroup) =>
                        headerGroup.headers.map((header) => (
                          <TableColumn
                            key={header.id}
                            allowsSorting={[
                              'createdAt',
                              'updatedAt',
                              'price',
                              'stock',
                            ].includes(header.id)}
                            onClick={(e) =>
                              [
                                'createdAt',
                                'updatedAt',
                                'price',
                                'stock',
                              ].includes(header.id)
                                ? header.column.getToggleSortingHandler()(e)
                                : null
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableColumn>
                        ))
                      ) as any
                    }
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.original._id} className="text-nevada">
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell key={index}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex justify-between gap-4 flex-wrap">
              <label className="flex items-center text-foreground-600 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-foreground-600 text-small"
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  defaultValue={10}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </label>
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={table.getState().pagination.pageIndex + 1}
                total={table.getPageCount() || 1}
                onChange={(value) => table.setPageIndex(value - 1)}
                className="text-white"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default ProductsSection
