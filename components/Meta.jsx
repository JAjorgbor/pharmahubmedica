import Head from 'next/head'
import logo from '@/public/logo.svg'

export default function Meta({
  titlePrefix,
  titleSuffix,
  description,
  ogImage,
}) {
  return (
    <Head>
      <title>{`${titlePrefix} | ${titleSuffix}`}</title>
      <meta name="description" content={description} />
      {/* Default Meta */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0"
      />
      <meta name="theme-color" content="#1a20f6" />
      {/* Favicon & Icons */}
      <link
        href='/logo.svg'
        type="image/png"
        rel="shortcut icon"
      />
      {/* Open Graph data */}
      <meta property="og:title" content={`${titlePrefix} — ${titleSuffix}`} />
      <meta property="og:url" content="#" />
      <meta
        property="og:image"
        content={ogImage}
      />
      <meta property="og:description" content={description} />
      {/* Credit */}
      <meta name="sitecredit" content="Joshua Ajorgbor" />
    </Head>
  )
}
Meta.defaultProps = {
  titlePrefix: 'Website',
  titleSuffix: 'Pharmahubmedica',
  description:
    'Pharmahubmedica: Your trusted pharmacy partner offering high-quality medicines, personalized consultations, and affordable healthcare solutions. Experience exceptional care for your health needs.',
    ogImage:'/logo.svg'
}
