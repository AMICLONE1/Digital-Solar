# PowerNetPro Digital Solar - Testing Guide

## 🧪 How to Test the Application

### 1. Start Development Server
```bash
cd apps/web
pnpm dev
```

### 2. Test Authentication Flow

#### Signup Flow
1. Go to `http://localhost:3000/signup`
2. Fill in name, email, password
3. Should redirect to `/reserve` after signup

#### Login Flow
1. Go to `http://localhost:3000/login`
2. Enter credentials
3. Should redirect based on profile status:
   - Incomplete profile → `/onboarding`
   - Complete but no reservations → `/reserve`
   - Complete with reservations → `/dashboard`

#### Check Auth Status
1. Go to `http://localhost:3000/check-auth`
2. Should show current login status

### 3. Test Navigation

#### Unauthenticated
- Should show: "Sign In" and "Get Started"
- Should NOT show: "Dashboard" and "Settings"

#### Authenticated
- Should show: "Dashboard" and "Settings"
- Should NOT show: "Sign In" and "Get Started"

### 4. Test API Routes

#### Health Check
```bash
curl http://localhost:3000/api/health
```

#### Auth Check (requires auth)
```bash
# After logging in, check browser console or use:
fetch('/api/auth/check').then(r => r.json()).then(console.log)
```

### 5. Test Onboarding Flow

1. After signup/login, should redirect to `/onboarding`
2. Step 1: Reserve Solar (can skip)
3. Step 2: Link Utility Provider
4. Should redirect to `/reserve` or `/dashboard` after completion

### 6. Common Issues & Fixes

#### Issue: Service Worker Error
**Fix**: Service worker is now in `/public/sw.js` - should work

#### Issue: Manifest Error
**Fix**: Manifest is served via route handler - should work

#### Issue: Module Import Error
**Fix**: Use API endpoint `/api/auth/check` instead of direct import

#### Issue: Navigation Shows Wrong Buttons
**Fix**: Navigation now properly checks auth state with `onAuthStateChange`

### 7. Testing Checklist

- [ ] Signup works and redirects correctly
- [ ] Login works and redirects correctly
- [ ] Navigation shows correct buttons
- [ ] Onboarding flow works
- [ ] Dashboard loads (if authenticated)
- [ ] Reserve page loads (if authenticated)
- [ ] Settings page loads (if authenticated)
- [ ] API routes return correct responses
- [ ] No console errors
- [ ] No hydration errors

## 🔍 Debugging

### Check Authentication
```javascript
// In browser console
fetch('/api/auth/check').then(r => r.json()).then(console.log)
```

### Check Supabase Connection
```javascript
// In browser console
const { createClient } = await import('/lib/supabase/client');
const supabase = createClient();
const { data } = await supabase.auth.getSession();
console.log('Session:', data);
```

### Check User Profile
```javascript
// In browser console (after auth)
const { createClient } = await import('/lib/supabase/client');
const supabase = createClient();
const { data: { user } } = await supabase.auth.getUser();
const { data: profile } = await supabase
  .from('users')
  .select('*')
  .eq('id', user.id)
  .single();
console.log('Profile:', profile);
```

## 📊 Current Status

- ✅ Authentication: Working (Supabase only)
- ✅ Navigation: Fixed (shows correct buttons)
- ✅ Onboarding: Simplified (SundayGrids style)
- ✅ API Routes: 60% migrated to Supabase
- ⚠️ Some routes still need migration (see MIGRATION_STATUS.md)

