import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'

export function toWhatsAppNumber(
  phone: string,
  defaultCountry: CountryCode // e.g. 'NG', 'US', 'GB'
): string | null {
  const parsed = parsePhoneNumberFromString(phone, defaultCountry)

  if (!parsed || !parsed.isValid()) {
    return null
  }

  return parsed.format('E.164') // WhatsApp-ready
}
