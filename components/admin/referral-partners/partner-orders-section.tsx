'use client'
import TableWrapper from '@/components/elements/table-wrapper'
import { IOrder } from '@/api-client/interfaces/order.interfaces'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Spinner,
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import useGetReferralPartner from '@/hooks/requests/admin/useGetReferralPartner'
import useGetCustomer from '@/hooks/requests/admin/useGetCustomer'
import { useGetAdminOrders } from '@/hooks/requests/admin/useAdminOrders'

const columnHelper = createColumnHelper<IOrder>()

const PartnerOrdersSection = ({ partnerId }: { partnerId: string }) => {
  const searchParams = useSearchParams()
  const referralId = searchParams.get('referralId')

  const { referralPartner, referralPartnerLoading } =
    useGetReferralPartner(partnerId)
  const { customer: referralUser, customerLoading: referralUserLoading } =
    useGetCustomer(referralId || '')

  const orderParams = useMemo(() => {
    const params: any = { referralPartner: partnerId }
    if (referralId) {
      params.customer = referralId
    }
    return params
  }, [partnerId, referralId])

  const { orders: filteredOrders, ordersLoading } =
    useGetAdminOrders(orderParams)

  const columns = useMemo(
    () => [
      columnHelper.accessor('orderNumber', {
        header: 'Order #',
        cell: ({ getValue }) => (
          <span className="font-bold text-primary">{getValue()}</span>
        ),
      }),
      columnHelper.accessor('customer', {
        header: 'Customer',
        cell: ({ getValue }) => (
          <div className="space-y-0.5">
            <p className="font-medium text-sm">
              {getValue()?.firstName} {getValue()?.lastName}
            </p>
            <p className="text-xs text-foreground-500">{getValue()?.email}</p>
          </div>
        ),
      }),
      columnHelper.accessor('transaction.totalAmount', {
        header: 'Order Total',
        cell: ({ getValue }) => currencyFormatter(getValue() || 0),
      }),
      columnHelper.display({
        id: 'commission',
        header: 'Commission',
        cell: ({ row: { original: item } }) => {
          const commission = item.referralDetails?.commission
          return (
            <div className="space-y-1">
              <p className="font-semibold text-success text-sm">
                {currencyFormatter(commission?.amount || 0)}
              </p>
              <Chip
                size="sm"
                variant="flat"
                color={
                  commission?.status === 'paid'
                    ? 'success'
                    : commission?.status === 'pending'
                      ? 'warning'
                      : 'danger'
                }
                className="h-5 text-[10px] uppercase"
              >
                {commission?.status || 'N/A'}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor('orderStatus', {
        header: 'Status',
        cell: ({ getValue }) => {
          const colors: Record<string, any> = {
            delivered: 'success',
            processing: 'warning',
            cancelled: 'danger',
            'in-transit': 'primary',
          }
          return (
            <Chip
              size="sm"
              variant="flat"
              color={colors[getValue()] || 'default'}
              className="capitalize"
            >
              {getValue()}
            </Chip>
          )
        },
      }),
      columnHelper.accessor('createdAt', {
        header: 'Date',
        cell: ({ getValue }) => (
          <div className="text-xs text-foreground-600">
            <p>{moment(getValue()).format('D MMM, YYYY')}</p>
            <p className="opacity-60">{moment(getValue()).format('hh:mm A')}</p>
          </div>
        ),
      }),
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }: any) => (
          <Button
            as={Link}
            href={`/admin/orders/${row.original._id}`}
            size="sm"
            variant="flat"
            color="primary"
          >
            View Details
          </Button>
        ),
      },
    ],
    [],
  )

  if (referralPartnerLoading || (referralId && referralUserLoading)) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner label="Loading partner data..." />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl p-5 mx-auto">
      <div className="flex justify-between gap-6 items-center flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="light"
              as={Link}
              href={`/admin/referral-partners/${partnerId}`}
            >
              <LuArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl text-primary font-semibold">
              Referral Orders
            </h1>
          </div>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/admin/referral-partners">Referral Partners</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={`/admin/referral-partners/${partnerId}`}>
                {referralPartner?.user?.firstName}{' '}
                {referralPartner?.user?.lastName || 'Partner'}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Orders</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      <p className="text-foreground-500">
        {referralId
          ? `Showing orders made by ${referralUser?.firstName} ${referralUser?.lastName}.`
          : `Showing all orders referred by ${referralPartner?.user?.firstName} ${referralPartner?.user?.lastName}.`}
      </p>

      <Card className="p-3">
        <CardBody className="space-y-6">
          <TableWrapper
            columns={columns as any}
            items={filteredOrders}
            isLoading={ordersLoading}
            topContent={({ searchField }) => (
              <div className="w-full lg:w-1/4">
                {searchField('Search orders')}
              </div>
            )}
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

export default PartnerOrdersSection
