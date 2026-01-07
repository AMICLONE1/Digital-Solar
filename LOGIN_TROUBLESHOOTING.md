# Login Troubleshooting Guide

## Common Login Issues & Solutions

### Issue: "Login is not happening" after signup

This usually happens when **email confirmation is still enabled** in Supabase, even though we've configured the code to skip it.

---

## ✅ Quick Fix: Disable Email Confirmation in Supabase

### Step 1: Go to Supabase Dashboard
1. Visit [supabase.com](https://supabase.com)
2. Log in to your account
3. Select your project

### Step 2: Disable Email Confirmation
1. Go to **Authentication** → **Settings** (in the left sidebar)
2. Scroll down to **Email Auth** section
3. **Turn OFF** the toggle for **"Enable email confirmations"**
4. Click **Save**

### Step 3: Test Login
1. Go to `/login` page
2. Enter your email and password
3. You should now be able to log in immediately

---

## Other Common Issues

### Issue: "Invalid login credentials"

**Possible Causes:**
- Wrong email or password
- Email not confirmed (if confirmation is still enabled)
- Account doesn't exist

**Solutions:**
1. Double-check your email and password
2. Try resetting your password using "Forgot password?" link
3. Make sure you're using the same email you signed up with

---

### Issue: "Email not confirmed"

**Solution:**
1. Check your email inbox (and spam folder) for a confirmation email
2. Click the confirmation link in the email
3. Or use the "Resend confirmation email" button on the login page
4. **Better yet**: Disable email confirmation in Supabase (see above)

---

### Issue: "Too many requests"

**Solution:**
- Wait 5-10 minutes before trying again
- This is a rate limit protection

---

### Issue: "Supabase not configured"

**Solution:**
1. Create a `.env.local` file in `apps/web/` directory
2. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Restart your dev server (`pnpm dev`)

---

## Testing Your Login

### 1. Check if Supabase is Configured
- Open browser console (F12)
- Look for any Supabase warnings
- If you see "Supabase not configured", add environment variables

### 2. Check Email Confirmation Status
- In Supabase Dashboard → Authentication → Users
- Find your user
- Check if "Email Confirmed" is true or false
- If false, either:
  - Click "Confirm" button in Supabase dashboard, OR
  - Disable email confirmation requirement

### 3. Test Login Flow
1. Go to `/login`
2. Enter email and password
3. Check browser console for errors
4. Check Network tab for failed requests

---

## Debug Steps

### Enable Console Logging
The login page now logs errors to the console. Open browser DevTools (F12) and check:
- Console tab for error messages
- Network tab for failed API calls

### Check Supabase Logs
1. Go to Supabase Dashboard
2. Navigate to **Logs** → **Auth Logs**
3. Check for any authentication errors

### Verify User Exists
1. Go to Supabase Dashboard → Authentication → Users
2. Search for your email
3. Verify the user exists and is active

---

## Quick Test Checklist

- [ ] Supabase environment variables are set
- [ ] Email confirmation is disabled in Supabase
- [ ] User exists in Supabase Auth
- [ ] Password is correct
- [ ] No browser console errors
- [ ] Network requests are successful

---

## Still Having Issues?

1. **Clear browser cache and cookies**
2. **Try incognito/private mode**
3. **Check Supabase project status** (make sure it's active)
4. **Verify environment variables** are correct
5. **Restart dev server** after changing env vars

---

## Contact Support

If none of the above solutions work:
1. Check the browser console for specific error messages
2. Check Supabase dashboard logs
3. Share the error message for further assistance

---

*Last updated: January 2026*

