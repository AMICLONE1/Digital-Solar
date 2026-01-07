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

    // Get user's referral code
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("referral_code")
      .eq("id", user.id)
      .single();

    if (userError) {
      return errorResponse("Failed to fetch referral code", "REFERRAL_FETCH_ERROR", 500);
    }

    // Get user's referrals
    const { data: referrals, error: referralsError } = await supabase
      .from("referrals")
      .select("*")
      .eq("referrer_id", user.id)
      .order("created_at", { ascending: false });

    if (referralsError) {
      return errorResponse("Failed to fetch referrals", "REFERRALS_FETCH_ERROR", 500);
    }

    // Calculate stats
    const totalReferrals = referrals?.filter(
      (r) => r.status === "COMPLETED" || r.status === "REWARDED"
    ).length || 0;
    const totalRewards = referrals
      ?.filter((r) => r.status === "REWARDED")
      .reduce((sum, r) => sum + Number(r.reward_amount || 0), 0) || 0;

    return successResponse({
      referralCode: userData?.referral_code,
      referrals: referrals || [],
      stats: {
        totalReferrals,
        totalRewards,
        pendingReferrals: referrals?.filter((r) => r.status === "PENDING").length || 0,
      },
    });
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const body = await req.json();
    const { referralCode } = body;

    if (!referralCode) {
      return errorResponse("Referral code is required", "VALIDATION_ERROR", 400);
    }

    // Check if referral code exists
    const { data: referrer, error: referrerError } = await supabase
      .from("users")
      .select("id")
      .eq("referral_code", referralCode)
      .single();

    if (referrerError || !referrer) {
      return errorResponse("Invalid referral code", "INVALID_REFERRAL_CODE", 400);
    }

    // Check if user is trying to use their own code
    if (referrer.id === user.id) {
      return errorResponse("Cannot use your own referral code", "INVALID_REFERRAL_CODE", 400);
    }

    // Check if user already has a referral
    const { data: existingReferral } = await supabase
      .from("referrals")
      .select("id")
      .eq("referred_id", user.id)
      .single();

    if (existingReferral) {
      return errorResponse("Referral code already applied", "REFERRAL_ALREADY_APPLIED", 400);
    }

    // Create referral record
    const { data: referral, error: referralError } = await supabase
      .from("referrals")
      .insert({
        referrer_id: referrer.id,
        referred_id: user.id,
        referral_code: referralCode,
        status: "PENDING",
      })
      .select()
      .single();

    if (referralError) {
      return errorResponse("Failed to create referral", "REFERRAL_CREATE_ERROR", 500);
    }

    return successResponse(referral);
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

