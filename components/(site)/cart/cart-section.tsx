'use client'
import { IProduct } from '@/api-client/interfaces/product.interfaces'
import useCart from '@/hooks/useCart'
import { currencyFormatter } from '@/utils/currency-formatter'
import truncateText from '@/utils/truncateText'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as HeroUiImage,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { LuMinus, LuPlus, LuTrash2, LuShoppingBag } from 'react-icons/lu'
import Cookies from 'js-cookie'
import LoginNoticeModal from './login-notice-modal'
import { useRouter } from 'next/navigation'

const CartSection = () => {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [isLoginNoticeOpen, setIsLoginNoticeOpen] = useState(false)

  const cartTotal = items.reduce((acc, item) => acc + item.amount, 0)

  const handleProceedToCheckout = () => {
    const userId = Cookies.get('portalUserId')
    if (userId) {
      router.push('/checkout')
    } else {
      setIsLoginNoticeOpen(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-5 min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="bg-default-100 p-8 rounded-full">
          <LuShoppingBag size={64} className="text-default-500" />
        </div>
        <div className="text-center space-y-3 max-w-md">
          <h2 className="text-3xl font-bold text-foreground">
            Your cart is empty
          </h2>
          <p className="text-default-500 text-lg">
            Looks like you haven't added anything to your cart yet.
          </p>
        </div>
        <Button
          as={Link}
          href="/collections"
          color="primary"
          size="lg"
          className="font-semibold px-8"
        >
          Start Shopping
        </Button>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto p-5 ">
      <div className="grid md:grid-cols-3 gap-6 items-baseline">
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between w-full">
            <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
            <Button
              color="danger"
              variant="ghost"
              size="sm"
              onPress={() => clearCart()}
            >
              Clear Cart
            </Button>
          </div>
          <div className="space-y-4 @container">
            {items.map((item, index) => (
              <CartItem
                key={index}
                amount={item.amount}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        <Card className="p-3">
          <CardHeader className="font-bold text-2xl text-primary">
            Order Summary
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="space-y-2 text-sm">
                {items.map((item, index) => (
                  <div className="flex justify-between">
                    {item.product.name} x {item.quantity}
                    <span>{currencyFormatter(item.amount)}</span>
                  </div>
                ))}
              </div>
              <hr className="border-foreground-300" />
              <div className="flex justify-between text-xl font-bold">
                Total{' '}
                <span className="text-primary">
                  {currencyFormatter(cartTotal)}
                </span>
              </div>
              <div className="space-y-2">
                <Button
                  fullWidth
                  endContent={<FiArrowRight size={18} />}
                  color="primary"
                  onPress={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button fullWidth color="primary" variant="bordered">
                  Continue Shopping
                </Button>
              </div>
              <ul className="text-xs text-foreground-500 list-disc pl-5">
                <li> No online payment required</li>
                <li> Order confirmation via WhatsApp</li>
                <li> Fast delivery within 24-48 hours</li>
                <li> Licensed pharmacy guarantee</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>

      <LoginNoticeModal
        isOpen={isLoginNoticeOpen}
        setIsOpen={setIsLoginNoticeOpen}
      />
    </div>
  )
}

export default CartSection

const CartItem = ({
  product,
  quantity,
  amount,
}: {
  product: IProduct
  quantity: number
  amount: number
}) => {
  const [localQuantity, setLocalQuantity] = useState(1)
  const { updateProductQuantity, removeProductFromCart } = useCart()
  useEffect(() => {
    setLocalQuantity(quantity)
  }, [quantity])

  const handleUpdateItemQuantity = (newQuantity: number) => {
    setLocalQuantity(newQuantity)
    updateProductQuantity(product._id, newQuantity)
  }
  return (
    <Card className="md:p-3">
      <CardBody>
        <div className="flex gap-4">
          <HeroUiImage
            src={product.image.url}
            alt={product.name}
            height={160}
            width={200}
            as={Image}
            className="object-cover"
          />
          <div className="w-full flex flex-col gap-4 justify-between min-h-full">
            <div className="flex justify-between items-start mb-4 md:mb-0">
              <div className="space-y-2">
                <Link
                  href={`/collections/${product.category.slug}/${product.slug}`}
                  className="text-lg font-semibold hover:text-primary text-wrap max-w-44 sm:max-w-full block"
                >
                  {truncateText(product.name, 40)}
                </Link>
                <div className="flex gap-2">
                  <Chip color="primary" size="sm" variant="flat">
                    {product.category.name}
                  </Chip>
                  <Chip color="danger" size="sm" variant="flat">
                    {product.subcategory.name}
                  </Chip>
                </div>
              </div>
              <button
                className="text-danger cursor-pointer"
                onClick={() => removeProductFromCart(product._id)}
              >
                <LuTrash2 size={18} />
              </button>
            </div>

            <div className="flex justify-between flex-wrap">
              <div className="flex gap-2 items-center">
                <span className="hidden @md:inline">Quantity: </span>
                <div className="flex items-center bg-neutral-100 p-1.5 rounded-2xl">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="bg-white hover:scale-110 active:scale-90 py-1 h-7"
                    onPress={() =>
                      localQuantity > 1 &&
                      handleUpdateItemQuantity(quantity - 1)
                    }
                  >
                    <LuMinus size={13} />
                  </Button>
                  <span className="w-8 text-center font-black">{quantity}</span>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => handleUpdateItemQuantity(quantity + 1)}
                    className="bg-white hover:scale-110 active:scale-90 py-1 h-7"
                  >
                    <LuPlus size={13} />
                  </Button>
                </div>
              </div>
              <div className="space-y">
                <p className="text-lg font-semibold text-primary">
                  {currencyFormatter(amount)}
                </p>
                <p className="text-sm text-foreground-500">
                  {currencyFormatter(product.price)} each
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
