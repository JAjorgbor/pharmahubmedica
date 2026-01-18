'use client'
import parsePhoneNumberFromString from 'libphonenumber-js'

import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Divider,
  Input,
  InputOtp,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@heroui/react'
import { ComponentProps, ReactNode, useEffect, useState } from 'react'
import {
  FieldValues,
  useController,
  UseControllerProps,
  useForm,
} from 'react-hook-form'
import { LuSearch } from 'react-icons/lu'
import { HiCheck, HiX } from 'react-icons/hi'
import { PiEye, PiEyeSlash } from 'react-icons/pi'
import 'react-phone-input-2/lib/style.css'

import { cn } from '@/utils/cn'
import { currencyFormatter } from '@/utils/currency-formatter'

// const westAfrica = [
//   'BJ',
//   'BF',
//   'CV',
//   'CI',
//   'GM',
//   'GH',
//   'GN',
//   'GW',
//   'LR',
//   'ML',
//   'MR',
//   'NE',
//   'NG',
//   'SN',
//   'SL',
//   'TG',
// ]

interface InputFieldPropsBase<T extends FieldValues> {
  type:
    | 'text'
    | 'email'
    | 'textarea'
    | 'select'
    | 'autocomplete'
    | 'password'
    | 'checkbox'
    | 'switch'
    | 'date'
    | 'radio'
    | 'file'
    | 'number'
    | 'phoneNumber'
    | 'passCode'
    | 'amount'
    | 'image'
    | 'search'
    | 'postal-code'
  variant?: ComponentProps<typeof Input>['variant']
  startContentPlacement?: 'inside' | 'outside'
  radius?: ComponentProps<typeof Input>['radius']
  color?: ComponentProps<typeof Input>['color']
  startContent?: ReactNode
  size?: 'sm' | 'md'
  endContent?: ReactNode
  label?: string | ReactNode
  value?: string | number | boolean
  disabled?: boolean
  defaultValue?: string | number
  maxLength?: number
  switchSize?: 'sm' | 'md'
  showSwitchIcon?: boolean
  codeLength?: number
  rows?: number
  allowShowPassword?: boolean
  onChange?: (arg0: any) => void
  defaultChecked?: boolean
  name?: string
  options?: {
    value: string | number | null
    label: ReactNode
    className?: string
    endContent?: ReactNode
    disabled?: boolean
  }[]
  autoComplete?: string
  placeholder?: string
  errorMessage?: any
  isName?: boolean
  isUsername?: boolean
  className?: string
  classNames?: {
    label?: string
    input?: string
    base?: string
  }
  noWhiteSpace?: boolean
  prefixFieldLabel?: ReactNode
  min?: number
  max?: number
  isRequired?: boolean
  renderLabelRight?: boolean
  renderLabelLeft?: boolean
  controllerProps: UseControllerProps<T>
}

type InputFieldTypesThatRequireOnChange =
  | 'autocomplete'
  | 'select'
  | 'checkbox'
  | 'passCode'
  | 'amount'

type InputFieldProps<T extends FieldValues> =
  | (InputFieldPropsBase<T> & {
      type: Exclude<
        InputFieldPropsBase<T>['type'],
        InputFieldTypesThatRequireOnChange
      >
      // register: any
    })
  | (InputFieldPropsBase<T> & {
      type: InputFieldTypesThatRequireOnChange
      // register?: never // `register` is not allowed for these types
    })

const InputField = <T extends FieldValues>({
  type,
  label,
  value,
  rows = 6,
  maxLength,
  codeLength = 6,
  disabled = false,
  defaultChecked = false,
  placeholder,
  defaultValue,
  variant = 'bordered',
  radius = 'md',
  color = 'primary',
  startContentPlacement = 'inside',
  onChange = () => null,
  switchSize = 'sm',
  showSwitchIcon = true,
  noWhiteSpace = false,
  renderLabelRight = false,
  renderLabelLeft = false,
  min = 0,
  max,
  size = 'md',
  startContent = null,
  endContent = null,
  className = '',
  allowShowPassword = true,
  classNames = { label: '', input: '', base: '' },
  isName = false,
  isUsername = false,
  isRequired = false,
  errorMessage = '',
  options,
  controllerProps,
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)
  const [selectFieldValue, setSelectFieldValue] = useState<any>([''])
  const [amountValue, setAmountValue] = useState(value || '')
  const [disabledKeys, setDisabledKeys] = useState<string[]>()
  const [formattedPhonenumber, setFormattedPhonenumber] = useState('')

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
    controllerProps?.control ? controllerProps : defaultControllerProps,
  )

  function parseCurrency(value) {
    if (typeof value !== 'string') return value
    return Number(value.replace(/[^0-9.-]+/g, ''))
  }
  const formatToCurrency = (value: string) => {
    // Remove non-numeric characters except decimal
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value))
  }

  useEffect(() => {
    if (type === 'amount') {
      const rawValue = parseCurrency(controllerField.value)
      const formatted = formatToCurrency(rawValue)
      setAmountValue(formatted)
    }
  }, [controllerField.value, type])

  useEffect(() => {
    if (type === 'phoneNumber') {
      const formatted = parsePhoneNumberFromString(
        controllerField.value || '',
        'NG',
      )
      const rawValue = formatted?.formatNational()
      setFormattedPhonenumber(rawValue)
    }
  }, [controllerField.value, type])

  useEffect(() => {
    const value = controllerField?.value
    const defaultValue =
      controllerFormState?.defaultValues?.[controllerProps?.name as string]
    if (defaultValue) {
      setSelectFieldValue(new Set([defaultValue]))
    }
    if (value) {
      setSelectFieldValue(new Set([value]))
    }
  }, [
    controllerProps?.name,
    controllerFormState?.defaultValues,
    controllerField?.value,
  ])

  const baseClass = cn(className, classNames.input)

  useEffect(() => {
    if (options) {
      const array = options?.filter((each: any) => each.disabled)
      const keys = array.map((each: any) => String(each.value))
      return setDisabledKeys(keys)
    }
    return setDisabledKeys([''])
  }, [options])

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            classNames={{ inputWrapper: `${baseClass} ` }}
            isInvalid={!!controllerFieldState.error?.message}
            radius={radius}
            variant={variant}
            color={color}
            disabled={disabled}
            isDisabled={disabled}
            type="text"
            ref={controllerField.ref}
            value={controllerField.value}
            startContent={startContent}
            defaultValue={
              controllerFormState?.defaultValues?.[
                controllerProps?.name as string
              ]
            }
            onValueChange={(value) => {
              if (isName) {
                value = value.charAt(0).toUpperCase() + value.slice(1)
                value = value.replace(/\s+/, '')
              }
              if (isUsername) {
                value = value.toLowerCase()
                value = value.replace(/\s+/, '')
              }
              if (noWhiteSpace) {
                value = value.replace(/\s/g, '')
              }
              controllerField.onChange(value)
              if (onChange) onChange(value)
            }}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        )
      case 'date':
        return (
          <Input
            classNames={{ inputWrapper: `${baseClass} ` }}
            radius={radius}
            variant={variant}
            color={color}
            disabled={disabled}
            isDisabled={disabled}
            type="date"
            startContent={startContent}
            isInvalid={!!controllerFieldState.error?.message}
            className={`${baseClass} `}
            ref={controllerField.ref}
            value={controllerField.value}
            defaultValue={
              controllerFormState?.defaultValues?.[
                controllerProps?.name as string
              ]
            }
            onValueChange={(value) => {
              controllerField.onChange(value)
              if (onChange) onChange(value)
            }}
          />
        )
      case 'search':
        return (
          <div className="flex items-center gap-2 w-full">
            <Input
              classNames={{ inputWrapper: `${baseClass} ` }}
              radius={radius}
              variant={variant}
              color={color}
              isDisabled={disabled}
              type="text"
              startContent={startContent}
              className={`${baseClass}`}
              placeholder={placeholder}
              isInvalid={!!controllerFieldState.error?.message}
              ref={controllerField.ref}
              value={controllerField.value}
              defaultValue={
                controllerFormState?.defaultValues?.[
                  controllerProps?.name as string
                ]
              }
              onValueChange={(value) => {
                controllerField.onChange(value)
                if (onChange) onChange(value)
              }}
              disabled={disabled}
            />
            <button
              type="button"
              className="p-2 rounded-md bg-blue-100 hover:bg-blue-200 text-primary"
            >
              <LuSearch size={18} />
            </button>
          </div>
        )
      case 'email':
        return (
          <Input
            classNames={{ inputWrapper: `${baseClass} ` }}
            radius={radius}
            variant={variant}
            color={color}
            isDisabled={disabled}
            type="email"
            startContent={startContent}
            className={`${baseClass} `}
            maxLength={maxLength}
            isInvalid={!!controllerFieldState.error?.message}
            ref={controllerField.ref}
            value={controllerField.value}
            defaultValue={
              controllerFormState?.defaultValues?.[
                controllerProps?.name as string
              ]
            }
            onValueChange={(value) => {
              value = value.toLowerCase().replace(/\s/g, '')
              controllerField.onChange(value)
              if (onChange) onChange(value)
            }}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault()
              }
            }}
            placeholder={placeholder}
          />
        )
      case 'textarea':
        return (
          <Textarea
            classNames={{ inputWrapper: `${baseClass} ` }}
            className={`${baseClass} `}
            variant={variant}
            color={color}
            isDisabled={disabled}
            radius={radius}
            minRows={rows}
            startContent={startContent}
            maxLength={maxLength}
            isInvalid={!!controllerFieldState.error?.message}
            ref={controllerField.ref}
            value={controllerField.value}
            defaultValue={
              controllerFormState?.defaultValues?.[
                controllerProps?.name as string
              ]
            }
            onValueChange={(value) => {
              controllerField.onChange(value)
              if (onChange) onChange(value)
            }}
            placeholder={placeholder}
          />
        )
      case 'passCode':
        return (
          <InputOtp
            radius={radius}
            variant={variant}
            color={color}
            isDisabled={disabled}
            size="lg"
            ref={controllerField.ref}
            value={controllerField.value}
            isInvalid={!!controllerFieldState.error?.message}
            classNames={{ segment: 'size-[60px]' }}
            defaultValue={
              controllerFormState?.defaultValues?.[
                controllerProps?.name as string
              ]
            }
            onValueChange={(value) => {
              controllerField.onChange(value)
              if (onChange) onChange(value)
            }}
            length={codeLength}
          />
        )
      case 'password':
        return (
          <Input
            classNames={{ inputWrapper: `${baseClass} ` }}
            radius={radius}
            variant={variant}
            color={color}
            isDisabled={disabled}
            disabled={disabled}
            startContent={startContent}
            type={showPassword ? 'text' : 'password'}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault()
              }
            }}
            endContent={
              allowShowPassword && (
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <PiEyeSlash size={20} />
                  ) : (
                    <PiEye size={20} />
                  )}
                </button>
              )
            }
            className={`${baseClass} `}
            isInvalid={!!controllerFieldState.error?.message}
            value={controllerField?.value}
            onValueChange={(value) => {
              controllerField.onChange(value)
              if (onChange) onChange(value)
            }}
            placeholder={placeholder || '●●●●●●'}
          />
        )
      case 'select':
        return (
          <Select
            aria-label={(label as string) || 'select field'}
            disabledKeys={disabledKeys}
            variant={variant}
            color={color}
            isDisabled={disabled}
            startContent={startContent}
            listboxProps={{ color: color, variant: 'flat' }}
            isInvalid={!!controllerFieldState.error?.message}
            endContent={<>{endContent}</>}
            classNames={{
              trigger: `${baseClass} relative shadow-none p-1`,
              value: '!text-nevada ',
              selectorIcon: 'transform top-1/2 -translate-y-1/2',
              listboxWrapper:
                'scrollbar-default scrollbar-thin !scrollbar-thumb-rounded-full !scrollbar-track-rounded-full scrollbar-thumb-gray-400  overflow-y-auto',
              popoverContent: 'min-w-max',
            }}
            selectedKeys={selectFieldValue}
            defaultSelectedKeys={defaultValue ? [defaultValue] : ['']}
            onSelectionChange={(value: any) => {
              controllerField.onChange(value)
              const array = Array.from(value)
              if (onChange) onChange(array[0])
              setSelectFieldValue(value)
              controllerField.onChange(array[0])
            }}
            disabled={disabled}
          >
            {placeholder &&
              ((<SelectItem key={''}>{placeholder}</SelectItem>) as any)}
            {(options as any)?.map((option: any) => (
              <SelectItem
                key={option?.value}
                classNames={{ title: option?.className || '' }}
                endContent={option?.endContent}
              >
                {option?.label}
              </SelectItem>
            ))}
          </Select>
        )
      case 'autocomplete':
        return (
          <Autocomplete
            aria-label={(label as string) || 'select  field'}
            placeholder={placeholder as string}
            variant={variant}
            color={color}
            isDisabled={disabled}
            listboxProps={{ color: 'primary', variant: 'flat' }}
            startContent={startContent}
            isInvalid={!!controllerFieldState.error?.message}
            selectedKey={controllerField?.value || (value as string)}
            onSelectionChange={(value: any) => {
              controllerField.onChange(value)
              if (onChange) onChange(value)
            }}
            size={size}
            inputProps={{
              classNames: {
                inputWrapper: `${baseClass} relative shadow-none p-1`,
                input: '!text-nevada outline-none',
              },
            }}
            classNames={{
              selectorButton: '!text-nevada',
              listboxWrapper:
                'scrollbar-default scrollbar-thin scrollbar-thumb-gray-400  overflow-y-auto',
              popoverContent: 'min-w-max',
            }}
            disabled={disabled}
            endContent={endContent}
          >
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            {options?.map((option) => (
              <AutocompleteItem
                key={option?.value}
                textValue={option?.label as string}
                classNames={{
                  wrapper: 'group',
                }}
              >
                <>{option?.label}</>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )
      case 'checkbox':
        return (
          <Checkbox
            defaultSelected={defaultChecked}
            className="p-0 ml-0"
            disabled={disabled}
            isInvalid={!!controllerFieldState.error?.message}
            color="primary"
            isDisabled={disabled}
            size="sm"
            radius={'none'}
            isSelected={!!controllerField.value}
            onValueChange={(value) => {
              onChange?.(value)
              controllerField.onChange(value)
            }}
            classNames={{
              icon: 'text-white',
            }}
          />
        )
      case 'switch':
        return (
          <Switch
            startContent={
              showSwitchIcon &&
              ((
                <HiCheck color="white" size={switchSize == 'sm' ? 10 : 12} />
              ) as any)
            }
            endContent={
              showSwitchIcon &&
              ((<HiX size={switchSize == 'sm' ? 10 : 12} />) as any)
            }
            size={switchSize}
            color="primary"
            isDisabled={disabled}
            defaultSelected={defaultChecked}
            className="p-0"
            classNames={{
              wrapper: `${
                switchSize == 'sm' ? 'w-9 h-[1.2rem]' : ''
              }  m-0 px-0`,
              thumb: `${
                switchSize == 'sm'
                  ? 'group-data-[selected=true]:ms-[1.1rem] !size-[1.1rem]'
                  : 'group-data-[selected=true]:ms-[1.3rem] !size-[1.65rem]'
              } `,
            }}
            isSelected={!!controllerField.value}
            onValueChange={controllerField.onChange}
          />
        )
      case 'radio':
        return (
          <input
            disabled={disabled}
            type="radio"
            name="inventory"
            id="out-stock"
            className="w-4 h-4 accent-black"
            defaultChecked={defaultChecked}
            value={controllerField.value}
            onChange={controllerField.onChange}
          />
        )
      case 'number':
        return (
          <Input
            classNames={{ inputWrapper: `${baseClass} ` }}
            radius={radius}
            variant={variant}
            color={color}
            disabled={disabled}
            isDisabled={disabled}
            type="number"
            step="any"
            startContent={startContent}
            min={min}
            max={max}
            className={`${baseClass}`}
            value={controllerField.value}
            defaultValue={
              controllerFormState?.defaultValues?.[
                controllerProps?.name as string
              ]
            }
            onValueChange={(value) => {
              const newValue = value
              const parsedValue = parseFloat(newValue)
              if (!isNaN(parsedValue)) {
                if (controllerField.onChange) {
                  controllerField.onChange(parsedValue)
                  if (onChange) onChange(parsedValue)
                }
              } else {
                if (controllerField.onChange) {
                  controllerField.onChange(value)
                  if (onChange) onChange(value)
                }
              }
            }}
            placeholder={placeholder}
          />
        )
      case 'phoneNumber':
        return (
          <>
            <Input
              type="tel"
              placeholder={placeholder}
              maxLength={14} // matches (xxx) xxx-xxxx
              classNames={{ inputWrapper: `${baseClass} ` }}
              radius={radius}
              variant={variant}
              disabled={disabled}
              isDisabled={disabled}
              color={color}
              startContent={startContent}
              // value={controllerField.value}
              value={formattedPhonenumber}
              onValueChange={(value) => {
                const newValue = value
                const parsedValue = parseFloat(newValue)

                // strip everything except digits and +
                const cleaned = newValue.replace(/[^\d+]/g, '')

                // Try parsing
                const formatted = parsePhoneNumberFromString(cleaned, 'NG')
                console.log(cleaned)
                if (formatted) {
                  if (controllerField.onChange) {
                    console.log('parsed', formatted.formatNational())
                    controllerField.onChange(cleaned)
                    setFormattedPhonenumber(formatted.formatNational())

                    if (onChange) onChange(cleaned)
                  }
                } else {
                  setFormattedPhonenumber(cleaned)
                }
              }}
            />
          </>
        )
      case 'amount':
        return (
          <Input
            classNames={{ inputWrapper: `${baseClass} ` }}
            radius={radius}
            variant={variant}
            isInvalid={!!controllerFieldState.error?.message}
            color={color}
            disabled={disabled}
            isDisabled={disabled}
            type="tel"
            min={min}
            className={`${baseClass}`}
            placeholder={placeholder || currencyFormatter(0)}
            value={amountValue as string}
            onValueChange={(value) => {
              const rawValue = parseCurrency(value)
              const formatted = formatToCurrency(rawValue)
              setAmountValue(formatted)
              // Notify parent component with the numeric value

              controllerField.onChange(rawValue)
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`space-y-1  ${className} `}>
      <label
        className={cn(
          'relative text-sm font-medium text-nevada font-oxygen',
          type === 'radio' ||
            type === 'checkbox' ||
            type === 'switch' ||
            renderLabelRight ||
            renderLabelLeft
            ? 'flex items-center gap-1 space-y-0'
            : 'space-y-1',
          classNames.base,
          disabled && 'cursor-not-allowed',
        )}
      >
        {type == 'radio' ||
        type == 'checkbox' ||
        type == 'switch' ||
        renderLabelRight
          ? label && (
              <p className={cn(`order-2`, classNames.label)}>
                {label} {isRequired && <span className="text-red-700">*</span>}
              </p>
            )
          : renderLabelLeft
            ? label && (
                <p
                  className={cn(
                    `order-1 text-primary-600 font-light`,
                    classNames.label,
                  )}
                >
                  {label}{' '}
                  {isRequired && <span className="text-red-700">*</span>}
                </p>
              )
            : label && (
                <p>
                  <span
                    className={cn(
                      `text-primary-600 font-light`,
                      classNames.label,
                    )}
                  >
                    {label}
                  </span>
                  {isRequired && <span className="text-red-700">*</span>}
                </p>
              )}
        <div className={`relative ${type !== 'passCode' ? 'flex' : ''}`}>
          {startContent && startContentPlacement == 'outside' && (
            <div className="bg-white grid place-items-center px-2.5 text-nevada">
              {startContent}
            </div>
          )}
          {renderInput()}
          {endContent && type != 'password' && (
            <div className="absolute right-0 flex gap-2 h-full items-center">
              <Divider className="h-4" orientation="vertical" />
              {endContent}
            </div>
          )}
        </div>
      </label>
      {controllerFieldState.error?.message || errorMessage ? (
        <p className="pl-1 text-sm text-danger">
          {controllerFieldState.error?.message || errorMessage}
        </p>
      ) : null}
    </div>
  )
}

export default InputField
