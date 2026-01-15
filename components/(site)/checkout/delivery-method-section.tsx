import {
  Card,
  CardBody,
  CardHeader,
  Radio,
  RadioGroup,
  Spinner,
} from '@heroui/react'
import { LuTruck } from 'react-icons/lu'
import { currencyFormatter } from '@/utils/currency-formatter'
import { useGetDeliveryMethods } from '@/hooks/requests/useGetDeliveryMethods'
import { IDeliveryMethod } from '@/api-client/interfaces/delivery-method.interfaces'

interface DeliveryMethodSectionProps {
  selectedMethodId: string | null
  onSelectMethod: (method: IDeliveryMethod) => void
}

const DeliveryMethodSection = ({
  selectedMethodId,
  onSelectMethod,
}: DeliveryMethodSectionProps) => {
  const { deliveryMethods, deliveryMethodsLoading } = useGetDeliveryMethods({
    isActive: true,
    visibility: true,
  })

  if (deliveryMethodsLoading) {
    return (
      <Card className="p-3">
        <CardBody className="flex justify-center items-center py-8">
          <Spinner label="Loading delivery methods..." />
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="p-3">
      <CardHeader className="pb-0">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <LuTruck className="text-primary" /> Delivery Method
        </h2>
      </CardHeader>
      <CardBody>
        {deliveryMethods.length === 0 ? (
          <div className="text-center py-4 text-foreground-500">
            No delivery methods available at the moment.
          </div>
        ) : (
          <RadioGroup
            value={selectedMethodId || ''}
            onValueChange={(id) => {
              const method = deliveryMethods.find((m) => m._id === id)
              if (method) onSelectMethod(method)
            }}
            classNames={{
              wrapper: 'gap-4 px-1',
            }}
          >
            {deliveryMethods.map((method) => (
              <Radio
                key={method._id}
                value={method._id}
                classNames={{
                  base: 'max-w-full',
                }}
                className={`border-2 rounded-xl p-4 transition-all m-0 ${
                  selectedMethodId === method._id
                    ? 'border-primary bg-primary-50'
                    : 'border-default-200 hover:border-primary-300'
                }`}
              >
                <div className="flex justify-between items-center w-full min-w-[200px] gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-lg">{method.name}</span>
                    <span className="text-sm text-foreground-500">
                      Estimated: {method.estimatedDeliveryTime}
                    </span>
                  </div>
                  <div className="text-primary font-bold text-lg">
                    {method.fee === 0 ? 'FREE' : currencyFormatter(method.fee)}
                  </div>
                </div>
              </Radio>
            ))}
          </RadioGroup>
        )}
      </CardBody>
    </Card>
  )
}

export default DeliveryMethodSection
