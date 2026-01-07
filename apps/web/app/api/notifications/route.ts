import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api/middleware";
import type { Notification } from "@/lib/api/types";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    const { user, supabase } = auth;

    const { data: notifications, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return errorResponse("Failed to fetch notifications", "NOTIFICATIONS_FETCH_ERROR", 500);
    }

    return successResponse<Notification[]>(notifications || []);
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
    const { notification_id, read } = body;

    if (!notification_id) {
      return errorResponse("Notification ID is required", "VALIDATION_ERROR", 400);
    }

    const updateData: any = {};
    if (read !== undefined) {
      updateData.read = read;
      if (read) {
        updateData.read_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from("notifications")
      .update(updateData)
      .eq("id", notification_id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return errorResponse("Failed to update notification", "NOTIFICATION_UPDATE_ERROR", 500);
    }

    return successResponse<Notification>(data);
  } catch (error) {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}

