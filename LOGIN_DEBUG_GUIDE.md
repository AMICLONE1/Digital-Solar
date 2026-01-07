# Login Debugging Guide

## 🔍 How to Debug Login Issues

### Step 1: Open Browser Console
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Keep it open while trying to login

### Step 2: Try to Login
1. Enter your email and password
2. Click "Sign In"
3. Watch the console for messages

### Step 3: Check Console Messages

#### ✅ Success Messages (What you should see):
```
Attempting login for: your@email.com
Login successful! User: [user-id]
Session: Present
Email confirmed: [timestamp]
Session verified, redirecting...
Redirecting to: /dashboard or /onboarding
```

#### ❌ Error Messages (What might appear):

**"Invalid login credentials"**
- Wrong email or password
- User doesn't exist
- **Solution**: Check your credentials

**"Email not confirmed"**
- Email confirmation is still enabled in Supabase
- **Solution**: Disable email confirmation in Supabase Dashboard

**"No session after login!"**
- Session not being created
- **Solution**: Check Supabase configuration

**"Session lost after login!"**
- Session not persisting
- **Solution**: Check cookies are enabled, check Supabase settings

**"Supabase not configured"**
- Environment variables missing
- **Solution**: Add `.env.local` file with Supabase credentials

---

## 🔧 Common Fixes

### Fix 1: Disable Email Confirmation
1. Go to Supabase Dashboard
2. Authentication → Settings
3. Turn OFF "Enable email confirmations"
4. Save

### Fix 2: Check Environment Variables
Create `.env.local` in `apps/web/`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then restart dev server:
```bash
# Stop server (Ctrl+C)
pnpm dev
```

### Fix 3: Check User in Supabase
1. Go to Supabase Dashboard → Authentication → Users
2. Find your email
3. Check:
   - ✅ User exists
   - ✅ Email confirmed (should have timestamp)
   - ✅ If empty, manually confirm or disable email confirmation

### Fix 4: Clear Browser Data
1. Clear cookies for localhost
2. Clear cache
3. Try again

### Fix 5: Check Network Tab
1. Open DevTools → Network tab
2. Try to login
3. Look for failed requests (red)
4. Check the error message

---

## 🐛 What the Code Does Now

1. **Validates Supabase Configuration**
   - Checks if env vars are set
   - Shows clear error if not

2. **Attempts Login**
   - Logs attempt to console
   - Handles specific errors

3. **Verifies Session**
   - Checks if session exists
   - Waits for session to persist
   - Verifies session is still there

4. **Checks User Profile**
   - Fetches user profile
   - Determines redirect path

5. **Redirects**
   - Uses `window.location.href` for reliable redirect
   - Goes to `/dashboard` or `/onboarding`

---

## 📋 Checklist

Before reporting an issue, check:

- [ ] Browser console shows no errors
- [ ] Supabase environment variables are set
- [ ] Email confirmation is disabled in Supabase
- [ ] User exists in Supabase Dashboard
- [ ] Email is confirmed (or confirmation disabled)
- [ ] Cookies are enabled in browser
- [ ] Network requests are successful (check Network tab)
- [ ] No ad blockers interfering

---

## 🆘 Still Not Working?

1. **Copy the exact error message** from console
2. **Check Supabase Dashboard** → Authentication → Logs
3. **Share the console output** for debugging
4. **Check if it works in incognito mode** (rules out extensions)

---

*Last updated: January 2026*

