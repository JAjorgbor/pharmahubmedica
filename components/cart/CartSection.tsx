import { currencyFormatter } from '@/utils/currencyFormatter'
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu'

const CartSection = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 ">
      <div className="grid md:grid-cols-3 gap-6 items-baseline">
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between w-full">
            <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
            <Button color="danger" variant="ghost" size="sm">
              Clear Cart
            </Button>
          </div>
          <div className="space-y-4">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Card key={index}>
                  <CardBody>
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Image
                          src="https://dummyimage.com/150x100"
                          alt="product image"
                          height={100}
                          width={100}
                          className="rounded-xl object-cover object-center"
                        />
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-lg font-semibold ">
                              Pain Rellief Tablets
                            </p>
                            <Chip color="primary" size="sm" variant="bordered">
                              Pain Killers
                            </Chip>
                          </div>

                          <div className="flex gap-2 items-center">
                            Quantity:{' '}
                            <div className="flex border border-foreground-300 rounded-xl">
                              <button
                                type="button"
                                className="hover:bg-foreground-100 text-foreground-500 p-1.5 rounded-l-xl cursor-pointer"
                              >
                                <LuMinus size={15} />
                              </button>
                              <input
                                type="text"
                                className="border-none outline-none p-1.5 w-8"
                              />
                              <button
                                type="button"
                                className="hover:bg-foreground-100 text-foreground-500 p-1.5 rounded-r-xl cursor-pointer"
                              >
                                <LuPlus size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <button className="text-danger cursor-pointer">
                          <LuTrash2 size={18} />
                        </button>

                        <div className="space-y">
                          <p className="text-lg font-semibold text-primary">
                            {currencyFormatter(2000)}
                          </p>
                          <p className="text-sm text-foreground-500">
                            {currencyFormatter(2000)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
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
                <div className="flex justify-between">
                  Pain Relief Tablets x 1<span>{currencyFormatter(2000)}</span>
                </div>
                <div className="flex justify-between">
                  Pain Relief Tablets x 1<span>{currencyFormatter(2000)}</span>
                </div>
                <div className="flex justify-between">
                  Pain Relief Tablets x 1<span>{currencyFormatter(2000)}</span>
                </div>
              </div>
              <hr className="border-foreground-300" />
              <div className="flex justify-between text-xl font-bold">
                Total{' '}
                <span className="text-primary">{currencyFormatter(6000)}</span>
              </div>
              <div className="space-y-2">
                <Button
                  fullWidth
                  startContent={<FaWhatsapp size={18} />}
                  color="success"
                  className="text-white"
                >
                  Order via WhatsApp
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
    </div>
  )
}

export default CartSection
