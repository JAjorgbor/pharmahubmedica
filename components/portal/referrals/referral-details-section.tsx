'use client'
import { currencyFormatter } from '@/utils/currencyFormatter'
import {
  addToast,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import React, { useMemo, useState } from 'react'
import {
  LuBox,
  LuCircleCheckBig,
  LuClock,
  LuCoins,
  LuPackage,
  LuUserCheck,
} from 'react-icons/lu'
import { IoCashOutline } from 'react-icons/io5'
import TableWrapper from '@/components/elements/table-wrapper'
import { FiMoreVertical } from 'react-icons/fi'
import Link from 'next/link'
import { createColumnHelper } from '@tanstack/react-table'
import { IOrder, orders } from '@/library/dummy-data'
import moment from 'moment'
import InputField from '@/components/elements/input-field'

const columnHelper = createColumnHelper<IOrder>()

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'fulfilled', label: 'Fulfilled' },
  { value: 'cancelled', label: 'Cancelled' },
]

const ReferralDetailsSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')
  const items = orders

  const columns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        id: 'id',
        header: 'Order ID',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <p className="text-xs text-foreground-600">{item._id}</p>
          </div>
        ),
      }),
      columnHelper.accessor('customerEmail', {
        id: 'customerEmail',
        header: 'Customer',
        cell: ({ row: { original: item } }) => (
          <div className="space-y-1">
            <p className="text-xs">{item.customerName}</p>
            <p className="text-xs text-foreground-600">{item.customerEmail}</p>
            <p className="text-xs text-foreground-600">{item.customerPhone}</p>
          </div>
        ),
      }),

      columnHelper.accessor('status', {
        header: 'Order Status',
        filterFn: (row: { original: IOrder }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : row.original.status == filterValue
        },
        cell: ({ getValue }) => {
          const statusMap = {
            pending: 'warning',
            fulfilled: 'success',
            cancelled: 'danger',
            confirmed: 'primary',
          } as const
          return (
            <div className="capitalize">
              <Chip color={statusMap[getValue()]} variant="flat" size="sm">
                {getValue()}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor('paymentStatus', {
        header: 'Payment Status',
        filterFn: (row: { original: IOrder }, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false

          return filterValue == 'all'
            ? true
            : row.original.paymentStatus == filterValue
        },
        cell: ({ getValue }) => {
          const statusMap = {
            pending: 'warning',
            paid: 'success',
            refunded: 'primary',
            failed: 'danger',
          } as const
          return (
            <div className="capitalize">
              <Chip color={statusMap[getValue()]} variant="dot" size="sm">
                {getValue()}
              </Chip>
            </div>
          )
        },
      }),

      columnHelper.accessor((original) => `${original.items.length}`, {
        id: 'items',
        header: 'Items',
        cell: ({ getValue }) => {
          return <div>{getValue().length}</div>
        },
      }),
      columnHelper.accessor('totalAmount', {
        header: 'Total',
        cell: ({ getValue }) => {
          return <div>{currencyFormatter(getValue())}</div>
        },
      }),

      columnHelper.accessor('orderDate', {
        header: 'Order Date',
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
                href="#"
                onClick={() =>
                  addToast({
                    title: 'This feature is currently not available',
                    severity: 'primary',
                    color: 'primary',
                  })
                }
              >
                View Order Details
              </DropdownItem>
              <DropdownItem
                key="contact-customer"
                showDivider
                as={Link}
                href={`#`}
              >
                Contact Customer
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [items]
  )

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              [Referral User Name]
            </h1>
            <p className="text-foreground-500">
              Monitor orders from this referral patients and track commissions
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <IoCashOutline
                  className="h-8 w-8 text-success"
                  //   strokeWidth={0.5}
                />
                <div>
                  <p className="text-sm font-medium">Total Commissions</p>
                  <p className="text-2xl font-bold">
                    {currencyFormatter(140000)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuPackage className="h-8 w-8 text-primary" strokeWidth={1} />
                <div>
                  <p className="text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <IoCashOutline className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-sm font-medium">Pending Commission</p>
                  <p className="text-2xl font-bold">
                    {currencyFormatter(10000)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardHeader>Referral's Orders</CardHeader>
          <CardBody>
            <TableWrapper
              columns={columns}
              items={items}
              allowsSortingFor={['orderDate', 'items']}
              topContent={({ table, searchField }) => {
                const getStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else
                      return items.filter((each) => each.status == status)
                        .length
                  }
                  return '-'
                }
                const getPaymentStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else
                      return items.filter(
                        (each) => each.paymentStatus == status
                      ).length
                  }
                  return '-'
                }

                return (
                  <div className="flex justify-between items-center w-full gap-3 flex-wrap">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                      {searchField('Search orders')}
                    </div>
                    <div className="gap-3 grid grid-cols-2 w-full md:w-1/2 lg:w-1/3">
                      <InputField
                        type="select"
                        controllerProps={{
                          name: 'status filter',
                          defaultValue: statusFilter,
                        }}
                        options={[
                          {
                            label: `All Order Status(${getStatusCount('all')})`,
                            value: 'all',
                          },
                          {
                            label: `Pending (${getStatusCount('pending')})`,
                            value: 'pending',
                          },
                          {
                            label: `Confirmed (${getStatusCount('confirmed')})`,
                            value: 'confirmed',
                          },
                          {
                            label: `Fulfilled (${getStatusCount('fulfilled')})`,
                            value: 'fulfilled',
                          },
                          {
                            label: `Cancelled (${getStatusCount('cancelled')})`,
                            value: 'cancelled',
                          },
                        ]}
                        onChange={(value) => {
                          table.getColumn('status')?.setFilterValue(value)
                          setStatusFilter(value)
                        }}
                      />
                      <InputField
                        type="select"
                        controllerProps={{
                          name: 'payment status filter',
                          defaultValue: paymentStatusFilter,
                        }}
                        options={[
                          {
                            label: `All Payment Status(${getPaymentStatusCount(
                              'all'
                            )})`,
                            value: 'all',
                          },
                          {
                            label: `Pending (${getPaymentStatusCount(
                              'pending'
                            )})`,
                            value: 'pending',
                          },
                          {
                            label: `Paid (${getPaymentStatusCount('paid')})`,
                            value: 'paid',
                          },
                          {
                            label: `Refunded (${getPaymentStatusCount(
                              'refunded'
                            )})`,
                            value: 'refunded',
                          },
                          {
                            label: `Failed (${getPaymentStatusCount(
                              'failed'
                            )})`,
                            value: 'failed',
                          },
                        ]}
                        onChange={(value) => {
                          table
                            .getColumn('paymentStatus')
                            ?.setFilterValue(value)
                          setPaymentStatusFilter(value)
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
    </div>
  )
}

export default ReferralDetailsSection
