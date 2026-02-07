import { Metadata } from 'next'
import AcceptInviteForm from '@/components/admin/auth/accept-invite-form'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Accept Team Invitation',
  description: 'Join the PharmaHub Medica team',
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <AcceptInviteForm />
    </Suspense>
  )
}
