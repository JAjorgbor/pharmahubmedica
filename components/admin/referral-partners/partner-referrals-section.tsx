'use client'
import TableWrapper from '@/components/elements/table-wrapper'
import { IUser, users } from '@/library/dummy-data'
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
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { LuArrowLeft, LuPackage } from 'react-icons/lu'

const columnHelper = createColumnHelper<IUser>()

const PartnerReferralsSection = ({ partnerId }: { partnerId: string }) => {
  const partner = useMemo(
    () => users.find((u) => u.id === partnerId),
    [partnerId]
  )

  // Simulate referred users (for dummy data, we'll just show some other users)
  const referredUsers = useMemo(
    () => users.filter((u) => u.id !== partnerId).slice(0, 3),
    [partnerId]
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Referred User',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            <Image
              src={`https://dummyimage.com/100x100/3f51b5/fff&text=${item.name
                .charAt(0)
                .toUpperCase()}`}
              alt={`profile image`}
              width={100}
              height={100}
              className="object-cover rounded-full size-10 object-center"
            />
            <div className="space-y-1">
              <h3 className="font-bold flex flex-col">{item.name}</h3>
              <p className="text-xs text-foreground-600">{item.email}</p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('phone', {
        header: 'Phone Number',
        cell: ({ getValue }) => getValue() || '—',
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: ({ getValue }) => (
          <Chip
            color={getValue() ? 'success' : 'warning'}
            variant="dot"
            size="sm"
          >
            {getValue() ? 'Active' : 'Inactive'}
          </Chip>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Referred On',
        cell: ({ getValue }) => (
          <div className="text-xs text-foreground-600">
            {moment(getValue()).format('D MMM, YYYY')}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row: { original: item } }) => (
          <Button
            size="sm"
            variant="flat"
            color="primary"
            as={Link}
            href={`/admin/referral-partners/${partnerId}/orders?referralId=${item.id}`}
            startContent={<LuPackage />}
          >
            View Orders
          </Button>
        ),
      }),
    ],
    [partnerId]
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
              href="/admin/referral-partners"
            >
              <LuArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl text-primary font-semibold">
              {partner?.name}'s Referrals
            </h1>
          </div>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/admin/referral-partners">Referral Partners</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Referrals</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      <Card className="p-3">
        <CardBody className="space-y-6">
          <TableWrapper
            columns={columns}
            items={referredUsers}
            topContent={({ searchField }) => (
              <div className="w-full lg:w-1/4">
                {searchField('Search referrals')}
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

export default PartnerReferralsSection
