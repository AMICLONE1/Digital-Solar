# PowerNetPro Digital Solar Platform

Digital Solar Platform - Reserve solar capacity and reduce electricity bills without installing panels.

## Overview

PowerNetPro Digital Solar is a platform that enables users to reserve capacity from large solar plants and receive monthly credits on their electricity bills. Built with Next.js 14, TypeScript, and PostgreSQL.

## Features

- **Introductory Website**: Premium marketing site with Three.js animations
- **User Dashboard**: Track savings, credits, and project health
- **Solar Reservation**: Reserve capacity from available projects
- **Credit System**: Automatic monthly credit calculation and application
- **Bill Management**: BBPS integration for bill fetching and payment
- **KYC & Onboarding**: Multi-step verification and utility connection

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, GSAP
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Razorpay integration
- **Animations**: Three.js, GSAP, Lottie

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd digital-solar
```

2. Install dependencies
```bash
pnpm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Setup database
```bash
pnpm db:generate
pnpm db:migrate
```

5. Run development server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
digital-solar/
├── apps/
│   └── web/              # Next.js application
├── packages/
│   ├── ui/               # Shared UI components
│   ├── database/         # Prisma schema and client
│   └── config/           # Shared configurations
└── docs/                 # Documentation
```

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/kyc/*` - KYC verification
- `/api/projects/*` - Project management
- `/api/reserve` - Capacity reservation
- `/api/credits/*` - Credit calculation and ledger
- `/api/bills/*` - Bill fetching and payment
- `/api/payments/*` - Payment processing
- `/api/generation/*` - Generation data management

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio

## Deployment

The application is configured for deployment on Vercel. See deployment documentation for details.

## License

Proprietary - All rights reserved

