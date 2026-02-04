import Providers from '@/app/providers'
import logo from '@/public/logo.png'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: {
    default: 'PharmaHub Medica',
    template: '%s | PharmaHub Medica', // replaces titlePrefix + titleSuffix
  },
  description:
    'PharmaHub Medica: Your trusted pharmacy partner offering high-quality medicines, personalized consultations, and affordable healthcare solutions. Experience exceptional care for your health needs.',
  metadataBase: new URL('https://pharmahubmedica.ng'),
  openGraph: {
    title: 'PharmaHub Medica',
    description:
      'PharmaHub Medica: Your trusted pharmacy partner offering high-quality medicines, personalized consultations, and affordable healthcare solutions. Experience exceptional care for your health needs.',
    url: 'https://pharmahubmedica.ng',
    siteName: 'PharmaHub Medica',
    images: [
      {
        url: logo.src,
        width: 800,
        height: 600,
        alt: 'PharmaHub Medica Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Pharmahubmedica',
    creator: '@Pharmahubmedica',
    title: 'PharmaHub Medica',
    description:
      'PharmaHub Medica: Your trusted pharmacy partner offering high-quality medicines, personalized consultations, and affordable healthcare solutions.',
    images: [logo.src],
  },
  other: {
    sitecredit: 'Developed by Joshua Ajorgbor',
  },
}

export const viewport = {
  themeColor: '#1a20f6',
}

export default function RootLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode
  searchParams: any
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
