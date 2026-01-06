type ApiFetchOptions = RequestInit & {
  timeoutMs?: number
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? 30_000
  )

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      credentials: 'include', // ← withCredentials
      signal: controller.signal,
    })

    return res.json()
  } catch (error) {
    throw error
  } finally {
    clearTimeout(timeout)
  }
}
