'use client'
import { updatePortalUser } from '@/api-client/portal/requests/portal.user.requests'
import InputField from '@/components/elements/input-field'
import useGetPortalUser from '@/hooks/requests/useGetPortalUser'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import moment from 'moment'
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { LuMail, LuPhone, LuUser } from 'react-icons/lu'
import z from 'zod'

interface PersonalDetailsSettingsProps {}

const profileSchema = z.object({
  firstName: z.string({ error: 'First name is required' }),
  lastName: z.string({ error: 'Last name is required' }),
  phoneNumber: z.string({ error: 'WhatsApp phone number is required' }),
  gender: z.enum(['male', 'female']).optional(),
  dateOfBirth: z.string().optional(),
})

type ProfileFormFields = z.infer<typeof profileSchema>

const PersonalDetailsSettings: FC<PersonalDetailsSettingsProps> = ({}) => {
  const formMethods = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
  })

  const { portalUser, portalUserLoading, mutatePortalUser } = useGetPortalUser()
  const handleSubmit = async (data: ProfileFormFields) => {
    try {
      await updatePortalUser(data)
      mutatePortalUser()
      addToast({
        title: 'Personal details updated successfully',
        color: 'success',
        severity: 'success',
      })
    } catch (error) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later',
        color: 'danger',
        severity: 'danger',
      })
    }
  }
  useEffect(() => {
    if (portalUser) {
      formMethods.reset({
        firstName: portalUser.firstName,
        lastName: portalUser.lastName,
        phoneNumber: portalUser.phoneNumber,
        gender: portalUser.gender as ProfileFormFields['gender'],
        dateOfBirth: moment(portalUser.dateOfBirth).format('YYYY-MM-DD'),
      })
    }
  }, [portalUser])

  return (
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
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="grid md:grid-cols-2 gap-4"
          id="personal-details-form"
        >
          {portalUserLoading ? (
            <>
              <Skeleton className="h-10 rounded-xl w-full" />
              <Skeleton className="h-10 rounded-xl w-full" />
              <Skeleton className="h-10 rounded-xl w-full" />
              <Skeleton className="h-10 rounded-xl w-full" />
              <Skeleton className="h-10 rounded-xl w-full" />
              <Skeleton className="h-10 rounded-xl w-full" />
            </>
          ) : (
            <>
              <InputField
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                isRequired
                controllerProps={{
                  control: formMethods.control,
                  name: 'firstName',
                }}
                color="primary"
                startContent={<LuUser className="h-5 w-5 text-gray-400" />}
              />
              <InputField
                label="Last Name"
                type="text"
                isRequired
                placeholder="Enter your last name"
                controllerProps={{
                  control: formMethods.control,
                  name: 'lastName',
                }}
                color="primary"
                startContent={<LuUser className="h-5 w-5 text-gray-400" />}
              />
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                disabled
                controllerProps={{
                  name: 'email',
                  defaultValue: portalUser?.email,
                }}
                color="primary"
                startContent={<LuMail className="h-5 w-5 text-gray-400" />}
              />
              <InputField
                label="Phone Number"
                type="phoneNumber"
                placeholder="Enter your phone number"
                isRequired
                controllerProps={{
                  control: formMethods.control,
                  name: 'phoneNumber',
                }}
                color="primary"
                startContent={<LuPhone className="h-5 w-5 text-gray-400" />}
              />
              <InputField
                label="Gender"
                type="select"
                placeholder="Select your gender"
                controllerProps={{
                  control: formMethods.control,
                  name: 'gender',
                }}
                color="primary"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
                startContent={<LuPhone className="h-5 w-5 text-gray-400" />}
              />
              <InputField
                label="Date of Birth"
                type="date"
                placeholder="Enter your date of birth"
                controllerProps={{
                  control: formMethods.control,
                  name: 'dateOfBirth',
                }}
                color="primary"
              />
            </>
          )}
        </form>
      </CardBody>
      <CardFooter className="px-6 pb-6">
        <Button
          type="submit"
          size="md"
          form="personal-details-form"
          isDisabled={portalUserLoading}
          color="primary"
          isLoading={formMethods.formState.isSubmitting}
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
export default PersonalDetailsSettings
