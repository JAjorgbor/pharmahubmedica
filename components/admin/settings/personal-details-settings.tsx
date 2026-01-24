'use client'
import { updateAdminuser } from '@/api-client/admin/requests/admin.user.requests'
import InputField from '@/components/elements/input-field'
import SingleImageDropzone from '@/components/elements/single-image-dropzone'
import useGetAdminUser from '@/hooks/requests/admin/useGetAdminUser'
import useGetImageFileFromUrl from '@/hooks/useGetImageFromUrl'
import customValidation from '@/utils/custom-validation'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@heroui/react'
import { sentenceCase } from 'change-case'
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { LuMail, LuPhone, LuUser, LuUserCheck } from 'react-icons/lu'
import z from 'zod'

interface PersonalDetailsSettingsProps {}

const schema = z.object({
  data: z.object({
    firstName: z.string({ error: 'First name is required' }),
    lastName: z.string({ error: 'Last name is required' }),
    phoneNumber: z.string({ error: 'Phone number is required' }),
    gender: z.enum(['male', 'female']).optional(),
    dateOfBirth: z.string().optional(),
  }),
  image: customValidation.imageFileSchema('', true),
})

type FormFields = z.infer<typeof schema>

const PersonalDetailsSettings: FC<PersonalDetailsSettingsProps> = ({}) => {
  const { adminUser, mutateAdminUser } = useGetAdminUser()
  const { control, ...formMethods } = useForm()

  const { getImageFileFromUrl, isFetching: isImageFetching } =
    useGetImageFileFromUrl(adminUser)
  const isLoading = adminUser
    ? adminUser?.avatar?.url
      ? isImageFetching
      : false
    : true
  useEffect(() => {
    console.log(adminUser)
    if (adminUser) {
      if (adminUser.avatar) {
        getImageFileFromUrl(adminUser.avatar.url).then((image) => {
          formMethods.reset({
            data: {
              firstName: adminUser.firstName,
              lastName: adminUser.lastName,
              email: adminUser.email,
              phoneNumber: adminUser.phoneNumber,
              role: adminUser.role,
            },
            image,
          })
        })
      } else {
        formMethods.reset({
          data: {
            firstName: adminUser.firstName,
            lastName: adminUser.lastName,
            email: adminUser.email,
            phoneNumber: adminUser.phoneNumber,
            role: adminUser.role,
          },
        })
      }
    }
  }, [adminUser, getImageFileFromUrl])

  const handleSubmit = async (formData: FormFields) => {
    formData.data = JSON.stringify(formData.data) as any
    try {
      await updateAdminuser(formData)
      mutateAdminUser()
      addToast({
        title: 'Personal details updated successfully',
        color: 'success',
        severity: 'success',
      })
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-primary">
            Personal Information
          </h2>
        </CardHeader>
        <CardBody>
          <form
            id="admin-personal-details-form"
            className="grid md:grid-cols-2 gap-4"
            onSubmit={formMethods.handleSubmit(handleSubmit)}
          >
            {isLoading ? (
              <>
                <Skeleton className="h-10 rounded-lg w-full" />
                <Skeleton className="h-10 rounded-lg w-full" />
                <Skeleton className="h-10 rounded-lg w-full md:col-span-2" />
                <Skeleton className="h-10 rounded-lg w-full" />
                <Skeleton className="h-10 rounded-lg w-full" />
                <Skeleton className="h-52 rounded-lg w-full" />
              </>
            ) : (
              <>
                <InputField
                  type="text"
                  isName
                  label="First Name"
                  controllerProps={{ control, name: 'data.firstName' }}
                  startContent={<LuUser />}
                />
                <InputField
                  type="text"
                  isName
                  label="Last Name"
                  controllerProps={{ control, name: 'data.lastName' }}
                  startContent={<LuUser />}
                />
                <InputField
                  type="email"
                  label="Email Address"
                  disabled
                  controllerProps={{
                    defaultValue: adminUser?.email,
                    name: 'data.email',
                  }}
                  startContent={<LuMail />}
                  className="md:col-span-2"
                />
                <InputField
                  type="phoneNumber"
                  label="Phone Number"
                  controllerProps={{ control, name: 'data.phoneNumber' }}
                  startContent={<LuPhone />}
                />
                <InputField
                  type="text"
                  disabled
                  label="Role"
                  controllerProps={{
                    name: 'data.role',
                    defaultValue: sentenceCase(adminUser?.role || ''),
                  }}
                  startContent={<LuUserCheck />}
                />
                <SingleImageDropzone
                  label="Avatar"
                  controllerProps={{ name: 'image', control }}
                />
              </>
            )}
          </form>
        </CardBody>
        <CardFooter className="mt-6">
          <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
            <Button
              size="sm"
              color="primary"
              type="submit"
              form="admin-personal-details-form"
              isLoading={formMethods.formState.isSubmitting}
            >
              Update
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
export default PersonalDetailsSettings
