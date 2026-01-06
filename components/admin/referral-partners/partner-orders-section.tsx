'use client'
import TableWrapper from '@/components/elements/table-wrapper'
import { IOrder, orders, users } from '@/library/dummy-data'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { LuArrowLeft } from 'react-icons/lu'

const columnHelper = createColumnHelper<IOrder>()

const PartnerOrdersSection = ({ partnerId }: { partnerId: string }) => {
  const searchParams = useSearchParams()
  const referralId = searchParams.get('referralId')

  const partner = useMemo(
    () => users.find((u) => u.id === partnerId),
    [partnerId]
  )

  const referralUser = useMemo(
    () => (referralId ? users.find((u) => u.id === referralId) : null),
    [referralId]
  )

  // Filter orders for this referral or all referrals of this partner
  const filteredOrders = useMemo(() => {
    if (referralId) {
      return orders.filter((o) => o.customerId === referralId)
    }
    // Simulate orders for the partner's network
    return orders.slice(0, 5)
  }, [referralId])

  const commissionRate = partner?.commissionRate || 5 // fallback to 5%

  const columns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        header: 'Order ID',
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue()}</span>
        ),
      }),
      columnHelper.accessor('customerName', {
        header: 'Customer',
        cell: ({ row: { original: item } }) => (
          <div className="space-y-0.5">
            <p className="font-medium text-sm">{item.customerName}</p>
            <p className="text-xs text-foreground-500">{item.customerEmail}</p>
          </div>
        ),
      }),
      columnHelper.accessor('totalAmount', {
        header: 'Order Total',
        cell: ({ getValue }) => currencyFormatter(getValue()),
      }),
      columnHelper.display({
        id: 'commission',
        header: `Commission (${commissionRate}%)`,
        cell: ({ row: { original: item } }) => {
          const commission = (item.totalAmount * commissionRate) / 100
          return (
            <div className="font-semibold text-success">
              {currencyFormatter(commission)}
            </div>
          )
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => {
          const colors: Record<string, any> = {
            fulfilled: 'success',
            pending: 'warning',
            cancelled: 'danger',
            confirmed: 'primary',
          }
          return (
            <Chip
              size="sm"
              variant="flat"
              color={colors[getValue()] || 'default'}
            >
              {getValue()}
            </Chip>
          )
        },
      }),
      columnHelper.accessor('orderDate', {
        header: 'Date',
        cell: ({ getValue }) => moment(getValue()).format('D MMM, YYYY'),
      }),
    ],
    [commissionRate]
  )

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
                {partner?.name || 'Partner'}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Orders</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      <p className="text-foreground-500">
        {referralId
          ? `Showing orders made by ${referralUser?.name || 'referred user'}.`
          : `Showing all orders referred by ${partner?.name}.`}
      </p>

      <Card className="p-3">
        <CardBody className="space-y-6">
          <TableWrapper
            columns={columns}
            items={filteredOrders}
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
