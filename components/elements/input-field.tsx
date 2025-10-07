'use client'
import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  InputOtp,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@heroui/react'
import { ComponentProps, ReactNode, useEffect, useMemo, useState } from 'react'
import {
  FieldValues,
  useController,
  UseControllerProps,
  useForm,
} from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'
import { HiCheck, HiX } from 'react-icons/hi'
import { PiCaretDown, PiEye, PiEyeSlash } from 'react-icons/pi'
import PhoneNumberInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Flag from 'react-world-flags'
import { cn } from '@/utils/cn'

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
const countries = getCountries()
  // .filter((each) => westAfrica.includes(each))
  .map((countryCode) => ({
    code: String(countryCode).toLowerCase(),
    dialCode: `+${getCountryCallingCode(countryCode)}`,
    name: new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode),
  }))

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
  color = 'secondary',
  onChange = () => null,
  switchSize = 'sm',
  showSwitchIcon = true,
  noWhiteSpace = false,
  renderLabelRight = false,
  renderLabelLeft = false,
  min = 1,
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
  const [phoneCountrySearchValue, setPhoneCountrySearchValue] = useState('')

  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((each) => each.code == 'ng')
  )

  const filteredCountries = useMemo(
    () =>
      countries.filter((country) =>
        country?.name
          ?.toLowerCase()
          .includes(phoneCountrySearchValue.toLowerCase())
      ),
    [phoneCountrySearchValue]
  )
  const countryDropdownItems = useMemo(
    () =>
      filteredCountries.map((country) => (
        <DropdownItem
          key={country.code}
          startContent={
            <Flag className="size-4" code={country.code.toUpperCase()} />
          }
          className="capitalize"
        >
          {country.name}{' '}
          <span className="text-foreground-500">{country.dialCode}</span>
        </DropdownItem>
      )),
    [filteredCountries]
  )

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

  const formatToCurrency = (value: string) => {
    // Remove non-numeric characters except decimal
    const numericValue = value.replace(/[^\d.]/g, '')

    // Format the number as currency
    const parts = numericValue.split('.')

    // Format integer part with commas
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    // Join with the decimal part if it exists
    return parts.length > 1
      ? `${integerPart}.${parts[1].slice(0, 2)}`
      : `${integerPart}`
  }

  useEffect(() => {
    if (type == 'amount') {
      const rawValue = value || 0
      const formattedValue = formatToCurrency(String(rawValue))
      setAmountValue(formattedValue)
      // Notify parent component with the numeric value
    }
  }, [value, type])

  useEffect(() => {
    const value = controllerField?.value
    const defaultValue =
      controllerFormState?.defaultValues?.[controllerProps?.name as string]
    if (defaultValue || value)
      setSelectFieldValue(new Set([defaultValue || value]))
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
            type="text"
            ref={controllerField.ref}
            value={controllerField.value}
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
            type="date"
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
              type="search"
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
              <FiSearch size={18} />
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
            type="email"
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
            radius={radius}
            minRows={rows}
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
            disabled={disabled}
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
            listboxProps={{ color: 'secondary', variant: 'flat' }}
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
              if (onChange) onChange(value)
              setSelectFieldValue(value)
              const array = Array.from(value)
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
            listboxProps={{ color: 'secondary', variant: 'flat' }}
            defaultSelectedKey={defaultValue}
            isInvalid={!!controllerFieldState.error?.message}
            selectedKey={value as string}
            onSelectionChange={(value: any) => {
              onChange(value)
            }}
            size={size}
            inputProps={{
              classNames: {
                inputWrapper: `${baseClass} relative shadow-none rounded-r-lg p-1`,
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
            color="secondary"
            size="sm"
            radius={'none'}
            isSelected={!!controllerField.value}
            onValueChange={controllerField.onChange}
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
            color="secondary"
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
            isDisabled={disabled}
            isSelected={Boolean(value)}
            onValueChange={onChange}
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
            type="number"
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

                  if (controllerField.onChange) controllerField.onChange(value)
                  if (onChange) onChange(value)
                }
              }
            }}
            placeholder={placeholder}
          />
        )
      case 'phoneNumber':
        return (
          <div className="relative w-full">
            <PhoneNumberInput
              disabled={disabled}
              country={selectedCountry?.code as string}
              containerClass="!my-0"
              disableDropdown
              buttonClass="!bg-white !border-none !border-none !rounded-l-lg !m-[1px] !hidden"
              regions={['america', 'europe', 'asia', 'oceania', 'africa']}
              enableSearch={true}
              disableSearchIcon={true}
              inputProps={{
                className: `relative w-full outline-none inline-flex tap-highlight-transparent flex-row items-center shadow-xs px-3 gap-3 border-medium border-default-200 hover:border-default-400 h-10 min-h-10 rounded-medium !duration-150 focus:border-secondary transition-colors motion-reduce:transition-none is-filled ${baseClass} pl-11`,
                name: controllerProps?.name,
              }}
              countryCodeEditable={false}
              onChange={(
                phoneValue: string
                // countryData: any,
                // event: React.ChangeEvent<HTMLInputElement>,
              ) => {
                const normalizedValue = phoneValue.startsWith('+')
                  ? phoneValue
                  : `+${phoneValue}`
                onChange(normalizedValue)
                if (controllerField.onChange) {
                  controllerField.onChange(normalizedValue)
                }
              }}
              value={controllerField.value}
              placeholder={placeholder}
            />
            <div className="absolute top-0 left-0 h-full  rounded-l-lg w-10 py-1.5">
              <Dropdown>
                <DropdownTrigger>
                  <button
                    type="button"
                    className="w-full h-full flex items-center justify-center gap-1 px-1  border-r"
                  >
                    <Flag
                      className="size-4"
                      code={selectedCountry?.code.toUpperCase()}
                      fallback={
                        <span>{selectedCountry?.code.toUpperCase()}</span>
                      }
                    />
                    <PiCaretDown size={15} />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Countries"
                  className="max-h-56 overflow-y-auto"
                  selectedKeys={new Set([String(selectedCountry?.code)])}
                  onAction={(key) => {
                    const country = countries.find(
                      (country) => country.code === key
                    )
                    setSelectedCountry(country!)
                  }}
                  topContent={
                    <input
                      type="search"
                      placeholder="Search country..."
                      className="p-1 border  rounded-lg !border-gray-300 ring-0 w-full"
                      value={phoneCountrySearchValue}
                      onChange={(e) =>
                        setPhoneCountrySearchValue(e.target.value)
                      }
                    />
                  }
                >
                  {countryDropdownItems as any}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
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
            type="tel"
            min={min}
            className={`${baseClass}`}
            placeholder={placeholder}
            value={amountValue as string}
            onValueChange={(value) => {
              const rawValue = value
              // Notify parent component with the numeric value
              const numericValue =
                parseFloat(rawValue.replace(/[^\d.]/g, '')) || 0
              controllerField.onChange(numericValue)
            }}
          />
        )
      // case 'image':
      //   return (
      //     <div className=''>
      //       <Input
      //radius = 'sm'
      //variant = { variant }
      //         disabled={disabled}
      //         type='file'
      //         accept='.jpg, .jpeg, .png'
      //         className={`hidden`}
      //         {...register}
      //         onChange={(e) => {
      //           onChange(e)
      //           register.onChange(e)
      //         }}
      //       />
      //     </div>
      //   )
      // case 'file':
      //   return (
      //     <>
      //       <Input
      //radius = 'sm'
      //variant = { variant }
      //         disabled={disabled}
      //         type='file'
      //         accept='.jpg, .jpeg, .png'
      //         className={`hidden`}
      //         onValueChange={(e) => {
      //           onChange(e)
      //            controllerField.onChange(e)
      //           setFileName(e.target.files?.[0]?.name || 'No File Chosen')
      //         }}
      //       />
      //       <div
      //         tabIndex={-1}
      //         aria-label='input file'
      //         className={`${baseClass} flex w-full gap-4`}
      //       >
      //         <span className='border-r pr-3'>
      //           <FiFile size={18} />
      //         </span>
      //         <span className='flex-grow'>{fileName}</span>
      //       </div>
      //     </>
      //   )
      // case 'postal-code':
      //   return (
      //     <Input
      // radius = 'sm'
      // variant = { variant }
      //       disabled={disabled}
      //       type='text'
      //       className={`text-gray-700 p-2 w-full rounded-sm border border-gray-300 ${
      //         !!errorMessage ? 'border-red-400' : 'focus:border-green-500'
      //       }`}
      //       {...register}
      //       value={register?.value}
      //       defaultValue={defaultregister?.defaultValue}
      //       maxLength={10}
      //       onChange={(e) => {
      //         const newValue = e.target.value.replace(/\D/g, '')
      //         register?.onChange({
      //           target: {
      //             value: newValue,
      //           },
      //         })
      //         if (onChange) onChange(newValue)
      //       }}
      //       placeholder={placeholder}
      //       autoComplete={autoComplete}
      //     />
      //   )
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
          disabled && 'cursor-not-allowed'
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
                  classNames.label
                )}
              >
                {label} {isRequired && <span className="text-red-700">*</span>}
              </p>
            )
          : label && (
              <p>
                <span
                  className={cn(
                    `font-bold text-primary-600 font-light`,
                    classNames.label
                  )}
                >
                  {label}
                </span>
                {isRequired && <span className="text-red-700">*</span>}
              </p>
            )}
        <div className={`relative ${type !== 'passCode' ? 'flex' : ''}`}>
          {startContent && (
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
