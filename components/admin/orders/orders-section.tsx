'use client'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import { IOrder } from '@/api-client/interfaces/order.interfaces'
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
  Spinner,
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
import { useGetAdminOrders } from '@/hooks/requests/admin/useAdminOrders'
import { referralPartnerProfessions } from '@/library/config'

const columnHelper = createColumnHelper<IOrder>()

const OrdersSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')

  const { orders, ordersLoading } = useGetAdminOrders()

  const columns = useMemo(
    () => [
      columnHelper.accessor('orderNumber', {
        id: 'orderNumber',
        header: 'Order #',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <p className="text-xs font-semibold text-primary">
              {item.orderNumber}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor('customer', {
        id: 'customer',
        header: 'Customer',
        cell: ({ row: { original: item } }) => {
          const customer = item.customer as any
          return (
            <div className="space-y-1">
              <p className="text-xs font-semibold">
                {customer?.firstName} {customer?.lastName}
              </p>
              <p className="text-xs text-foreground-600">{customer?.email}</p>
              <p className="text-xs text-foreground-600">
                {customer?.phoneNumber}
              </p>
            </div>
          )
        },
      }),

      columnHelper.accessor('orderStatus', {
        header: 'Status',
        cell: ({ getValue }) => {
          const statusMap = {
            processing: 'warning',
            delivered: 'success',
            cancelled: 'danger',
            'in-transit': 'primary',
          } as const
          return (
            <div className="capitalize">
              <Chip
                color={statusMap[getValue()] || 'default'}
                variant="flat"
                size="sm"
              >
                {getValue()}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor('paymentStatus', {
        header: 'Payment',
        cell: ({ getValue }) => {
          const statusMap = {
            pending: 'warning',
            paid: 'success',
            reversed: 'primary',
            failed: 'danger',
            abandoned: 'default',
          } as const
          return (
            <div className="capitalize">
              <Chip
                color={statusMap[getValue()] || 'default'}
                variant="dot"
                size="sm"
              >
                {getValue()}
              </Chip>
            </div>
          )
        },
      }),

      columnHelper.accessor((original) => `${original.products.length}`, {
        id: 'items',
        header: 'Items',
        cell: ({ row: { original: item } }) => {
          return <div>{item.products.length}</div>
        },
      }),
      columnHelper.accessor('transaction.totalAmount', {
        header: 'Total',
        cell: ({ row: { original: item } }) => {
          return <div>{currencyFormatter(item.transaction.totalAmount)}</div>
        },
      }),
      columnHelper.accessor('referralDetails', {
        id: 'referrer',
        header: 'Referrer',
        cell: ({ getValue }) => {
          return (
            <div className="space-y-1">
              {getValue()?.referralPartner ? (
                <>
                  <p className="text-xs font-semibold">
                    {
                      referralPartnerProfessions[
                        getValue()?.referralPartner.profession
                      ]
                    }{' '}
                    {getValue()?.referralPartner.user.firstName}{' '}
                    {getValue()?.referralPartner.user.lastName}
                  </p>
                  <p className="text-xs text-foreground-600">
                    Code: {getValue()?.referralPartner.referralCode}
                  </p>
                  {getValue()?.commission && (
                    <p className="text-xs text-success">
                      Comm: {currencyFormatter(getValue()?.commission.amount)}
                    </p>
                  )}
                </>
              ) : (
                <>&mdash;</>
              )}
            </div>
          )
        },
      }),

      columnHelper.accessor('createdAt', {
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
                onPress={() => {
                  const customer = item.customer as any
                  if (customer?.phoneNumber)
                    window.open(
                      `https://wa.me/${customer.phoneNumber}`,
                      '_blank',
                    )
                }}
              >
                Contact Customer
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [],
  )

  const counts = useMemo(() => {
    return {
      processing: orders.filter((o) => o.orderStatus === 'processing').length,
      inTransit: orders.filter((o) => o.orderStatus === 'in-transit').length,
      delivered: orders.filter((o) => o.orderStatus === 'delivered').length,
      cancelled: orders.filter((o) => o.orderStatus === 'cancelled').length,
    }
  }, [orders])

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
            href="/admin/orders/create" // Changed from add to create to match common pattern if needed
          >
            Create Order
          </Button>
        </div>
        <p className="text-foreground-500">Manage and track customer orders.</p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <LuClock className="text-warning" strokeWidth={0.7} size={40} />
                <div className="space-y-1">
                  <p>Processing</p>
                  <p className="text-xl font-semibold">{counts.processing}</p>
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
                  <p>In-Transit</p>
                  <p className="text-xl font-semibold">{counts.inTransit}</p>
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
                  <p>Delivered</p>
                  <p className="text-xl font-semibold">{counts.delivered}</p>
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
                  <p className="text-xl font-semibold">{counts.cancelled}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Chip color="secondary" size="sm">
              Total Orders : {orders.length}
            </Chip>{' '}
          </CardHeader>
          <CardBody>
            {ordersLoading ? (
              <div className="flex justify-center p-12">
                <Spinner label="Fetching orders..." />
              </div>
            ) : (
              <TableWrapper
                columns={columns}
                items={orders}
                allowsSortingFor={['createdAt', 'items']}
                topContent={({ table, searchField }) => {
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
                            { label: 'All Order Status', value: 'all' },
                            { label: 'Processing', value: 'processing' },
                            { label: 'In-Transit', value: 'in-transit' },
                            { label: 'Delivered', value: 'delivered' },
                            { label: 'Cancelled', value: 'cancelled' },
                          ]}
                          onChange={(value) => {
                            table
                              .getColumn('orderStatus')
                              ?.setFilterValue(
                                value === 'all' ? undefined : value,
                              )
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
                            { label: 'All Payment Status', value: 'all' },
                            { label: 'Pending', value: 'pending' },
                            { label: 'Paid', value: 'paid' },
                            { label: 'Failed', value: 'failed' },
                            { label: 'Reversed', value: 'reversed' },
                          ]}
                          onChange={(value) => {
                            table
                              .getColumn('paymentStatus')
                              ?.setFilterValue(
                                value === 'all' ? undefined : value,
                              )
                            setPaymentStatusFilter(value)
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
            )}
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default OrdersSection
