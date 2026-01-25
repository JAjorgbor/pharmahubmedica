'use client'
import PersonalDetailsSettings from '@/components/admin/settings/personal-details-settings'
import SecuritySettings from '@/components/admin/settings/security-settings'
import AppContactSettings from '@/components/admin/settings/app-contact-settings'
import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from '@heroui/react'
import Link from 'next/link'

const SettingsSection = () => {
  return (
    <>
      <div className="space-y-6 max-w-7xl p-5 mx-auto">
        <div className="flex justify-between gap-6 items-center flex-wrap">
          <div className="space-y-1">
            <h1 className="text-3xl text-primary font-semibold">Settings</h1>
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/admin/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>Settings</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <p className="text-foreground-500">
          Manage your personal and store details .
        </p>
        <div className="max-w-4xl">
          <Tabs
            aria-label="Settings"
            defaultSelectedKey="personal"
            className="mb-2"
            classNames={{
              tabList: 'flex-wrap',
              tab: 'w-32',
            }}
          >
            <Tab key="personal" title="Personal">
              <PersonalDetailsSettings />
            </Tab>
            <Tab key="store-contact" title="Store Contact">
              <AppContactSettings />
            </Tab>
            <Tab key="security" title="Security">
              <SecuritySettings />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default SettingsSection
