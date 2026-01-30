import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

const clearAllCookies = () => {
  Object.keys(Cookies.get()).forEach((k) => Cookies.remove(k))
}

const redirectToPortalLogin = () => {
  if (typeof window === 'undefined') return
  const path = window.location.pathname
  if (['/portal', '/portal/reset-password'].includes(path)) return
  window.location.replace(`/portal?callback=${encodeURIComponent(path)}`)
}

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('portalAccessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (!error?.response) return Promise.reject(error)

    const original = error.config
    const status = error.response.status
    const msg = error.response.data?.message

    const shouldRefresh =
      !original._retry &&
      status === 401 &&
      msg !== 'Incorrect email or password' &&
      !original.url?.includes('portal/auth/refresh-tokens')

    if (!shouldRefresh) return Promise.reject(error.response)

    original._retry = true

    try {
      const { data } = await refreshClient.post('portal/auth/refresh-tokens')
      if (!data?.accessToken) throw new Error('No access token returned')

      Cookies.set('portalAccessToken', data.accessToken, { expires: 60 })
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
      original.headers.Authorization = `Bearer ${data.accessToken}`

      return axiosInstance(original)
    } catch (error) {
      clearAllCookies()
      redirectToPortalLogin()
      return Promise.reject(error.response)
    }
  }
)

export default axiosInstance
