'use client'
import React, { type FC } from 'react'
import ContactForm from '@/components/(site)/contact/contact-form'
import { Button, Card, CardBody, CardHeader, Skeleton } from '@heroui/react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'
import { IApp } from '@/api-client/interfaces/app.interfaces'
import { toWhatsAppNumber } from '@/utils/to-whatsapp-number'

interface ContactSectionProps {
  app?: IApp
}

const ContactSection: FC<ContactSectionProps> = ({ app }) => {
  const whatsappNumber = app?.whatsAppNumber
    ? toWhatsAppNumber(app.whatsAppNumber, 'NG')
    : '2348000000000'

  return (
    <>
      <div className="space-y-8">
        <div className="max-w-xl p-5 pb-0 text-center mx-auto">
          <h2 className="text-primary font-bold text-4xl">Contact Us</h2>
          <p>
            Get in touch with our team. We're here to help with all your
            healthcare needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6  max-w-7xl px-5  mx-auto">
          <Card className="md:p-4">
            <CardHeader className="text-primary font-bold text-2xl">
              Send us a Message
            </CardHeader>
            <CardBody>
              <ContactForm />
            </CardBody>
          </Card>
          <Card className="md:p-4">
            <CardHeader className="text-primary font-bold text-2xl">
              Get in Touch
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div className="flex gap-2">
                  <LuMapPin className="text-primary" size={25} />
                  <div className="space-y-1">
                    <p className="font-semibold">Address</p>
                    <p className="text-foreground-500">{app?.address}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <LuPhone className="text-primary" size={25} />
                  <div className="space-y-1">
                    <p className="font-semibold">Phone</p>
                    <p className="text-foreground-500">{app?.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <FaWhatsapp className="text-primary" size={25} />
                  <div className="space-y-1">
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-foreground-500">{app?.whatsAppNumber}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <LuMail className="text-primary" size={25} />
                  <div className="space-y-1">
                    <p className="font-semibold">Email</p>
                    <p className="text-foreground-500">{app?.email}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="md:p-4">
            <CardHeader className="text-primary font-bold text-2xl">
              Quick Contact
            </CardHeader>
            <CardBody className="flex flex-col justify-center">
              <div className="space-y-4">
                <Button
                  color="success"
                  startContent={<FaWhatsapp size={20} />}
                  fullWidth
                  className="text-white font-bold"
                  as={'a'}
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                >
                  Chat on WhatsApp
                </Button>
                <p className="text-center text-foreground-500 text-sm">
                  Get instant support from our team
                </p>
              </div>
            </CardBody>
          </Card>
          <Card className="md:p-4">
            <CardHeader className="text-primary font-bold text-2xl">
              Our Services
            </CardHeader>
            <CardBody>
              <ul className="pl-0">
                {[
                  'Prescription Medications',
                  'Over-the-Counter Products',
                  'Health Supplements',
                  'Medical Equipment',
                  'Pharmacy Consultations',
                  'Home Delivery',
                ].map((service) => (
                  <li key={service} className="flex gap-2 items-center">
                    <span className="text-primary text-xl">●</span>
                    {service}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export const ContactSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-xl p-5 pb-0 text-center mx-auto space-y-2">
        <Skeleton className="h-10 w-48 mx-auto rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-7xl px-5 mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="md:p-4">
            <CardHeader>
              <Skeleton className="h-8 w-40 rounded-lg" />
            </CardHeader>
            <CardBody className="space-y-4">
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ContactSection
