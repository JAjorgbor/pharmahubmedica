'use client'
import React from 'react'
import ContactForm from '@/components/(site)/contact/contact-form'
import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'

const ContactSection = () => {
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
                    <p className="text-foreground-500">
                      23 Healthcare Avenue Medical District,
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <LuPhone className="text-primary" size={25} />
                  <div className="space-y-1">
                    <p className="font-semibold">Phone</p>
                    <p className="text-foreground-500">+234 800 000 0000</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <FaWhatsapp className="text-primary" size={25} />
                  <div className="space-y-1">
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-foreground-500">+234 800 000 0000</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <LuMail className="text-primary" size={25} />
                  <div className="space-y-1">
                    <p className="font-semibold">Email</p>
                    <p className="text-foreground-500">
                      contact@pharmahubmedica.ng
                    </p>
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
                  className="text-white"
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
                <li className="flex gap-2 items-center">
                  <span className="text-primary text-xl">●</span>
                  Prescription Medications
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary text-xl">●</span>
                  Over-the-Counter Products
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary text-xl">●</span>
                  Health Supplements
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary text-xl">●</span>
                  Medical Equipment
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary text-xl">●</span>
                  Pharmacy Consultations
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary text-xl">●</span>
                  Home Delivery
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ContactSection
