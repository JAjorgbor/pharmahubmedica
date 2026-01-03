'use client'
import InputField from '@/components/elements/input-field'
import SingleImageDropzone from '@/components/elements/single-image-dropzone'
import {
  addToast,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { createProduct } from '@/api-client/admin/requests/product.requests'
import customValidation from '@/utils/custom-validation'
import Link from 'next/link'
import { LuChevronLeft } from 'react-icons/lu'
import { z } from 'zod'
import useGetAdminCategories from '@/hooks/requests/admin/useGetAdminCategories'
import { useRouter } from 'next/navigation'

export const productSchema = z.object({
  data: z.object({
    name: z
      .string({ error: 'Product name is required' })
      .min(1, 'Product name is required'),
    price: z
      .number({ error: 'Price is required' })
      .min(1, 'Price must be greater than 0'),
    category: z
      .string({ error: 'Category is required' })
      .min(1, 'Category is required'),
    subcategory: z
      .string({ error: 'Subcategory is required' })
      .min(1, 'Subcategory is required'),
    description: z
      .string({ error: 'Description is required' })
      .min(1, 'Description is required'),
    visible: z.boolean().optional(),
    inStock: z.boolean().optional(),
  }),
  image: customValidation.imageFileSchema('Collection image is required'),
})

export type ProductFormFields = z.infer<typeof productSchema>

const AddProductSection = () => {
  const [keepOpen, setKeepOpen] = useState(false)
  const router = useRouter()

  const defaultValues = {
    data: {
      name: '',
      price: 0,
      category: '',
      subcategory: '',
      description: '',
      visible: true,
      inStock: true,
    },
  }
  const formMethods = useForm<ProductFormFields>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const handleSubmit = async (formData: ProductFormFields) => {
    formData.data = JSON.stringify(formData.data) as any
    try {
      await createProduct(formData)
      formMethods.reset(defaultValues)
      if (!keepOpen) router.push('/admin/products')
      addToast({
        title: 'Product added successfully',
        color: 'success',
        severity: 'success',
      })
    } catch (error: any) {
      addToast({
        title:
          error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
        severity: 'danger',
      })
    }
  }
  const { categories, categoriesLoading } = useGetAdminCategories()
  const watchedCategoryId = formMethods.watch('data.category')
  const selectedCategory = useMemo(
    () => categories?.find((each) => each._id === watchedCategoryId),
    [categories, watchedCategoryId]
  )
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Button isIconOnly as={Link} href="/admin/products" variant="light">
          <LuChevronLeft size={25} />
        </Button>
        <div className="space-y-1">
          <h2 className="text-primary text-2xl font-semibold">
            Add Product To Inventory
          </h2>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/admin/products">Products</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Add</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <Card>
        <CardHeader>
          <h3>Product Details</h3>
        </CardHeader>
        <CardBody>
          <form
            className="grid md:grid-cols-2 gap-4"
            id="add-product-form"
            onSubmit={formMethods.handleSubmit(handleSubmit)}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Product Name"
                type="text"
                placeholder="Example Product"
                isRequired
                controllerProps={{
                  control: formMethods.control,
                  name: 'data.name',
                }}
              />
              <InputField
                label="Price"
                type="amount"
                isRequired
                controllerProps={{
                  control: formMethods.control,
                  name: 'data.price',
                }}
              />
              {categoriesLoading ? (
                <Skeleton className="h-10 rounded-lg" />
              ) : (
                <InputField
                  label="Category"
                  type="autocomplete"
                  placeholder="Select Category"
                  isRequired
                  options={categories?.map((each) => ({
                    label: each.name,
                    value: each._id,
                  }))}
                  controllerProps={{
                    control: formMethods.control,
                    name: 'data.category',
                  }}
                />
              )}
              {categoriesLoading ? (
                <Skeleton className="h-10 rounded-lg" />
              ) : (
                <InputField
                  label="Subcategory"
                  type="select"
                  placeholder="Select Subcategory"
                  options={selectedCategory?.subcategories?.map((each) => ({
                    label: each.name,
                    value: each._id,
                  }))}
                  isRequired
                  controllerProps={{
                    control: formMethods.control,
                    name: 'data.subcategory',
                  }}
                />
              )}
              <InputField
                label="Description"
                type="textarea"
                isRequired
                placeholder="Provide product description..."
                className="md:col-span-2"
                controllerProps={{
                  control: formMethods.control,
                  name: 'data.description',
                }}
              />
              <div className="space-y-4 md:col-span-2">
                <InputField
                  label="Visible"
                  type="switch"
                  className="md:w-1/2 lg:w-1/3"
                  controllerProps={{
                    control: formMethods.control,
                    name: 'data.visible',
                  }}
                />
                <InputField
                  label="In Stock"
                  type="switch"
                  className="md:w-1/2 lg:w-1/3"
                  controllerProps={{
                    control: formMethods.control,
                    name: 'data.inStock',
                  }}
                />
              </div>
            </div>
            <div className="min-h-56">
              <SingleImageDropzone
                label="Product Image"
                isRequired
                controllerProps={{
                  name: 'image',
                  control: formMethods.control,
                }}
                className="h-full"
              />
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <div className="flex gap-4 w-full md:w-1/2 items-center">
            <Button
              color="danger"
              size="sm"
              className="flex-1"
              as={Link}
              href="/admin/products"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              size="sm"
              type="submit"
              form="add-product-form"
              className="flex-1"
              isLoading={formMethods.formState.isSubmitting}
            >
              Create
            </Button>
            <InputField
              label="Add another product"
              controllerProps={{
                control: null,
                name: 'keep',
              }}
              onChange={(value) => setKeepOpen(value)}
              type="checkbox"
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddProductSection
