'use client'
import ErrorPageWrapper from '@/components/elements/error-page-wrapper'
import { LuShieldAlert } from 'react-icons/lu'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorPageWrapper
      title="Admin System Error"
      description="An error occurred while processing administrative data. Please try again or return to the dashboard."
      icon={<LuShieldAlert size={48} />}
      actionText="Retry Operation"
      onAction={reset}
      homeHref="/admin/dashboard"
    />
  )
}
