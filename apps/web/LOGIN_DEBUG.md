# Login Redirect Debugging Guide

## Current Issue
Login is successful but redirect is not happening.

## Debugging Steps

### 1. Check Browser Console
After attempting to login, check the browser console (F12) for these messages:

**Expected Console Messages:**
- `✅ Login successful! User: [user-id]`
- `✅ Session: Present`
- `🚀 REDIRECTING IMMEDIATELY to: /reserve` (or `/dashboard` or `/connect`)
- `✅ Attempting redirect using window.location.replace()`
- `✅ window.location.replace() called`

**If you see these messages but no redirect:**
- Something is blocking the navigation (browser extension, popup blocker, etc.)
- Check if there are any errors after the redirect messages

**If you DON'T see these messages:**
- Login might be failing before reaching redirect code
- Check for errors earlier in the console

### 2. Check Network Tab
1. Open DevTools → Network tab
2. Attempt login
3. Look for:
   - Request to Supabase auth endpoint
   - Response status (should be 200)
   - Any failed requests

### 3. Check Session
After login attempt, run this in browser console:
```javascript
// Check if session exists
const supabase = await import('/lib/supabase/client').then(m => m.createClient());
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
console.log('User:', session?.user);
```

### 4. Manual Redirect Test
If login succeeds but redirect doesn't work, try manually:
```javascript
window.location.replace('/reserve');
```

### 5. Check for Blocking Issues
- **Browser Extensions**: Disable ad blockers, privacy extensions
- **Service Worker**: Check if service worker is interfering
- **CSP Headers**: Check if Content Security Policy is blocking navigation

## Current Implementation

The login page now:
1. ✅ Verifies session exists after login
2. ✅ Uses `window.location.replace()` for redirect (most reliable)
3. ✅ Has fallback to `window.location.href`
4. ✅ Has fallback to `router.replace()`
5. ✅ Has multiple redirect attempts with error handling

## If Redirect Still Doesn't Work

1. **Check Supabase Configuration**:
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
   - Check Supabase dashboard for any auth issues

2. **Check Middleware**:
   - The middleware might be redirecting back to login
   - Check `apps/web/middleware.ts` and `apps/web/lib/supabase/middleware.ts`

3. **Check Browser**:
   - Try a different browser
   - Clear cache and cookies
   - Try incognito/private mode

4. **Check for JavaScript Errors**:
   - Look for any uncaught errors in console
   - Check if React is throwing errors

## Next Steps

If redirect still doesn't work after checking the above:
1. Share the browser console output
2. Share any network errors
3. Check if the session is actually being created
4. Verify the redirect path is correct

