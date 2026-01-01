'use client'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/react'

import Image from 'next/image'
import type { FC, ReactNode } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { LuLock } from 'react-icons/lu'
import z from 'zod'
import customValidation from '@/utils/custom-validation'

export interface BaseModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface ModalWrapperProps {
  isOpen: boolean
  isLock?: boolean
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full'
  setIsOpen: (value: boolean) => void
  onOpenChange?: (value: boolean) => void
  type?: 'danger' | 'success' | 'info' | 'warning'
  className?: string
  placement?: 'left' | 'right' | 'bottom' | 'top'
  hideCloseButton?: boolean
  hideLogo?: boolean
  headerFullWidth?: boolean
  showHeaderBorder?: boolean
  lightBg?: boolean
  children: ReactNode
  title?: ReactNode
  logo?: ReactNode
  footer?: ReactNode
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  isOpen,
  onOpenChange = () => null,
  setIsOpen,
  size = 'md',
  type = 'primary',
  isLock = false,
  placement = 'right',
  hideCloseButton = false,
  hideLogo = false,
  showHeaderBorder = true,
  className = '',
  headerFullWidth = true,
  children,
  title,
  footer,
  logo = (
    <Image
      src="/logo-mark.png"
      alt="logo"
      className="w-8"
      width={60}
      height={60}
    />
  ),
}) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        // size={size}
        placement={placement}
        onOpenChange={(value) => {
          setIsOpen(value)
          onOpenChange(value)
        }}
        backdrop="blur"
        classNames={{
          wrapper: 'z-[199]',
          backdrop: 'z-[199] bg-primary/10 backdrop-blur-sm',
          base: ` ${className} my-10 mx-5`,
        }}
        hideCloseButton={hideCloseButton}
      >
        <DrawerContent>
          <>
            <DrawerHeader
              className={`flex gap-3 justify-between  items-center pb-0 py-2  ${
                showHeaderBorder ? 'border-b border-b-foreground-300' : ''
              }`}
            >
              <h3
                className={`flex gap-3 items-center font-semibold text-foreground-600 ${
                  headerFullWidth ? 'flex-grow' : ''
                }`}
              >
                {!hideLogo && (isLock ? <LuLock /> : logo)}
                {title}
              </h3>
            </DrawerHeader>

            <DrawerBody className="py-3 overflow-auto">{children}</DrawerBody>
            {footer && (
              <DrawerFooter className="px-5 py-4">{footer}</DrawerFooter>
            )}
          </>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default ModalWrapper
