'use client'
import useGetContactInfo from '@/hooks/useGetContactInfo'
import logo from '@/public/png-transparent-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { LuFacebook, LuInstagram } from 'react-icons/lu'

const Footer = () => {
  const { contactInfo } = useGetContactInfo()

  return (
    <footer className="bg-foreground-100 text-gray-800 py-8">
      <div className="max-w-6xl px-5  mx-auto px-4">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pt-5">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start items-center">
            <Link href="/" className="inline-block">
              <Image src={logo} alt="Logo" width={200} height={80} />
            </Link>
          </div>

          {/* Resources */}
          <div className="flex">
            <div className="md:mx-auto">
              <h6 className="text-sm font-bold uppercase mb-3">Resources</h6>
              <ul className="space-y-1 text-xs uppercase">
                <li>
                  <Link
                    href="/contact#faqs"
                    className="hover:text-primary transition-colors"
                  >
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Support */}
          <div className="flex">
            <div className="md:mx-auto">
              <h6 className="text-sm font-bold uppercase mb-3">
                Quick Support
              </h6>
              <Link href="/contact">
                <button className="px-2 py-1 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition">
                  Contact Us
                </button>
              </Link>

              <h6 className="text-sm font-bold uppercase mt-4 mb-3">
                Social Media
              </h6>
              <div className="flex space-x-3 text-foreground-500">
                <Link
                  target="_blank"
                  href={contactInfo?.facebookAccount ?? '#'}
                  className="hover:text-primary"
                >
                  <LuFacebook className="w-6 h-6" />
                </Link>
                <Link
                  target="_blank"
                  href={contactInfo?.instagramAccount ?? '#'}
                  className="hover:text-pink-500"
                >
                  <LuInstagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8" />

        {/* Copyright */}
        <p className="text-xs text-center">
          &copy; {new Date().getFullYear()} PharmaHub Medica. All Rights
          Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
