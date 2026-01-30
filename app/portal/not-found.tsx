'use client'
import ErrorPageWrapper from '@/components/elements/error-page-wrapper'
import { LuSearchX } from 'react-icons/lu'

export default function NotFound() {
  return (
    <ErrorPageWrapper
      title="Portal Page Not Found"
      description="The portal page you are looking for does not exist or you don't have permission to view it."
      icon={<LuSearchX size={48} />}
      homeHref="/portal/dashboard"
      actionText="Go to Dashboard"
      actionHref="/portal/dashboard"
    />
  )
}
