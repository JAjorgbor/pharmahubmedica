'use client'
import { useEffect, type FC } from 'react'

import adminOrderRequests from '@/api-client/admin/requests/order.requests'
import InputField from '@/components/elements/input-field'
import { useGetAdminOrder } from '@/hooks/requests/admin/useAdminOrders'
import { referralPartnerProfessions } from '@/library/config'
import { currencyFormatter } from '@/utils/currency-formatter'
import { addToast, Button, Card, CardBody, Chip } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { LuUserCheck } from 'react-icons/lu'
import { cn } from '@/utils/cn'

interface OrderReferralDetailsProps {
  orderId: string
}

const commissionStatusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Cancelled', value: 'cancelled' },
]
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning'
    case 'paid':
      return 'success'
    case 'cancelled':
      return 'danger'
    default:
      return 'default'
  }
}

const OrderReferralDetails: FC<OrderReferralDetailsProps> = ({ orderId }) => {
  const { order, orderLoading, orderError, mutateOrder } =
    useGetAdminOrder(orderId)

  const formMethods = useForm({
    defaultValues: {
      referralStatus: order.referralDetails?.commission?.status || '',
    },
  })

  const handleUpdateReferralStatus = async ({
    referralStatus,
  }: {
    referralStatus: string
  }) => {
    try {
      await adminOrderRequests.updateOrderStatus(orderId, {
        referralCommissionStatus: referralStatus,
      })
      addToast({
        title: 'Referral commission updated successfully',

        color: 'success',
        severity: 'success',
      })
      mutateOrder()
    } catch (error) {
      addToast({
        title: 'Failed to update referral commission',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  useEffect(() => {
    if (order) {
      formMethods.reset({
        referralStatus: order.referralDetails?.commission?.status || '',
      })
    }
  }, [order, formMethods.reset])
  const statusColor = getStatusColor(
    order.referralDetails?.commission?.status || '',
  )

  return (
    order.referralDetails?.referralPartner && (
      <Card
        className={cn(
          `border-${statusColor}-200 bg-${statusColor}-50 shadow-sm`,
        )}
      >
        <CardBody
          className="p-6 space-y-5"
          as="form"
          onSubmit={formMethods.handleSubmit(handleUpdateReferralStatus)}
        >
          <div className="flex flex-col">
            <h1
              className={cn(
                'flex items-center space-x-2 font-bold',
                `text-${statusColor}-900`,
              )}
            >
              <LuUserCheck className="h-5 w-5" />
              <span>Referral Applied</span>
            </h1>
            <p className={cn('font-medium', `text-${statusColor}-900`)}>
              {
                referralPartnerProfessions[
                  order.referralDetails.referralPartner.profession
                ]
              }
              {order.referralDetails.referralPartner.user.firstName}{' '}
              {order.referralDetails.referralPartner.user.lastName}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p
                className={cn(
                  'text-xs uppercase font-semibold',
                  `text-${statusColor}-700`,
                )}
              >
                Referral Code
              </p>
              <p
                className={cn('font-medium text-sm', `text-${statusColor}-900`)}
              >
                {order.referralDetails.referralPartner.referralCode}
              </p>
            </div>
            {order.transaction.discountCode && (
              <div>
                <p
                  className={cn(
                    'text-xs uppercase font-semibold',
                    `text-${statusColor}-700`,
                  )}
                >
                  Discount Code
                </p>
                <p className="font-mono text-sm font-medium text-green-900 uppercase">
                  {order.transaction.discountCode}
                </p>
              </div>
            )}
            <div>
              <p
                className={cn(
                  'text-xs uppercase font-semibold',
                  `text-${statusColor}-700`,
                )}
              >
                Commission Rate
              </p>
              <p className={`font-medium text-sm text-${statusColor}-900`}>
                {order.referralDetails.commission?.rate}
                {order.referralDetails.commission?.rateType === 'percentage'
                  ? '%'
                  : ''}
              </p>
              <p className={`text-xs text-${statusColor}-700`}>
                {order.referralDetails.commission?.rateType === 'percentage'
                  ? 'Percentage'
                  : 'Fixed'}
              </p>
            </div>
            <div>
              <p
                className={cn(
                  'text-xs uppercase font-semibold',
                  `text-${statusColor}-700`,
                )}
              >
                Commission Amount
              </p>
              <p
                className={cn(
                  'text-xs uppercase font-medium',
                  `text-${statusColor}-700`,
                )}
              >
                {currencyFormatter(
                  order.referralDetails.commission?.amount || 0,
                )}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p
              className={cn(
                'text-xs uppercase font-semibold',
                `text-${statusColor}-700`,
              )}
            >
              Commission Status
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-full sm:max-w-[220px]">
                <InputField
                  type="select"
                  color={getStatusColor(
                    order.referralDetails?.commission?.status,
                  )}
                  controllerProps={{
                    name: 'referralStatus',
                    control: formMethods.control,
                  }}
                  options={commissionStatusOptions}
                />
              </div>
              <Button
                type="submit"
                color="default"
                variant="flat"
                isLoading={formMethods.formState.isSubmitting}
                isDisabled={!formMethods.formState.isDirty}
              >
                Update Status
              </Button>
              {order.referralDetails?.commission?.status && (
                <Chip
                  color={statusColor}
                  variant="flat"
                  className="uppercase font-semibold"
                  size="sm"
                >
                  {order.referralDetails.commission.status}
                </Chip>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    )
  )
}
export default OrderReferralDetails
