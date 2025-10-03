'use client'

import InputField from '@/components/elements/input-field'
import { currencyFormatter } from '@/utils/currencyFormatter'
import { Button, Card, CardBody, Chip, Tab, Tabs } from '@heroui/react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
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
    status: 'used',
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
    status: 'expired',
    createdOn: '2024-03-12T11:00:00Z',
    commission: 235.45,
  },
]

const getStatusIcon = (status: any) => {
  switch (status) {
    case 'active':
      return <LuClock className="h-4 w-4" />
    case 'used':
      return <LuCircleCheckBig className="h-4 w-4" />
    case 'expired':
      return <LuCircleX className="h-4 w-4" />
    default:
      return <LuClock className="h-4 w-4" />
  }
}

const getStatusColor = (status: any) => {
  switch (status) {
    case 'active':
      return 'primary'
    case 'used':
      return 'success'
    case 'expired':
      return 'danger'
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
      key: 'used',
      label: `Used (${getReferralsByStatus('used').length})`,
      referrals: getReferralsByStatus('used'),
      emptyIcon: (
        <LuClock className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No used referrals',
    },
    {
      key: 'expired',
      label: `Expired (${getReferralsByStatus('expired').length})`,
      referrals: getReferralsByStatus('expired'),
      emptyIcon: (
        <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No expired referrals',
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
        header: 'Commission',
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
        cell: ({ row }) => (
          <div className="flex items-center justify-end space-x-2">
            <Button variant="light" size="sm" href="#" target="_blank">
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
      <div className="max-w-7xl mx-auto p-5  space-y-8">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-[#031D91]">My Referrals</h1>
            <p className="text-foreground-500">
              Create and manage referrals to earn commission
            </p>
          </div>

          <Button size="md" startContent={<LuPlus />} color="primary">
            Create Referral
          </Button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuUserCheck className="h-8 w-8 text-[#031D91]" />
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
                <LuPackage className="h-8 w-8 text-[#031D91]" />
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
            <div className="flex items-center justify-between space-x-4 mb-2">
              <h2 className="font-bold text-lg">Referral Management</h2>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <InputField
                    type="search"
                    placeholder="Search referrals..."
                    controllerProps={{ name: 'search' }}
                  />
                </div>
                <Chip color="danger" className="text-sm text-white rounded-md">
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
            >
              {tabs.map((tab) => {
                return (
                  <Tab key={tab.key} title={tab.label}>
                    <div className="space-y-4 mt-2">
                      {tab.referrals.length > 0 ? (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                  {headerGroup.headers.map((header) => (
                                    <th
                                      key={header.id}
                                      className="px-4 py-2 text-left text-xs font-bold uppercase"
                                    >
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            <tbody>
                              {table.getRowModel().rows.map((row) => (
                                <tr
                                  key={row.id}
                                  className="border-b border-b-gray-200 last:border-0"
                                >
                                  {row.getVisibleCells().map((cell) => (
                                    <td
                                      key={cell.id}
                                      className="px-4 py-3 align-center"
                                    >
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          {tab.emptyIcon}
                          <p className="text-foreground-500">{tab.emptyText}</p>
                        </div>
                      )}
                    </div>
                  </Tab>
                )
              })}
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ReferralsSection
