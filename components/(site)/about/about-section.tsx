'use client'
import React from 'react'
import { Card, CardBody, Image } from '@heroui/react'
import {
  LuClock,
  LuHeart,
  LuShield,
  LuUsers,
  LuTarget,
  LuAward,
} from 'react-icons/lu'
import { motion } from 'framer-motion'

const AboutSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="bg-primary-50 py-16 md:py-24">
        <div className="max-w-4xl px-5 mx-auto text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Pioneering Healthcare Excellence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              For over a decade, PharmaHub Medica has been your trusted partner
              in health, bridging the gap between quality medicines and the
              people who need them.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl px-5 mx-auto py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className="flex-1 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2 text-secondary-600 font-semibold uppercase tracking-wider text-sm">
              <span className="w-8 h-[2px] bg-secondary-600"></span> Our Story
            </div>
            <h2 className="font-bold text-gray-900 text-3xl md:text-4xl">
              Building Trust Through Quality
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded with a vision to revolutionize healthcare delivery,
                PharmaHub Medica has established itself as a beacon of trust and
                quality in the pharmaceutical industry. We recognized the
                critical need for a reliable source of genuine medications and
                medical supplies, accessible to hospitals, clinics, and
                individuals alike.
              </p>
              <p>
                What started as a commitment to safety has grown into a
                comprehensive healthcare solution. We work directly with
                certified manufacturers and distributors to ensure that every
                product we deliver meets the highest global standards. Our
                rigorous quality control processes guarantee that you receive
                only the best.
              </p>
              <p>
                Today, we are proud to serve communities across the nation,
                providing not just medicines, but also expert guidance and
                support. Our journey is driven by a simple belief: everyone
                deserves access to safe, effective, and affordable healthcare.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/pharmarcist.jpg"
                alt="Pharmacist assisting a patient"
                width={600}
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <p className="text-white font-medium italic">
                  "Dedicated to your health, every step of the way."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl px-5 mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              The principles that guide everything we do at PharmaHub Medica.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <LuShield size={32} />,
                title: 'Quality Assurance',
                desc: 'We pledge uncompromised quality, sourcing only from verified manufacturers.',
              },
              {
                icon: <LuHeart size={32} />,
                title: 'Patient First',
                desc: 'Your health and well-being are the heartbeat of our operations.',
              },
              {
                icon: <LuUsers size={32} />,
                title: 'Expert Team',
                desc: 'Our licensed professionals provide guidance you can trust.',
              },
              {
                icon: <LuClock size={32} />,
                title: 'Reliability',
                desc: 'Consistent, timely, and dependable service tailored to your needs.',
              },
            ].map((value, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardBody className="p-8 flex flex-col items-center text-center gap-6">
                    <div className="p-4 bg-primary/5 text-primary rounded-2xl">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Split */}
      <div className="max-w-7xl px-5 mx-auto py-16 md:py-24 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-primary-900 text-white p-10 rounded-3xl relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 space-y-4">
              <div className="bg-white/10 w-fit p-3 rounded-xl mb-4">
                <LuTarget size={32} />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-primary-100 leading-relaxed">
                To provide accessible, quality healthcare products and services
                with personalized care, expert guidance, and unwavering
                commitment to our community's health and well-being.
              </p>
            </div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-700/50 rounded-full blur-3xl"></div>
          </motion.div>

          <motion.div
            className="bg-secondary-50 text-secondary-900 p-10 rounded-3xl relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 space-y-4">
              <div className="bg-secondary-200 w-fit p-3 rounded-xl mb-4 text-secondary-700">
                <LuAward size={32} />
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
              <p className="text-secondary-800 leading-relaxed">
                To be the most trusted and preferred healthcare partner, setting
                the standard for pharmaceutical excellence and innovation in
                healthcare delivery across Africa.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary-200/50 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
