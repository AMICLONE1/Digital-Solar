# Quick Fix Guide - Login Not Working

## 🐛 Problem
Login succeeds but user can't proceed after login - stuck on login page.

## ✅ Solution Applied

### 1. Fixed Login Page Code
- Changed `.single()` to `.maybeSingle()` to handle missing user records
- Added auto-creation of user record if it doesn't exist
- Better error handling and logging

### 2. Database Trigger Required
You need to run the SQL in `database-triggers.sql` in your Supabase SQL Editor.

## 🚀 Steps to Fix

### Step 1: Run Database Trigger SQL

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Copy contents of `database-triggers.sql`
4. Paste and **Run**
5. Verify trigger was created (check the SELECT query at the bottom)

### Step 2: Test Login

1. Try logging in with your account
2. Check browser console (F12) for any errors
3. Should redirect to `/reserve` or `/dashboard` based on your status

### Step 3: Verify User Record

Run this in Supabase SQL Editor:
```sql
SELECT id, email, name, utility_consumer_number 
FROM public.users 
WHERE id = 'YOUR_USER_ID';
```

If no record exists, the login page will now create it automatically.

## 🔍 Debugging

### Check Browser Console
Look for:
- `"Creating user profile record..."` - Good, means it's fixing missing records
- `"Redirecting to: /reserve"` - Good, means redirect logic is working
- Any red errors - These indicate the actual problem

### Check Network Tab
1. Open DevTools → Network tab
2. Try logging in
3. Look for failed requests (red)
4. Check the response for error messages

### Common Issues

1. **RLS Policy Blocking**: 
   - Check Supabase → Authentication → Policies
   - Ensure authenticated users can SELECT/INSERT into `users` table

2. **Trigger Not Working**:
   - Check Supabase → Database → Triggers
   - Should see `on_auth_user_created` trigger

3. **Missing User Record**:
   - Login page now creates it automatically
   - But trigger is better long-term solution

## 📋 Schema Verification

Your schema looks correct! All field names match:
- ✅ `user_id` in allocations
- ✅ `utility_consumer_number` in users  
- ✅ `id` in users references auth.users

The issue was the code using `.single()` which throws errors on missing records.

## ✨ What Changed

**Before:**
```typescript
.single() // Throws error if record doesn't exist
```

**After:**
```typescript
.maybeSingle() // Returns null if record doesn't exist
// + Auto-creates record if missing
```

This makes the login flow much more robust!

