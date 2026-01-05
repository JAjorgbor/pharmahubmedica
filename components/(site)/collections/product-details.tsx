'use client'
import { currencyFormatter } from '@/utils/currency-formatter'
import { Button, Card, CardBody, Chip, Divider } from '@heroui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuClock,
  LuMinus,
  LuPlus,
  LuShield,
  LuShoppingCart,
  LuTruck,
} from 'react-icons/lu'

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)

  // This would eventually come from props
  const product = {
    name: 'Pain Relief Tablets',
    price: 5000,
    oldPrice: 6800,
    description:
      'Fast-acting pain relief tablets specifically engineered for rapid absorption. Ideal for treating headaches, muscle aches, and minor pains associated with common colds or minor injuries.',
    category: { name: 'Medicine' },
    subcategory: { name: 'Pain Relief' },
    inStock: true,
    image: {
      url: '/pain-relief-medicine-tablets.jpg',
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6 md:p-12 min-h-screen"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Single Image */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-neutral-50 border border-neutral-100"
        >
          <Image
            src={product.image.url}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105 duration-700"
            priority
          />
        </motion.div>

        {/* Right Column: Info */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center space-y-8"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Chip
                variant="flat"
                color="primary"
                size="sm"
                className="font-bold"
              >
                {product.category.name}
              </Chip>
              <Chip
                variant="flat"
                color="secondary"
                size="sm"
                className="font-medium"
              >
                {product.subcategory.name}
              </Chip>
              {product.inStock ? (
                <Chip
                  variant="dot"
                  color="success"
                  size="sm"
                  className="bg-transparent text-success-600 font-medium"
                >
                  In Stock
                </Chip>
              ) : (
                <Chip
                  variant="dot"
                  color="danger"
                  size="sm"
                  className="bg-transparent text-danger-600 font-medium"
                >
                  Out of Stock
                </Chip>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#031D91] tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">
                {currencyFormatter(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-neutral-400 line-through">
                  {currencyFormatter(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="text-lg text-neutral-600 leading-relaxed font-medium">
            {product.description}
          </p>

          <Divider />

          <div className="space-y-6">
            <div className="flex items-center gap-8">
              <span className="font-bold text-neutral-800">Quantity</span>
              <div className="flex items-center bg-neutral-100 p-1.5 rounded-2xl">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white hover:scale-110 active:scale-90"
                >
                  <LuMinus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-black text-lg">
                  {quantity}
                </span>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white hover:scale-110 active:scale-90"
                >
                  <LuPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                color="primary"
                size="lg"
                startContent={<LuShoppingCart className="h-5 w-5" />}
                className="flex-1 py-3 font-bold rounded-2xl shadow-xl shadow-primary/20"
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-[#25D366] py-3 text-white font-bold  rounded-2xl shadow-xl shadow-green-500/10"
                startContent={<FaWhatsapp className="h-6 w-6" />}
              >
                Buy via WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: LuShield,
            title: 'Licensed Pharmacy',
            text: '100% Quality Assurance',
          },
          {
            icon: LuTruck,
            title: 'Express Delivery',
            text: 'Doorstep Delivery',
          },
          {
            icon: LuClock,
            title: '24/7 Support',
            text: 'Medical Consultations',
          },
        ].map((badge, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 space-y-3"
          >
            <div className="p-4 rounded-3xl bg-neutral-50 text-primary">
              <badge.icon size={36} />
            </div>
            <h4 className="font-black text-[#031D91] text-lg">{badge.title}</h4>
            <p className="text-neutral-500 font-medium">{badge.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ProductDetails
