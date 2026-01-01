'use client'
import InputField from '@/components/elements/input-field'
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as TableType,
  useReactTable,
} from '@tanstack/react-table'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { LuArrowUpDown, LuClipboardList } from 'react-icons/lu'

interface TableWrapperProps<TData> {
  allowsSortingFor?: string[]
  items: TData[]
  columns: ColumnDef<TData, any>[]
  isLoading?: boolean
  emptyContent?: ReactNode
  topContent?: (params?: {
    table: TableType<TData>
    searchField: (placeholder: string) => ReactNode
  }) => ReactNode
  bottomContent?: (params?: {
    table: TableType<TData>
    rowPerPage: ReactNode
    pagination: ReactNode
  }) => ReactNode
  ariaLabel?: string
}

const TableWrapper = <TData,>({
  allowsSortingFor = [],
  items,
  columns,
  topContent,
  bottomContent,
  isLoading = false,
  ariaLabel = 'Data Table',
  emptyContent = (
    <div className="flex flex-col justify-center items-center gap-2 text-foreground-500">
      <LuClipboardList size={70} strokeWidth={0.6} />
      <p className="text-center text-sm">
        No items currently available for this table.
      </p>
    </div>
  ),
}: TableWrapperProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [isHydrated, setIsHydrated] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data: items || [],
    columns,
    state: {
      globalFilter,
      columnFilters,
      pagination,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    getSortedRowModel: getSortedRowModel(), // Enables sorting functionality
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  })
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <div className="space-y-6">
      {isHydrated &&
        topContent?.({
          table,
          searchField: (placeholder) => (
            <SearchField
              table={table}
              setGlobalFilter={setGlobalFilter}
              placeholder={placeholder}
            />
          ),
        })}
      <div className="overflow-hidden">
        <div className="min-w-full max-w-0 overflow-auto">
          <Table
            aria-label={ariaLabel}
            removeWrapper
            classNames={{
              tbody: 'divide-y divide-foreground-200',
              table: 'w-max',
              td: 'max-w-56',
            }}
          >
            <TableHeader className="border-b">
              {
                table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableColumn
                      key={header.id}
                      allowsSorting={allowsSortingFor?.includes(header.id)}
                      onClick={(e) =>
                        allowsSortingFor?.includes(header.id)
                          ? header.column.getToggleSortingHandler()(e)
                          : null
                      }
                    >
                      <div className="inline-flex gap-2 items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {allowsSortingFor?.includes(header.id) && (
                          <LuArrowUpDown aria-label={`Sort by ${header.id}`} />
                        )}
                      </div>
                    </TableColumn>
                  ))
                ) as any
              }
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              emptyContent={emptyContent}
              items={table.getRowModel().rows}
              loadingContent={
                <Spinner color="primary" label="Loading. Please wait..." />
              }
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="text-nevada">
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={index}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {bottomContent?.({
        table,
        rowPerPage: <SelectRowsPerPage table={table} />,
        pagination: <SelectPagination table={table} />,
      })}
    </div>
  )
}

export default TableWrapper

const SelectRowsPerPage = <I,>({ table }: { table: TableType<I> }) => {
  return (
    <label className="flex items-center text-foreground-600 text-small">
      Rows per page:
      <select
        className="bg-transparent outline-none text-foreground-600 text-small"
        onChange={(e) => table.setPageSize(Number(e.target.value))}
        defaultValue={'5'}
        aria-label="Select number of rows per page"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </label>
  )
}

const SelectPagination = <I,>({ table }: { table: TableType<I> }) => {
  return (
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={table.getState().pagination.pageIndex + 1}
      total={table.getPageCount() || 1}
      onChange={(value) => table.setPageIndex(value - 1)}
      className="text-white"
    />
  )
}

const SearchField = <I,>({
  table,
  setGlobalFilter,
  placeholder,
}: {
  table: TableType<I>
  setGlobalFilter: Dispatch<SetStateAction<any>>
  placeholder?: string
}) => {
  return (
    <InputField
      controllerProps={{ name: 'search field' }}
      type="search"
      classNames={{ base: 'w-full' }}
      className="w-full"
      placeholder={placeholder}
      onChange={(value) => setGlobalFilter(value)}
      aria-label={placeholder || 'Search table'}
    />
  )
}
