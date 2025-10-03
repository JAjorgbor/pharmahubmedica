import { Card, CardBody } from '@heroui/react'
import Image from 'next/image'
import { LuClock, LuHeart, LuShield, LuUsers } from 'react-icons/lu'

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl p-5 pb-0 text-center mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          About PharmaHub Medica
        </h1>
        <p>
          For over a decade, PharmaHub Medica has been your trusted partner in
          health, providing quality medicines and healthcare products with the
          care and expertise you deserve.
        </p>
      </div>
      <div className="flex max-w-7xl px-5   mx-auto gap-4 flex-col md:flex-row">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold text-primary text-3xl">Our Story</h2>
          <div className="space-y-2">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              officia ad, nobis fugit temporibus vitae, dolorem ut ullam
              veritatis voluptatibus vel harum, perferendis tempore nostrum.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              officia ad, nobis fugit temporibus vitae, dolorem ut ullam
              veritatis voluptatibus vel harum, perferendis tempore nostrum.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              officia ad, nobis fugit temporibus vitae, dolorem ut ullam
              veritatis voluptatibus vel harum, perferendis tempore nostrum.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              officia ad, nobis fugit temporibus vitae, dolorem ut ullam
              veritatis voluptatibus vel harum, perferendis tempore nostrum.
            </p>
          </div>
        </div>
        <Image
          src="https://dummyimage.com/400x400"
          alt="about image"
          width={400}
          height={400}
          className="flex-1 w-full rounded-xl h-[400px] object-center object-cover"
        />
      </div>
      <div className="max-w-7xl px-5   mx-auto space-y-5 text-center">
        <h2 className="text-3xl font-bold text-primary">Our Values</h2>
        <p>The principles that guide everything we do at PharmaHub Medica.</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          <Card className="md:p-3">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <span className="bg-primary text-3xl text-white rounded-full inline-block p-4">
                  <LuShield />
                </span>
                <h3 className="text-primary text-xl font-semibold">
                  Quality Assurance
                </h3>
                <p className="text-foreground-500 text-center">
                  We source all our products from licensed manufacturers and
                  conduct rigorous quality checks.
                </p>
              </div>
            </CardBody>
          </Card>
          <Card className="md:p-3">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <span className="bg-primary text-3xl text-white rounded-full inline-block p-4">
                  <LuHeart />
                </span>
                <h3 className="text-primary text-xl font-semibold">
                  Patient Care
                </h3>
                <p className="text-foreground-500 text-center">
                  Your health and well-being are at the center of everything we
                  do.
                </p>
              </div>
            </CardBody>
          </Card>
          <Card className="md:p-3">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <span className="bg-primary text-3xl text-white rounded-full inline-block p-4">
                  <LuUsers />
                </span>
                <h3 className="text-primary text-xl font-semibold">
                  Expert Team
                </h3>
                <p className="text-foreground-500 text-center">
                  Our licensed pharmacists and healthcare professionals are here
                  to help you.
                </p>
              </div>
            </CardBody>
          </Card>
          <Card className="md:p-3">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <span className="bg-primary text-3xl text-white rounded-full inline-block p-4">
                  <LuClock />
                </span>
                <h3 className="text-primary text-xl font-semibold">
                  Reliable Service
                </h3>
                <p className="text-foreground-500 text-center">
                  Fast, dependable service with 24/7 customer support for your
                  peace of mind.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="px-5">
        <div className="max-w-7xl py-10 mb-10 text-center mx-auto bg-primary-gradient rounded-xl">
          <div className=" text-white space-y-4 max-w-2xl mx-auto px-5">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p>
              To provide accessible, quality healthcare products and services
              with personalized care, expert guidance, and unwavering commitment
              to our community's health and well-being. We strive to be your
              trusted healthcare partner for life.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
