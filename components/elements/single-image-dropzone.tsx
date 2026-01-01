'use client'

import { cn } from '@/utils/cn'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  FieldValues,
  useController,
  UseControllerProps,
  useForm,
} from 'react-hook-form'
import { LuImage, LuX } from 'react-icons/lu'
import { MAX_FILE_SIZE } from '@/library/config'

interface SingleImageDropzoneProps<T extends FieldValues> {
  controllerProps: UseControllerProps<T>
  className?: string
  label?: string
  isRequired?: boolean
}

export default function SingleImageDropzone<T extends FieldValues>({
  controllerProps,
  className,
  label,
  isRequired = false,
}: SingleImageDropzoneProps<T>) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const { control: defaultControl } = useForm()

  const defaultControllerProps: any = {
    name: controllerProps?.name || '__dummy__',
    control: defaultControl,
    defaultValue: controllerProps?.defaultValue || '',
  }

  const {
    field: controllerField,
    fieldState: controllerFieldState,
    formState: controllerFormState,
  } = useController(
    controllerProps?.control ? controllerProps : defaultControllerProps
  )

  useEffect(() => {
    const value = controllerField.value
    if (!value) {
      setFile(null)
      setPreview(null)
      return
    }

    if (value instanceof File) {
      setFile(value)
      const objectUrl = URL.createObjectURL(value)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else if (typeof value === 'string') {
      setPreview(value)
      setFile(null)
    }
  }, [controllerField.value])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0] // only one file allowed
      if (selectedFile) {
        // clear any previous local errors
        setLocalError(null)
        controllerField.onChange(selectedFile)
      }
    },
    [controllerField]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (fileRejections: any[]) => {
      // fileRejections contains reasons — commonly "file-too-large"
      if (fileRejections && fileRejections.length > 0) {
        const reason = fileRejections[0]?.errors?.[0]?.code
        if (reason === 'file-too-large') {
          setLocalError('File is too large. Maximum size is 5mb.')
        } else {
          setLocalError('Invalid file. Please provide an image file.')
        }
      }
    },
    accept: {
      'image/*': [],
    },
    multiple: false, // restrict to one file
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  })

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    // prevent the click from bubbling up to the dropzone root
    e.stopPropagation()
    e.preventDefault()

    // clear any local errors when removing
    setLocalError(null)

    controllerField.onChange(null)
  }

  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      {label && (
        <p className="text-sm text-primary flex">
          {label}
          {isRequired && <span className="text-danger">*</span>}
        </p>
      )}
      <div
        {...getRootProps()}
        className={cn(
          `border-2 border-dashed rounded-xl text-center cursor-pointer transition grid place-items-center w-full flex-grow group h-[250px]`,
          isDragActive
            ? 'border-primary bg-blue-50'
            : 'border-foreground-300 hover:border-primary',
          localError || controllerFieldState.error?.message
            ? 'border-danger'
            : ''
        )}
      >
        <input {...getInputProps()} className="hidden" />

        {!file ? (
          <div className="flex flex-col items-center">
            <LuImage
              size={80}
              strokeWidth={0.7}
              className={cn(
                'text-foreground-500 group-hover:text-primary',
                localError || controllerFieldState.error?.message
                  ? 'text-danger'
                  : ''
              )}
            />
            <p className="text-foreground-500 text-xs">
              Drag & drop an image here, or{' '}
              <span className="text-primary">browse</span>
              <br />
              Max file size of 5mb applies.
            </p>
          </div>
        ) : (
          <div className="relative inline-block max-h-full">
            <img
              src={preview || ''}
              alt="Preview"
              className="object-contain rounded-lg mx-auto"
              style={{
                maxWidth: '100%',
                maxHeight: '150px',
              }}
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
              <LuX />
            </button>
          </div>
        )}
      </div>
      {localError ? (
        <p className="pl-1 text-sm text-danger">{localError}</p>
      ) : controllerFieldState.error?.message ? (
        <p className="pl-1 text-sm text-danger">
          {controllerFieldState.error?.message}
        </p>
      ) : null}
    </div>
  )
}
