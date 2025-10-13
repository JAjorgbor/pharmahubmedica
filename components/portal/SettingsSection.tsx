'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tab,
  Tabs,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  LuCreditCard,
  LuFileText,
  LuLock,
  LuMail,
  LuMapPin,
  LuPhone,
  LuUser,
} from 'react-icons/lu'
import z from 'zod'
import InputField from '../elements/input-field'

const profileSchema = z.object({
  firstName: z.string({ error: 'First name is required' }),
  lastName: z.string({ error: 'Last name is required' }),
  phoneNumber: z.string({ error: 'Phone number is required' }),
  email: z.email().nonempty({ error: 'Email address is required' }),
  address: z
    .string({ error: 'Address is required' })
    .nonempty({ error: 'Address is required' }),
})

const professionalSchema = z.object({
  licenseNumber: z.string({ error: 'Medical license number is required' }),
  specialization: z.string({ error: 'Specialization is required' }),
})

const payoutSchema = z.object({
  accountHolderName: z.string({ error: 'Account holder name is required' }),
  bankName: z.string({ error: 'Bank name is required' }),
  accountNumber: z.string({ error: 'Account number is required' }),
})

const securitySchema = z.object({
  currentPassword: z.string({ error: 'Current Password is required' }),
  newPassword: z.string({ error: 'New password is required' }),
  confirmNewPassword: z.string({
    error: 'New password confirmation is required',
  }),
})

type ProfileFormFields = z.infer<typeof profileSchema>
type SecurityFormFields = z.infer<typeof securitySchema>
type ProfessionalFormFields = z.infer<typeof professionalSchema>
type PayoutFormFields = z.infer<typeof payoutSchema>

const SettingsSection = () => {
  const profileFormMethods = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
  })
  const securityFormMethods = useForm<SecurityFormFields>({
    resolver: zodResolver(profileSchema),
  })
  const professionalFormMethods = useForm<ProfessionalFormFields>({
    resolver: zodResolver(profileSchema),
  })
  const payoutFormMethods = useForm<PayoutFormFields>({
    resolver: zodResolver(profileSchema),
  })

  const isDoctor = true

  const handleProfileSave = () => {}
  const handlePayoutSave = () => {}
  const handlePasswordChange = () => {}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="mx-auto space-y-8 max-w-4xl ">
          <Tabs
            aria-label="Settings"
            defaultSelectedKey="profile"
            className="mb-2"
          >
            <Tab key="profile" title="Profile">
              <Card>
                <CardHeader className="pt-6 px-6 mb-0">
                  <div>
                    <h2 className="text-primary text-md font-semibold">
                      Personal Information
                    </h2>
                    <p className="text-small text-default-500">
                      Update your personal details
                    </p>
                  </div>
                </CardHeader>
                <CardBody className="space-y-4 px-6">
                  <div className="flex gap-4 flex-col md:flex-row">
                    <InputField
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      className="flex-1"
                      controllerProps={{
                        control: profileFormMethods.control,
                        name: 'firstName',
                      }}
                      color="primary"
                      startContent={
                        <LuUser className="h-5 w-5 text-gray-400" />
                      }
                    />
                    <InputField
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                      className="flex-1"
                      controllerProps={{
                        control: profileFormMethods.control,
                        name: 'lastName',
                      }}
                      color="primary"
                      startContent={
                        <LuUser className="h-5 w-5 text-gray-400" />
                      }
                    />
                  </div>
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    controllerProps={{
                      control: profileFormMethods.control,
                      name: 'email',
                    }}
                    color="primary"
                    startContent={<LuMail className="h-5 w-5 text-gray-400" />}
                  />
                  <InputField
                    label="Phone Number"
                    type="phoneNumber"
                    placeholder="Enter your phone number"
                    controllerProps={{
                      control: profileFormMethods.control,
                      name: 'phoneNumber',
                    }}
                    color="primary"
                    startContent={<LuPhone className="h-5 w-5 text-gray-400" />}
                  />
                  <InputField
                    label="Address"
                    type="textarea"
                    placeholder="Enter your address"
                    controllerProps={{
                      control: profileFormMethods.control,
                      name: 'address',
                    }}
                    color="primary"
                    startContent={
                      <LuMapPin className="h-5 w-5 text-gray-400" />
                    }
                  />
                </CardBody>
                <CardFooter className="px-6 pb-6">
                  <Button onClick={handleProfileSave} size="md" color="primary">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </Tab>

            {isDoctor && (
              <>
                <Tab key="professional" title="Professional">
                  <Card>
                    <CardHeader className="pt-6 px-6 mb-0">
                      <div>
                        <p className="text-primary text-md font-semibold">
                          Professional Details
                        </p>
                        <p className="text-small text-default-500">
                          Manage your medical credentials
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody className="space-y-4 px-6">
                      <div className="space-y-2">
                        <InputField
                          label="Medical License Number"
                          type="text"
                          placeholder="Enter your license number"
                          controllerProps={{
                            control: professionalFormMethods.control,
                            name: 'licenseNumber',
                          }}
                          color="primary"
                          startContent={
                            <LuFileText className="h-5 w-5 text-gray-400" />
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <InputField
                          label="Specialization"
                          type="text"
                          placeholder="e.g., General Medicine, Cardiology"
                          controllerProps={{
                            control: professionalFormMethods.control,
                            name: 'specialization',
                          }}
                          color="primary"
                          startContent={
                            <LuUser className="h-5 w-5 text-gray-400" />
                          }
                        />
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">
                          Commission Rate
                        </h4>
                        <p className="text-sm text-blue-700">
                          Your current commission rate is{' '}
                          <span className="font-semibold">5%</span> on all
                          referral orders.
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className="px-6 pb-6">
                      <Button
                        onClick={handleProfileSave}
                        size="md"
                        color="primary"
                      >
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </Tab>

                <Tab key="payout" title="Payout">
                  <Card>
                    <CardHeader className="pt-6 px-6 mb-0">
                      <div>
                        <p className="text-primary text-md font-semibold">
                          Payout Information
                        </p>
                        <p className="text-small text-default-500">
                          Manage your bank account for commission payouts
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody className="space-y-4 px-6">
                      <div className="space-y-2">
                        <InputField
                          label="Account Holder Name"
                          type="text"
                          placeholder="Enter account holder name"
                          controllerProps={{
                            control: payoutFormMethods.control,
                            name: 'accountHolderName',
                          }}
                          color="primary"
                          startContent={
                            <LuUser className="h-5 w-5 text-gray-400" />
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <InputField
                          label="Bank Name"
                          type="text"
                          placeholder="Enter bank name"
                          controllerProps={{
                            control: payoutFormMethods.control,
                            name: 'bankName',
                          }}
                          color="primary"
                          startContent={
                            <LuCreditCard className="h-5 w-5 text-gray-400" />
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <InputField
                          label="Account Number"
                          type="text"
                          placeholder="Enter account number"
                          controllerProps={{
                            control: payoutFormMethods.control,
                            name: 'accountNumber',
                          }}
                          color="primary"
                          startContent={
                            <LuCreditCard className="h-5 w-5 text-gray-400" />
                          }
                        />
                        <p className="text-sm text-gray-600">
                          Your account number is encrypted and securely stored
                        </p>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-900 mb-2">
                          Payout Schedule
                        </h4>
                        <p className="text-sm text-yellow-700">
                          Commissions are paid out monthly on the 1st of each
                          month for the previous month's referrals.
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className="px-6 pb-6">
                      <Button
                        onClick={handlePayoutSave}
                        size="md"
                        color="primary"
                      >
                        Save Payout Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Tab>
              </>
            )}

            <Tab key="security" title="Security">
              <Card>
                <CardHeader className="pt-6 px-6 mb-0">
                  <div>
                    <h2 className="text-primary text-md font-semibold">
                      Change Password
                    </h2>
                    <p className="text-small text-default-500">
                      Update your account password
                    </p>
                  </div>
                </CardHeader>
                <CardBody className="space-y-4 px-6">
                  <div className="space-y-2">
                    <InputField
                      label="Current Password"
                      type="text"
                      placeholder="Enter your current password"
                      controllerProps={{
                        control: securityFormMethods.control,
                        name: 'currentPassword',
                      }}
                      color="primary"
                      startContent={
                        <LuLock className="h-5 w-5 text-gray-400" />
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <InputField
                      label="New Password"
                      type="text"
                      placeholder="Enter your new password"
                      controllerProps={{
                        control: securityFormMethods.control,
                        name: 'newPassword',
                      }}
                      color="primary"
                      startContent={
                        <LuLock className="h-5 w-5 text-gray-400" />
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <InputField
                      label="Confirm Password"
                      type="text"
                      placeholder="Confirm your new password"
                      controllerProps={{
                        control: securityFormMethods.control,
                        name: 'confirmNewPassword',
                      }}
                      color="primary"
                      startContent={
                        <LuLock className="h-5 w-5 text-gray-400" />
                      }
                    />
                  </div>
                </CardBody>
                <CardFooter className="px-6 pb-6">
                  <Button
                    onClick={handlePasswordChange}
                    size="md"
                    color="primary"
                  >
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
              <Card className="mt-6 p-6">
                <CardHeader className="py-0 mb-0">
                  <div>
                    <p className="text-md font-semibold">
                      Security Recommendations
                    </p>
                  </div>
                </CardHeader>
                <CardBody className="pb-0">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>
                        Use a strong password with at least 8 characters
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>
                        Include uppercase, lowercase, numbers, and special
                        characters
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Change your password regularly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Never share your password with anyone</span>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SettingsSection
