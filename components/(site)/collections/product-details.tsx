import { currencyFormatter } from '@/utils/currencyFormatter'
import { Button, Card, CardBody, Chip, Divider } from '@heroui/react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuClock,
  LuMinus,
  LuPlus,
  LuShield,
  LuShoppingCart,
  LuStar,
  LuTruck,
} from 'react-icons/lu'

const ProductDetails = () => {
  const features = [
    'Fast-acting formula',
    'Reduces fever and pain',
    'Easy to swallow tablets',
    'Suitable for adults and children 12+',
    '24 tablets per pack',
  ]

  return (
    <div className="max-w-7xl space-y-10 mx-auto p-5 min-h-screen">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src="/pain-relief-medicine-tablets.jpg"
                alt={'Product Image'}
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Chip color="secondary" className="mb-2">
                Medicine
              </Chip>

              <h1 className="text-3xl font-bold text-[#031D91] mb-2">
                Pain Relief Tablets
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(4)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.6 (89 reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-[#031D91]">
                {currencyFormatter(5000)}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                {currencyFormatter(6800)}
              </span>

              <Chip color="secondary">
                Save {''}
                {currencyFormatter(1800)}
              </Chip>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-medium text-green-700">In Stock</span>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Chip
                  color="warning"
                  className="border-yellow-500 text-yellow-700"
                >
                  Prescription Required
                </Chip>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                This product requires a valid prescription. Please have your
                prescription ready when ordering.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fast-acting pain relief tablets for headaches, muscle aches, and
                minor pain. Contains acetaminophen for effective pain management
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-medium">Active Ingredient: </span>
                <span className="text-muted-foreground">
                  Acetaminophen 500mg
                </span>
              </div>
              <div>
                <span className="font-medium">Dosage: </span>
                <span className="text-muted-foreground">
                  1-2 tablets every 4-6 hours as needed
                </span>
              </div>
              <div>
                <span className="font-medium">Manufacturer: </span>
                <span className="text-muted-foreground">
                  MediCare Pharmaceuticals
                </span>
              </div>
            </div>

            <Divider />

            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  // onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  // disabled={quantity <= 1}
                >
                  <LuMinus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">4</span>
                <Button
                  variant="ghost"
                  size="sm"
                  // onClick={() => setQuantity(quantity + 1)}
                >
                  <LuPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              color="primary"
              startContent={<FaWhatsapp size={20} />}
              fullWidth
              className="text-white"
            >
              Buy on WhatsApp
            </Button>
            <Button
              color="primary"
              variant="bordered"
              startContent={<LuShoppingCart size={20} />}
              fullWidth
              className="text-primary hover:bg-white"
            >
              Add to Cart
            </Button>

            <div className="mt-2">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#031D91] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 pt-5">
          <Card className="md:p-3">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <span className="text-primary">
                  <LuShield size={50} />
                </span>
                <h3 className="text-primary text-xl font-semibold">
                  Licensed Pharmacy
                </h3>
                <p className="text-foreground-500 text-center">
                  All products are sourced from licensed suppliers
                </p>
              </div>
            </CardBody>
          </Card>
          <Card className="md:p-3">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <span className="text-primary">
                  <LuTruck size={50} />
                </span>
                <h3 className="text-primary text-xl font-semibold">
                  Fast Delivery
                </h3>
                <p className="text-foreground-500 text-center">
                  Quick delivery between 24-48 hours
                </p>
              </div>
            </CardBody>
          </Card>
          <Card className="md:p-3">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <span className="text-primary">
                  <LuClock size={50} />
                </span>
                <h3 className="text-primary text-xl font-semibold">
                  24/7 Support
                </h3>
                <p className="text-foreground-500 text-center">
                  Round-the-clock customer assistance
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
