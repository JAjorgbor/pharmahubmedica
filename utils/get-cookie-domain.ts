export default function getCookieDomain() {
  const host = window.location.hostname // no port
  if (host === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    return undefined // host-only cookie
  }

  const parts = host.split('.')
  if (parts.length <= 2) return `.${host}`

  // best-effort: example.com from admin.example.com
  return `.${parts.slice(-2).join('.')}`
}
