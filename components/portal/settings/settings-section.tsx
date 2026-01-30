'use client'

import DeliveryAddressSettings from '@/components/portal/settings/delivery-address-settings'
import PersonalDetailsSettings from '@/components/portal/settings/personal-details-settings'
import SecuritySettings from '@/components/portal/settings/security-settings'
import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from '@heroui/react'
import Link from 'next/link'

const SettingsSection = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/portal/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="#">Settings</Link>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
        <div className=" space-y-8 max-w-4xl ">
          <Tabs
            aria-label="Settings"
            defaultSelectedKey="personal-details"
            className="mb-2"
          >
            <Tab key="personal-details" title="Personal Details">
              <PersonalDetailsSettings />
            </Tab>

            <Tab key="addresses" title="Addresses">
              <DeliveryAddressSettings />
            </Tab>

            <Tab key="security" title="Security">
              <SecuritySettings />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SettingsSection
