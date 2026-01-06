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
      credentials: 'include',
      signal: controller.signal,
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      const error = { status: res.status, data: errorData }
      return { error }
    }

    return { data: res.json() }
  } catch (error) {
    return { error }
  } finally {
    clearTimeout(timeout)
  }
}
