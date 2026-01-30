# DrawerWrapper Component

The `DrawerWrapper` acts as a slide-out panel, useful for complex forms, filter panels, or details views that require more screen real estate than a modal but shouldn't block the entire page context.

## Usage Example

```tsx
import { useState } from 'react'
import DrawerWrapper from '@/components/elements/drawer-wrapper'
import UserProfileForm from './UserProfileForm' // hypothetical form component

const EditProfileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Edit Profile</button>

      <DrawerWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Edit User Profile"
        placement="right"
        size="xl"
      >
        {/* Pass a close handler to your form if needed */}
        <UserProfileForm onClose={() => setIsOpen(false)} />
      </DrawerWrapper>
    </>
  )
}
```

## Props Reference

| Prop        | Type                                     | Default   | Description                                                |
| ----------- | ---------------------------------------- | --------- | ---------------------------------------------------------- |
| `isOpen`    | `boolean`                                | Required  | Controls visibility.                                       |
| `setIsOpen` | `(val: boolean) => void`                 | Required  | State setter to close the drawer.                          |
| `title`     | `ReactNode`                              | `null`    | Header title.                                              |
| `children`  | `ReactNode`                              | Required  | Drawer content.                                            |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Direction the drawer slides in from.                       |
| `size`      | `string`                                 | `'md'`    | Width of the drawer. options: `'xs'` to `'5xl'`, `'full'`. |
| `footer`    | `ReactNode`                              | `null`    | Optional footer content pinned to the bottom.              |

## Tips

- **Scroll Behavior**: The `DrawerBody` is automatically set to `overflow-auto`. You don't need to add scroll classes to your inner content usually.
- **Z-Index**: The wrapper handles z-index to ensure it sits above standard page content but below global overlays like toasts if configured correctly.
