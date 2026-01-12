# ModalWrapper Component

The `ModalWrapper` provides a standardized dialog interface across the application. It ensures consistent padding, backdrop styling, and header behavior (like titles and logos).

## Usage Example

```tsx
import { useState } from 'react'
import { Button } from '@heroui/react'
import ModalWrapper from '@/components/elements/modal-wrapper'

const DeleteConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    // perform delete logic
    setIsOpen(false)
  }

  return (
    <>
      <Button color="danger" onPress={() => setIsOpen(true)}>
        Delete Item
      </Button>

      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Confirm Deletion"
        size="md"
        isLock={true} // Shows lock icon instead of logo
        footer={
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Confirm Delete
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </div>
      </ModalWrapper>
    </>
  )
}
```

## Props Reference

| Prop              | Type                     | Default    | Description                                                                                          |
| ----------------- | ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| `isOpen`          | `boolean`                | Required   | Controls visibility.                                                                                 |
| `setIsOpen`       | `(val: boolean) => void` | Required   | State setter to close the modal.                                                                     |
| `title`           | `ReactNode`              | `null`     | Text or component for the header title.                                                              |
| `children`        | `ReactNode`              | Required   | The content body of the modal.                                                                       |
| `footer`          | `ReactNode`              | `null`     | The content for the footer area (usually buttons).                                                   |
| `size`            | `string`                 | `'md'`     | Size of modal: `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'full'`. |
| `isLock`          | `boolean`                | `false`    | If true, displays a Lock icon in the header (useful for security modals).                            |
| `hideLogo`        | `boolean`                | `false`    | If true, removes the default logo/icon from the header.                                              |
| `hideCloseButton` | `boolean`                | `false`    | Hides the 'X' button in the top right.                                                               |
| `placement`       | `string`                 | `'center'` | Position: `'top'`, `'bottom'`, `'center'`, etc.                                                      |
