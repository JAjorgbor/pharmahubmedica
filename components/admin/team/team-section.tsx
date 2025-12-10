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
} from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { FiEdit, FiEdit2, FiEdit3 } from 'react-icons/fi'
import { LuPlus, LuSettings } from 'react-icons/lu'

const TeamSection = () => {
  return (
    <div className="space-y-6 max-w-7xl p-5 mx-auto">
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
        <Button startContent={<LuPlus />} size="sm" color="primary">
          Add Team Member
        </Button>
      </div>
      <div className="space-y-4">
        <Chip color="secondary" size="sm">
          Total Team Members: 6
        </Chip>
        <div className="flex gap-4 flex-wrap justify-between items-center">
          <div className="w-full md:w-1/4 flex items-center gap-4">
            <InputField
              type="search"
              placeholder="Search Team Members"
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
                {
                  label: `All Roles (10)`,
                  value: 'all',
                },
                {
                  label: `Managers (5)`,
                  value: 'active',
                },
                {
                  label: `Operations (5)`,
                  value: 'operations',
                },
                {
                  label: `Accounting (3)`,
                  value: 'accounting',
                },
              ]}
              className="w-full"
              //   classNames={{ base: 'md:w-1/4' }}
            />
            <InputField
              type="select"
              controllerProps={{
                name: 'status filter',
                defaultValue: 'all',
              }}
              options={[
                {
                  label: `All Team Members (10)`,
                  value: 'all',
                },
                {
                  label: `Active (5)`,
                  value: 'active',
                },
                {
                  label: `Inactive (5)`,
                  value: 'inactive',
                },
              ]}
              className="w-full"
              //   classNames={{ base: 'md:w-1/4' }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardBody>
              <div className="grid grid-cols-3 items-center gap-3">
                <Avatar radius="lg" className="size-full" />
                <div className="space-y-3 col-span-2 ">
                  <div className="space-y-1 ">
                    <h2 className="font-semibold text-primary text-lg leading-5">
                      Joshua Ajorgbor
                    </h2>
                    <p className="font-semibold text-foreground-500 text-sm">
                      joshuaajorgbor@email.com
                    </p>
                    <p className="font-semibold text-foreground-500 text-sm">
                      09033333333
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-2 flex-wrap">
                    <div className="flex gap-2 items-center">
                      <Chip size="sm" variant="dot" color="primary">
                        Manager
                      </Chip>
                      <Chip size="sm" variant="flat" color="success">
                        Active
                      </Chip>
                    </div>
                    <Button isIconOnly size="sm" variant="light">
                      <LuSettings size={15} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TeamSection
