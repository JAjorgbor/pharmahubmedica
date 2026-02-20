import ContactSectionShell from '@/components/(site)/contact/contact-section-shell'
import { ContactSkeleton } from '@/components/(site)/contact/contact-section'
import { Suspense } from 'react'

export const metadata = { title: 'Contact Us' }

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactSectionShell />
    </Suspense>
  )
}
