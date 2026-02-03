'use client'

import React, { useMemo, useState } from 'react'
import {
  Table as HerouiTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Spinner,
  Pagination,
  Checkbox,
  Button,
} from '@heroui/react'
import { LuSearch, LuMinus, LuPlus } from 'react-icons/lu'
import useGetAdminProducts from '@/hooks/requests/admin/useGetAdminProducts'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table'

interface ProductSelectionSectionProps {
  selectedProducts: { productId: string; quantity: number }[]
  onProductsChange: (
    products: { productId: string; quantity: number }[],
  ) => void
}

const columnHelper = createColumnHelper<IProduct>()

const ProductSelectionSection = ({
  selectedProducts,
  onProductsChange,
}: ProductSelectionSectionProps) => {
  const { products, productsLoading } = useGetAdminProducts()
  const [globalFilter, setGlobalFilter] = useState('')

  // Create columns
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'selection',
        header: ({ table }) => (
          <Checkbox
            isSelected={table.getIsAllRowsSelected()}
            isIndeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            isSelected={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor('name', {
        header: 'Product',
        cell: (info) => (
          <div className="flex flex-col w-max">
            <p className="font-semibold">{info.getValue()}</p>
            <p className="text-xs text-foreground-500">
              {info.row.original.category.name}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => (
          <span className="font-medium">
            {currencyFormatter(info.getValue())}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => {
          const product = row.original
          const isSelected = row.getIsSelected()
          const currentQty = selectedProducts.find(
            (p) => p.productId === product._id,
          )?.quantity

          return isSelected ? (
            <div>
              <div className="inline-flex items-center gap-2 bg-default-100 rounded-xl p-1">
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  className={'py-1'}
                  onPress={() =>
                    updateQuantity(product._id, (currentQty || 0) - 1)
                  }
                >
                  <LuMinus size={12} />
                </Button>
                <span className="font-medium min-w-[20px] text-center">
                  {currentQty}
                </span>
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  className={'py-1'}
                  onPress={() =>
                    updateQuantity(product._id, (currentQty || 0) + 1)
                  }
                >
                  <LuPlus size={12} />
                </Button>
              </div>
            </div>
          ) : (
            <span className="text-foreground-400">-</span>
          )
        },
      }),
    ],
    [selectedProducts],
  )

  const visibleProducts = useMemo(
    () => products?.filter((product) => product.visible === true) || [],
    [products],
  )

  const table = useReactTable({
    data: visibleProducts,
    columns,
    state: {
      globalFilter,
      rowSelection: selectedProducts.reduce(
        (acc, curr) => ({ ...acc, [curr.productId]: true }),
        {},
      ),
    },
    enableRowSelection: true,
    getRowId: (row) => row._id, // Use _id as the unique row identifier
    onRowSelectionChange: (updaterOrValue) => {
      // Logic to sync table selection state with parent state
      // This is a bit complex because we need to handle functional updaters and maintain quantities
      // It's cleaner to handle selection changes via row interaction or rewriting the updater logic
      // BUT, since we passed rowSelection via state, we are in "controlled" mode.
      // So onRowSelectionChange gives us the NEW selection state.
      // We need to transform that back to our parent state format.

      const currentSelectionState = selectedProducts.reduce(
        (acc, curr) => ({ ...acc, [curr.productId]: true }),
        {} as Record<string, boolean>,
      )

      const nextSelectionState =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(currentSelectionState)
          : updaterOrValue

      const newSelectedProducts = Object.keys(nextSelectionState).map((id) => {
        const existing = selectedProducts.find((p) => p.productId === id)
        return existing || { productId: id, quantity: 1 }
      })

      onProductsChange(newSelectedProducts)
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const updateQuantity = (productId: string, qty: number) => {
    if (qty < 0) return
    const updated = selectedProducts.map((p) =>
      p.productId === productId ? { ...p, quantity: qty } : p,
    )
    onProductsChange(updated)
  }

  if (productsLoading) return <Spinner label="Loading products..." />

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold">2. Select Products</h3>
      <Input
        placeholder="Search products..."
        value={globalFilter}
        onValueChange={setGlobalFilter}
        startContent={<LuSearch />}
        className="max-w-md"
        isClearable
        onClear={() => setGlobalFilter('')}
      />

      {/* 
        We use the HeroUI Table component for styling, but inject TanStack content.
        Note: HeroUI Table expects 'Selection' to be handled via its own props if used as a controlled component,
        but we are building our own rows so we disable HeroUI's selection logic and build it manually into the rows.
      */}
      <div className="overflow-hidden space-y-4 py-2">
        <div className="flex flex-col gap-4 min-w-full max-w-0 overflow-x-auto">
          <HerouiTable
            aria-label="Product selection"
            isKeyboardNavigationDisabled
          >
            <TableHeader>
              {table.getFlatHeaders().map((header) => (
                <TableColumn key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </HerouiTable>
        </div>
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount()}
            onChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductSelectionSection
