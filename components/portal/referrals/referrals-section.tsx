'use client'

import InputField from '@/components/elements/input-field'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from '@heroui/react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuEye,
  LuPackage,
  LuPlus,
  LuUserCheck,
} from 'react-icons/lu'
import {
  useGetPortalReferralProfile,
  useGetPortalReferrals,
} from '@/hooks/requests/portal/useReferralPartner'
import { Spinner } from '@heroui/react'
import moment from 'moment'

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

const ReferralsSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [commissionStatusFilter, setCommissionStatusFilter] = useState('all')
  const [tableData, setTableData] = useState<any[]>([])
  const { referrals, isLoading: referralsLoading } = useGetPortalReferrals()
  const { profile, isLoading: profileLoading } = useGetPortalReferralProfile()

  const filteredReferrals = useMemo(() => {
    return (referrals || []).filter((referral) => {
      const matchesSearch =
        referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.lastName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCommission =
        commissionStatusFilter === 'all' ||
        referral.commissionStatus === commissionStatusFilter

      return matchesSearch && matchesCommission
    })
  }, [referrals, searchTerm, commissionStatusFilter])

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
      {
        accessorKey: 'referee',
        header: 'Referee',
        cell: ({ row }: any) => (
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
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: any) => (
          <Chip
            color={getStatusColor(row.original.status)}
            startContent={getStatusIcon(row.original.status)}
            size="sm"
            variant="flat"
          >
            <span className="capitalize">{row.original.status}</span>
          </Chip>
        ),
      },
      {
        accessorKey: 'commissionStatus',
        header: 'Comm. Status',
        cell: ({ row }: any) => (
          <Chip
            color={getCommissionStatusColor(row.original.commissionStatus)}
            size="sm"
            variant="dot"
            className="capitalize"
          >
            {row.original.commissionStatus || 'None'}
          </Chip>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Joined On',
        cell: ({ row }: any) => (
          <div className="text-sm text-foreground-600">
            <p>{moment(row.original.createdAt).format('MMM DD, YYYY')}</p>
          </div>
        ),
      },
      {
        accessorKey: 'orderCount',
        header: 'Orders',
        cell: ({ row }: any) => (
          <div className="font-medium text-foreground-700">
            {row.original.orderCount || 0} orders
          </div>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }: any) => (
          <div className="flex items-center justify-end space-x-2">
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
      },
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

  if (referralsLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner label="Loading referrals..." />
      </div>
    )
  }

  const getCommissionFilterCount = (status: string) => {
    if (!referrals) return 0
    if (status === 'all') return referrals.length
    return referrals.filter((r: any) => r.commissionStatus === status).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">My Referrals</h1>
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/portal/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>Referrals</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div className="flex gap-2">
            <Card
              shadow="none"
              className="bg-primary/5 border border-primary/10"
            >
              <CardBody className="py-2 px-4">
                <p className="text-[10px] uppercase font-bold text-primary opacity-70">
                  Your Referral Code
                </p>
                <p className="text-lg font-bold text-primary tracking-wider">
                  {profile?.referralCode}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
        <p className="text-foreground-500">
          Create and manage referrals to earn commission
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          <Card className="p-5 border-none shadow-sm shadow-primary/5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuUserCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Referrals</p>
                  <p className="text-2xl font-bold">
                    {profile?.referralsCount || 0}
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
                    {currencyFormatter(profile?.commissionTotal || 0)}
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
                    {currencyFormatter(profile?.pendingCommissions || 0)}
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
                    {currencyFormatter(profile?.paidCommissions || 0)}
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="min-w-44">
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
                    onChange={(e) => setCommissionStatusFilter(e.target.value)}
                  />
                </div>
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
                  {
                    <Table
                      aria-label="Referral table"
                      removeWrapper
                      shadow="none"
                      classNames={{
                        base: 'min-w-full max-w-0 overflow-x-auto',
                      }}
                    >
                      <TableHeader>
                        {table.getHeaderGroups().flatMap((headerGroup) =>
                          headerGroup.headers.map((header) => (
                            <TableColumn
                              key={header.id}
                              className="text-xs font-bold uppercase"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </TableColumn>
                          )),
                        )}
                      </TableHeader>
                      <TableBody
                        items={tab.referrals || []}
                        emptyContent={
                          <div className="text-center py-12">
                            {tab.emptyIcon}
                            <p className="text-foreground-500">
                              {tab.emptyText}
                            </p>
                          </div>
                        }
                      >
                        {table.getRowModel().rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className="text-sm px-2 py-2"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  }
                </Tab>
              ))}
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ReferralsSection
