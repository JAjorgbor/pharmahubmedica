'use client'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import useCart from '@/hooks/useCart'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  addToast,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Skeleton,
} from '@heroui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuClock,
  LuMinus,
  LuPlus,
  LuShield,
  LuShoppingCart,
  LuTruck,
} from 'react-icons/lu'

interface ProductDetailsProps {
  product: IProduct
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const { items, addProductToCart } = useCart()
  const productExistInCart = items.find(
    (item) => item.product._id === product._id
  )

  const handleAddToCart = () => {
    if (!product.inStock) {
      addToast({
        title: 'This product is not in stock',
        color: 'warning',
        severity: 'warning',
      })
      return
    }
    addProductToCart({ product, quantity })
    addToast({
      title: productExistInCart
        ? 'Product updated in cart'
        : 'Product added to cart',
      color: 'primary',
      severity: 'primary',
    })
    setQuantity(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6 md:p-12 min-h-[80vh]"
    >
      <div className="mb-8">
        <Breadcrumbs
          size="sm"
          itemClasses={{
            item: 'text-neutral-500 font-medium',
            separator: 'text-neutral-300',
          }}
        >
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/collections">Collections</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/collections/${product.category.slug}`}>
              {product.category.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="text-primary font-bold">
            {product.name}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
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
                  color="warning"
                  size="sm"
                  className="bg-transparent text-warning-600 font-medium"
                >
                  Out of Stock
                </Chip>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#031D91] tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">
                {currencyFormatter(product.price)}
              </span>
            </div>
          </div>

          <p className="text-lg text-neutral-600 leading-relaxed font-medium">
            {product.description}
          </p>

          <Divider />

          <div className="md:flex space-y-8 md:space-y-0 gap-8">
            <div className="flex items-center gap-6 flex-1">
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

            <Button
              color="primary"
              size="lg"
              startContent={<LuShoppingCart />}
              className="flex-1  font-bold rounded-2xl shadow-xl shadow-primary/20  w-full"
              onPress={handleAddToCart}
            >
              {productExistInCart ? 'Update In cart' : 'Add to Cart'}
            </Button>
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

export const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 min-h-[80vh]">
      <div className="mb-8">
        <Skeleton className="w-64 h-5 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Skeleton className="rounded-3xl aspect-square" />
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="w-20 h-6 rounded-full" />
              <Skeleton className="w-24 h-6 rounded-full" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
            <Skeleton className="w-3/4 h-12 rounded-xl" />
            <Skeleton className="w-1/3 h-10 rounded-xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-2/3 h-4 rounded-lg" />
          </div>
          <Divider />
          <div className="space-y-6">
            <Skeleton className="w-32 h-8 rounded-xl" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="flex-1 h-14 rounded-2xl" />
              <Skeleton className="flex-1 h-14 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
