# SingleImageDropzone Component

A streamlined drag-and-drop component for uploading single image files. It handles file selection, validation, and preview rendering, integrating directly with `react-hook-form`.

## Features

- **Validation**: Rejects files > 5MB.
- **Preview**: Shows the selected image immediately.
- **Reset**: Allows the user to remove the selected image.
- **Validation Message**: Shows error text if the file is invalid or if the form validation fails.

## Usage Example

```tsx
import { useForm } from 'react-hook-form'
import SingleImageDropzone from '@/components/elements/single-image-dropzone'

const UploadAvatarForm = () => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => {
    // data.avatar will be a File object
    const formData = new FormData()
    formData.append('file', data.avatar)
    // send formData to API...
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SingleImageDropzone
        label="Profile Avatar"
        isRequired
        controllerProps={{
          control,
          name: 'avatar',
          rules: { required: 'Please upload an image' },
        }}
      />

      <button type="submit" className="mt-4 bg-primary text-white p-2 rounded">
        Upload
      </button>
    </form>
  )
}
```

## Props Reference

| Prop              | Type                 | Default     | Description                                                                                  |
| ----------------- | -------------------- | ----------- | -------------------------------------------------------------------------------------------- |
| `controllerProps` | `UseControllerProps` | Required    | Connection to `react-hook-form`. The `name` provided here will be the key in your form data. |
| `label`           | `string`             | `undefined` | Label text displayed above the drop zone.                                                    |
| `isRequired`      | `boolean`            | `false`     | Shows a red asterisk if true.                                                                |
| `className`       | `string`             | `''`        | Custom styling for the outer container.                                                      |

## Handling the File

The component returns a standard JavaScript `File` object to the form state.

- **To reset**: The user can click the "X" button on the preview.
- **To preview**: The component handles preview generation internally using `URL.createObjectURL`. You don't need to manage preview state manually in the parent.
