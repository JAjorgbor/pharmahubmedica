'use client'
import ErrorPageWrapper from '@/components/elements/error-page-wrapper'
import { FiAlertTriangle } from 'react-icons/fi'
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
      title="Something went wrong!"
      description="An unexpected error occurred. We have been notified and are working to fix it."
      icon={<FiAlertTriangle size={48} />}
      actionText="Try again"
      onAction={reset}
      homeHref="/"
    />
  )
}
