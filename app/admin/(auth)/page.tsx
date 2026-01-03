import { Metadata } from 'next'
import LoginForm from '@/components/sections/admin/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Admin Login | PharmaHub Medica',
  description: 'Login to the PharmaHub Medica admin dashboard',
}

export default function AdminLoginPage() {
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Admin Login
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access the dashboard
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
