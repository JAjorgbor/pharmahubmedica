'use client'
import ErrorPageWrapper from '@/components/elements/error-page-wrapper'
import { LuUserX } from 'react-icons/lu'
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
      title="Portal Error"
      description="We encountered an issue while loading your portal data. Please try again."
      icon={<LuUserX size={48} />}
      actionText="Retry"
      onAction={reset}
      homeHref="/portal/dashboard"
    />
  )
}
