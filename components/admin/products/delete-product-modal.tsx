'use client'
import React, { useState } from 'react'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/elements/modal-wrapper'
import { Button, addToast } from '@heroui/react'
import { deleteProduct } from '@/api-client/admin/requests/product.requests'
import useGetAdminProducts from '@/hooks/requests/admin/useGetAdminProducts'
import { IProduct } from '@/api-client/interfaces/product.interfaces'

interface DeleteProductModalProps extends BaseModalProps {
  product: IProduct
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  setIsOpen,
  product,
}) => {
  const [loading, setLoading] = useState(false)
  const { mutateProducts } = useGetAdminProducts()

  const handleDelete = async () => {
    if (!product?._id) return
    setLoading(true)
    try {
      await deleteProduct(product._id)
      addToast({
        title: 'Product deleted successfully',
        color: 'success',
        severity: 'success',
      })
      mutateProducts()
      setIsOpen(false)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          'Failed to delete product',
        color: 'danger',
        severity: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Delete Product"
      size="sm"
      footer={
        <div className="flex gap-3 justify-end">
          <Button size="sm" variant="light" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="danger"
            isLoading={loading}
            onPress={handleDelete}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        <p>
          Are you sure you want to delete the product{' '}
          <span className="font-bold text-primary">"{product?.name}"</span>?
        </p>
        <p className="text-sm text-foreground-500">
          This action cannot be undone. This product will be permanently removed
          from the store inventory.
        </p>
      </div>
    </ModalWrapper>
  )
}

export default DeleteProductModal
