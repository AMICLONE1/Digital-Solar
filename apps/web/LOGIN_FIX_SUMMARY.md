# Login Page Fix - Schema Compatibility

## 🔍 Issue Identified

The login page was failing because:

1. **Missing User Record**: When a user signs up, Supabase creates a record in `auth.users`, but there might not be a corresponding record in `public.users` table if:
   - The database trigger doesn't exist
   - The trigger failed
   - The user was created before the trigger was set up

2. **`.single()` Error**: The login page was using `.single()` which throws an error if no record is found, instead of gracefully handling the missing record.

## ✅ Fixes Applied

### 1. Login Page Updates (`app/login/page.tsx`)

- **Changed `.single()` to `.maybeSingle()`**: This gracefully handles missing records without throwing errors
- **Auto-create user record**: If the user record doesn't exist in `public.users`, the login page now creates it automatically
- **Better error handling**: More detailed error logging and graceful fallbacks
- **Updated redirect logic**: Changed `/onboarding` to `/connect` to match SundayGrids workflow

### 2. Database Trigger (`database-triggers.sql`)

Created a SQL file with triggers that:
- **Auto-creates `public.users` record** when `auth.users` record is created
- **Syncs email updates** from `auth.users` to `public.users`
- **Prevents duplicate records** with `ON CONFLICT DO NOTHING`

## 🚀 How to Fix Your Database

Run the SQL in `database-triggers.sql` in your Supabase SQL Editor:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `database-triggers.sql`
3. Run the SQL
4. Verify the trigger exists with the query at the bottom

## 📋 Schema Compatibility Check

### ✅ All Fields Match:

| Code Field | Schema Field | Status |
|------------|--------------|--------|
| `user_id` | `user_id` (allocations) | ✅ Match |
| `utility_consumer_number` | `utility_consumer_number` (users) | ✅ Match |
| `id` | `id` (users) | ✅ Match |

### 🔧 Code Changes:

1. **Login Page**:
   - Uses `.maybeSingle()` instead of `.single()`
   - Creates user record if missing
   - Better error handling

2. **Redirect Logic**:
   - Changed `/onboarding` → `/connect` (matches SundayGrids)
   - Default redirect is `/reserve` (Join Projects)

## 🧪 Testing

After applying the fix:

1. **Test Login**: Try logging in with an existing account
2. **Check Console**: Look for any errors in browser console
3. **Verify Redirect**: Should redirect to appropriate page based on user status
4. **Check Database**: Verify user record exists in `public.users` table

## 📝 Notes

- The trigger ensures new signups automatically create `public.users` records
- The login page now handles missing records gracefully
- All schema fields match the code expectations
- Error handling is improved with detailed logging

## ⚠️ If Issues Persist

1. **Check Supabase RLS Policies**: Make sure authenticated users can read/write to `users` table
2. **Check Trigger**: Verify the trigger exists in Supabase Dashboard → Database → Triggers
3. **Check Console**: Look for specific error messages in browser console
4. **Check Network Tab**: See what API calls are failing

