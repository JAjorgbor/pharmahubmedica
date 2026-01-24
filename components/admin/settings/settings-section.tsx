'use client'
import PersonalDetailsSettings from '@/components/admin/settings/personal-details-settings'
import SecuritySettings from '@/components/admin/settings/security-settings'
import InputField from '@/components/elements/input-field'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tab,
  Tabs,
} from '@heroui/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'

const SettingsSection = () => {
  const { control, ...formMethods } = useForm()
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
            aria-label="Orders"
            defaultSelectedKey="all"
            className="mb-2"
            classNames={{
              tabList: 'flex-wrap',
              tab: 'w-32',
            }}
          >
            <Tab title="Personal">
              <PersonalDetailsSettings />
            </Tab>
            <Tab title="Store Contact">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-primary">
                      Store Contact Information
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField
                        type="phoneNumber"
                        label="Phone Number"
                        controllerProps={{ control, name: 'phoneNumber' }}
                        startContent={<LuPhone />}
                      />
                      <InputField
                        type="phoneNumber"
                        label="WhatsApp Number"
                        controllerProps={{ control, name: 'whatsappNumber' }}
                        startContent={<FaWhatsapp />}
                      />
                      <InputField
                        type="email"
                        label="Email Address"
                        controllerProps={{ control, name: 'email' }}
                        startContent={<LuMail />}
                        className="md:col-span-2"
                      />
                      <InputField
                        type="textarea"
                        label="Address"
                        controllerProps={{ control, name: 'address' }}
                        startContent={<LuMapPin />}
                        className="md:col-span-2"
                      />
                    </div>
                  </CardBody>
                  <CardFooter className="mt-6">
                    <div className="grid grid-cols-2 gap-4 md:w-1/2">
                      <Button size="sm" color="danger">
                        Reset
                      </Button>
                      <Button size="sm" color="primary">
                        Update
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </Tab>
            <Tab title="Security">
              <SecuritySettings />
            </Tab>
            {/* <Tab title="Delivery Methods">
              <div className="space-y-6">
                <Card>
                  <CardBody>
                    <DeliveryMethodsSettings />
                  </CardBody>
                </Card>
              </div>
            </Tab> */}
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default SettingsSection
