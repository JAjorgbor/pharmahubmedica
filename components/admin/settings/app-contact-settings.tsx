'use client'
import { updateAppContact } from '@/api-client/admin/requests/app.requests'
import InputField from '@/components/elements/input-field'
import useGetApp from '@/hooks/requests/usegetapp'
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
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface AppContactSettingsProps {}

const schema = z.object({
  phoneNumber: customValidation.required(
    z.string(),
    'Phone number is required',
  ),
  whatsAppNumber: customValidation.required(
    z.string(),
    'WhatsApp number is required',
  ),
  email: customValidation.email,
  address: customValidation.required(z.string(), 'Address is required'),
})

type FormFields = z.infer<typeof schema>

const AppContactSettings: FC<AppContactSettingsProps> = ({}) => {
  const { app, appLoading, mutateApp } = useGetApp()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (app) {
      reset({
        phoneNumber: app.phoneNumber,
        whatsAppNumber: app.whatsAppNumber,
        email: app.email,
        address: app.address,
      })
    }
  }, [app, reset])

  const onSubmit = async (formData: FormFields) => {
    try {
      await updateAppContact(formData)
      mutateApp()
      addToast({
        title: 'Store contact information updated successfully',
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
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-primary">
          Store Contact Information
        </h2>
      </CardHeader>
      <CardBody>
        <form
          id="app-contact-settings-form"
          className="grid md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {appLoading ? (
            <>
              <Skeleton className="h-10 rounded-lg w-full" />
              <Skeleton className="h-10 rounded-lg w-full" />
              <Skeleton className="h-10 rounded-lg w-full md:col-span-2" />
              <Skeleton className="h-20 rounded-lg w-full md:col-span-2" />
            </>
          ) : (
            <>
              <InputField
                type="phoneNumber"
                label="Phone Number"
                controllerProps={{ control, name: 'phoneNumber' }}
                startContent={<LuPhone />}
              />
              <InputField
                type="phoneNumber"
                label="WhatsApp Number"
                controllerProps={{ control, name: 'whatsAppNumber' }}
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
            </>
          )}
        </form>
      </CardBody>
      <CardFooter className="mt-6">
        <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
          <Button
            size="sm"
            variant="light"
            color="danger"
            onPress={() => reset()}
          >
            Reset
          </Button>
          <Button
            size="sm"
            color="primary"
            type="submit"
            form="app-contact-settings-form"
            isLoading={isSubmitting}
          >
            Update
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AppContactSettings
