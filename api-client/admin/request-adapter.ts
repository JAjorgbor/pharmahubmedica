import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
})

// === Refresh Token Lock Logic ===
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get('adminAccessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config

    if (
      (error?.response &&
        error.response?.status === 401 &&
        error.response?.data?.message !== 'Incorrect email or password' &&
        !originalConfig._retry) ||
      (error.response.status === 403 &&
        error.response &&
        !originalConfig._retry)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`
              resolve(axiosInstance(originalConfig))
            },
            reject: (err: any) => {
              reject(err)
            },
          })
        })
      }

      originalConfig._retry = true // Mark as retried
      isRefreshing = true

      try {
        const { data } = await axiosInstance.post('admin/auth/refresh-tokens')

        Cookies.set('adminAccessToken', data.accessToken)
        axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`
        processQueue(null, data.accessToken)

        originalConfig.headers.Authorization = `Bearer ${data.accessToken}`

        return axiosInstance(originalConfig) // Retry original request with new token
      } catch (error) {
        processQueue(error, null)

        const whiteListedAdminRoutes = [
          '/admin',
          '/admin/verify-access',
          '/admin/reset-password',
        ]
        console.log(error)
        const cookieJar = Cookies.get() // Get all existing cookies
        for (const cookieName in cookieJar) {
          Cookies.remove(cookieName) // Remove each cookie
        }

        const pathname = window.location.pathname
        window.location.href = `/admin?callback=${pathname}`
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error.response)
  }
)

export default axiosInstance
