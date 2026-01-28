'use client'

import React, { useState } from 'react'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { LuLogOut } from 'react-icons/lu'
import { logout } from '@/api-client/admin/requests/auth.requests'
import getCookieDomain from '@/utils/get-cookie-domain'

interface LogoutConfirmationModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function LogoutConfirmationModal({
  isOpen,
  setIsOpen,
}: LogoutConfirmationModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
      setIsOpen(false)
      // Clear admin cookies
      Cookies.remove('adminAccessToken', {
        path: '/',
        domain: getCookieDomain(),
      })
      Cookies.remove('adminUserId', {
        path: '/',
        domain: getCookieDomain(),
      })

      // Redirect to admin login
      window.location.href = '/admin'
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Confirm Logout"
      size="sm"
      footer={
        <div className="flex gap-3 w-full justify-end">
          <Button
            variant="flat"
            onPress={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={handleLogout}
            isLoading={isLoading}
            startContent={!isLoading && <LuLogOut />}
          >
            Log Out
          </Button>
        </div>
      }
    >
      <div className="py-4">
        <p className="text-foreground-600">
          Are you sure you want to log out of your admin account? You will need
          to log in again to access the dashboard.
        </p>
      </div>
    </ModalWrapper>
  )
}
