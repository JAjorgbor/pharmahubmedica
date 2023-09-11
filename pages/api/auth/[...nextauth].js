import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from "next-auth/providers/yandex";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET
    })
  ],
  secret: process.env.JWT_SECRET,
  theme: {
    brandColor: '#031D91', // Hex color code
    logo: 'https://pharmahubmedica.ng/png-transparent-logo.png', // Absolute URL to image
  },
}
export default NextAuth(authOptions)
