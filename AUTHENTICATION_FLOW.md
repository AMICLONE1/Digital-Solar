# PowerNetPro Authentication & Onboarding Flow

## User Journey

### 1. New User (Signup)
```
Landing Page → Signup → Onboarding (KYC + Utility) → Reserve Capacity → Dashboard
```

### 2. Returning User (Login)
```
Landing Page → Login → Check Profile Status:
  - Incomplete Profile → Onboarding
  - Complete Profile + No Reservations → Reserve Capacity
  - Complete Profile + Has Reservations → Dashboard
```

## Navigation Behavior

### Unauthenticated Users (Not Logged In)
- **Show**: Sign In, Get Started (Signup)
- **Hide**: Dashboard, Settings

### Authenticated Users (Logged In)
- **Show**: Dashboard, Settings
- **Hide**: Sign In, Get Started

## Page Access Rules

### Public Pages (No Auth Required)
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/forgot-password` - Password reset
- `/terms`, `/privacy`, `/faq`, `/contact`, `/about`

### Protected Pages (Auth Required)
- `/onboarding` - Redirects to `/login` if not authenticated
- `/reserve` - Redirects to `/login` if not authenticated
- `/dashboard` - Redirects to `/login` if not authenticated
- `/settings` - Redirects to `/login` if not authenticated

## Redirect Logic

### After Login
1. Check if user profile exists
2. If no profile → Create basic profile → Redirect to `/onboarding`
3. If profile incomplete (KYC not verified or no utility number) → Redirect to `/onboarding`
4. If profile complete:
   - Check for allocations
   - Has allocations → Redirect to `/dashboard`
   - No allocations → Redirect to `/reserve`

### After Signup
1. Create user account
2. Create basic profile
3. Redirect to `/onboarding`

### After Onboarding
1. Complete KYC verification
2. Add utility connection details
3. Redirect to `/reserve` (to start reserving capacity)

## Implementation Details

### Navigation Component
- Uses `onAuthStateChange` to reactively update when user logs in/out
- Shows appropriate buttons based on authentication state

### Login Page
- Checks existing authentication on load
- After successful login, determines redirect path based on profile completeness
- Uses `window.location.href` for reliable redirects

### Onboarding Page
- Multi-step form (KYC → Utility)
- Validates inputs before proceeding
- Redirects to `/reserve` after completion

## Testing Checklist

- [ ] New user can signup and complete onboarding
- [ ] Returning user with incomplete profile is redirected to onboarding
- [ ] Returning user with complete profile but no reservations goes to reserve page
- [ ] Returning user with reservations goes to dashboard
- [ ] Navigation shows correct buttons based on auth state
- [ ] Protected pages redirect to login if not authenticated
- [ ] Already logged-in users visiting login page are redirected

