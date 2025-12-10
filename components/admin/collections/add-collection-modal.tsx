import InputField from '@/components/elements/input-field'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/elements/modal-wrapper'
import SingleImageDropzone from '@/components/elements/single-image-dropzone'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const schema = z.object({
  name: z.string({ error: 'Collection name is required' }),
  description: z.string({ error: 'Description is required' }),
  visible: z.boolean(),
  image: z
    .any()
    .nullable()
    .refine((val) => val instanceof File, {
      message: 'Collection image is required',
    }),
})

type FormFields = z.infer<typeof schema>

const AddCollectionModal = ({ isOpen, setIsOpen }: BaseModalProps) => {
  const defaultValues = { visible: true }
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  })
  const { control } = formMethods
  const handleSubmit = async (formData: FormFields) => {
    try {
      //   const res = await request(formData)
      //   console.log(res)
      console.log(formData)
    } catch (error: any) {
      //   toast.error(
      //     error?.data?.message ||
      //       error?.message ||
      //       'Something went wrong. Please try again later.'
      //   )
    }
  }
  return (
    <ModalWrapper
      title="Add Collection"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={
        <div className="flex gap-4 justify-end">
          <Button size="sm" color="danger" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="primary"
            type="submit"
            form="add-collection-form"
          >
            Add
          </Button>
        </div>
      }
    >
      <form
        id="add-collection-form"
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <div className="space-y-4">
          <SingleImageDropzone
            label="Collection Image"
            isRequired
            className="h-56"
            controllerProps={{ name: 'image', control }}
          />
          <InputField
            label="Name"
            isRequired
            type="text"
            controllerProps={{ name: 'name', control }}
            placeholder="Example Collection"
          />
          <InputField
            label="Description"
            isRequired
            type="textarea"
            placeholder="Describe this collection..."
            controllerProps={{ name: 'description', control }}
          />
          <div className="space-y-1">
            <InputField
              label="Visible"
              type="switch"
              controllerProps={{ name: 'visible', control }}
            />
            <p className="text-foreground-500 text-sm">
              Toggle to control whether this collection and all its products are
              visible to customers in the store. When turned off, the collection
              and its products will be hidden from public view.
            </p>
          </div>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default AddCollectionModal
