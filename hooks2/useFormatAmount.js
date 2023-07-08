export default function useFormatAmount(amount) {
  const result = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount)
  return result
}
