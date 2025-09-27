'use client'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { LuArrowRight, LuClock, LuShield, LuTruck } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'

export default function HomePage() {
  return (
    <>
      <div
        className=""
        style={{
          background: '#0025a1',

          backgroundImage:
            'linear-gradient(166deg,#0025a1 0%, rgba(51, 116, 255, 1) 76%);',
        }}
      >
        <div className="max-w-6xl mx-auto p-5 py-10 flex flex-col md:flex-row gap-8 items-center text-white">
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
            <div className="flex gap-4 flex-wrap">
              <Button
                className="flex-1 bg-white text-primary"
                endContent={<LuArrowRight size={18} />}
              >
                Shop Now
              </Button>
              <Button
                className="flex-1 border-white text-white"
                variant="bordered"
                endContent={<FaWhatsapp size={18} />}
              >
                Search with a Pharmarcist
              </Button>
            </div>
          </div>
          <Image
            src="https://dummyimage.com/500x500"
            className="rounded-2xl flex-1 h-96 w-full object-cover object-center"
            alt="hero image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 max-w-6xl mx-auto my-8">
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
