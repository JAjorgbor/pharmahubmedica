'use client'
import ErrorPageWrapper from '@/components/elements/error-page-wrapper'
import { LuSearchX } from 'react-icons/lu'

export default function NotFound() {
  return (
    <ErrorPageWrapper
      title="Page Not Found"
      description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      icon={<LuSearchX size={48} />}
      homeHref="/"
    />
  )
}
