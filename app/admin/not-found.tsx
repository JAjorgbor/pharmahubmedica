'use client'
import ErrorPageWrapper from '@/components/elements/error-page-wrapper'
import { LuFileWarning } from 'react-icons/lu'

export default function NotFound() {
  return (
    <ErrorPageWrapper
      title="Resource Not Found"
      description="The administrative resource you searching for could not be found."
      icon={<LuFileWarning size={48} />}
      homeHref="/admin/dashboard"
      actionText="Manage Overview"
      actionHref="/admin/dashboard"
    />
  )
}
