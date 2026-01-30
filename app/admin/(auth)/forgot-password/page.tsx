import { Metadata } from 'next'
import ForgotPasswordForm from '@/components/admin/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Forgot Password | PharmaHub Medica',
  description: 'Reset your admin password',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
