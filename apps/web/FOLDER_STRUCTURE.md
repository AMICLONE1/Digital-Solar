# PowerNetPro Digital Solar - Folder Structure

## 📁 Current Structure (Cleaned & Optimized)

```
apps/web/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Authentication routes (route group)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/              # Protected dashboard routes (route group)
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── reserve/
│   │   │   └── page.tsx
│   │   ├── bills/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── onboarding/
│   │       └── page.tsx
│   │
│   ├── (marketing)/              # Public marketing pages (route group)
│   │   ├── page.tsx              # Landing page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── compliance/
│   │       └── page.tsx
│   │
│   ├── api/                      # API Routes (organized by domain)
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── check/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   ├── users/                # User management
│   │   │   ├── preferences/
│   │   │   │   └── route.ts
│   │   │   └── update-utility/
│   │   │       └── route.ts
│   │   ├── projects/             # Solar projects
│   │   │   ├── route.ts
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts
│   │   │   │   └── availability/
│   │   │   │       └── route.ts
│   │   │   └── my-projects/
│   │   │       └── route.ts
│   │   ├── reservations/         # Capacity reservations
│   │   │   └── route.ts
│   │   ├── bills/                # Bill management
│   │   │   ├── route.ts
│   │   │   ├── fetch/
│   │   │   │   └── route.ts
│   │   │   └── pay/
│   │   │       └── route.ts
│   │   ├── credits/              # Credit system
│   │   │   ├── available/
│   │   │   │   └── route.ts
│   │   │   ├── calculate/
│   │   │   │   └── route.ts
│   │   │   └── ledger/
│   │   │       └── route.ts
│   │   ├── payments/             # Payment processing
│   │   │   ├── create-order/
│   │   │   │   └── route.ts
│   │   │   └── webhook/
│   │   │       └── route.ts
│   │   ├── notifications/        # Notifications
│   │   │   └── route.ts
│   │   ├── referrals/            # Referral system
│   │   │   └── route.ts
│   │   ├── activity/             # Activity logging
│   │   │   └── route.ts
│   │   ├── export/               # Data export
│   │   │   └── savings-report/
│   │   │       └── route.ts
│   │   ├── kyc/                  # KYC verification
│   │   │   ├── status/
│   │   │   │   └── route.ts
│   │   │   └── verify/
│   │   │       └── route.ts
│   │   ├── generation/           # Generation data
│   │   │   ├── [projectId]/
│   │   │   │   └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts
│   │   │   └── validate/
│   │   │       └── route.ts
│   │   ├── dashboard/            # Dashboard data
│   │   │   ├── savings/
│   │   │   │   └── route.ts
│   │   │   ├── credits-history/
│   │   │   │   └── route.ts
│   │   │   └── environmental-impact/
│   │   │       └── route.ts
│   │   ├── health/               # Health checks
│   │   │   └── route.ts
│   │   └── manifest.json/        # PWA manifest
│   │       └── route.ts
│   │
│   ├── check-auth/               # Auth status checker (dev tool)
│   │   └── page.tsx
│   │
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Global styles
│   ├── robots.ts                  # SEO robots.txt
│   └── sitemap.ts                 # SEO sitemap
│
├── components/                    # React Components
│   ├── ui/                        # Base UI components (reusable)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── FormField.tsx
│   │   ├── PasswordStrength.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ClientOnly.tsx
│   │   └── index.ts               # Barrel export
│   │
│   ├── layout/                    # Layout components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   │
│   ├── features/                  # Feature-specific components
│   │   ├── auth/                  # Authentication components
│   │   │   └── (future: login form, signup form)
│   │   ├── dashboard/             # Dashboard components
│   │   │   ├── SavingsSummary.tsx
│   │   │   ├── MonthlyCreditGraph.tsx
│   │   │   ├── BillsTimeline.tsx
│   │   │   ├── ProjectHealthIndicator.tsx
│   │   │   └── EnvironmentalImpact.tsx
│   │   ├── reserve/               # Reservation components
│   │   │   ├── ProjectSelector.tsx
│   │   │   ├── CapacitySlider.tsx
│   │   │   ├── SavingsProjection.tsx
│   │   │   └── PaymentSection.tsx
│   │   ├── bills/                 # Bill management components
│   │   │   ├── CurrentBillCard.tsx
│   │   │   ├── BillHistory.tsx
│   │   │   └── CreditsBreakdown.tsx
│   │   ├── settings/              # Settings components
│   │   │   └── UserPreferences.tsx
│   │   ├── notifications/        # Notification components
│   │   │   └── NotificationCenter.tsx
│   │   ├── referrals/             # Referral components
│   │   │   └── ReferralSection.tsx
│   │   └── export/                # Export components
│   │       └── ExportButton.tsx
│   │
│   ├── marketing/                 # Marketing page components
│   │   ├── hero/                  # Hero section
│   │   │   ├── Hero.tsx
│   │   │   └── ThreeScene.tsx
│   │   └── sections/              # Landing page sections
│   │       ├── ProblemSection.tsx
│   │       ├── SolutionSection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── SavingsCalculator.tsx
│   │       ├── ComparisonTable.tsx
│   │       ├── StatsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── TrustSection.tsx
│   │       ├── ReturnsSection.tsx
│   │       └── FinalCTASection.tsx
│   │
│   └── providers/                 # Context providers
│       └── MonitoringProvider.tsx
│
├── lib/                           # Utilities & Helpers
│   ├── supabase/                  # Supabase clients
│   │   ├── client.ts              # Browser client
│   │   ├── server.ts              # Server client
│   │   └── middleware.ts          # Auth middleware
│   │
│   ├── api/                       # API utilities
│   │   ├── client.ts              # API client with retry logic
│   │   ├── middleware.ts          # API middleware (auth, rate limiting)
│   │   └── types.ts               # API response types
│   │
│   ├── utils/                     # General utilities
│   │   ├── format.ts              # Formatting helpers (currency, dates)
│   │   ├── validation.ts          # Validation helpers
│   │   └── constants.ts           # App constants
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts             # Auth hook
│   │   ├── useToast.ts            # Toast notifications (from ui/Toast)
│   │   └── useLocalStorage.ts     # Local storage hook
│   │
│   ├── types/                     # TypeScript types
│   │   ├── user.ts                # User types
│   │   ├── project.ts             # Project types
│   │   ├── bill.ts                # Bill types
│   │   └── index.ts               # Barrel export
│   │
│   ├── services/                  # Business logic services
│   │   ├── credit-engine.ts       # Credit calculation
│   │   ├── ledger.ts              # Ledger management
│   │   ├── payments/
│   │   │   └── razorpay.ts        # Razorpay integration
│   │   └── bbps/
│   │       └── client.ts          # BBPS integration
│   │
│   ├── security.ts                # Security utilities
│   ├── rbac.ts                    # Role-based access control
│   ├── activity.ts                # Activity logging
│   ├── notifications.ts           # Notification utilities
│   ├── monitoring.ts              # Monitoring (Sentry, PostHog)
│   └── design-system.ts           # Design tokens
│
├── config/                        # Configuration files
│   ├── site.ts                    # Site configuration
│   └── constants.ts               # App constants
│
├── public/                        # Static assets
│   ├── images/                    # Images
│   ├── icons/                     # Icons
│   ├── manifest.json              # PWA manifest
│   └── sw.js                      # Service worker
│
├── middleware.ts                  # Next.js middleware
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

## 🎯 Key Improvements

### 1. Route Groups
- `(auth)/` - Authentication routes (login, signup, etc.)
- `(dashboard)/` - Protected dashboard routes
- `(marketing)/` - Public marketing pages

### 2. Feature-Based Components
- Components organized by feature (dashboard, reserve, bills, etc.)
- Easier to find and maintain
- Better code splitting

### 3. Organized API Routes
- Grouped by domain (auth, users, projects, etc.)
- Clear separation of concerns
- Easy to add new endpoints

### 4. Shared Utilities
- Centralized utilities in `lib/utils/`
- Custom hooks in `lib/hooks/`
- Type definitions in `lib/types/`

### 5. Clean Dependencies
- Removed NextAuth (using Supabase only)
- Removed unused OTP routes
- Cleaner, more maintainable codebase

## 📝 Migration Notes

- All imports use `@/` alias
- Route groups don't affect URLs
- Components are feature-based for better organization
- API routes are domain-organized

