'use client'
import { IOrder } from '@/api-client/interfaces/order.interfaces'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import {
  StatsSkeleton,
  TableSkeleton,
} from '@/components/portal/PortalSkeletons'
import {
  useGetPortalReferredUserDetails,
  useGetPortalReferredUserOrders,
} from '@/hooks/requests/portal/useReferralPartner'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Skeleton,
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { IoCashOutline } from 'react-icons/io5'
import {
  LuChevronLeft,
  LuCircleCheckBig,
  LuEye,
  LuPackage,
} from 'react-icons/lu'

const columnHelper = createColumnHelper<IOrder>()

const ReferralDetailsSection = () => {
  const params = useParams()
  const referralId = params.referralId as string

  const { user, isLoading: userLoading } =
    useGetPortalReferredUserDetails(referralId)
  const { orders: referredOrders, isLoading: ordersLoading } =
    useGetPortalReferredUserOrders(referralId)

  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')
  const [commissionStatusFilter, setCommissionStatusFilter] = useState('all')

  const items = referredOrders || []

  const stats = useMemo(() => {
    return {
      totalCommissions:
        items.reduce(
          (acc: number, order: any) =>
            acc + (order.referralDetails?.commission?.amount || 0),
          0,
        ) || 0,
      pendingCommissions:
        items.reduce((acc: number, order: any) => {
          if (order.referralDetails?.commission?.status === 'pending') {
            return acc + (order.referralDetails?.commission?.amount || 0)
          }
          return acc
        }, 0) || 0,
      paidCommissions:
        items.reduce((acc: number, order: any) => {
          if (order.referralDetails?.commission?.status === 'paid') {
            return acc + (order.referralDetails?.commission?.amount || 0)
          }
          return acc
        }, 0) || 0,
      totalOrders: items.length,
    }
  }, [items])

  const columns = useMemo(
    () => [
      columnHelper.accessor('orderNumber', {
        id: 'orderNumber',
        header: 'Order #',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <p className="text-sm font-bold text-primary">{item.orderNumber}</p>
          </div>
        ),
      }),

      columnHelper.accessor('orderStatus', {
        header: 'Order Status',
        filterFn: (row, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false
          return filterValue == 'all'
            ? true
            : row.original.orderStatus == filterValue
        },
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
                color={
                  statusMap[getValue() as keyof typeof statusMap] || 'default'
                }
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
        header: 'Payment Status',
        filterFn: (row, columnId, filterValue) => {
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
              <Chip
                color={
                  statusMap[getValue() as keyof typeof statusMap] || 'default'
                }
                variant="dot"
                size="sm"
              >
                {getValue()}
              </Chip>
            </div>
          )
        },
      }),

      columnHelper.accessor((original) => `${original.products?.length || 0}`, {
        id: 'items_count',
        header: 'Items',
        cell: ({ row }) => {
          return <div>{row.original.products?.length || 0} items</div>
        },
      }),
      columnHelper.accessor('transaction.totalAmount', {
        header: 'Total',
        cell: ({ getValue, row: { original: item } }) => {
          return (
            <div className={`font-bold text-primary`}>
              {currencyFormatter(getValue() || 0)}
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

      columnHelper.accessor('referralDetails.commission.status', {
        id: 'commissionStatus',
        header: 'Commission Status',
        filterFn: (row, columnId, filterValue) => {
          if (typeof filterValue == 'undefined') return false
          const status = row.original.referralDetails?.commission?.status
          return filterValue == 'all' ? true : status == filterValue
        },
        cell: ({ getValue }) => {
          const status = getValue()
          const statusMap = {
            pending: 'warning',
            paid: 'success',
            cancelled: 'danger',
          } as const
          return (
            <div className="capitalize">
              <Chip
                color={statusMap[status as keyof typeof statusMap] || 'default'}
                variant="flat"
                size="sm"
              >
                {status || 'N/A'}
              </Chip>
            </div>
          )
        },
      }),

      columnHelper.display({
        id: 'commission',
        header: 'Commission Amt',
        cell: ({ row: { original: item } }) => {
          const statusMap = {
            pending: 'warning',
            paid: 'success',
            refunded: 'primary',
            failed: 'danger',
          } as const

          return (
            <div className="space-y-1">
              <p
                className={`text-xs font-bold text-${statusMap[item.referralDetails.commission.status]}`}
              >
                {currencyFormatter(
                  item.referralDetails?.commission?.amount || 0,
                )}
              </p>
            </div>
          )
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row: { original } }) => (
          <div className="flex items-center space-x-2">
            <Button
              as={Link}
              variant="flat"
              color="primary"
              size="sm"
              href={`/portal/referrals/${original.customer._id}/order?orderId=${original._id}`}
            >
              <LuEye className="h-4 w-4" />
              View Order
            </Button>
          </div>
        ),
      }),
    ],
    [],
  )

  if (userLoading || ordersLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-5 space-y-8">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-[200px] rounded-lg" />
              <Skeleton className="h-4 w-[150px] rounded-lg" />
            </div>
          </div>
          <StatsSkeleton />
          <TableSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:space-x-4">
          <div className="flex gap-4 items-center">
            <Button
              isIconOnly
              as={Link}
              href="/portal/referrals"
              variant="light"
            >
              <LuChevronLeft size={25} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {user?.firstName} {user?.lastName}
              </h1>
              <Breadcrumbs>
                <BreadcrumbItem>
                  <Link href="/portal/dashboard">Dashboard</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link href="/portal/referrals">Referrals</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  {user?.firstName} {user?.lastName}
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
          </div>
        </div>
        <p className="text-foreground-500">
          Monitor orders from this referral and track commissions
        </p>

        <Card className="shadow-sm">
          <CardBody>
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold shrink-0">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <div className="flex gap-2 items-center">
                    <Chip
                      size="sm"
                      color={
                        user?.status === 'active'
                          ? 'success'
                          : user?.status === 'inactive'
                            ? 'danger'
                            : 'warning'
                      }
                      variant="flat"
                      className="capitalize"
                    >
                      {user?.status}
                    </Chip>
                    {/* <span className="text-xs text-foreground-500">•</span> */}
                    <span className="text-xs text-foreground-500">
                      Joined {moment(user?.createdAt).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-end">
                <div>
                  <p className="text-xs text-foreground-500 uppercase font-semibold mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-500 uppercase font-semibold mb-1">
                    Phone Number
                  </p>
                  <p className="text-sm font-medium">{user?.phoneNumber}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          <Card className="p-5 border-none shadow-sm">
            <CardBody>
              <div className="flex items-center space-x-2">
                <IoCashOutline className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Commissions</p>
                  <p className="text-2xl font-bold">
                    {currencyFormatter(stats.totalCommissions)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5 border-none shadow-sm shadow-success/5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuCircleCheckBig className="h-8 w-8 text-success" />
                <div>
                  <p className="text-sm font-medium">Paid Commissions</p>
                  <p className="text-2xl font-bold text-success">
                    {currencyFormatter(stats.paidCommissions)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5 border-none shadow-sm shadow-warning/5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <IoCashOutline className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-sm font-medium">Pending Commission</p>
                  <p className="text-2xl font-bold text-warning">
                    {currencyFormatter(stats.pendingCommissions)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5 border-none shadow-sm shadow-primary/5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuPackage className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardHeader className="font-bold text-lg">
            Referral's Orders
          </CardHeader>
          <CardBody>
            <TableWrapper
              columns={columns}
              items={items}
              allowsSortingFor={[
                'createdAt',
                'items_count',
                'transaction.totalAmount',
              ]}
              topContent={({ table, searchField }) => {
                const getStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else
                      return items.filter(
                        (each: any) => each.orderStatus == status,
                      ).length
                  }
                  return '-'
                }
                const getPaymentStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else
                      return items.filter(
                        (each: any) => each.paymentStatus == status,
                      ).length
                  }
                  return '-'
                }
                const getCommissionStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else
                      return items.filter(
                        (each: any) =>
                          each.referralDetails?.commission?.status == status,
                      ).length
                  }
                  return '-'
                }

                return (
                  <div className="flex justify-between items-center w-full gap-3 flex-wrap">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                      {searchField('Search orders')}
                    </div>
                    <div className="gap-3 grid grid-cols-2 lg:grid-cols-3 w-full md:w-1/2 lg:w-1/2">
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
                            label: `Processing (${getStatusCount('processing')})`,
                            value: 'processing',
                          },
                          {
                            label: `In Transit (${getStatusCount('in-transit')})`,
                            value: 'in-transit',
                          },
                          {
                            label: `Delivered (${getStatusCount('delivered')})`,
                            value: 'delivered',
                          },
                          {
                            label: `Cancelled (${getStatusCount('cancelled')})`,
                            value: 'cancelled',
                          },
                        ]}
                        onChange={(value) => {
                          table.getColumn('orderStatus')?.setFilterValue(value)
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
                              'all',
                            )})`,
                            value: 'all',
                          },
                          {
                            label: `Pending (${getPaymentStatusCount(
                              'pending',
                            )})`,
                            value: 'pending',
                          },
                          {
                            label: `Paid (${getPaymentStatusCount('paid')})`,
                            value: 'paid',
                          },
                          {
                            label: `Failed (${getPaymentStatusCount('failed')})`,
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
                      <InputField
                        type="select"
                        controllerProps={{
                          name: 'commission status filter',
                          defaultValue: commissionStatusFilter,
                        }}
                        className="col-span-2 md:col-span-1"
                        options={[
                          {
                            label: `All Commission Status(${getCommissionStatusCount(
                              'all',
                            )})`,
                            value: 'all',
                          },
                          {
                            label: `Pending (${getCommissionStatusCount(
                              'pending',
                            )})`,
                            value: 'pending',
                          },
                          {
                            label: `Paid (${getCommissionStatusCount('paid')})`,
                            value: 'paid',
                          },
                          {
                            label: `Cancelled (${getCommissionStatusCount(
                              'cancelled',
                            )})`,
                            value: 'cancelled',
                          },
                        ]}
                        onChange={(value) => {
                          table
                            .getColumn('commissionStatus')
                            ?.setFilterValue(value)
                          setCommissionStatusFilter(value)
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
    </div>
  )
}

export default ReferralDetailsSection
