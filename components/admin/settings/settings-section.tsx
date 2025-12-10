'use client'
import InputField from '@/components/elements/input-field'
import SingleImageDropzone from '@/components/elements/single-image-dropzone'
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
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuCheck,
  LuLock,
  LuMail,
  LuMapPin,
  LuPhone,
  LuUser,
  LuUserCheck,
  LuUserRound,
} from 'react-icons/lu'

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
              tab: 'w-24',
            }}
          >
            <Tab title="Personal">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-primary">
                      Personal Information
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField
                        type="text"
                        isName
                        label="First Name"
                        controllerProps={{ control, name: 'firstName' }}
                        startContent={<LuUser />}
                      />
                      <InputField
                        type="text"
                        isName
                        label="Last Name"
                        controllerProps={{ control, name: 'lastName' }}
                        startContent={<LuUser />}
                      />
                      <InputField
                        type="email"
                        label="Email Address"
                        controllerProps={{ control, name: 'email' }}
                        startContent={<LuMail />}
                        className="md:col-span-2"
                      />
                      <InputField
                        type="phoneNumber"
                        label="Phone Number"
                        controllerProps={{ control, name: 'phoneNumber' }}
                        startContent={<LuPhone />}
                      />
                      <InputField
                        type="text"
                        disabled
                        label="Role"
                        controllerProps={{
                          control,
                          name: 'role',
                          defaultValue: 'Manager',
                        }}
                        startContent={<LuUserCheck />}
                      />
                      <SingleImageDropzone
                        label="Avatar"
                        controllerProps={{ name: 'avatar', control }}
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
                        type="text"
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
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-primary">
                      Change Password
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <InputField
                        type="password"
                        label="Current Password"
                        controllerProps={{ control, name: 'currentPassword' }}
                        startContent={<LuLock />}
                        placeholder="Enter current password"
                      />
                      <InputField
                        type="password"
                        label="New Password"
                        controllerProps={{ control, name: 'newPassword' }}
                        startContent={<LuLock />}
                        placeholder="Enter new password"
                      />
                      <InputField
                        type="password"
                        label="Confirm New Password"
                        controllerProps={{ control, name: 'newPassword' }}
                        startContent={<LuLock />}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </CardBody>
                  <CardFooter className="mt-6">
                    <div className="grid gap-4 md:w-1/5">
                      <Button size="sm" color="primary">
                        Update Password
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <h2 className="font-bold text-primary">
                      Security Recommendations
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <LuCheck className="text-success" />{' '}
                        <p className="text-sm text-foreground-600">
                          Use a strong password with at least 8 characters
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <LuCheck className="text-success" />{' '}
                        <p className="text-sm text-foreground-600">
                          Include uppercase, lowercase, numbers, and special
                          characters
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <LuCheck className="text-success" />{' '}
                        <p className="text-sm text-foreground-600">
                          Change your password regularly
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <LuCheck className="text-success" />{' '}
                        <p className="text-sm text-foreground-600">
                          Never share your password with anyone
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default SettingsSection
