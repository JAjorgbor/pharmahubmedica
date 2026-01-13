'use client'
import { IReferralUser } from '@/api-client/admin/interfaces/referral.interfaces'
import TableWrapper from '@/components/elements/table-wrapper'
import useGetReferralPartner from '@/hooks/requests/admin/useGetReferralPartner'
import useGetReferralPartnerReferrals from '@/hooks/requests/admin/useGetReferralPartnerReferrals'
import { referralPartnerProfessions } from '@/library/config'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Skeleton,
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { LuArrowLeft, LuPackage } from 'react-icons/lu'

const columnHelper = createColumnHelper<IReferralUser>()

const PartnerDetailssSection = ({ partnerId }: { partnerId: string }) => {
  const router = useRouter()
  const { referralPartner, referralPartnerLoading, referralPartnerError } =
    useGetReferralPartner(partnerId)
  const { referrals, referralsLoading } =
    useGetReferralPartnerReferrals(partnerId)

  useEffect(() => {
    if (referralPartnerError?.response?.status === 404) {
      notFound()
    }
  }, [referralPartnerError])

  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => `${row.firstName} ${row.lastName} ${row.email}`,
        {
          id: 'name',
          header: 'Referred User',
          cell: ({ row: { original: item } }) => (
            <div className="flex gap-2 items-center">
              <Image
                src={`https://dummyimage.com/100x100/3f51b5/fff&text=${item.firstName
                  .charAt(0)
                  .toUpperCase()}`}
                alt={`profile image`}
                width={100}
                height={100}
                className="object-cover rounded-full size-10 object-center"
              />
              <div className="space-y-1">
                <h3 className="font-bold flex flex-col">{`${item.firstName} ${
                  item.lastName || ''
                }`}</h3>
                <p className="text-xs text-foreground-600">{item.email}</p>
              </div>
            </div>
          ),
        }
      ),
      columnHelper.accessor('phoneNumber', {
        header: 'Phone Number',
        cell: ({ getValue }) => getValue() || '—',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => (
          <Chip
            color={getValue() === 'active' ? 'success' : 'warning'}
            variant="dot"
            size="sm"
            className="capitalize"
          >
            {getValue()}
          </Chip>
        ),
      }),
      columnHelper.accessor(
        (row) => (row as any).createdAt || (row as any).joinedAt,
        {
          id: 'createdAt',
          header: 'Joined On',
          cell: ({ getValue }) => (
            <div className="text-xs text-foreground-600">
              {moment(getValue()).format('D MMM, YYYY')}
            </div>
          ),
        }
      ),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row: { original: item } }) => (
          <Button
            size="sm"
            variant="flat"
            color="primary"
            as={Link}
            href={`/admin/referral-partners/${partnerId}/orders?referralId=${item._id}`}
            startContent={<LuPackage />}
          >
            View Orders
          </Button>
        ),
      }),
    ],
    [partnerId]
  )

  const StatCard = ({
    title,
    value,
  }: {
    title: string
    value: React.ReactNode
  }) => (
    <div className="bg-default-50 p-4 rounded-lg space-y-2 border border-default-100">
      <p className="text-sm text-foreground-500">{title}</p>
      <div className="text-xl font-bold text-primary">{value}</div>
    </div>
  )

  if (referralPartnerLoading) {
    return (
      <div className="space-y-6 max-w-7xl p-5 mx-auto">
        <Skeleton className="w-48 h-8 rounded-lg" />
        <Card className="p-3">
          <CardBody className="space-y-6">
            <div className="flex gap-4">
              <Skeleton className="size-20 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="w-1/3 h-4 rounded-lg" />
                <Skeleton className="w-1/4 h-3 rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </CardBody>
        </Card>
        <Card className="p-3">
          <CardBody>
            <Skeleton className="h-64 rounded-lg" />
          </CardBody>
        </Card>
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
              href="/admin/referral-partners"
            >
              <LuArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl text-primary font-semibold">
              {referralPartner?.user?.firstName}'s Referrals
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
          <div className="flex gap-6 items-start flex-wrap md:flex-nowrap">
            <Image
              src={`https://dummyimage.com/150x150/009688/fff&text=${referralPartner?.user?.firstName
                ?.charAt(0)
                .toUpperCase()}`}
              alt={`${referralPartner?.user?.firstName} profile`}
              width={100}
              height={100}
              className="object-cover rounded-full size-24 border-4 border-primary/10"
            />
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {referralPartner?.profession !== 'other' &&
                      referralPartnerProfessions[
                        referralPartner?.profession as keyof typeof referralPartnerProfessions
                      ]}{' '}
                    {referralPartner?.user?.firstName}{' '}
                    {referralPartner?.user?.lastName}
                    <Chip
                      color={
                        referralPartner?.status === 'active'
                          ? 'success'
                          : 'warning'
                      }
                      variant="flat"
                      size="sm"
                      className="capitalize"
                    >
                      {referralPartner?.status}
                    </Chip>
                  </h2>
                  <p className="text-foreground-500 font-medium">
                    {referralPartner?.user?.email}
                  </p>
                  <p className="text-xs text-foreground-400 font-mono bg-default-100 px-2 py-1 rounded w-fit">
                    Code: {referralPartner?.referralCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground-500">Commission Rate</p>
                  <p className="text-xl font-bold text-primary">
                    {referralPartner?.commission?.rate}
                    {referralPartner?.commission?.rateType === 'percentage'
                      ? '%'
                      : ' NGN'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-divider">
            <StatCard
              title="Total Referrals"
              value={referralPartner?.referralsCount || 0}
            />
            <StatCard
              title="Paid Commissions"
              value={`₦${(
                referralPartner?.paidCommissions || 0
              ).toLocaleString()}`}
            />
            <StatCard
              title="Pending Commissions"
              value={`₦${(
                referralPartner?.pendingCommissions || 0
              ).toLocaleString()}`}
            />
            <StatCard
              title="Total Commission"
              value={`₦${(
                referralPartner?.commissionTotal || 0
              ).toLocaleString()}`}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="p-3">
        <CardBody className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Referral History</h3>
            <p className="text-sm text-foreground-500">
              List of users referred by this partner.
            </p>
          </div>
          <TableWrapper
            columns={columns}
            items={referrals || []}
            isLoading={referralsLoading}
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

export default PartnerDetailssSection
