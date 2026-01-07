import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Get current month credits (earned)
    const { data: currentMonthData } = await supabase
      .from("credit_ledgers")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "EARNED")
      .eq("status", "CONFIRMED")
      .eq("month", currentMonth)
      .eq("year", currentYear);

    const currentMonthCredits = currentMonthData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    // Get lifetime savings (all confirmed earned credits)
    const { data: lifetimeData } = await supabase
      .from("credit_ledgers")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "EARNED")
      .eq("status", "CONFIRMED");

    const lifetimeSavings = lifetimeData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    // Get applied credits
    const { data: appliedData } = await supabase
      .from("credit_ledgers")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "APPLIED")
      .eq("status", "CONFIRMED");

    const applied = appliedData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    // Get expired credits
    const { data: expiredData } = await supabase
      .from("credit_ledgers")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "EXPIRED")
      .eq("status", "CONFIRMED");

    const expired = expiredData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    const totalSavings = lifetimeSavings - applied - expired;

    return NextResponse.json({
      currentMonthCredits,
      lifetimeSavings,
      totalSavings: Math.max(0, totalSavings),
    });
  } catch (error) {
    console.error("Get savings error:", error);
    return NextResponse.json({ error: "Failed to fetch savings" }, { status: 500 });
  }
}

