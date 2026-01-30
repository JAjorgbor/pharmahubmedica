# PharmaHub Medica v2.0 - Platform Rebirth

**Welcome to the all-new PharmaHub Medica.**

Version 2.0 represents a fundamental transformation of our technology and user experience. We have moved away from third-party CMS constraints (Sanity) to a fully custom, high-performance architecture built on **Express.js and MongoDB**.

This shift has allowed us to build bespoke experiences for every user type: the public customer, the loyal account holder, and the internal administration team.

---

## 🏗 Architectural Revolution

- **From Headless CMS to Custom Backend**:
  - **Previous**: Relied on Sanity for data storage and management.
  - **New**: A dedicated **Express.js** API paired with **MongoDB**. This provides limitless flexibility for complex business logic, custom workflows, and faster data processing.
- **Owned Storage Infrastructure**: Migrated media assets to **Cloudflare R2**, ensuring high availability and reduced dependency on CMS limits.

---

## 🖥 1. The Custom Admin Console

_Replaced the generic Sanity Studio with a purpose-built Command Center._

- **Complete Control**: A fully custom React-based dashboard tailored specifically for PharmaHub's operations.
- **Advanced Inventory Management**: Granular control over Products, Categories, and Stock levels with stock filtering and bulk options.
- **Order Operations**: Complex order processing flows, status tracking, and automated receipt generation.
- **Customer Intelligence**: Deep insights into customer data, order history, and direct management of specific user accounts.
- **Referral Management**: A dedicated module to manage partners, track commissions, and handle payouts—logic that was impossible in the previous generic setup.

---

## 👤 2. The Customer Portal

_A completely new ecosystem for user retention and self-service._

- **Account Management**: Users can now register, log in, and manage their personal profiles securely.
- **Order History & Tracking**: Real-time visibility into past and current orders.
- **Dynamic Invoicing**:
  - **Auto-Receipts**: Instant generation of official receipts for paid orders.
  - **Invoices**: Professional invoice generation for pending payments.
- **Partner Program**: A dedicated interface for Referral Partners to track their performance and payouts.

---

## 🎨 3. Visual & UX Overhaul (Storefront)

_A premium, trustworthy aesthetic designed to convert._

- **Total Redesign**: Every page (Home, About, Collections) has been rebuilt with a focus on visual hierarchy, motion (Framer Motion), and professional pharmaceutical aesthetics.
- **Trust & Compliance**:
  - Integration of comprehensive **Privacy Policy** and **Terms & Conditions**.
  - "Why Choose Us" and Trust Signals (Licensing, Support) prominently featured.
- **Streamlined Mobile Experience**: A re-engineered mobile drawer and navigation system for seamless browsing on any device.

---

## � Summary of Changes

| Feature Area      | v1 (Old Sanity App)          | v2 (New Custom App)                  |
| :---------------- | :--------------------------- | :----------------------------------- |
| **Backend**       | Sanity Cloud (Limited Logic) | **Express + MongoDB (Custom Logic)** |
| **Admin**         | Generic Sanity Studio        | **Bespoke Admin Dashboard**          |
| **User Accounts** | Non-existent / Basic         | **Full User Portal & Auth**          |
| **Assets**        | Sanity CDN                   | **Cloudflare R2**                    |
| **Design**        | Basic Template Structure     | **Premium, Motion-Rich UI**          |
