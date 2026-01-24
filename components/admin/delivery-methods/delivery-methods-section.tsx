'use client'

import { IDeliveryMethod } from '@/api-client/interfaces/delivery-method.interfaces'
import TableWrapper from '@/components/elements/table-wrapper'
import { useGetAdminDeliveryMethods } from '@/hooks/requests/admin/useGetAdminDeliveryMethods'
import AddEditDeliveryMethodModal from './add-edit-delivery-method-modal'
import DeleteDeliveryMethodModal from './delete-delivery-method-modal'
import { currencyFormatter } from '@/utils/currency-formatter'
import InputField from '@/components/elements/input-field'
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Breadcrumbs,
  BreadcrumbItem,
} from '@heroui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LuPlus, LuSettings2, LuTruck } from 'react-icons/lu'
import { adminDeliveryMethodRequests } from '@/api-client/admin/requests/admin.delivery-method.requests'
import Link from 'next/link'

const columnHelper = createColumnHelper<IDeliveryMethod>()

const DeliveryMethodsSection = () => {
  const { deliveryMethods, deliveryMethodsLoading, mutateDeliveryMethods } =
    useGetAdminDeliveryMethods()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<
    IDeliveryMethod | undefined
  >(undefined)

  const [statusFilter, setStatusFilter] = useState('all')
  const [visibilityFilter, setVisibilityFilter] = useState('all')

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Method Name',
        cell: ({ getValue }) => (
          <span className="font-semibold">{getValue()}</span>
        ),
      }),
      columnHelper.accessor('fee', {
        id: 'fee',
        header: 'Fee',
        cell: ({ getValue }) => (
          <span className="font-bold text-primary">
            {getValue() === 0 ? 'FREE' : currencyFormatter(getValue())}
          </span>
        ),
      }),
      columnHelper.accessor('estimatedDeliveryTime', {
        id: 'estimatedDeliveryTime',
        header: 'Delivery Time',
        cell: ({ getValue }) => getValue(),
      }),
      columnHelper.accessor('isActive', {
        id: 'isActive',
        header: 'Status',
        filterFn: (row, columnId, filterValue) => {
          if (filterValue === 'all') return true
          return row.original.isActive === (filterValue === 'active')
        },
        cell: ({ getValue }) => (
          <Chip
            size="sm"
            variant="dot"
            color={getValue() ? 'success' : 'warning'}
          >
            {getValue() ? 'Active' : 'Inactive'}
          </Chip>
        ),
      }),
      columnHelper.accessor('visibility', {
        id: 'visibility',
        header: 'Visibility',
        filterFn: (row, columnId, filterValue) => {
          if (filterValue === 'all') return true
          return row.original.visibility === (filterValue === 'visible')
        },
        cell: ({ getValue }) => (
          <Chip
            size="sm"
            variant="flat"
            color={getValue() ? 'success' : 'warning'}
          >
            {getValue() ? 'Visible' : 'Hidden'}
          </Chip>
        ),
      }),
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: 'Created On',
        cell: ({ getValue }) => (
          <div className="text-xs text-foreground-500">
            {moment(getValue()).format('MMM D, YYYY')}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        cell: ({ row: { original: item } }) => (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm">
                <FiMoreVertical size={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Method actions">
              <DropdownItem
                key="edit"
                onPress={() => {
                  setSelectedMethod(item)
                  setIsModalOpen(true)
                }}
              >
                Edit Method
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={() => {
                  setSelectedMethod(item)
                  setIsDeleteModalOpen(true)
                }}
              >
                Delete Method
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [deliveryMethods],
  )

  return (
    <div className="space-y-6 max-w-7xl p-5 mx-auto">
      <div className="flex justify-between gap-6 items-center flex-wrap">
        <div className="space-y-1">
          <h1 className="text-3xl text-primary font-semibold">
            Delivery Methods
          </h1>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Delivery Methods</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <Button
          color="primary"
          startContent={<LuPlus size={18} />}
          onPress={() => {
            setSelectedMethod(undefined)
            setIsModalOpen(true)
          }}
        >
          Add New Method
        </Button>
      </div>
      <p className="text-foreground-500">
        Manage shipping options and delivery fees.
      </p>

      <TableWrapper
        columns={columns}
        items={deliveryMethods}
        isLoading={deliveryMethodsLoading}
        ariaLabel="Delivery Methods Table"
        topContent={({ table, searchField }) => (
          <div className="flex justify-between items-center w-full gap-3 flex-wrap">
            <div className="w-full lg:w-1/4">
              {searchField('Search methods...')}
            </div>
            <div className="gap-3 grid grid-cols-2 w-full lg:w-1/2">
              <InputField
                type="select"
                controllerProps={{
                  name: 'status filter',
                  defaultValue: statusFilter,
                }}
                options={[
                  { label: 'All Status', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
                onChange={(value) => {
                  table.getColumn('isActive')?.setFilterValue(value)
                  setStatusFilter(value)
                }}
              />
              <InputField
                type="select"
                controllerProps={{
                  name: 'visibility filter',
                  defaultValue: visibilityFilter,
                }}
                options={[
                  { label: 'All Visibility', value: 'all' },
                  { label: 'Visible', value: 'visible' },
                  { label: 'Hidden', value: 'hidden' },
                ]}
                onChange={(value) => {
                  table.getColumn('visibility')?.setFilterValue(value)
                  setVisibilityFilter(value)
                }}
              />
            </div>
          </div>
        )}
      />

      <AddEditDeliveryMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={mutateDeliveryMethods}
        initialData={selectedMethod}
      />

      <DeleteDeliveryMethodModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={mutateDeliveryMethods}
        deliveryMethod={selectedMethod}
      />
    </div>
  )
}

export default DeliveryMethodsSection
