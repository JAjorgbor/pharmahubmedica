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
import { LuClipboardList, LuSearch } from 'react-icons/lu'

type DefaultItemProps = { _id: string }

interface TableWrapperProps<
  I extends DefaultItemProps,
  C extends ColumnDef<I, any>[]
> {
  allowsSortingFor?: string[]
  items: I[]
  columns: C
  isLoading?: boolean
  emptyContent?: ReactNode
  topContent?: (params?: {
    table: TableType<I>
    searchField: ReactNode
  }) => ReactNode
  bottomContent?: (params?: {
    table: TableType<I>
    rowPerPage: ReactNode
    pagination: ReactNode
  }) => ReactNode
}

const TableWrapper = <
  I extends DefaultItemProps,
  C extends ColumnDef<I, any>[]
>({
  allowsSortingFor = [],
  items,
  columns,
  topContent,
  bottomContent,
  isLoading = false,
  emptyContent = (
    <div className="flex flex-col justify-center items-center gap-5 text-foreground-500">
      <LuClipboardList size={50} />
      <p className="text-center">
        No items currently available for this table.
      </p>
    </div>
  ),
}: TableWrapperProps<I, C>) => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [categoryFilter, setCategoryFilter] = useState('all')
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
          searchField: (
            <SearchField table={table} setGlobalFilter={setGlobalFilter} />
          ),
        })}
      <div className="overflow-hidden">
        <div className="min-w-full max-w-0 overflow-auto">
          <Table
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
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                <TableRow key={row.original._id} className="text-nevada">
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
}: {
  table: TableType<I>
  setGlobalFilter: Dispatch<SetStateAction<any>>
}) => {
  return (
    <InputField
      controllerProps={{ name: 'search field' }}
      type="search"
      classNames={{ base: 'w-full md:w-1/3' }}
      className="w-full md:w-44"
      placeholder="Search inventory"
      startContent={<LuSearch className="w-4 h-4" />}
      onChange={(value) => setGlobalFilter(value)}
    />
  )
}
