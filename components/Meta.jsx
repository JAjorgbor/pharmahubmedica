import Head from 'next/head'
import logo from '@/public/logo.png'

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
      {/* Twitter Card Data */}
      <meta name="twitter:title" content={`${titlePrefix} — ${titleSuffix}`} />
      <meta name="twitter:site" content="@pharmahubmedica" />
      <meta name="twitter:card" content="Pharmahubmedica" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@pharmahubmedica" />
      <meta name="twitter:image" content={ogImage} />
      {/* Open Graph data */}
      <meta property="og:title" content={`${titlePrefix} — ${titleSuffix}`} />
      <meta property="og:url" content="#" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:description" content={description} />
      {/* Credit */}
      <meta name="sitecredit" content="Developed by Joshua Ajorgbor" />
    </Head>
  )
}
Meta.defaultProps = {
  titlePrefix: 'Website',
  titleSuffix: 'Pharmahubmedica',
  description:
    'Pharmahubmedica: Your trusted pharmacy partner offering high-quality medicines, personalized consultations, and affordable healthcare solutions. Experience exceptional care for your health needs.',
  ogImage: 'https://pharmahubmedica.ng/jpg-logo.jpg',
}
