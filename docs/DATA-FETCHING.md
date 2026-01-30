# Data Fetching Patterns

We use a hybrid approach to data fetching, leveraging both **Server-Side Fetching** (for initial load/SEO) and **Client-Side SWR** (for interactivity and real-time updates).

## 1. Server-Side Fetching (`apiFetch`)

For Server Components within the `app` directory, we use a custom `apiFetch` wrapper.

- **Location**: `api-client/fetch-client.ts`
- **When to use**: Initial page loads, SEO-critical data.
- **Example**:

```tsx
const data = await apiFetch(`/products/${slug}`, {
  next: { revalidate: 3600 }, // ISR pattern
})
```

## 2. Client-Side Reactive Fetching (`useSWR`)

For interactive components, we use **SWR** (Stale-While-Revalidate).

- **Pattern**: Custom hooks wrapping `useSWR`.
- **Location**: `hooks/requests/`
- **When to use**: Pagination, search filters, form submissions, and user-specific data.
- **Example**:

```tsx
const { productsData, productsLoading } = useGetCategoryProducts({
  slug,
  params: { page: 1 },
})
```

## 3. Axios Client (`site/request-adapter.ts`)

For non-GET requests (POST, PATCH, DELETE) and complex client-side logic, we use an Axios instance.

- **Auth Interceptors**: Handles `accessToken` injection and automatic token refresh via `refresh-tokens` endpoint.
- **Error Handling**: Standardized response error formatting.

## 📁 Request Organization

- `api-client/site/requests/*.ts`: Function definitions for public site requests.
- `api-client/admin/requests/*.ts`: Function definitions for admin dashboard requests.
- `api-client/interfaces/*.ts`: TypeScript interfaces for request/response payloads.

## 💡 Best Practices

- **Prefer SWR** for any data that needs to stay in sync with UI state (like filters).
- **Use Shell Components** to bridge Server and Client fetching (e.g., fetching initial data on server and passing it as `fallbackData` to SWR).
