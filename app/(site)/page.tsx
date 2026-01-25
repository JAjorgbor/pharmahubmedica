'use client'
import { Image, Button } from '@heroui/react'
import { LuArrowRight, LuClock, LuShield, LuTruck } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import useGetApp from '@/hooks/requests/useGetApp'
import { toWhatsAppNumber } from '@/utils/to-whatsapp-number'

export default function HomePage() {
  const { app } = useGetApp()
  return (
    <>
      <div className="bg-primary-gradient">
        <div className="max-w-7xl px-5   mx-auto p-5 py-10 flex flex-col lg:flex-row gap-8 items-center text-white">
          <div className="flex-1 space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              Your Health, Our Priority:
            </h1>
            <h2 className="text-lg font-semibold">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              optio nam perferendis numquam rem ducimus enim dicta tenetur
              dolores expedita, sequi animi unde officiis!
            </p>
            <div className="grid sm:flex gap-4 flex-wrap md:w-4/5">
              <Button
                className="bg-white text-primary flex-1"
                endContent={<LuArrowRight size={18} />}
                as={Link}
                href="/collections"
              >
                Shop Now
              </Button>
              <Button
                className="border-white text-white flex-1"
                variant="bordered"
                endContent={<FaWhatsapp size={18} />}
                as={Link}
                href={
                  app?.whatsAppNumber
                    ? `https://wa.me/${toWhatsAppNumber(app?.whatsAppNumber, 'NG')}`
                    : '#'
                }
              >
                Search with a Pharmarcist
              </Button>
            </div>
          </div>
          <Image
            src="/hero.jpg"
            className="rounded-2xl flex-1 h-96 w-full object-cover object-center"
            alt="hero image"
            width={600}
            height={400}
          />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 max-w-7xl px-5   mx-auto my-8">
        <div className="flex flex-col items-center p-4 gap-3">
          <span className="p-4 rounded-full bg-primary text-white text-4xl">
            <LuShield />
          </span>
          <h4 className="font-semibold text-xl text-center">
            Licensed & Certified
          </h4>
          <p className="text-foreground-500 text-center">
            Fully licensed pharmacy with certified pharmacists ensuring quality
            and safety.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 gap-3">
          <span className="p-4 rounded-full bg-primary text-white text-4xl">
            <LuTruck />
          </span>
          <h4 className="font-semibold text-xl text-center">Fast Delivery</h4>
          <p className="text-foreground-500 text-center">
            Quick and reliable delivery to your doorstep within 24-48 hours.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 gap-3">
          <span className="p-4 rounded-full bg-primary text-white text-4xl">
            <LuClock />
          </span>
          <h4 className="font-semibold text-xl text-center">24/7 Support</h4>
          <p className="text-foreground-500 text-center">
            Round-the-clock customer support for all your healthcare needs.
          </p>
        </div>
      </div>
    </>
  )
}
