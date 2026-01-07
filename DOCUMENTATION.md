# PowerNetPro Digital Solar - Complete Application Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Authentication System](#authentication-system)
7. [Database Schema](#database-schema)
8. [API Reference](#api-reference)
9. [Components](#components)
10. [Security](#security)
11. [Known Issues & Fixes](#known-issues--fixes)
12. [Improvement Roadmap](#improvement-roadmap)
13. [Setup Guide](#setup-guide)

---

## Overview

PowerNetPro Digital Solar is a web platform that enables users to reserve capacity from large solar plants and receive monthly credits on their electricity bills. The platform operates on a "Digital Solar" model where users don't need physical solar panels—they purchase a share of generation from utility-scale solar projects.

### Business Model
- Users reserve capacity (in kW) from solar projects
- Monthly credits are calculated based on actual generation
- Credits are applied to electricity bills via BBPS integration
- Revenue comes from capacity reservation fees

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  Next.js 14 (App Router) + React 18 + TypeScript            │
│  ├── Landing Page (Three.js, GSAP, Framer Motion)          │
│  ├── Dashboard (Recharts, Real-time data)                   │
│  └── Auth Pages (Supabase Auth)                             │
├─────────────────────────────────────────────────────────────┤
│                      API Layer                               │
│  Next.js API Routes (Route Handlers)                        │
│  ├── /api/auth/* - Authentication                           │
│  ├── /api/projects/* - Project management                   │
│  ├── /api/credits/* - Credit calculations                   │
│  ├── /api/bills/* - Bill management (BBPS)                  │
│  └── /api/payments/* - Payment processing (Razorpay)        │
├─────────────────────────────────────────────────────────────┤
│                     Data Layer                               │
│  Supabase (PostgreSQL + Auth + Real-time)                   │
│  ├── Row Level Security (RLS) policies                      │
│  ├── Automatic user profile creation                        │
│  └── Triggers for timestamps                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

### 1. Introductory Website
- **Hero Section**: Animated Three.js solar grid background
- **Problem Section**: Explains accessibility challenges
- **Solution Section**: Interactive capacity block visualization
- **Returns Section**: Interactive savings calculator with Recharts
- **Trust Section**: Compliance and security badges

### 2. User Authentication
- Email/password signup (no email confirmation required)
- Automatic login after signup
- Session management via Supabase

### 3. User Dashboard
- **Savings Summary**: Current month credits, lifetime savings
- **Monthly Credit Graph**: Historical credit visualization
- **Project Health**: Generation status indicators
- **Environmental Impact**: CO2 savings metrics
- **Bills Timeline**: Payment history

### 4. Solar Reservation
- Project selection with availability display
- Capacity slider (1-20 kW)
- Real-time savings projection
- Razorpay payment integration

### 5. Credit System
- Formula: `(User_kW / Total_Project_kW) × Actual_Generation_kWh × Fixed_Rate`
- Versioned calculation engine
- Audit-ready ledger
- Automatic monthly calculations

### 6. Bill Management
- BBPS integration for bill fetching
- Automatic credit application
- Payment processing

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with App Router |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Styling |
| Framer Motion | 10.x | Page animations |
| GSAP | 3.12.x | Scroll animations |
| Three.js | 0.159.x | 3D graphics |
| Recharts | 2.10.x | Charts |
| Zustand | 4.4.x | State management |
| Zod | 3.22.x | Validation |

### Backend
| Technology | Purpose |
|------------|---------|
| Supabase | Auth, Database, Real-time |
| PostgreSQL | Primary database |
| Prisma | ORM (legacy, for direct DB access) |

### Integrations
| Service | Purpose |
|---------|---------|
| Razorpay | Payment processing |
| BBPS | Bill fetching and payment |

---

## Project Structure

```
digital-solar/
├── apps/
│   └── web/                          # Next.js application
│       ├── app/                      # App Router pages
│       │   ├── api/                  # API routes
│       │   ├── dashboard/            # User dashboard
│       │   ├── login/                # Login page
│       │   ├── signup/               # Signup page
│       │   ├── onboarding/           # KYC + utility setup
│       │   ├── reserve/              # Capacity reservation
│       │   ├── bills/                # Bill management
│       │   └── page.tsx              # Landing page
│       ├── components/               # React components
│       │   ├── hero/                 # Hero section
│       │   ├── sections/             # Landing page sections
│       │   ├── dashboard/            # Dashboard widgets
│       │   ├── reserve/              # Reservation components
│       │   ├── nav/                  # Navigation
│       │   └── footer/               # Footer
│       ├── lib/                      # Utilities
│       │   ├── supabase/             # Supabase clients
│       │   ├── credit-engine.ts      # Credit calculation
│       │   ├── security.ts           # Encryption utilities
│       │   └── rbac.ts               # Role-based access control
│       └── __tests__/                # Unit tests
├── packages/
│   ├── database/                     # Prisma schema
│   ├── ui/                           # Shared UI components
│   └── config/                       # Shared configurations
├── supabase-schema.sql               # Database schema
└── playwright.config.ts              # E2E test config
```

---

## Authentication System

### Current Implementation
The application uses **Supabase Auth** with email/password authentication:

```typescript
// Signup
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { name },
    emailRedirectTo: undefined, // No email confirmation
  },
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

### User Flow
1. User signs up with email, password, and name
2. Auto-login after successful signup
3. Redirect to dashboard (or onboarding if profile incomplete)
4. Session persists via HTTP-only cookies

### Supabase Configuration
To disable email confirmation in Supabase:
1. Go to Supabase Dashboard → Authentication → Settings
2. Under "Email Auth", disable "Enable email confirmations"
3. Users can now log in immediately after signup

---

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  phone TEXT UNIQUE,
  name TEXT,
  kyc_status kyc_status DEFAULT 'PENDING',
  aadhaar_number TEXT UNIQUE,
  pan_number TEXT,
  utility_consumer_number TEXT,
  state TEXT,
  discom TEXT,
  role user_role DEFAULT 'USER',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Projects
```sql
CREATE TABLE public.projects (
  id UUID PRIMARY KEY,
  spv_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  total_kw DECIMAL(10, 2) NOT NULL,
  rate_per_kwh DECIMAL(10, 2) NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  status project_status DEFAULT 'DRAFT'
);
```

#### Credit Ledger
```sql
CREATE TABLE public.credit_ledgers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(12, 2) NOT NULL,
  type credit_ledger_type NOT NULL, -- EARNED, APPLIED, EXPIRED
  status credit_ledger_status DEFAULT 'PENDING',
  month INTEGER,
  year INTEGER,
  ref_id UUID,
  ref_type TEXT
);
```

### Enums
- `user_role`: USER, ADMIN, OPS, FINANCE
- `kyc_status`: PENDING, IN_PROGRESS, VERIFIED, REJECTED
- `project_status`: DRAFT, ACTIVE, FULLY_ALLOCATED, ARCHIVED
- `credit_ledger_type`: EARNED, APPLIED, EXPIRED
- `bill_status`: PENDING, PAID, OVERDUE, CANCELLED
- `payment_status`: PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED

---

## API Reference

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js handler (legacy) |
| `/api/auth/send-otp` | POST | Send OTP (legacy) |
| `/api/auth/verify-otp` | POST | Verify OTP (legacy) |
| `/api/auth/logout` | POST | Logout user |

### Projects
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/projects` | GET | List active projects |
| `/api/projects/[id]` | GET | Get project details |
| `/api/projects/[id]/availability` | GET | Get available capacity |
| `/api/projects/my-projects` | GET | Get user's reservations |

### Credits
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/credits/available` | GET | Get available credits |
| `/api/credits/calculate` | POST | Calculate credits |
| `/api/credits/ledger` | GET | Get credit ledger |

### Bills
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bills` | GET | List user's bills |
| `/api/bills/fetch` | POST | Fetch bill from BBPS |
| `/api/bills/pay` | POST | Pay bill |

### Dashboard
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/dashboard/savings` | GET | Get savings summary |
| `/api/dashboard/credits-history` | GET | Get credit history |
| `/api/dashboard/environmental-impact` | GET | Get environmental metrics |

---

## Components

### Landing Page Components

| Component | File | Description |
|-----------|------|-------------|
| Navigation | `components/nav/Navigation.tsx` | Fixed navbar with auth state |
| Hero | `components/hero/Hero.tsx` | Animated hero with CTAs |
| ThreeScene | `components/hero/ThreeScene.tsx` | 3D solar grid animation |
| ProblemSection | `components/sections/ProblemSection.tsx` | Problem statement |
| SolutionSection | `components/sections/SolutionSection.tsx` | Solution with capacity blocks |
| ReturnsSection | `components/sections/ReturnsSection.tsx` | Savings calculator |
| TrustSection | `components/sections/TrustSection.tsx` | Trust indicators |
| Footer | `components/footer/Footer.tsx` | Site footer |

### Dashboard Components

| Component | File | Description |
|-----------|------|-------------|
| SavingsSummary | `components/dashboard/SavingsSummary.tsx` | Credit summary card |
| MonthlyCreditGraph | `components/dashboard/MonthlyCreditGraph.tsx` | Credit history chart |
| ProjectHealthIndicator | `components/dashboard/ProjectHealthIndicator.tsx` | Project status |
| EnvironmentalImpact | `components/dashboard/EnvironmentalImpact.tsx` | CO2 savings |
| BillsTimeline | `components/dashboard/BillsTimeline.tsx` | Bill history |

### Reservation Components

| Component | File | Description |
|-----------|------|-------------|
| ProjectSelector | `components/reserve/ProjectSelector.tsx` | Project selection grid |
| CapacitySlider | `components/reserve/CapacitySlider.tsx` | kW selection slider |
| SavingsProjection | `components/reserve/SavingsProjection.tsx` | Projected savings |
| PaymentSection | `components/reserve/PaymentSection.tsx` | Payment form |

---

## Security

### Implemented Security Measures

1. **Row Level Security (RLS)**
   - Users can only access their own data
   - Projects are publicly readable

2. **HTTPS Only Cookies**
   - Session tokens stored in HTTP-only cookies

3. **Security Headers** (via Next.js config)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: origin-when-cross-origin

4. **Encryption Utilities**
   - AES-256-GCM encryption for sensitive data
   - PBKDF2 key derivation
   - Secure hashing with salt

5. **Input Validation**
   - Zod schema validation on API inputs
   - XSS prevention through input sanitization

6. **RBAC (Role-Based Access Control)**
   - USER, ADMIN, OPS, FINANCE roles
   - Permission-based access control

### Security Recommendations

1. **Enable Rate Limiting** on auth endpoints
2. **Add CSRF Protection** for forms
3. **Implement Audit Logging** for sensitive operations
4. **Add 2FA** for admin users
5. **Regular Security Audits** of dependencies

---

## Known Issues & Fixes

### Critical Issues (Fixed)

#### 1. ❌ Missing Supabase Environment Variables
**Error**: `Your project's URL and Key are required to create a Supabase client!`
**Fix**: Updated middleware and client to handle missing env vars gracefully

#### 2. ❌ Missing 'critters' Module
**Error**: `Cannot find module 'critters'`
**Cause**: `experimental.optimizeCss: true` in next.config.js
**Fix**: Removed experimental optimizeCss option

#### 3. ❌ Inconsistent Auth System
**Issue**: Mixed NextAuth and Supabase auth
**Fix**: Migrated to Supabase-only authentication

### Remaining Issues

#### 1. ⚠️ API Routes Still Use Prisma
Some API routes (e.g., `/api/dashboard/savings`) still use Prisma instead of Supabase client.

#### 2. ⚠️ Missing Lottie Animations
Placeholder animations in ProblemSection need actual Lottie JSON files.

#### 3. ⚠️ Missing Pages
- `/about` - About page
- `/contact` - Contact page
- `/faq` - FAQ page
- `/settings` - User settings

---

## Improvement Roadmap

### Phase 1: Critical Fixes (Immediate)
- [x] Fix Supabase environment variable handling
- [x] Remove experimental CSS optimization
- [x] Fix inconsistent auth (Reserve page)
- [ ] Migrate all API routes to Supabase
- [ ] Add proper error boundaries

### Phase 2: UX Improvements (Week 1-2)
- [ ] Add loading skeletons instead of spinners
- [ ] Improve form validation feedback
- [ ] Add password strength indicator
- [ ] Add "Forgot Password" flow
- [ ] Improve mobile responsiveness
- [ ] Add toast notifications for actions

### Phase 3: Landing Page Enhancements (Week 2-3)
- [ ] Add actual Lottie animations
- [ ] Improve Three.js scene (solar panels, energy flow)
- [ ] Add testimonials section
- [ ] Add FAQ section
- [ ] Add pricing comparison table
- [ ] Improve hero CTA visibility

### Phase 4: Feature Completions (Week 3-4)
- [ ] Complete onboarding flow
- [ ] Implement real KYC verification (Aadhaar/PAN API)
- [ ] Complete BBPS integration
- [ ] Add email notifications
- [ ] Add referral system

### Phase 5: Security Hardening (Ongoing)
- [ ] Add rate limiting
- [ ] Implement audit logging
- [ ] Add admin 2FA
- [ ] Security audit
- [ ] GDPR compliance

---

## Setup Guide

### Prerequisites
- Node.js 18+
- pnpm 8+
- Supabase account

### Installation

1. **Clone and Install**
```bash
git clone <repository>
cd digital-solar
pnpm install
```

2. **Configure Environment**
Create `apps/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Setup Supabase**
- Create a Supabase project
- Run `supabase-schema.sql` in SQL Editor
- Disable email confirmation in Auth settings

4. **Run Development Server**
```bash
pnpm dev
```

5. **Access Application**
Navigate to `http://localhost:3000`

### Production Deployment
1. Deploy to Vercel (recommended)
2. Set environment variables in Vercel dashboard
3. Configure custom domain in Supabase
4. Enable email service for notifications

---

## Support

For issues or questions:
- Check existing documentation
- Review GitHub Issues
- Contact development team

---

*Documentation last updated: January 2026*

