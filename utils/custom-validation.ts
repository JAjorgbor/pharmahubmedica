import z, { ZodType } from 'zod'

const imageFileSchema = (message?: string, isRequired = true) =>
  isRequired
    ? required(
        z
          .instanceof(File)
          .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            'Max file size is 5MB',
          )
          .refine(
            (file) =>
              ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
                file.type,
              ),
            'Only .jpg, .jpeg, .png and .webp formats are supported',
          ),
        message || 'File is required',
      )
    : z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, 'Max file size is 5MB')
        .refine(
          (file) =>
            ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
              file.type,
            ),
          'Only .jpg, .jpeg, .png and .webp formats are supported',
        )
        .optional()

const required = <T extends ZodType>(schema: T, message?: string): T => {
  const errorMsg = message || 'This field is required'

  return schema
    .nullable()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === null) return false
        if (typeof val === 'string' && val.trim() === '') return false
        if (Array.isArray(val) && val.length === 0) return false
        return true
      },
      { message: errorMsg },
    ) as unknown as T
}

const email = required(z.email(), 'Invalid email address')

export default {
  imageFileSchema,
  required,
  email,
}
