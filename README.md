<div align="center">

# 🌿 Aapla Bazaar

### Fresh Vegetables & Groceries — Delivered in Minutes

**A full-stack quick-commerce platform connecting local farmers in Nashik directly with households, with farm-fresh produce delivered in under 30 minutes.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](#-license)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Environment Variables](#environment-variables)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 📖 About the Project

**Aapla Bazaar** (Marathi for *"Our Bazaar"*) is a hyperlocal grocery delivery platform built to bridge the gap between local farmers/suppliers and urban households in **Nashik, Maharashtra**. The platform enables customers to browse, order, and receive fresh vegetables, fruits, dairy, grains, spices, and grocery essentials delivered to their doorstep in an average of **25 minutes**.

By cutting out multiple layers of intermediaries, Aapla Bazaar:

- 🧑‍🌾 Helps **farmers earn ~40% more** per kilogram than traditional mandi routes
- 🛒 Offers customers prices **up to 30% lower** than organised retail
- 🌱 Promotes **zero-plastic packaging** and carbon-neutral delivery goals
- 📍 Currently serves **50,000+ customers** with **200+ farmer partners** across 3 districts

> 📄 This repository includes the full **frontend (React)**, **backend architecture**, **database schema**, and **project documentation**.

---

## ✨ Features

### Customer-facing
- 🏠 Multi-page storefront — Home, Shop, Deals, Track Order, Contact, Login/Signup
- 🔍 Product search with category filters and sort (price, name)
- 🛒 Live shopping cart with quantity controls (powered by `useReducer`)
- 🔥 Flash deals page with a real-time countdown timer
- 📦 Animated, real-time order tracking (5-stage progress)
- 🔐 Dual authentication — phone/email login with OTP support
- 🔔 Toast notification system via React Context

### Supplier / Organisation
- 🏢 Dedicated business login & registration portal
- 🚜 Farmer/supplier/retailer/delivery-partner role types
- 📊 Org dashboard for sales analytics, inventory & order management
- ✅ Admin-controlled supplier approval workflow

### Backend & Infrastructure
- 🗄️ 10-table normalised PostgreSQL schema with full referential integrity
- 🌐 38 REST API endpoints across 7 route groups
- ⚡ Redis caching, rate limiting, and pub/sub for order events
- 💳 Razorpay integration (UPI, cards, net banking, COD)
- 📱 Twilio OTP verification & Firebase push notifications
- 🗺️ Google Maps integration for delivery ETA & live tracking
- 🔒 JWT auth with refresh token rotation, Zod validation, Helmet.js

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 (Hooks, Context API, `useReducer`), JSX |
| **Styling** | Inline styles + CSS variables, Baloo 2 & DM Sans fonts |
| **Backend** | Node.js 20 LTS, Express 4, TypeScript |
| **ORM** | Prisma 5 |
| **Database** | PostgreSQL 16 (primary), Redis 7 (cache/sessions) |
| **Auth** | JWT (access + refresh tokens), Twilio Verify (OTP), bcrypt |
| **Payments** | Razorpay (UPI / Cards / Net Banking / COD) |
| **Notifications** | Firebase Cloud Messaging, SendGrid (email) |
| **Maps & Delivery** | Google Maps Platform |
| **Storage** | AWS S3 + CloudFront |
| **DevOps** | Docker, Docker Compose, GitHub Actions, Nginx, PM2 |
| **Validation** | Zod |
| **Testing** | Jest, Supertest |

> 🚀 **Planned AI/ML additions**: recommendation engine, demand forecasting, dynamic pricing, LLM-powered support chatbot, and computer-vision quality checks. See [Roadmap](#-roadmap).

---

## 🏗 System Architecture

Aapla Bazaar follows a **four-tier architecture**:

```
┌─────────────────────────────────────────────┐
│                CLIENT LAYER                  │
│   React SPA · Mobile App · Org Dashboard     │
└──────────────────────┬────────────────────────┘
                        │ HTTPS / REST
┌──────────────────────▼────────────────────────┐
│                API GATEWAY                    │
│  Express · JWT Auth · Rate Limiting · Zod     │
└──────────────────────┬────────────────────────┘
                        │
┌──────────────────────▼────────────────────────┐
│               SERVICE LAYER                   │
│  Auth · Products · Orders · Payments ·        │
│  Delivery (router → controller → service)     │
└──────────────────────┬────────────────────────┘
                        │
┌──────────────────────▼────────────────────────┐
│                DATA LAYER                     │
│  PostgreSQL 16 · Redis 7 · AWS S3             │
└──────────────────────┬────────────────────────┘
                        │
┌──────────────────────▼────────────────────────┐
│            EXTERNAL SERVICES                  │
│  Razorpay · Twilio · Firebase FCM ·           │
│  Google Maps · SendGrid                       │
└─────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
aapla-bazaar/
│
├── README.md
├── LICENSE
│
├── frontend/                      # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx                # Root component — routing + layout shell
│   │   ├── index.js
│   │   ├── pages/                 # HomePage, ShopPage, DealsPage, TrackPage,
│   │   │                          # ContactPage, LoginPage, SignupPage, OrgLoginPage
│   │   ├── components/
│   │   │   ├── layout/            # Navbar, CartSidebar, Footer
│   │   │   ├── common/            # ProductCard, CategoryCard, StatCard
│   │   │   ├── home/               # HeroSection, OffersBanner, Testimonials
│   │   │   ├── shop/               # SearchBar, CategorySidebar, ProductGrid
│   │   │   └── auth/                # AuthCard, LoginForm, OrgLoginForm
│   │   ├── context/                # CartContext, ToastContext
│   │   ├── hooks/                   # useCountdown, useProducts
│   │   ├── data/                    # products.js, categories.js
│   │   ├── utils/                   # price.js
│   │   └── styles/                  # global.css, components.css
│   └── package.json
│
├── backend/                        # Node.js / Express API
│   ├── src/
│   │   ├── config/                 # db.ts, redis.ts, env.ts
│   │   ├── middleware/             # auth.ts, role.ts, rateLimit.ts, validate.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── payments/
│   │   │   ├── delivery/
│   │   │   ├── users/
│   │   │   └── org/
│   │   ├── utils/                  # jwt.ts, otp.ts, mailer.ts, sms.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
└── docs/
    ├── AaplaBazaar_Full_Report.docx   # Project report (Abstract → Conclusion)
    └── architecture-diagrams/
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20.x and npm ≥ 10.x
- [Docker](https://www.docker.com/) & Docker Compose (for PostgreSQL + Redis)
- [Git](https://git-scm.com/)

```bash
git clone https://github.com/<your-username>/aapla-bazaar.git
cd aapla-bazaar
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app runs at **http://localhost:3000**

### Backend Setup

```bash
cd backend
npm install

# Start PostgreSQL + Redis via Docker
docker compose up -d postgres redis

# Run Prisma migrations
npx prisma migrate dev

# Start the dev server
npm run dev
```

The API runs at **http://localhost:5000/api/v1**

### Environment Variables

Copy `.env.example` to `.env` in the `backend/` directory and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | JWT signing secrets |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay payment credentials |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_VERIFY_SID` | Twilio OTP credentials |
| `FIREBASE_SERVICE_ACCOUNT` | Path to Firebase service account JSON |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_S3_BUCKET` | AWS S3 media storage |
| `GOOGLE_MAPS_API_KEY` | Google Maps Platform key |
| `SENDGRID_API_KEY` | SendGrid email API key |

> See `.env.example` for the full list with descriptions.

---

## 🗄 Database Schema

10 normalised PostgreSQL tables managed via Prisma:

| Table | Description |
|---|---|
| `users` | Customers & admins — role enum, hashed password, addresses (JSONB) |
| `organizations` | Farmers/suppliers/retailers — linked via `owner_id` |
| `products` | Full catalog — category, price, stock, images, attributes (JSONB) |
| `orders` | Order lifecycle — status enum, delivery address snapshot |
| `order_items` | Line items — price snapshot at time of purchase |
| `payments` | Razorpay IDs, payment method, status, refunds |
| `deliveries` | Rider assignment, live location (JSONB), delivery OTP |
| `reviews` | Product ratings & verified-purchase reviews |
| `coupons` | Discount codes — type, value, usage limits |
| `notifications` | User notifications — FCM payload, read status |

---

## 🌐 API Reference

Base URL: `/api/v1` · All protected routes require `Authorization: Bearer <jwt>`

| Group | Base Route | Endpoints | Examples |
|---|---|---|---|
| **Auth** | `/auth` | 6 | `POST /register`, `POST /login`, `POST /otp/verify` |
| **Users** | `/users` | 6 | `GET /me`, `PUT /me`, `GET /me/orders` |
| **Products** | `/products` | 7 | `GET /products`, `GET /products/search`, `GET /products/deals` |
| **Cart** | `/cart` | 4 | `GET /cart`, `POST /cart/items`, `PATCH /cart/items/:id` |
| **Orders** | `/orders` | 8 | `POST /orders`, `GET /orders/:id/track`, `POST /orders/:id/cancel` |
| **Payments** | `/payments` | 5 | `POST /payments/initiate`, `POST /payments/webhook` |
| **Org/Admin** | `/org` | 6 | `POST /org/register`, `GET /org/dashboard`, `PATCH /admin/org/:id/approve` |

---

## 🖼 Screenshots

| Home / Product Listing | Shop & Cart |
|---|---|
| *Hero, categories, featured products* | *Search, filters, slide-in cart* |

| Authentication | Order Tracking |
|---|---|
| *Customer & business login tabs* | *Live 5-stage progress tracker* |

> Add screenshots to `docs/screenshots/` and reference them here.

---

## 🗺 Roadmap

- [ ] React Native mobile app (iOS & Android)
- [ ] Real-time order tracking via WebSockets (Socket.io)
- [ ] AI-powered product recommendations (collaborative filtering)
- [ ] Demand forecasting for farmers (Prophet / time-series)
- [ ] LLM-powered customer support chatbot (RAG + LangChain)
- [ ] Computer vision produce-quality grading
- [ ] Subscription-based recurring delivery
- [ ] Multi-city expansion (Pune, Aurangabad)
- [ ] PWA offline support

See [open issues](../../issues) for the full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions make the open-source community amazing. Any contributions are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 📬 Contact

**Aapla Bazaar** — Pune , Maharashtra , India

📧 hello@aaplabazaar.in

Project Link: not yet published 

---

<div align="center">

*Built with ❤️ for Pune's local farmers and households.*

</div>
