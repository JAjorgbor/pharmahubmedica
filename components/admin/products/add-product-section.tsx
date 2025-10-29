'use client'
import InputField from '@/components/elements/input-field'
import { MAX_FILE_SIZE } from '@/library/config'
import SingleImageDropzone from '@/components/elements/single-image-dropzone'
import { categories } from '@/library/dummy-data'
import {
  addToast,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import Link from 'next/link'

export const productSchema = z.object({
  productName: z
    .string({ error: 'Product name is required' })
    .min(1, 'Product name is required'),
  slug: z.string().optional(),
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
  productImage: z
    .any()
    .nullable()

    .refine((val) => val instanceof File, {
      message: 'Product image is required',
    }),
})

export type ProductFormFields = z.infer<typeof productSchema>

const AddProductSection = () => {
  const defaultValues = { visible: true, inStock: true }
  const formMethods = useForm<ProductFormFields>({
    resolver: zodResolver(productSchema),
  })
  useEffect(() => {
    const subscribe = formMethods.watch((values) => console.log(values))
    return () => subscribe.unsubscribe()
  }, [])
  const handleSubmit = async (formData: ProductFormFields) => {
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
    <div className="space-y-5">
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
                className="md:col-span-2"
                controllerProps={{
                  control: formMethods.control,
                  name: 'productName',
                }}
              />
              <InputField
                label="Product Slug"
                placeholder="example-product"
                type="text"
                disabled
                controllerProps={{
                  control: formMethods.control,
                  name: 'slug',
                }}
              />
              <InputField
                label="Price"
                type="amount"
                isRequired
                controllerProps={{
                  control: formMethods.control,
                  name: 'price',
                }}
              />
              <InputField
                label="Category"
                type="autocomplete"
                placeholder="Select Category"
                isRequired
                options={categories.map((each) => ({
                  label: each.name,
                  value: each.name,
                }))}
                controllerProps={{
                  control: formMethods.control,
                  name: 'category',
                }}
              />
              <InputField
                label="Subcategory"
                type="select"
                placeholder="Select Subcategory"
                options={categories.map((each) => ({
                  label: each.name,
                  value: each.name,
                }))}
                isRequired
                controllerProps={{
                  control: formMethods.control,
                  name: 'subcategory',
                }}
              />
              <InputField
                label="Description"
                type="textarea"
                isRequired
                placeholder="Provide product description..."
                className="md:col-span-2"
                controllerProps={{
                  control: formMethods.control,
                  name: 'description',
                }}
              />
              <div className="space-y-4 md:col-span-2">
                <InputField
                  label="Visible"
                  type="switch"
                  className="md:w-1/2 lg:w-1/3"
                  controllerProps={{
                    control: formMethods.control,
                    name: 'visible',
                  }}
                />
                <InputField
                  label="In Stock"
                  type="switch"
                  className="md:w-1/2 lg:w-1/3"
                  controllerProps={{
                    control: formMethods.control,
                    name: 'inStock',
                  }}
                />
              </div>
            </div>
            <div className="min-h-56">
              <SingleImageDropzone
                label="Product Image"
                isRequired
                controllerProps={{
                  name: 'productImage',
                  control: formMethods.control,
                }}
                className="h-full"
              />
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <div className="flex gap-4 w-full md:w-1/3">
            <Button color="danger" size="sm" className="flex-1">
              Cancel
            </Button>
            <Button
              color="primary"
              size="sm"
              type="submit"
              form="add-product-form"
              className="flex-1"
            >
              Create
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddProductSection
