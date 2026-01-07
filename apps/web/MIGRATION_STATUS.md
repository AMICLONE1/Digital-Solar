# API Routes Migration Status

## ✅ Migrated to Supabase
- `/api/auth/check` - Auth check
- `/api/auth/logout` - Logout
- `/api/bills` - Get bills
- `/api/credits/available` - Available credits
- `/api/projects/my-projects` - User projects
- `/api/projects` - Projects list
- `/api/reserve` - Reserve capacity
- `/api/notifications` - Notifications
- `/api/referrals` - Referrals
- `/api/activity` - Activity logging
- `/api/users/preferences` - User preferences
- `/api/export/savings-report` - Export
- `/api/dashboard/savings` - Dashboard savings

## ⚠️ Needs Migration (Still using NextAuth/Prisma)
- `/api/bills/fetch` - Fetch bill from BBPS
- `/api/bills/pay` - Pay bill
- `/api/credits/calculate` - Calculate credits (admin)
- `/api/credits/ledger` - Credit ledger
- `/api/dashboard/credits-history` - Credits history
- `/api/dashboard/environmental-impact` - Environmental impact
- `/api/payments/create-order` - Create payment order
- `/api/payments/webhook` - Payment webhook
- `/api/kyc/verify` - KYC verification
- `/api/kyc/status` - KYC status
- `/api/users/update-utility` - Update utility
- `/api/generation/upload` - Upload generation (admin)
- `/api/generation/validate` - Validate generation (admin)
- `/api/generation/[projectId]` - Get generation data
- `/api/projects/[id]` - Get project details
- `/api/projects/[id]/availability` - Check availability

## 🗑️ Removed (Unused)
- `/api/auth/[...nextauth]` - NextAuth route (deleted)
- `/api/auth/send-otp` - OTP system (deleted)
- `/api/auth/verify-otp` - OTP system (deleted)

## 📝 Migration Pattern

All routes should follow this pattern:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    
    // Use supabase instead of prisma
    const { data, error } = await supabase
      .from("table_name")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      return errorResponse("Failed to fetch", "FETCH_ERROR", 500);
    }

    return successResponse(data);
  } catch (error: any) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
```

