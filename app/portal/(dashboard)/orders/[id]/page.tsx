import OrderSection from '@/components/portal/orders/order-section'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('portalAccessToken')?.value

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/portal/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await res.json()
    const orderNumber = data.order?.orderNumber
    return {
      title: orderNumber ? `Order #${orderNumber}` : 'Order',
    }
  } catch (error) {
    return {
      title: 'Order',
    }
  }
}

export default function OrderPage() {
  return <OrderSection />
}
