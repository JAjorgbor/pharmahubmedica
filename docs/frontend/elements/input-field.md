# InputField Component

The `InputField` component is the core form element wrapper for the PharmaHub Medica application. It standardizes the look and feel of form inputs while seamlessly integrating with `react-hook-form` for state management and validation. It leverages `@heroui/react` components under the hood.

## Key Features

- **Integrated Validation**: Displays error messages automatically from `react-hook-form` errors.
- **Unified Styling**: Consistent border, radius, and color schemes.
- **Type Flexibility**: Supports standard HTML inputs plus complex types like `select`, `autocomplete`, and formatted `amount`.
- **Accessibility**: Handles labels, aria-labels, and focus states.

## Basic Usage

The `InputField` **must** be used within a component that is wrapped in or uses `useForm` from `react-hook-form`.

```tsx
import { useForm } from 'react-hook-form'
import InputField from '@/components/elements/input-field'

const MyForm = () => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        name="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        controllerProps={{
          control,
          name: 'email',
          rules: { required: 'Email is required' },
        }}
        isRequired
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Detailed Examples by Type

### 1. Text & TextArea

Simple string inputs. `textarea` auto-expands or has fixed rows.

```tsx
// Standard Text
<InputField
  type="text"
  label="Full Name"
  placeholder="John Doe"
  controllerProps={{ control, name: "fullName" }}
/>

// Text Area with Custom Rows
<InputField
  type="textarea"
  label="Bio"
  placeholder="Tell us about yourself..."
  rows={4}
  controllerProps={{ control, name: "bio" }}
/>
```

### 2. Number & Amount

- **number**: Standard HTML number input.
- **amount**: A specialized input that formats the value as currency (NGN) for display but saves the raw number to the form state.

```tsx
// Numeric Input
<InputField
  type="number"
  label="Quantity"
  min={1}
  controllerProps={{ control, name: "quantity" }}
/>

// Currency/Amount Input (Auto-formats to ₦1,000)
<InputField
  type="amount"
  label="Price"
  placeholder="0.00"
  controllerProps={{ control, name: "price" }}
/>
```

### 3. Select (Dropdown)

Uses HeroUI `Select`. **Requires** the `options` prop.

```tsx
const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Guest', value: 'guest' },
]

;<InputField
  type="select"
  label="User Role"
  options={roleOptions}
  controllerProps={{ control, name: 'role' }}
  placeholder="Select a role"
/>
```

### 4. Autocomplete (Searchable Dropdown)

Useful for long lists. Users can type to filter options.

```tsx
<InputField
  type="autocomplete"
  label="Country"
  options={countryList} // [{ label: 'Nigeria', value: 'NG' }, ...]
  controllerProps={{ control, name: 'country' }}
  placeholder="Search for a country"
/>
```

### 5. Password

Includes a built-in eye icon to toggle visibility.

```tsx
<InputField
  type="password"
  label="Password"
  controllerProps={{ control, name: 'password' }}
/>
```

### 6. Date Picker

Renders a date input.

```tsx
<InputField
  type="date"
  label="Date of Birth"
  controllerProps={{ control, name: 'dob' }}
/>
```

### 7. Phone Number

Formats input as a Nigerian phone number using `libphonenumber-js`.

```tsx
<InputField
  type="phoneNumber"
  label="Phone Number"
  controllerProps={{ control, name: 'phone' }}
/>
```

### 8. Toggle & Checkbox

```tsx
// Switch / Toggle
<InputField
  type="switch"
  label="Enable Notifications"
  controllerProps={{ control, name: "notifications" }}
/>

// Checkbox
<InputField
  type="checkbox"
  label="I agree to terms"
  controllerProps={{ control, name: "terms" }}
/>
```

### 9. OTP / PassCode

Renders a segmented input for One-Time Passwords.

```tsx
<InputField
  type="passCode"
  label="Enter OTP"
  codeLength={6}
  controllerProps={{ control, name: 'otp' }}
/>
```

## Props Reference

| Prop              | Type                 | Default      | Description                                                                                                                  |
| ----------------- | -------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `type`            | `string`             | `'text'`     | The type of input to render. (text, password, email, number, select, etc.)                                                   |
| `controllerProps` | `UseControllerProps` | Required     | Object containing `control`, `name`, `rules`, and `defaultValue`. This connects the input to the form.                       |
| `label`           | `ReactNode`          | `null`       | The text label displayed above or beside the input.                                                                          |
| `placeholder`     | `string`             | `null`       | Placeholder text inside the input.                                                                                           |
| `options`         | `Array`              | `[]`         | **Required for `select` and `autocomplete`**. Array of `{ label, value }` objects.                                           |
| `disabled`        | `boolean`            | `false`      | Disables interaction with the input.                                                                                         |
| `isRequired`      | `boolean`            | `false`      | Adds a red asterisk (\*) to the label. Does not enforce validation logic itself (use `rules` in `controllerProps` for that). |
| `startContent`    | `ReactNode`          | `null`       | Icon or element to display at the _start_ of the input box.                                                                  |
| `endContent`      | `ReactNode`          | `null`       | Icon or element to display at the _end_ of the input box.                                                                    |
| `rows`            | `number`             | `6`          | Number of rows for `textarea` type.                                                                                          |
| `min` / `max`     | `number`             | `null`       | Minimum and maximum values for `number` type.                                                                                |
| `codeLength`      | `number`             | `6`          | Number of segments for `passCode` type.                                                                                      |
| `variant`         | `string`             | `'bordered'` | Visual style of the input (`bordered`, `flat`, `faded`, `underlined`).                                                       |
| `className`       | `string`             | `''`         | Custom CSS classes for the outer wrapper.                                                                                    |
| `classNames`      | `object`             | `{}`         | Custom CSS classes for inner elements: `{ label, input, base }`.                                                             |

## Common Gotchas

1.  **Missing `options`**: If you use `type="select"` or `type="autocomplete"`, you **must** provide the `options` array. If not, the dropdown will be empty.
2.  **Validation Rules**: Passing `isRequired={true}` only adds the visual asterisk. To actually prevent submission, you must pass `rules: { required: "Message" }` inside `controllerProps`.
3.  **Default Values**: It is best practice to set `defaultValues` in the `useForm` hook rather than on the `InputField` directly, though `controllerProps.defaultValue` is supported.
