'use client'

import InputField from '@/components/elements/input-field'
import { currencyFormatter } from '@/utils/currencyFormatter'
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
import { useMemo, useState } from 'react'
import {
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuEye,
  LuPackage,
  LuPlus,
  LuUserCheck,
} from 'react-icons/lu'

const referrals = [
  {
    id: 'REF-001',
    referee: 'Dr. Sarah Johnson',
    email: 'doctor@example.com',
    phoneNo: '+1234567892',
    status: 'active',
    createdOn: '2024-01-10T09:30:00Z',
    usedOn: '2024-01-15T09:00:00Z',
    commission: 150.28,
  },
  {
    id: 'REF-002',
    referee: 'Jane Smith',
    email: 'jane@example.com',
    phoneNo: '+1234567891',
    status: 'active',
    createdOn: '2024-02-05T14:20:00Z',
  },
  {
    id: 'REF-003',
    referee: 'Mary Wilson',
    email: 'mary@example.com',
    phoneNo: '+1234567893',
    status: 'inactive',
    createdOn: '2024-03-12T11:00:00Z',
    commission: 235.45,
  },
]

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

const ReferralsSection = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReferrals = referrals.filter(
    (referral) =>
      referral.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getReferralsByStatus = (status) => {
    return filteredReferrals.filter((referral) => referral.status === status)
  }

  const tabs = [
    {
      key: 'all',
      label: `All (${filteredReferrals.length})`,
      referrals: filteredReferrals,
      emptyIcon: (
        <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No referrals found',
    },
    {
      key: 'active',
      label: `Active (${getReferralsByStatus('active').length})`,
      referrals: getReferralsByStatus('active'),
      emptyIcon: (
        <LuClock className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No active referrals',
    },
    {
      key: 'inactive',
      label: `Inactive (${getReferralsByStatus('inactive').length})`,
      referrals: getReferralsByStatus('inactive'),
      emptyIcon: (
        <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No inactive referrals',
    },
  ]

  const columns = useMemo(
    () => [
      {
        accessorKey: 'referee',
        header: 'Referee',
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.referee}</p>
            <p className="text-sm text-foreground-500">{row.original.email}</p>
            {row.original.phoneNo && (
              <p className="text-sm text-foreground-500">
                {row.original.phoneNo}
              </p>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'status',
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
      },
      {
        accessorKey: 'createdOn',
        header: 'Created On',
        cell: ({ row }) => (
          <div className="text-sm">
            <p>{new Date(row.original.createdOn).toLocaleDateString()}</p>
            {row.original.usedOn && (
              <p className="text-foreground-500">
                Used: {new Date(row.original.usedOn).toLocaleDateString()}
              </p>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'commission',
        header: 'Total Commission',
        cell: ({ row }) =>
          row.original.commission ? (
            <div className="font-medium text-green-600">
              {currencyFormatter(row.original.commission)}
            </div>
          ) : (
            <span className="text-foreground-500">-</span>
          ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row, original }) => (
          <div className="flex items-center justify-end space-x-2">
            <Button
              as={Link}
              variant="light"
              size="sm"
              href={`/portal/referrals/${'referral-id'}`}
            >
              <LuEye className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  )

  const [tableData, setTableData] = useState(tabs[0].referrals)

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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

          <Button size="md" startContent={<LuPlus />} color="primary">
            Create Referral
          </Button>
        </div>
        <p className="text-foreground-500">
          Create and manage referrals to earn commission
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuUserCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Referrals</p>
                  <p className="text-2xl font-bold">14</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuClock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Active</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuCircleCheckBig className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Used</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuPackage className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Expired</p>
                  <p className="text-2xl font-bold">1</p>
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
                  />
                </div>
                <Chip
                  color="danger"
                  className="text-sm text-white rounded-md text-center"
                >
                  {filteredReferrals.length} referrals
                </Chip>
              </div>
            </div>

            <Tabs
              aria-label="Referrals"
              defaultSelectedKey="all"
              onSelectionChange={(value) =>
                setTableData(tabs.find((each) => each.key == value).referrals)
              }
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
                                header.getContext()
                              )}
                            </TableColumn>
                          ))
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
                                  cell.getContext()
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
