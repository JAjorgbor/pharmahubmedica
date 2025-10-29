'use client'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import { IOrder, orders } from '@/library/dummy-data'
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
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { FiMoreVertical, FiXCircle } from 'react-icons/fi'
import {
  LuBox,
  LuCircleCheck,
  LuClock,
  LuPackage,
  LuPlus,
} from 'react-icons/lu'

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'fulfilled', label: 'Fulfilled' },
  { value: 'cancelled', label: 'Cancelled' },
]

const columnHelper = createColumnHelper<IOrder>()

const OrdersSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

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
      columnHelper.accessor('referralId', {
        header: 'Referrer',
        cell: ({ getValue }) => (
          <div className="space-y-1">
            {getValue() ? (
              <>
                <p className="text-xs">Joshua Doe</p>
                <p className="text-xs text-foreground-600">
                  joshuadoe@email.com
                </p>
                <p className="text-xs text-foreground-600">ID:{getValue()}</p>
              </>
            ) : (
              <>&mdash;</>
            )}
          </div>
        ),
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
                href={`/admin/orders/${item._id}`}
              >
                Manage Order
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
    <>
      <div className="space-y-6 max-w-7xl p-5 mx-auto">
        <div className="flex justify-between gap-6 items-center flex-wrap">
          <div className="space-y-1">
            <h1 className="text-3xl text-primary font-semibold">
              Store Orders
            </h1>
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/admin/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>Orders</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <Button
            color="primary"
            startContent={<LuPlus size={15} />}
            as={Link}
            href="/admin/orders/add"
          >
            Create Order
          </Button>
        </div>
        <p className="text-foreground-500">
          Manage and track customer orders..
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <LuClock className="text-warning" strokeWidth={0.7} size={40} />
                <div className="space-y-1">
                  <p>Pending</p>
                  <p className="text-xl font-semibold">1</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <LuPackage
                  className="text-primary"
                  strokeWidth={0.7}
                  size={40}
                />
                <div className="space-y-1">
                  <p>Confirmed</p>
                  <p className="text-xl font-semibold">1</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <LuCircleCheck
                  className="text-success"
                  strokeWidth={0.7}
                  size={40}
                />
                <div className="space-y-1">
                  <p>Fulfilled</p>
                  <p className="text-xl font-semibold">1</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <FiXCircle
                  className="text-danger"
                  strokeWidth={0.7}
                  size={40}
                />
                <div className="space-y-1">
                  <p>Cancelled</p>
                  <p className="text-xl font-semibold">1</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>Order Management </CardHeader>
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
    </>
  )
}

export default OrdersSection
