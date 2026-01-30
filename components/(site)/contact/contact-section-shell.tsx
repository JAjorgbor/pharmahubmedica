import { apiFetch } from '@/api-client/fetch-client'
import ContactSection from '@/components/(site)/contact/contact-section'
import type { FC } from 'react'

interface ContactSectionShellProps {}

const ContactSectionShell: FC<ContactSectionShellProps> = async ({}) => {
  let app
  try {
    const { data } = await apiFetch('/app')
    app = data?.app
  } catch (error: any) {
    // Fail silently, main component should handle missing app data
    console.error('Failed to fetch app data:', error)
  }

  return <ContactSection app={app} />
}

export default ContactSectionShell
