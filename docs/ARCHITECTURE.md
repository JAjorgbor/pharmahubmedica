# Frontend Architecture & Patterns

This project is built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It follows a modular structure separated into Public (`site`) and Administrative (`admin`) sections.

## 📁 Key Folders

- `/app`: Contains all application routes.
  - `(site)`: Public-facing pages (Home, Collections, Products).
  - `(admin)`: Administrative dashboard and internal tools.
- `/components`: Reusable UI components.
  - `(site)`: Components specific to consumer pages.
  - `admin`: Components specific to the admin dashboard.
  - `elements`: Generic building blocks (Inputs, Modals, etc.).
- `/api-client`: Logic for communicating with the backend API.
- `/hooks`: Custom React hooks, including data fetching hooks under `/requests`.

## 🏗️ Core Patterns

### 1. Unified Design System

We use **HeroUI** (formerly NextUI) as our base component library.

- **Customization**: Styles are centralized in `hero.ts` and `styles/globals.css`.
- **Animations**: **Framer Motion** is used for smooth transitions and entry animations.

### 2. Client-Side State & Logic

- **Forms**: Managed with `react-hook-form` and validated with `zod`.
- **Icons**: Standardized using `react-icons` (specifically the `Lu` - Lucide set).

### 3. Responsive Design

Mobile-first approach using Tailwind utility classes. For complex conditional rendering, we use a custom `useMediaQuery` hook.

## 🚀 Development Flow

1. **Define Interface**: Add types in `api-client/interfaces`.
2. **Create Request**: Add the API call in `api-client/site/requests` or `api-client/admin/requests`.
3. **Draft Hook**: Creating an SWR hook in `hooks/requests` for reactivity.
4. **Build Component**: Create the UI in `components/`, using HeroUI and Tailwind.
5. **Add Page**: Implement the route in `app/`.
