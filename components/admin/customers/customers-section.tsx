'use client'
import InputField from '@/components/elements/input-field'
import { ICustomer } from '@/api-client/admin/interfaces/customer.interfaces'
import useGetCustomers from '@/hooks/requests/admin/useGetCustomers'
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
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LuExternalLink, LuPlus, LuPencil, LuTrash } from 'react-icons/lu'
import { currencyFormatter } from '@/utils/currency-formatter'
import TableWrapper from '@/components/elements/table-wrapper'
import UpdateCustomerModal from './UpdateCustomerModal'
import { referralPartnerProfessions } from '@/library/config'

const columnHelper = createColumnHelper<ICustomer>()

const CustomersSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const { customers, customersLoading, mutateCustomers } = useGetCustomers()
  const items = useMemo(() => customers || [], [customers])
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  )
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (item) => `${item?.firstName} ${item?.lastName} ${item?.email}`,
        {
          id: 'name',
          header: 'Customer',
          cell: ({ row: { original: item } }) => (
            <div className="flex gap-2 items-center">
              <Image
                src={`https://dummyimage.com/100x100/009688/fff&text=${item.firstName
                  .charAt(0)
                  .toUpperCase()}`}
                alt={`profile image`}
                width={100}
                height={100}
                className="object-cover rounded-full size-10 object-center"
              />

              <div className="space-y-1">
                <h3 className="font-bold flex flex-col max-w-44 truncate">{`${
                  item.firstName
                } ${item.lastName || ''}`}</h3>
                <p className="text-xs text-foreground-600 max-w-44 truncate">
                  {item.email}
                </p>
              </div>
            </div>
          ),
        }
      ),
      columnHelper.accessor('phoneNumber', {
        id: 'phone',
        header: 'Phone Number',
        cell: ({ getValue }) => getValue() || '—',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        filterFn: (row: { original: ICustomer }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined' || filterValue == 'all')
            return true
          return row.original.status == filterValue
        },
        cell: ({ getValue }) => {
          const status = getValue()
          const color =
            status === 'active'
              ? 'success'
              : status === 'pending'
              ? 'warning'
              : 'default'
          return (
            <div className="capitalize">
              <Chip color={color} variant="dot" size="sm">
                {status}
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
      columnHelper.accessor('referredBy', {
        header: 'Referred By',
        cell: ({ getValue }) =>
          getValue() ? (
            <div className="">
              <Link
                href={`/admin/referral-partners/${getValue()._id}`}
                className="max-w-44 truncate hover:text-primary text-sm"
              >
                {getValue().profession !== 'other' &&
                  referralPartnerProfessions[getValue().profession]}{' '}
                {getValue().user.firstName} {getValue().user.lastName}
              </Link>
              <p className="text-foreground-400 text-xs max-w-44 truncate">
                {getValue().user.email}
              </p>
            </div>
          ) : (
            '—'
          ),
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
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <FiMoreVertical className="text-gray-500" size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Customer Actions">
              <DropdownItem
                key="edit"
                startContent={<LuPencil />}
                onPress={() => {
                  setSelectedCustomer(item)
                  setIsUpdateOpen(true)
                }}
              >
                Edit Details
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
            Total Customers : {customersLoading ? '...' : items.length}
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
          <TableWrapper
            columns={columns}
            items={items}
            isLoading={customersLoading}
            allowsSortingFor={['createdAt', 'updatedAt', 'totalSpent']}
            topContent={({ table, searchField }) => {
              const getStatusCount = (status: string) => {
                if (items) {
                  if (status == 'all') return items.length
                  return items.filter((each) => each.status === status).length
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
                        control: null,
                      }}
                      options={[
                        {
                          label: `All Customers (${getStatusCount('all')})`,
                          value: 'all',
                        },
                        {
                          label: `Active (${getStatusCount('active')})`,
                          value: 'active',
                        },
                        {
                          label: `Pending (${getStatusCount('pending')})`,
                          value: 'pending',
                        },
                        {
                          label: `Inactive (${getStatusCount('inactive')})`,
                          value: 'inactive',
                        },
                      ]}
                      onChange={(value) => {
                        table.getColumn('status')?.setFilterValue(value)
                        setStatusFilter(value)
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
      <UpdateCustomerModal
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        customer={selectedCustomer}
        onSuccess={() => mutateCustomers()}
      />
    </div>
  )
}

export default CustomersSection
