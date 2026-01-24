'use client'

import InputField from '@/components/elements/input-field'
import TableWrapper from '@/components/elements/table-wrapper'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Tab,
  Tabs,
  useDisclosure,
  Tooltip,
} from '@heroui/react'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuCopy,
  LuCheck,
  LuEye,
  LuPackage,
  LuPlus,
  LuUserCheck,
  LuSettings,
} from 'react-icons/lu'
import {
  useGetPortalReferralProfile,
  useGetPortalReferrals,
} from '@/hooks/requests/portal/useReferralPartner'
import UpdatePortalReferralPartnerModal from './UpdatePortalReferralPartnerModal'
import moment from 'moment'
import { referralPartnerProfessions } from '@/library/config'
import {
  ReferralsHeroSkeleton,
  StatsSkeleton,
  TableSkeleton,
} from '@/components/portal/PortalSkeletons'
import { IPortalUser } from '@/api-client/interfaces/portal.user.interfaces'
import { currencyFormatter } from '@/utils/currency-formatter'

const getStatusIcon = (status: any) => {
  switch (status) {
    case 'active':
      return <LuClock className="h-4 w-4" />
    case 'inactive':
      return <LuCircleX className="h-4 w-4" />
    default:
      return <LuClock className="h-4 w-4" />
  }
}

const getStatusColor = (status: any) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'warning'
    default:
      return 'default'
  }
}

const getCommissionStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
      return 'danger'
    default:
      return 'default'
  }
}

const columnHelper = createColumnHelper<IPortalUser>()

const ReferralsSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [commissionStatusFilter, setCommissionStatusFilter] = useState('all')
  const [tableData, setTableData] = useState<any[]>([])
  const { referrals, isLoading: referralsLoading } = useGetPortalReferrals()

  const {
    profile: referralPartner,
    isLoading: referralPartnerLoading,
    mutate: mutateReferralPartner,
  } = useGetPortalReferralProfile()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [copiedType, setCopiedType] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const referralLink = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/portal/create-account?code=${referralPartner?.referralCode}`
  }, [referralPartner?.referralCode])

  const filteredReferrals = useMemo(() => {
    return (referrals || []).filter((referral) => {
      const matchesSearch =
        referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.lastName.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [referrals, searchTerm])

  const getReferralsByStatus = (status: string) => {
    return filteredReferrals?.filter((referral) => referral.status === status)
  }

  const tabs = useMemo(
    () => [
      {
        key: 'all',
        label: `All (${filteredReferrals?.length || 0})`,
        referrals: filteredReferrals,
        emptyIcon: (
          <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
        ),
        emptyText: 'No referrals found',
      },
      {
        key: 'active',
        label: `Active (${getReferralsByStatus('active')?.length || 0})`,
        referrals: getReferralsByStatus('active'),
        emptyIcon: (
          <LuClock className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
        ),
        emptyText: 'No active referrals',
      },
      {
        key: 'inactive',
        label: `Inactive (${getReferralsByStatus('inactive')?.length || 0})`,
        referrals: getReferralsByStatus('inactive'),
        emptyIcon: (
          <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
        ),
        emptyText: 'No inactive referrals',
      },
    ],
    [filteredReferrals],
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: 'referee',
        header: 'Referee',
        cell: ({ row }) => (
          <div>
            <p className="font-medium">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-sm text-foreground-500">{row.original.email}</p>
            {row.original.phoneNumber && (
              <p className="text-sm text-foreground-500">
                {row.original.phoneNumber}
              </p>
            )}
          </div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            color={getStatusColor(row.original.status)}
            startContent={getStatusIcon(row.original.status)}
            size="sm"
            variant="flat"
          >
            <span className="capitalize">{row.original.status}</span>
          </Chip>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Joined On',
        cell: ({ row }) => (
          <div className="text-sm text-foreground-600">
            <p>{moment(row.original.createdAt).format('MMMM DD, YYYY')}</p>
          </div>
        ),
      }),
      columnHelper.accessor('orderCount', {
        header: 'Orders',
        cell: ({ getValue }) => (
          <div className="font-medium text-foreground-700">
            {getValue() || 0} orders
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="flex items-center">
            <Button
              as={Link}
              variant="flat"
              color="primary"
              size="sm"
              href={`/portal/referrals/${row.original._id}`}
            >
              <LuEye className="h-4 w-4" />
              View Details
            </Button>
          </div>
        ),
      }),
    ],
    [],
  )

  useEffect(() => {
    if (referrals) {
      setTableData(filteredReferrals)
    }
  }, [referrals, searchTerm, commissionStatusFilter])

  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (referralsLoading || referralPartnerLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-5 space-y-8">
          <ReferralsHeroSkeleton />
          <StatsSkeleton />
          <TableSkeleton />
        </div>
      </div>
    )
  }

  const getCommissionFilterCount = (status: string) => {
    if (!referrals) return 0
    if (status === 'all') return referrals.length
    return referrals.filter((r: any) => r.commissionStatus === status).length
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-5 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-primary">
                  Welcome,{' '}
                  {referralPartnerProfessions[referralPartner?.profession]}{' '}
                  {referralPartner?.user?.firstName}
                </h1>
                <Chip
                  color={
                    referralPartner?.status === 'active' ? 'success' : 'warning'
                  }
                  variant="flat"
                  size="sm"
                  startContent={getStatusIcon(referralPartner?.status)}
                  className="capitalize"
                >
                  {referralPartner?.status}
                </Chip>
              </div>
              <Breadcrumbs>
                <BreadcrumbItem>
                  <Link href="/portal/dashboard">Dashboard</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>Referral Dashboard</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <Button
              color="primary"
              variant="flat"
              onPress={onOpen}
              startContent={<LuSettings size={18} />}
              className="w-full md:w-auto"
            >
              Update Details
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card shadow="sm" className="bg-primary/5 border border-primary/10">
              <CardBody className="py-4 px-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-bold text-primary/70 mb-1">
                    Your Referral Code
                  </p>
                  <p className="text-2xl font-black text-primary tracking-widest">
                    {referralPartner?.referralCode}
                  </p>
                </div>
                <Tooltip
                  content={copiedType === 'code' ? 'Copied!' : 'Copy Code'}
                >
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={() =>
                      handleCopy(referralPartner?.referralCode || '', 'code')
                    }
                  >
                    {copiedType === 'code' ? (
                      <LuCheck size={16} />
                    ) : (
                      <LuCopy size={16} />
                    )}
                  </Button>
                </Tooltip>
              </CardBody>
            </Card>

            <Card shadow="sm" className="bg-success text-white">
              <CardBody className="py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-xs uppercase font-bold text-white/80 mb-1">
                    Your Invite Link
                  </p>
                  <p className="text-sm font-medium opacity-90 truncate">
                    {referralLink}
                  </p>
                </div>
                <Tooltip
                  content={copiedType === 'link' ? 'Copied!' : 'Copy Link'}
                >
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-white/20 text-white hover:bg-white/30"
                    onPress={() => handleCopy(referralLink, 'link')}
                  >
                    {copiedType === 'link' ? (
                      <LuCheck size={16} />
                    ) : (
                      <LuCopy size={16} />
                    )}
                  </Button>
                </Tooltip>
              </CardBody>
            </Card>
          </div>
          <p className="text-foreground-500 text-sm">
            Share your code or link with others. You earn commission on every
            successful order they place.
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
            <Card className="p-5 border-none shadow-sm shadow-primary/5">
              <CardBody>
                <div className="flex items-center space-x-2">
                  <LuUserCheck className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Total Referrals</p>
                    <p className="text-2xl font-bold">
                      {referralPartner?.referralsCount || 0}
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
                    <p className="text-sm font-medium">Total Earned</p>
                    <p className="text-2xl font-bold text-success">
                      {currencyFormatter(referralPartner?.commissionTotal || 0)}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="p-5 border-none shadow-sm shadow-warning/5">
              <CardBody>
                <div className="flex items-center space-x-2">
                  <LuClock className="h-8 w-8 text-warning" />
                  <div>
                    <p className="text-sm font-medium">Pending Pay</p>
                    <p className="text-2xl font-bold text-warning">
                      {currencyFormatter(
                        referralPartner?.pendingCommissions || 0,
                      )}
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
                    <p className="text-sm font-medium">Paid Commissions</p>
                    <p className="text-2xl font-bold text-primary">
                      {currencyFormatter(referralPartner?.paidCommissions || 0)}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardBody className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                <h2 className="font-bold text-lg">Referral Management</h2>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                  <div className="min-w-44">
                    <InputField
                      type="search"
                      placeholder="Search referrals..."
                      controllerProps={{ name: 'search' }}
                      onChange={(value) => setSearchTerm(value)}
                    />
                  </div>
                  {/* <div className="min-w-44">
                    <InputField
                      type="select"
                      placeholder="Comm. Status"
                      controllerProps={{ name: 'commissionStatus' }}
                      options={[
                        {
                          label: `All Comm. Status (${getCommissionFilterCount('all')})`,
                          value: 'all',
                        },
                        {
                          label: `Pending (${getCommissionFilterCount('pending')})`,
                          value: 'pending',
                        },
                        {
                          label: `Paid (${getCommissionFilterCount('paid')})`,
                          value: 'paid',
                        },
                        {
                          label: `None (${getCommissionFilterCount('none')})`,
                          value: 'none',
                        },
                      ]}
                      onChange={(value) => setCommissionStatusFilter(value)}
                    />
                  </div> */}
                  <Chip
                    color="danger"
                    variant="flat"
                    className="text-sm rounded-md text-center"
                  >
                    {filteredReferrals?.length || 0} referrals
                  </Chip>
                </div>
              </div>

              <Tabs
                aria-label="Referrals"
                selectedKey={
                  tabs.find((tab) => tab.referrals === tableData)?.key || 'all'
                }
                onSelectionChange={(value) => {
                  const selectedTab = tabs.find((each) => each.key == value)
                  if (selectedTab) {
                    setTableData(selectedTab.referrals || [])
                  }
                }}
                classNames={{ tabList: 'max-w-4/5 flex-wrap', tab: 'w-20' }}
              >
                {tabs.map((tab) => (
                  <Tab key={tab.key} title={tab.label}>
                    <TableWrapper
                      columns={columns}
                      items={tab.referrals || []}
                      isLoading={referralsLoading}
                      emptyContent={
                        <div className="text-center py-12">
                          {tab.emptyIcon}
                          <p className="text-foreground-500">{tab.emptyText}</p>
                        </div>
                      }
                    />
                  </Tab>
                ))}
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>

      <UpdatePortalReferralPartnerModal
        isOpen={isOpen}
        setIsOpen={onOpenChange}
        referralPartner={referralPartner || null}
        onSuccess={mutateReferralPartner}
      />
    </>
  )
}

export default ReferralsSection
