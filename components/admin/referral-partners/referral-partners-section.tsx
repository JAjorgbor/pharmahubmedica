'use client'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'
import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import useGetReferralPartners from '@/hooks/requests/admin/useGetReferralPartners'
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
import { capitalCase } from 'change-case'
import moment from 'moment'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FiCheck, FiCopy, FiMoreVertical } from 'react-icons/fi'
import { IoCashOutline } from 'react-icons/io5'
import { LuExternalLink, LuHandshake, LuPlus } from 'react-icons/lu'
import AddReferralPartnerModal from './add-referral-partner-modal'
import ToggleReferralPartnerStatusModal from '@/components/admin/referral-partners/ToggleReferralPartnerStatusModal'
import UpdateReferralPartnerModal from '@/components/admin/referral-partners/UpdateReferralPartnerModal'

const columnHelper = createColumnHelper<IReferralPartner>()

const ReferralPartnersSection = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const { referralPartners, referralPartnersLoading, mutateReferralPartners } =
    useGetReferralPartners()
  const items = useMemo(() => referralPartners || [], [referralPartners])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] =
    useState<IReferralPartner | null>(null)

  const stats = useMemo(() => {
    return items.reduce(
      (acc, curr) => {
        if (curr.status === 'active') acc.active++
        else acc.inactive++
        acc.paid += curr.paidCommissions || 0
        acc.pending += curr.pendingCommissions || 0
        return acc
      },
      { active: 0, inactive: 0, paid: 0, pending: 0 },
    )
  }, [items])

  const columns = useMemo(
    () => [
      columnHelper.accessor('user', {
        id: 'name',
        header: 'User',
        cell: ({ row: { original: item } }) => (
          <div className="flex gap-2 items-center">
            {item.user ? (
              <div className="space-y-1">
                <h3 className="font-bold flex flex-col">{`${
                  item.user.firstName
                } ${item.user.lastName || ''}`}</h3>
                <p className="text-xs text-foreground-600">{item.user.email}</p>
                <p className="text-[10px] text-primary">
                  {capitalCase(item.profession)}
                </p>
              </div>
            ) : (
              <span>User Deleted</span>
            )}
          </div>
        ),
      }),
      columnHelper.accessor('referralCode', {
        header: 'Code',
        cell: ({ getValue }) => {
          const [isCopied, setIsCopied] = useState(false)
          return (
            <div className="flex items-center gap-2">
              <span className="font-mono">{getValue()}</span>
              <Button
                size="sm"
                variant="light"
                color="primary"
                isIconOnly
                onPress={() => {
                  navigator.clipboard.writeText(getValue())
                  setIsCopied(true)
                  setTimeout(() => setIsCopied(false), 2000)
                }}
              >
                {isCopied ? <FiCheck /> : <FiCopy />}
              </Button>
            </div>
          )
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        filterFn: (
          row: { original: IReferralPartner },
          columnId,
          filterValue,
        ) => {
          if (typeof filterValue == 'undefined' || filterValue == 'all')
            return true
          return row.original.status == filterValue
        },
        cell: ({ getValue }) => {
          return (
            <div className="capitalize">
              <Chip
                color={getValue() === 'active' ? 'success' : 'warning'}
                variant="dot"
                size="sm"
              >
                {getValue()}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor('referralsCount', {
        header: 'Referrals',
        cell: ({ getValue }) => getValue() || 0,
      }),
      columnHelper.accessor('commission.rate', {
        header: 'Commission Rate',
        cell: ({ row: { original } }) =>
          `${original.commission.rate}${
            original.commission.rateType === 'percentage' ? '%' : ''
          }`,
      }),
      columnHelper.accessor('paidCommissions', {
        header: 'Paid Commissions',
        cell: ({ getValue }) => currencyFormatter(getValue() || 0),
      }),
      columnHelper.accessor('pendingCommissions', {
        header: 'Pending Commissions',
        cell: ({ getValue }) => currencyFormatter(getValue() || 0),
      }),

      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: 'Joined At',
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
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <FiMoreVertical className="text-default-500" size={17} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Referral Partner Action">
                <DropdownItem
                  key="view"
                  href={`/admin/referral-partners/${item._id}`}
                  as={Link}
                >
                  View Details
                </DropdownItem>
                <DropdownItem
                  key="update"
                  onPress={() => {
                    setSelectedPartner(item)
                    setIsUpdateOpen(true)
                  }}
                >
                  Update Details
                </DropdownItem>
                <DropdownItem
                  key="toggle"
                  className={
                    item.status === 'active' ? 'text-danger' : 'text-success'
                  }
                  color={item.status === 'active' ? 'danger' : 'success'}
                  onPress={() => {
                    setSelectedPartner(item)
                    setIsToggleOpen(true)
                  }}
                >
                  {item.status === 'active'
                    ? 'Deactivate Partner'
                    : 'Activate Partner'}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ),
      }),
    ],
    [items],
  )

  return (
    <>
      <div className="space-y-6 max-w-7xl p-5 mx-auto">
        <div className="flex justify-between gap-6 items-center flex-wrap">
          <div className="space-y-1">
            <h1 className="text-3xl text-primary font-semibold">
              Referral Partners & Commissions
            </h1>
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/admin/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>Referral Partners</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <Button
            startContent={<LuPlus />}
            color="primary"
            onPress={() => setIsAddOpen(true)}
          >
            Add Partner
          </Button>
        </div>
        <p className="text-foreground-500">
          Manage referral partners and commission payouts.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <LuHandshake
                  className="text-success"
                  strokeWidth={1}
                  size={40}
                />
                <div className="space-y-1">
                  <p>Active Partners</p>
                  <p className="text-xl font-semibold">
                    {referralPartnersLoading ? '...' : stats.active}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <LuHandshake
                  className="text-warning"
                  strokeWidth={1}
                  size={40}
                />
                <div className="space-y-1">
                  <p>Inactive Partners</p>
                  <p className="text-xl font-semibold">
                    {referralPartnersLoading ? '...' : stats.inactive}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <IoCashOutline
                  className="text-success"
                  strokeWidth={1}
                  size={40}
                />
                <div className="space-y-1">
                  <p>Paid Commissions</p>
                  <p className="text-xl font-semibold">
                    {referralPartnersLoading
                      ? '...'
                      : currencyFormatter(stats.paid)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardBody>
              <div className="flex gap-2 items-center">
                <IoCashOutline
                  className="text-warning"
                  strokeWidth={1}
                  size={40}
                />
                <div className="space-y-1">
                  <p>Pending Payouts</p>
                  <p className="text-xl font-semibold">
                    {referralPartnersLoading
                      ? '...'
                      : currencyFormatter(stats.pending)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <Card className="p-3">
          <CardHeader className="justify-between gap-4 flex-wrap items-center">
            <Chip color="secondary" size="sm">
              Total Referral Partners :{' '}
              {referralPartnersLoading ? '...' : items.length}
            </Chip>
            <Button
              color="primary"
              variant="light"
              as={Link}
              href="/admin/customers"
              endContent={<LuExternalLink />}
              size="sm"
            >
              View Customers
            </Button>
          </CardHeader>
          <CardBody className="space-y-6">
            <TableWrapper
              columns={columns}
              items={items}
              isLoading={referralPartnersLoading}
              allowsSortingFor={[
                'createdAt',
                'referralsCount',
                'paidCommissions',
                'pendingCommissions',
                'commissionRate',
              ]}
              topContent={({ table, searchField }) => {
                const getStatusCount = (status: string) => {
                  if (items) {
                    if (status == 'all') return items.length
                    else if (status == 'active')
                      return items.filter((each) => each.status === 'active')
                        .length
                    else if (status == 'inactive')
                      return items.filter((each) => each.status === 'inactive')
                        .length
                  }
                  return '-'
                }

                return (
                  <div className="flex justify-between items-center w-full gap-3 flex-wrap">
                    <div className="w-full lg:w-1/4">
                      {searchField('Search referral partners')}
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
                            label: `All Partners (${getStatusCount('all')})`,
                            value: 'all',
                          },
                          {
                            label: `Active (${getStatusCount('active')})`,
                            value: 'active',
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
      </div>
      <AddReferralPartnerModal
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onSuccess={() => mutateReferralPartners()}
      />
      <UpdateReferralPartnerModal
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        onSuccess={() => mutateReferralPartners()}
        referralPartner={selectedPartner}
      />
      <ToggleReferralPartnerStatusModal
        isOpen={isToggleOpen}
        setIsOpen={setIsToggleOpen}
        onSuccess={() => mutateReferralPartners()}
        referralPartner={selectedPartner}
      />
    </>
  )
}

export default ReferralPartnersSection
