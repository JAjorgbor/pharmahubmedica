import { IApp } from '@/api-client/interfaces/app.interfaces'
import { IOrder } from '@/api-client/interfaces/order.interfaces'
import { theme } from '@/library/config'
import { currencyFormatter } from '@/utils/currency-formatter'
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { capitalCase } from 'change-case'
import moment from 'moment'

Font.register({
  family: 'NotoSans',
  src: '/fonts/NotoSans-Regular.ttf',
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'NotoSans',
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  logoContainer: {
    gap: 4,
  },
  logo: {
    width: 150,
    height: 70,
    objectFit: 'contain',
  },
  appAddress: {
    fontSize: 8,
    color: '#666',
    maxWidth: 200,
  },
  titleContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textTransform: 'uppercase',
  },
  invoiceId: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 20,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 9,
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 10,
    fontWeight: 'medium',
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    padding: 8,
    alignItems: 'center',
  },
  th: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4b5563',
    textTransform: 'uppercase',
  },
  td: {
    fontSize: 10,
    color: '#1f2937',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  summaryBox: {
    width: 200,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 20,
  },
})

interface InvoicePDFProps {
  order: IOrder
  app?: IApp
}

const InvoicePDF = ({ order, app }: InvoicePDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image src="/logo.png" style={styles.logo} />
            {app?.address && (
              <Text style={styles.appAddress}>{app.address}</Text>
            )}
            {app?.phoneNumber && (
              <Text style={styles.appAddress}>Phone: {app.phoneNumber}</Text>
            )}
            {app?.email && (
              <Text style={styles.appAddress}>Email: {app.email}</Text>
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.invoiceId}>#{order.orderNumber}</Text>
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.grid}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.value}>
              {order.customer.firstName} {order.customer.lastName}
            </Text>
            <Text style={styles.value}>{order.customer.email}</Text>
            <Text style={styles.value}>{order.customer.phoneNumber}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Ship To</Text>
            <Text style={styles.value}>{order.deliveryAddress.street}</Text>
            <Text style={styles.value}>
              {order.deliveryAddress.city}, {order.deliveryAddress.state}
            </Text>
            <Text style={styles.value}>{order.deliveryAddress.postalCode}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Order Details</Text>
            <Text style={styles.value}>
              Date: {moment(order.createdAt).format('MMMM D, YYYY')}
            </Text>
            <Text style={styles.value}>
              Payment Status: {capitalCase(order.paymentStatus)}
            </Text>
            <Text style={styles.value}>
              Delivery: {order.deliveryMethod?.name || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>Item</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>
              Qty
            </Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>
              Price
            </Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>
              Total
            </Text>
          </View>
          {order.products.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.td, { flex: 2 }]}>{item.productName}</Text>
              <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>
                {item.quantity}
              </Text>
              <Text style={[styles.td, { flex: 1, textAlign: 'right' }]}>
                {currencyFormatter(item.price)}
              </Text>
              <Text style={[styles.td, { flex: 1, textAlign: 'right' }]}>
                {currencyFormatter(item.amount)}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {currencyFormatter(
                  order.transaction.subTotal ||
                    order.transaction.totalAmount -
                      (order.transaction.deliveryFee || 0),
                )}
              </Text>
            </View>
            {order.transaction.deliveryFee &&
            order.transaction.deliveryFee > 0 ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>
                  {currencyFormatter(order.transaction.deliveryFee)}
                </Text>
              </View>
            ) : null}
            {order.transaction.discount && order.transaction.discount > 0 ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={[styles.summaryValue, { color: 'green' }]}>
                  -{currencyFormatter(order.transaction.discount)}
                </Text>
              </View>
            ) : null}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {currencyFormatter(order.transaction.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your business! If you have any questions, please contact
          us.
          {'\n'}PharmaHub Medica
        </Text>
      </Page>
    </Document>
  )
}

export default InvoicePDF
