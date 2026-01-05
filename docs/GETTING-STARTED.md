# Getting Started for Developers

Welcome to the PharmaHub Medica project! This guide will help you get your local environment set up and introduce you to our development workflow.

## 🛠️ Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **PNPM**: Package manager (install via `npm install -g pnpm`)
- **Git**

## 🏗️ Project Components

The project consists of two main repositories:

1. `pharmahubmedica`: Next.js Frontend.
2. `pharmahubmedica-api`: Node.js/Express API Backend.

## 🚀 Setup Instructions

### 1. API Backend

```bash
cd pharmahubmedica-api
pnpm install
# Configure your .env file based on .env.example
pnpm run dev
```

### 2. Frontend

```bash
cd pharmahubmedica
pnpm install
# Configure your .env.local file (ensure NEXT_PUBLIC_API_URL is set)
pnpm run dev
```

## 📚 Essential Documentation

Before you start coding, please review these key documents:

- **Frontend Patterns**:
  - [Architecture Overview](./pharmahubmedica/docs/ARCHITECTURE.md)
  - [Data Fetching (SWR & Fetch)](./pharmahubmedica/docs/DATA-FETCHING.md)
- **Backend Patterns**:
  - [API Design & Architecture](./pharmahubmedica-api/docs/ARCHITECTURE.md)

## 💬 Communication & Standards

- **Commit Messages**: Use descriptive titles.
- **Styling**: We use Tailwind CSS. Please stick to the design tokens in `hero.ts`.
- **TypeScript**: Always define interfaces for API responses.

## 🤝 Need Help?

If you're stuck, refer to the individual `README.md` files in each project root or reach out to the team leads.
