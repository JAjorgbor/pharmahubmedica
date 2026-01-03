import { Metadata } from 'next'
import ForgotPasswordForm from '@/components/sections/admin/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot Password | PharmaHub Medica',
  description: 'Reset your admin password',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
