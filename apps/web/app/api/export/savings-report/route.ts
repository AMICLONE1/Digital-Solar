import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    // Get user's savings data
    const { data: credits, error: creditsError } = await supabase
      .from("credit_ledgers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (creditsError) {
      return errorResponse("Failed to fetch credits", "CREDITS_FETCH_ERROR", 500);
    }

    // Get user's allocations
    const { data: allocations, error: allocationsError } = await supabase
      .from("allocations")
      .select(`
        *,
        capacity_blocks (
          kw,
          project_id,
          projects (
            name,
            location,
            state
          )
        )
      `)
      .eq("user_id", user.id);

    if (allocationsError) {
      return errorResponse("Failed to fetch allocations", "ALLOCATIONS_FETCH_ERROR", 500);
    }

    // Get user's bills
    const { data: bills, error: billsError } = await supabase
      .from("bills")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(12);

    if (billsError) {
      return errorResponse("Failed to fetch bills", "BILLS_FETCH_ERROR", 500);
    }

    // Calculate summary
    const totalCreditsEarned = credits
      ?.filter((c) => c.type === "EARNED")
      .reduce((sum, c) => sum + Number(c.amount || 0), 0) || 0;
    const totalCreditsApplied = credits
      ?.filter((c) => c.type === "APPLIED")
      .reduce((sum, c) => sum + Number(c.amount || 0), 0) || 0;
    const availableCredits = totalCreditsEarned - totalCreditsApplied;

    // Generate report data
    const reportData = {
      user: {
        name: user.name || user.email,
        email: user.email,
      },
      generatedAt: new Date().toISOString(),
      summary: {
        totalCreditsEarned,
        totalCreditsApplied,
        availableCredits,
        totalCapacity: allocations?.reduce(
          (sum, a) => sum + Number(a.capacity_blocks?.kw || 0),
          0
        ) || 0,
        totalBills: bills?.length || 0,
      },
      allocations: allocations?.map((a) => ({
        capacity: Number(a.capacity_blocks?.kw || 0),
        project: a.capacity_blocks?.projects?.name,
        location: a.capacity_blocks?.projects?.location,
        state: a.capacity_blocks?.projects?.state,
        reservedAt: a.created_at,
      })) || [],
      credits: credits?.slice(0, 50).map((c) => ({
        amount: Number(c.amount),
        type: c.type,
        status: c.status,
        month: c.month,
        year: c.year,
        description: c.description,
        createdAt: c.created_at,
      })) || [],
      bills: bills?.map((b) => ({
        amount: Number(b.amount),
        creditsApplied: Number(b.credits_applied || 0),
        status: b.status,
        dueDate: b.due_date,
        paidAt: b.paid_at,
        createdAt: b.created_at,
      })) || [],
    };

    // Return JSON for now (PDF generation can be added later with a library like pdfkit or jsPDF)
    return successResponse(reportData);
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

