'use client'
import AddCollectionModal from '@/components/admin/collections/add-collection-modal'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import { categories, ICategory } from '@/library/dummy-data'
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Card,
  CardBody,
  CardHeader,
  DropdownTrigger,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LuExternalLink, LuPlus } from 'react-icons/lu'

const columnHelper = createColumnHelper<ICategory>()

const CollectionsSection = () => {
  const items = categories
  const [visibilityFilter, setVisibilityFilter] = useState('all')
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false)

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Category',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <Image
              src={item.image}
              alt={`${item.name} image`}
              width={100}
              height={100}
              className="object-cover rounded-lg size-16 object-center"
            />

            <div className="space-y-1">
              <h3 className="font-bold flex flex-col">{`${item.name}`}</h3>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('products', {
        id: 'products',
        header: 'products',
        cell: ({ getValue }) => getValue(),
      }),
      columnHelper.accessor('subcategories', {
        id: 'subcategories',
        header: 'Subcategories',
        cell: ({ getValue }) => {
          return getValue().length
        },
      }),
      columnHelper.accessor('visible', {
        id: 'visible',
        header: 'Stock',
        filterFn: (row: { original: ICategory }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : filterValue == 'visible'
            ? row.original.visible == true
            : row.original.visible == false
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
                href={`/admin/products?category=${item.name}`}
              >
                Manage
              </DropdownItem>
              <DropdownItem key="delete" color="danger" variant="flat">
                Delete Category
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
      <div className="space-y-5">
        <div className="flex justify-between gap-6 items-center flex-wrap">
          <div className="space-y-1">
            <h1 className="text-3xl text-primary font-semibold">
              Store Collections
            </h1>
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/admin/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>Collections</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <Button
            color="primary"
            startContent={<LuPlus size={15} />}
            onPress={() => setShowAddCollectionModal(true)}
          >
            Add Collection
          </Button>
        </div>
        <p className="text-foreground-500">
          Manage and organize product groupings to keep your storefront
          structured and easy to navigate.
        </p>
        <Card className="p-3">
          <CardHeader className="justify-between gap-4 flex-wrap items-center">
            <Chip color="secondary" size="sm">
              Total Collections : {items.length}
            </Chip>
            <Button
              color="primary"
              variant="light"
              as={Link}
              href="/admin/products"
              endContent={<LuExternalLink />}
              size="sm"
            >
              View All Products
            </Button>
          </CardHeader>
          <CardBody className="space-y-6">
            {' '}
            <TableWrapper
              columns={columns}
              items={items}
              allowsSortingFor={[
                'createdAt',
                'updatedAt',
                'products',
                'subcategories',
              ]}
              topContent={({ table, searchField }) => {
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

                return (
                  <div className="flex justify-between items-center w-full gap-3 flex-wrap">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                      {searchField('Search collections')}
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/5">
                      <InputField
                        type="select"
                        controllerProps={{
                          name: 'status filter',
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
                    </div>
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
      <AddCollectionModal
        isOpen={showAddCollectionModal}
        setIsOpen={setShowAddCollectionModal}
      />
    </>
  )
}

export default CollectionsSection
