'use client'
import InputField from '@/components/elements/input-field'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, Button } from '@heroui/react'
import { LuSend } from 'react-icons/lu'
import axios from 'axios'
import customValidation from '@/utils/custom-validation'

const schema = z.object({
  firstName: z.string({ error: 'First name is required' }),
  lastName: z.string({ error: 'Last name is required' }),
  email: customValidation.email,
  Message: z
    .string({ error: 'Message is required' })
    .nonempty({ error: 'Message is required' }),
})

type FormFields = z.infer<typeof schema>

const ContactForm = () => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const handleSubmit = async (formData: FormFields) => {
    try {
      //   const res = await request(formData)
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT,
        formData,
      )
      addToast({ title: 'Message sent successfully.', color: 'success' })
      formMethods.reset({ firstName: '', lastName: '', email: '', Message: '' })
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={formMethods.handleSubmit(handleSubmit)}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          type="text"
          placeholder="John"
          controllerProps={{ control: formMethods.control, name: 'firstName' }}
          color="primary"
        />
        <InputField
          label="Last Name"
          type="text"
          placeholder="Doe"
          controllerProps={{ control: formMethods.control, name: 'lastName' }}
          color="primary"
        />
      </div>
      <InputField
        label="Email Address"
        type="email"
        placeholder="johndoe@example.com"
        controllerProps={{ control: formMethods.control, name: 'email' }}
        color="primary"
      />
      <InputField
        label="Message"
        type="textarea"
        placeholder="Type your message here..."
        controllerProps={{ control: formMethods.control, name: 'Message' }}
        color="primary"
      />
      <Button
        fullWidth
        endContent={<LuSend />}
        type="submit"
        color="primary"
        isLoading={formMethods.formState.isSubmitting}
      >
        Submit
      </Button>
    </form>
  )
}

export default ContactForm
