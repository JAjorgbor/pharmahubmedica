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
  Skeleton,
  Spinner,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { updateProduct } from '@/api-client/admin/requests/product.requests'
import useGetAdminCategories from '@/hooks/requests/admin/useGetAdminCategories'
import useGetAdminProduct from '@/hooks/requests/admin/useGetAdminProduct'
import useGetImageFileFromUrl from '@/hooks/useGetImageFromUrl'
import customValidation from '@/utils/custom-validation'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { LuChevronLeft } from 'react-icons/lu'
import { z } from 'zod'

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
  image: customValidation.imageFileSchema('Product image is required'),
})

export type ProductFormFields = z.infer<typeof productSchema>

const UpdateProductSection = () => {
  const { id }: { id: string } = useParams()
  const router = useRouter()
  const { product, productLoading } = useGetAdminProduct(id)
  const { getImageFileFromUrl, isFetching: isImageFetching } =
    useGetImageFileFromUrl(product)

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

  useEffect(() => {
    if (product) {
      getImageFileFromUrl(product.image.url).then((image) => {
        formMethods.reset({
          data: {
            name: product.name,
            price: product.price,
            category: product.category._id,
            subcategory: product.subcategory._id,
            description: product.description,
            visible: product.visible,
            inStock: product.inStock,
          },
          image,
        })
      })
    }
  }, [product, getImageFileFromUrl])

  const handleSubmit = async (formData: ProductFormFields) => {
    formData.data = JSON.stringify(formData.data) as any
    try {
      await updateProduct(id, formData)
      router.push('/admin/products')
      addToast({
        title: 'Product updated successfully',
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

  const { categories, categoriesLoading } = useGetAdminCategories()
  const watchedCategoryId = formMethods.watch('data.category')
  const selectedCategory = useMemo(
    () => categories?.find((each) => each._id === watchedCategoryId),
    [watchedCategoryId, categories]
  )

  const isLoading = productLoading || isImageFetching

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          variant="light"
          as={Link}
          href="/admin/products"
          size="sm"
        >
          <LuChevronLeft size={20} />
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl text-primary font-semibold">
            Update Product
          </h1>
          <Breadcrumbs size="sm">
            <BreadcrumbItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/admin/products">Products</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Update Product</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      <Card>
        <CardBody className="px-6 py-8">
          {isLoading ? (
            <div className="h-96 grid place-items-center">
              <Spinner label="Loading product data..." />
            </div>
          ) : (
            <form
              id="update-product-form"
              onSubmit={formMethods.handleSubmit(handleSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
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
                  label="Base Price"
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
                  placeholder="Write a brief description about the product..."
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
          )}
        </CardBody>
        <CardFooter>
          <div className="flex gap-4 w-full md:w-1/3 items-center">
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
              form="update-product-form"
              className="flex-1"
              isLoading={formMethods.formState.isSubmitting}
              isDisabled={isLoading}
            >
              Update
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UpdateProductSection
