# TableWrapper Component

The `TableWrapper` abstraction simplifies the creation of data tables by combining `@heroui/react` UI components with `@tanstack/react-table` logic. It handles the repetitive boilerplate of setting up headers, rows, sorting hooks, and pagination.

## Key Features

- **Declarative Columns**: Define columns easily using the TanStack column helper.
- **Built-in Sort**: Just pass a list of sortable column IDs.
- **Pagination UI**: Includes a page selector and "rows per page" dropdown.
- **Loading State**: Shows a spinner overlay when `isLoading` is true.
- **Empty State**: Shows a customizable empty message when no data is present.

## Complete Usage Example

This example demonstrates how to set up a table with custom cell rendering and sorting.

```tsx
import React, { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import TableWrapper from '@/components/elements/table-wrapper'
import { Chip } from '@heroui/react'

// 1. Define your data interface
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
}

const columnHelper = createColumnHelper<User>()

const UsersTable = ({ users, isLoading }) => {
  // 2. Define columns (useMemo is important for performance)
  const columns = useMemo(
    () => [
      // Simple text column
      columnHelper.accessor('name', {
        header: 'Full Name',
        cell: (info) => <span className="font-bold">{info.getValue()}</span>,
      }),

      // Accessor column
      columnHelper.accessor('email', {
        header: 'Email Address',
      }),

      // Custom rendered column with logic
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => (
          <Chip
            color={getValue() === 'active' ? 'success' : 'danger'}
            size="sm"
          >
            {getValue()}
          </Chip>
        ),
      }),
    ],
    []
  )

  // 3. Render the wrapper
  return (
    <div className="p-4">
      <TableWrapper
        items={users}
        columns={columns}
        isLoading={isLoading}
        // Enable sorting for specific column IDs (must match accessor key or id)
        allowsSortingFor={['name', 'email']}
        ariaLabel="List of registered users"
        // Optional: Custom empty state
        emptyContent={
          <div className="text-center p-4">
            <p>No users found in the system.</p>
          </div>
        }
      />
    </div>
  )
}

export default UsersTable
```

## Adding Search and Filters

You can use the `topContent` prop to inject search bars or filter dropdowns above the table. The wrapper provides a default `searchField` generator, or you can build your own.

```tsx
<TableWrapper
  items={data}
  columns={columns}
  // ...
  topContent={({ searchField }) => (
    <div className="flex justify-between items-center mb-4">
      <div className="w-1/3">
        {/* Uses the built-in search field which updates global filter */}
        {searchField('Search users...')}
      </div>
      <div>
        <Button>Add New User</Button>
      </div>
    </div>
  )}
/>
```

## Props Reference

| Prop               | Type          | Default        | Description                                                                                                                     |
| ------------------ | ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `items`            | `TData[]`     | `[]`           | The array of data objects to display.                                                                                           |
| `columns`          | `ColumnDef[]` | `[]`           | Column definitions created via `createColumnHelper`.                                                                            |
| `isLoading`        | `boolean`     | `false`        | If `true`, replaces the body with a robust loading spinner.                                                                     |
| `allowsSortingFor` | `string[]`    | `[]`           | List of column IDs that should allow sorting when the header is clicked.                                                        |
| `topContent`       | `function`    | `undefined`    | Render prop for content above the table. Receives `{ table, searchField }`.                                                     |
| `bottomContent`    | `function`    | `undefined`    | Render prop for content below the table. Receives `{ table, rowPerPage, pagination }`. If omitted, default pagination is shown. |
| `emptyContent`     | `ReactNode`   | `Default UI`   | Component to display when `items` is empty or null.                                                                             |
| `ariaLabel`        | `string`      | `'Data Table'` | Accessibility label for the table.                                                                                              |

## Advanced: Server-Side Pagination

Currently, `TableWrapper` is optimized for **client-side** pagination and sorting (TanStack Table defaults).
If you need server-side pagination, you generally need to manage the `pagination` state in the parent component and pass sliced data to `items`. However, the current implementation of `TableWrapper` strongly couples the pagination state to the internal table instance.

_For standard usage with < 1000 rows, client-side pagination provided by this wrapper is sufficient and performant._
