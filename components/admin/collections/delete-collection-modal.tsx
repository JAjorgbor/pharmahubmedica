'use client'
import React, { useState } from 'react'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/elements/modal-wrapper'
import { Button, addToast } from '@heroui/react'
import { deleteCategory } from '@/api-client/admin/requests/category.requests'
import useGetCategories from '@/hooks/requests/admin/useGetAdminCategories'
import { ICategory } from '@/api-client/interfaces/category.interfaces'

interface DeleteCollectionModalProps extends BaseModalProps {
  category: ICategory
}

const DeleteCollectionModal: React.FC<DeleteCollectionModalProps> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const [loading, setLoading] = useState(false)
  const { mutateCategories } = useGetCategories()

  const handleDelete = async () => {
    if (!category?._id) return
    setLoading(true)
    try {
      await deleteCategory(category._id)
      addToast({
        title: 'Category deleted successfully',
        color: 'success',
        severity: 'success',
      })
      mutateCategories()
      setIsOpen(false)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.error || error?.message || 'Failed to delete category',
        color: 'danger',
        severity: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const hasProducts = (category?.productsCount as any) > 0

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Delete Collection"
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
            isDisabled={hasProducts}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        <p>
          Are you sure you want to delete the collection{' '}
          <span className="font-bold text-primary">"{category?.name}"</span>?
        </p>
        {hasProducts ? (
          <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
            <p className="text-sm text-danger-600 font-medium">
              Cannot delete this collection because it has{' '}
              {category.productsCount} associated products.
            </p>
            <p className="text-xs text-danger-500 mt-1">
              Please move or delete all products in this collection before
              attempting to delete it.
            </p>
          </div>
        ) : (
          <p className="text-sm text-foreground-500">
            This action cannot be undone. This collection is currently empty and
            safe to delete.
          </p>
        )}
      </div>
    </ModalWrapper>
  )
}

export default DeleteCollectionModal
