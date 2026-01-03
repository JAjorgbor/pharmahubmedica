'use client'
import InputField from '@/components/elements/input-field'
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Skeleton,
} from '@heroui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { LuPlus, LuSettings } from 'react-icons/lu'
import useGetAdminTeamMembers from '@/hooks/requests/admin/useGetAdminTeamMembers'
import InviteTeamMemberDrawer from './InviteTeamMemberDrawer'
import UpdateTeamMemberDrawer from './UpdateTeamMemberDrawer'
import { IAdminUser } from '@/api-client/admin/interfaces/admin.user.interfaces'
import useGetAdminUser from '@/hooks/requests/admin/useGetAdminUser'
import { adminUserRolesPermissions } from '@/library/config'

const TeamSection = () => {
  const { teamMembers, teamMembersLoading, mutateTeamMembers } =
    useGetAdminTeamMembers()
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<IAdminUser | null>(null)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const { adminUser } = useGetAdminUser()

  const filteredMembers = teamMembers?.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(search.toLowerCase()) ||
      member.lastName.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    const matchesStatus =
      statusFilter === 'all' || member.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'danger'
      default:
        return 'warning'
    }
  }

  return (
    <div className="space-y-6 max-w-7xl p-5 mx-auto @container">
      <div className="flex justify-between gap-6 items-center flex-wrap">
        <div className="space-y-1">
          <h1 className="text-3xl text-primary font-semibold">Team Members</h1>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Team</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <Button
          startContent={<LuPlus />}
          size="sm"
          color="primary"
          onPress={() => setIsInviteOpen(true)}
        >
          Add Team Member
        </Button>
      </div>
      <div className="space-y-4">
        <Chip color="secondary" size="sm">
          Total Team Members: {teamMembersLoading ? '...' : teamMembers?.length}
        </Chip>
        <div className="flex gap-4 flex-wrap justify-between items-center">
          <div className="w-full md:w-1/4 flex items-center gap-4">
            <InputField
              type="search"
              placeholder="Search Team Members"
              onChange={(value) => setSearch(value)}
              controllerProps={{ control: null, name: 'search' }}
            />
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
            <InputField
              type="select"
              controllerProps={{
                name: 'roles filter',
                defaultValue: 'all',
              }}
              options={[
                { label: 'All Roles', value: 'all' },
                { label: 'Administrator', value: 'administrator' },
                { label: 'Operations', value: 'operations' },
                { label: 'Store Manager', value: 'storeManager' },
                { label: 'Marketing & Sales', value: 'marketingAndSales' },
                { label: 'Accountant', value: 'accountant' },
                { label: 'Driver', value: 'driver' },
              ]}
              onChange={(value) => setRoleFilter(value)}
              className="w-full"
            />
            <InputField
              type="select"
              controllerProps={{
                name: 'status filter',
                defaultValue: 'all',
              }}
              options={[
                { label: 'All Statuses', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Pending', value: 'pending' },
              ]}
              onChange={(value) => setStatusFilter(value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid @lg:grid-cols-3 gap-4">
        {teamMembersLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <CardBody className="p-4">
                  <div className="grid grid-cols-3 items-center gap-3">
                    <Skeleton className="rounded-lg h-24 w-full" />
                    <div className="space-y-3 col-span-2">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                        <Skeleton className="h-3 w-1/2 rounded-lg" />
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-16 rounded-full" />
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <Skeleton className="size-8 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          : filteredMembers?.map((member) => (
              <Card key={member._id}>
                <CardBody>
                  <div className="grid grid-cols-3 items-center gap-3">
                    <Avatar
                      radius="lg"
                      className="size-full"
                      name={`${member.firstName} ${member.lastName}`}
                    />
                    <div className="space-y-3 col-span-2 ">
                      <div className="space-y-1 ">
                        <h2 className="font-semibold text-primary text-lg leading-5">
                          {member.firstName} {member.lastName}
                        </h2>
                        <p className="font-semibold text-foreground-500 text-sm truncate">
                          {member.email}
                        </p>
                        <a
                          href={
                            member.phoneNumber
                              ? `tel:${member.phoneNumber}`
                              : '#'
                          }
                          className="text-foreground-500 text-sm hover:text-primary"
                        >
                          {member.phoneNumber || 'N/A'}
                        </a>
                      </div>
                      <div className="flex justify-between items-center gap-2 flex-wrap">
                        <div className="flex gap-2 items-center">
                          <Chip
                            size="sm"
                            variant="dot"
                            color="primary"
                            className="capitalize"
                          >
                            {member.role.replace(/([A-Z])/g, ' $1').trim()}
                          </Chip>
                          <Chip
                            size="sm"
                            variant="flat"
                            color={getStatusColor(member.status)}
                            className="capitalize"
                          >
                            {member.status}
                          </Chip>
                        </div>
                        {adminUserRolesPermissions[adminUser.role].includes(
                          'updateAdminUser'
                        ) && (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => {
                              setSelectedMember(member)
                              setIsUpdateOpen(true)
                            }}
                          >
                            <LuSettings size={15} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
      </div>

      <InviteTeamMemberDrawer
        isOpen={isInviteOpen}
        setIsOpen={setIsInviteOpen}
        onSuccess={mutateTeamMembers}
      />

      <UpdateTeamMemberDrawer
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        member={selectedMember}
        onSuccess={mutateTeamMembers}
      />
    </div>
  )
}

export default TeamSection
