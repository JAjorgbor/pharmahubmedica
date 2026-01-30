'use client'
import { IOrder } from '@/api-client/interfaces/order.interfaces'
import useGetApp from '@/hooks/requests/useGetApp'
import { Button } from '@heroui/react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'
import { LuDownload, LuPrinter } from 'react-icons/lu'
import InvoicePDF from './invoice-pdf'

interface PrintInvoiceButtonProps {
  order: IOrder
  label?: string
}

const PrintInvoiceButton = ({
  order,
  label = 'Download Invoice',
}: PrintInvoiceButtonProps) => {
  const [isClient, setIsClient] = useState(false)
  const { app, appLoading } = useGetApp()

  // PDFDownloadLink should only render on client side to avoid hydration mismatches
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Button variant="ghost" startContent={<LuPrinter />} isDisabled>
        Print Invoice
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      document={<InvoicePDF order={order} app={app} />}
      fileName={`PharmaHub Medica Invoice-${order.orderNumber}.pdf`}
    >
      {({ loading }) => (
        <Button
          variant="ghost"
          color="primary"
          startContent={<LuDownload />}
          isLoading={loading}
          isDisabled={loading}
        >
          {loading ? 'Generating...' : label}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

export default PrintInvoiceButton
