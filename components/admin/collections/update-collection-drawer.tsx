import InputField from '@/components/elements/input-field'
import DrawerWrapper, {
  BaseModalProps,
} from '@/components/elements/drawer-wrapper'
import SingleImageDropzone from '@/components/elements/single-image-dropzone'
import { addToast, Button, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import customValidation from '@/utils/custom-validation'
import { FiXCircle, FiPlusCircle } from 'react-icons/fi'
import {
  createCategory,
  updateCategory,
} from '@/api-client/admin/requests/category.requests'
import useGetCategories from '@/hooks/requests/admin/useGetAdminCategories'
import { ICategory } from '@/api-client/interfaces/category.interfaces'
import useGetImageFileFromUrl from '@/hooks/useGetImageFromUrl'

const schema = z.object({
  data: z.object({
    name: customValidation.required(z.string(), 'Category name is required'),
    description: customValidation.required(
      z.string(),
      'Description is required'
    ),
    visible: customValidation.required(z.boolean(), 'Visible is required'),
    subcategories: customValidation.required(
      z.array(
        z.object({
          name: customValidation.required(
            z.string(),
            'Subcategory name is required'
          ),
          _id: z.union([z.string(), z.literal('none')]),
        })
      ),
      'Subcategories are required'
    ),
  }),
  image: customValidation.imageFileSchema('Collection image is required'),
})
type FormFields = z.infer<typeof schema>

const UpdateCollectionDrawer = ({
  isOpen,
  setIsOpen,
  selectedCategory,
}: BaseModalProps & { selectedCategory: ICategory }) => {
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(schema),
  })
  const { getImageFileFromUrl, isFetching } =
    useGetImageFileFromUrl(selectedCategory)

  useEffect(() => {
    if (selectedCategory) {
      getImageFileFromUrl(selectedCategory.image.url)
        .then((image) => {
          formMethods.reset({
            data: {
              name: selectedCategory.name,
              description: selectedCategory.description,
              visible: selectedCategory.visible,
              subcategories: selectedCategory.subcategories.map(
                (subcategory) => ({
                  _id: subcategory._id,
                  name: subcategory.name,
                })
              ),
            },
            image,
          })
        })
        .catch((error) => console.log(error))
    }
  }, [selectedCategory])

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'data.subcategories',
  })

  const { mutateCategories } = useGetCategories()

  const handleSubmit = async (formData: FormFields) => {
    formData.data = JSON.stringify(formData.data) as any
    try {
      await updateCategory(selectedCategory._id, formData)
      addToast({
        title: 'Category updated successfully',
        color: 'success',
        severity: 'success',
      })
      mutateCategories()
      formMethods.reset()
      setIsOpen(false)
    } catch (error: any) {
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
  return (
    <DrawerWrapper
      title="Manage Collection"
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
            form="update-collection-form"
            isLoading={formMethods.formState.isSubmitting}
          >
            Update
          </Button>
        </div>
      }
    >
      <form
        id="update-collection-form"
        onSubmit={formMethods.handleSubmit(handleSubmit)}
        className="flex-grow"
      >
        {isFetching ? (
          <div className="h-full grid place-items-center">
            <Spinner label="Please wait..." />
          </div>
        ) : (
          <div className="space-y-4">
            <SingleImageDropzone
              label="Collection Image"
              isRequired
              className="h-56"
              controllerProps={{ name: 'image', control: formMethods.control }}
            />
            <InputField
              label="Name"
              isRequired
              type="text"
              controllerProps={{
                name: 'data.name',
                control: formMethods.control,
              }}
              placeholder="Example Collection"
            />
            <InputField
              label="Description"
              isRequired
              type="textarea"
              placeholder="Describe this collection..."
              controllerProps={{
                name: 'data.description',
                control: formMethods.control,
              }}
            />
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-semibold text-primary">Subcategories</p>

                <Button
                  size="sm"
                  color="primary"
                  endContent={<FiPlusCircle />}
                  type="button"
                  onPress={() => append({ name: '', _id: 'none' })}
                >
                  Add Subcategory
                </Button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-center">
                  <InputField
                    isRequired
                    type="text"
                    controllerProps={{
                      name: `data.subcategories.${index}.name`,
                      control: formMethods.control,
                    }}
                    placeholder="Subcategory Name"
                    className="flex-1"
                  />
                  {field._id == 'none' && (
                    <Button
                      type="button"
                      onPress={() => remove(index)}
                      isIconOnly
                      color="danger"
                      variant="light"
                      size="sm"
                    >
                      <FiXCircle size={20} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <InputField
                label="Visible"
                type="switch"
                controllerProps={{
                  name: 'data.visible',
                  control: formMethods.control,
                }}
              />
              <p className="text-foreground-500 text-sm">
                Toggle to control whether this collection and all its products
                are visible to customers in the store. When turned off, the
                collection and its products will be hidden from public view.
              </p>
            </div>
          </div>
        )}
      </form>
    </DrawerWrapper>
  )
}

export default UpdateCollectionDrawer
