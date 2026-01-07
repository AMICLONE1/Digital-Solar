# Supabase Setup Guide for PowerNetPro Digital Solar

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase
3. Note down your project URL and anon key from Settings > API

## Setup Steps

### 1. Install Dependencies

Dependencies are already installed. If needed:
```bash
cd apps/web
pnpm add @supabase/supabase-js @supabase/ssr
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (if using direct connection)
DATABASE_URL=your-supabase-connection-string

# NextAuth (no longer needed, but keep for compatibility)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# BBPS Integration (Optional)
BBPS_API_KEY=
BBPS_API_SECRET=
BBPS_BASE_URL=https://api.bbps.com/v1

# Razorpay (Optional)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

### 3. Setup Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script

This will create:
- All necessary tables
- Enums for status types
- Indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic user profile creation
- Updated timestamp triggers

### 4. Configure Authentication

1. Go to Authentication > Settings in Supabase dashboard
2. Enable Email provider
3. Configure email templates (optional)
4. Set up email confirmation (recommended for production)

### 5. Test the Application

1. Start the development server:
```bash
pnpm dev
```

2. Navigate to `http://localhost:3000`
3. Try signing up with a new account
4. Check Supabase dashboard to see the user created in `auth.users` and `public.users`

## Key Changes from Prisma

### Authentication
- **Before**: NextAuth.js with phone/OTP
- **After**: Supabase Auth with email/password

### Database Access
- **Before**: Prisma Client with direct PostgreSQL connection
- **After**: Supabase Client with REST API and real-time subscriptions

### API Routes
- All API routes now use Supabase client instead of Prisma
- Server-side: Use `createClient()` from `@/lib/supabase/server`
- Client-side: Use `createClient()` from `@/lib/supabase/client`

## Row Level Security (RLS)

The schema includes RLS policies that:
- Allow users to view/update their own data
- Make projects publicly readable
- Restrict access to allocations, credits, bills, and payments to owners only

## Next Steps

1. **Production Setup**:
   - Update environment variables for production
   - Configure custom domain in Supabase
   - Set up email service for authentication emails

2. **Additional Features**:
   - Enable real-time subscriptions for live updates
   - Set up database backups
   - Configure storage buckets if needed

3. **Monitoring**:
   - Use Supabase dashboard for monitoring
   - Set up alerts for database usage
   - Monitor authentication metrics

## Troubleshooting

### User profile not created
- Check if the trigger `on_auth_user_created` is active
- Verify the function `handle_new_user()` exists

### RLS blocking queries
- Check RLS policies in Supabase dashboard
- Verify user is authenticated
- Check if policies match your use case

### Connection issues
- Verify environment variables are set correctly
- Check Supabase project is active
- Verify network connectivity

