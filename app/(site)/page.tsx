'use client'
import { Image, Button, Card, CardBody } from '@heroui/react'
import {
  LuArrowRight,
  LuClock,
  LuShield,
  LuTruck,
  LuActivity,
  LuHeartHandshake,
} from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import useGetApp from '@/hooks/requests/useGetApp'
import { toWhatsAppNumber } from '@/utils/to-whatsapp-number'
import { motion } from 'framer-motion'

export default function HomePage() {
  const { app } = useGetApp()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-gradient relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top translate-x-1/2 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 text-white relative z-10">
          <motion.div
            className="flex-1 space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Trusted Healthcare <br className="hidden lg:block" />
              <span className="text-secondary-400">Solutions</span> for You
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-50 max-w-xl leading-relaxed"
            >
              PharmaHub Medica connects you with certified pharmaceuticals and
              medical supplies. We prioritize quality, safety, and rapid
              delivery to your doorstep.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                className="bg-white text-primary font-bold px-8 py-6 text-medium"
                endContent={<LuArrowRight size={20} />}
                as={Link}
                href="/collections"
                radius="full"
              >
                Browse Catalog
              </Button>
              <Button
                className="border-white text-white font-bold px-8 py-6 text-medium hover:bg-white/10"
                variant="bordered"
                startContent={<FaWhatsapp size={20} />}
                as={Link}
                href={
                  app?.whatsAppNumber
                    ? `https://wa.me/${toWhatsAppNumber(app?.whatsAppNumber, 'NG')}`
                    : '#'
                }
                radius="full"
              >
                Chat with a Pharmacist
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg aspect-square lg:aspect-[4/3]">
              <Image
                src="/hero.jpg"
                alt="Medical professionals discussing"
                className="object-cover rounded-3xl shadow-2xl w-full h-full"
                width={600}
                height={400}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Trust Indicators */}
      <section className="bg-gray-50 py-16 -mt-8 relative z-20 rounded-t-3xl md:mt-0 md:rounded-none">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                icon: <LuShield size={32} />,
                title: 'Licensed & Certified',
                desc: '100% authentic products from verified manufacturers.',
              },
              {
                icon: <LuTruck size={32} />,
                title: 'Nationwide Delivery',
                desc: 'Fast and reliable shipping across Nigeria within 24-48 hours.',
              },
              {
                icon: <LuClock size={32} />,
                title: '24/7 Expert Support',
                desc: 'Round-the-clock access to professional pharmaceutical advice.',
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardBody className="flex flex-col items-center text-center p-8 gap-4">
                    <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us / Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-2 bg-rose-50 text-secondary-600 rounded-full text-sm font-semibold mb-2">
              Why Choose PharmaHub?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dedicated to Improving Lives Through Quality Healthcare
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At PharmaHub Medica, we go beyond just supplying medications. We
              are your partners in health, ensuring that every product you
              receive meets the highest standards of safety and efficacy.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                'Direct partnerships with global pharmaceutical brands',
                'Temperature-controlled storage and logistics',
                'Comprehensive inventory for hospitals and pharmacies',
              ].map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                >
                  <LuActivity className="text-secondary-500 shrink-0" /> {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-primary-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden w-full">
            <div className="relative z-10">
              <LuHeartHandshake size={48} className="mb-6 text-white/80" />
              <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
              <p className="text-primary-100 mb-8 leading-relaxed">
                &quot;We strive to make essential healthcare accessible and
                affordable without compromising on quality. Your health and
                safety are the core of our mission.&quot;
              </p>
              <Button
                as={Link}
                href="/about"
                className="bg-white text-primary font-semibold"
                variant="solid"
              >
                Learn More About Us
              </Button>
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-700/50 rounded-full blur-3xl z-0" />
          </div>
        </div>
      </section>
    </div>
  )
}
