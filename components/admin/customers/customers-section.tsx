'use client'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import { IUser, users } from '@/library/dummy-data'
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
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LuExternalLink, LuPlus } from 'react-icons/lu'

const columnHelper = createColumnHelper<IUser>()

const CustomersSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const items = users
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'User',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <Image
              src={`https://dummyimage.com/100x100/009688/fff&text=${item.name
                .charAt(0)
                .toUpperCase()}`}
              alt={`profile image`}
              width={100}
              height={100}
              className="object-cover rounded-full size-10 object-center"
            />

            <div className="space-y-1">
              <h3 className="font-bold flex flex-col">{`${item.name}`}</h3>
              <p className="text-xs text-foreground-600">{item.email}</p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        header: 'Phone Number',
        cell: ({ getValue }) => getValue(),
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        filterFn: (row: { original: IUser }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : filterValue == 'active'
            ? row.original.isActive == true
            : row.original.isActive == false
        },
        cell: ({ getValue }) => {
          return (
            <div className="capitalize">
              <Chip
                color={getValue() ? 'success' : 'warning'}
                variant="dot"
                size="sm"
              >
                {getValue() ? 'Active' : 'Inactive'}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor('totalSpent', {
        header: 'Total Spent',
        cell: ({ getValue }) =>
          getValue() ? currencyFormatter(getValue()) : '—',
      }),
      columnHelper.display({
        header: 'Referrer',
        cell: () => '—',
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

      columnHelper.display({
        id: 'action',

        cell: ({ row: { original: item } }) => (
          <Button size="sm" variant="bordered">
            Manage
          </Button>
        ),
      }),
    ],
    [items]
  )

  return (
    <div className="space-y-6 max-w-7xl p-5 mx-auto">
      <div className="flex justify-between gap-6 items-center flex-wrap">
        <div className="space-y-1">
          <h1 className="text-3xl text-primary font-semibold">
            Store Customers
          </h1>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Customers</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <p className="text-foreground-500">Manage customer accounts</p>
      <Card className="p-3">
        <CardHeader className="justify-between gap-4 flex-wrap items-center">
          <Chip color="secondary" size="sm">
            Total Customers : {items.length}
          </Chip>
          <Button
            color="primary"
            variant="light"
            as={Link}
            href="/admin/referral-partners"
            endContent={<LuExternalLink />}
            size="sm"
          >
            View Referral Partners
          </Button>
        </CardHeader>
        <CardBody className="space-y-6">
          {' '}
          <TableWrapper
            columns={columns}
            items={items}
            allowsSortingFor={['createdAt', 'updatedAt', 'totalSpent']}
            topContent={({ table, searchField }) => {
              const getIsActiveStatusCount = (status: string) => {
                if (items) {
                  if (status == 'all') return items.length
                  else if (status == 'active')
                    return items.filter((each) => each.isActive).length
                  else if (status == 'inactive')
                    return items.filter((each) => each.isActive == false).length
                }
                return '-'
              }

              return (
                <div className="flex justify-between items-center w-full gap-3 flex-wrap">
                  <div className="w-full lg:w-1/4">
                    {searchField('Search customers')}
                  </div>

                  <div className="gap-3 grid w-full lg:w-1/5">
                    <InputField
                      type="select"
                      controllerProps={{
                        name: 'status filter',
                        defaultValue: statusFilter,
                      }}
                      options={[
                        {
                          label: `All Customers (${getIsActiveStatusCount(
                            'all'
                          )})`,
                          value: 'all',
                        },
                        {
                          label: `Active (${getIsActiveStatusCount('active')})`,
                          value: 'active',
                        },
                        {
                          label: `Inactive (${getIsActiveStatusCount(
                            'inactive'
                          )})`,
                          value: 'inactive',
                        },
                      ]}
                      onChange={(value) => {
                        table.getColumn('isActive')?.setFilterValue(value)
                        setStatusFilter(value)
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
  )
}

export default CustomersSection
