'use client'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'

import Image from 'next/image'
import type { FC, ReactNode } from 'react'
import { LuLock } from 'react-icons/lu'

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
  placement?:
    | 'center'
    | 'auto'
    | 'top'
    | 'top-center'
    | 'bottom'
    | 'bottom-center'
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
  placement = 'center',
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
      <Modal
        isOpen={isOpen}
        size={size}
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
        <ModalContent>
          <>
            <ModalHeader
              className={`flex gap-3 justify-between  items-center pb-0 py-2  ${
                showHeaderBorder ? 'border-b border-b-foreground-300' : ''
              }`}
            >
              <h3
                className={`font-normal  flex gap-3 items-center font-semibold text-foreground-600 ${
                  headerFullWidth ? 'flex-grow' : ''
                }`}
              >
                {!hideLogo && (isLock ? <LuLock /> : logo)}
                {title}
              </h3>
            </ModalHeader>

            <ModalBody className="py-3 max-h-[70vh] overflow-auto">
              {children}
            </ModalBody>
            {footer && (
              <ModalFooter className="px-5 py-4">{footer}</ModalFooter>
            )}
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ModalWrapper
