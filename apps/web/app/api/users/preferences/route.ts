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

    const { data: preferences, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned, which is fine - we'll create defaults
      return errorResponse("Failed to fetch preferences", "PREFERENCES_FETCH_ERROR", 500);
    }

    // Return preferences or defaults
    return successResponse(
      preferences || {
        user_id: user.id,
        theme: "light",
        notifications: {},
        language: "en",
        currency: "INR",
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
      }
    );
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;
    const body = await req.json();

    // Validate allowed fields
    const allowedFields = [
      "theme",
      "notifications",
      "language",
      "currency",
      "email_notifications",
      "sms_notifications",
      "push_notifications",
    ];

    const updateData: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Upsert preferences
    const { data: preferences, error } = await supabase
      .from("user_preferences")
      .upsert(
        {
          user_id: user.id,
          ...updateData,
        },
        {
          onConflict: "user_id",
        }
      )
      .select()
      .single();

    if (error) {
      return errorResponse("Failed to update preferences", "PREFERENCES_UPDATE_ERROR", 500);
    }

    return successResponse(preferences);
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}


