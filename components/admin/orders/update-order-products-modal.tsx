import React, { useState, useMemo, useEffect } from 'react'
import {
  Button,
  Input,
  Spinner,
  addToast,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react'
import { LuSearch } from 'react-icons/lu'
import ModalWrapper from '@/components/elements/modal-wrapper'
import useGetAdminProducts from '@/hooks/requests/admin/useGetAdminProducts'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import { IOrderItem } from '@/api-client/interfaces/order.interfaces'
import { currencyFormatter } from '@/utils/currency-formatter'
import adminOrderRequests from '@/api-client/admin/requests/order.requests'

interface UpdateOrderProductsModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
  currentProducts: IOrderItem[]
  onSuccess: () => void
}

const UpdateOrderProductsModal = ({
  isOpen,
  onClose,
  orderId,
  currentProducts,
  onSuccess,
}: UpdateOrderProductsModalProps) => {
  const { products, productsLoading } = useGetAdminProducts()
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [isUpdating, setIsUpdating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize selected products and quantities from current order
  useEffect(() => {
    if (isOpen && currentProducts) {
      const initialKeys = new Set(
        currentProducts.map((item) => item.productId.toString()),
      )
      const initialQuantities: Record<string, number> = {}
      currentProducts.forEach((item) => {
        initialQuantities[item.productId.toString()] = item.quantity
      })
      setSelectedKeys(initialKeys)
      setQuantities(initialQuantities)
    }
  }, [isOpen, currentProducts])

  const visibleProducts = useMemo(() => {
    const filtered =
      products?.filter((product) => product.visible === true) || []
    if (!searchQuery) return filtered
    return filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [products, searchQuery])

  const handleQuantityChange = (productId: string, value: string | number) => {
    const quantity = typeof value === 'string' ? parseInt(value) : value
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }))
  }

  const handleUpdateProducts = async () => {
    if (selectedKeys.size === 0) {
      addToast({
        title: 'Error',
        description: 'Please select at least one product',
        color: 'danger',
      })
      return
    }

    setIsUpdating(true)
    try {
      const productsData = isAllSelected
        ? Array.from(visibleProducts.map((product) => product._id)).map(
            (productId) => ({
              productId,
              quantity: quantities[productId] || 1,
            }),
          )
        : Array.from(selectedKeys).map((productId) => ({
            productId,
            quantity: quantities[productId] || 1,
          }))

      await adminOrderRequests.updateOrderProducts(orderId, productsData)
      addToast({
        title: 'Success',
        description: 'Order products updated successfully',
        color: 'success',
      })
      onSuccess()
      onClose()
    } catch (error: any) {
      addToast({
        title: 'Error',
        description:
          error?.data?.message || error?.message || 'Failed to update products',
        color: 'danger',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const renderCell = (product: IProduct, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{product.name}</p>
            <p className="text-xs text-foreground-500">
              {product.category.name}
            </p>
          </div>
        )
      case 'price':
        return (
          <span className="font-medium">
            {currencyFormatter(product.price)}
          </span>
        )
      case 'quantity':
        return selectedKeys instanceof Set && selectedKeys?.has(product._id) ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Input
              type="number"
              size="sm"
              value={quantities[product._id]?.toString()}
              onValueChange={(value) => {
                handleQuantityChange(product._id, value)
              }}
              className="w-20"
            />
          </div>
        ) : (
          <span className="text-foreground-400">-</span>
        )
      default:
        return null
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={onClose}
      title="Update Order Products"
      size="3xl"
      footer={
        <div className="flex justify-end w-full gap-4">
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleUpdateProducts}
            isLoading={isUpdating}
            isDisabled={selectedKeys.size === 0}
          >
            Update Products
          </Button>
        </div>
      }
    >
      {productsLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner label="Loading products..." />
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-foreground-500">
            Select products and adjust quantities for this order. Only visible
            products are shown.
          </p>
          <Input
            placeholder="Search products by name or category..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            isClearable
            onClear={() => setSearchQuery('')}
            startContent={<LuSearch className="text-foreground-400" />}
            className="mb-4"
          />
          <Table
            aria-label="Product selection table"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            isKeyboardNavigationDisabled
            onSelectionChange={(keys) => {
              setSelectedKeys(keys as Set<string>)
              setIsAllSelected(keys == 'all')
            }}
            disallowEmptySelection
            onCellAction={() => {}}
            classNames={{
              wrapper: 'max-h-[400px]',
            }}
          >
            <TableHeader>
              <TableColumn key="name">PRODUCT</TableColumn>
              <TableColumn key="price">PRICE</TableColumn>
              <TableColumn key="quantity">QUANTITY</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No products found">
              {visibleProducts.map((product) => (
                <TableRow key={product._id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(product, columnKey as string)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </ModalWrapper>
  )
}

export default UpdateOrderProductsModal
