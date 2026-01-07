/**
 * Notification Utilities
 * Helper functions for creating and managing notifications
 */

import { createClient } from "@/lib/supabase/client";

export interface CreateNotificationParams {
  userId: string;
  type: string;
  priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

/**
 * Create a notification for a user
 */
export async function createNotification(params: CreateNotificationParams) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: params.userId,
      type: params.type,
      priority: params.priority || "NORMAL",
      title: params.title,
      message: params.message,
      action_url: params.actionUrl,
      action_label: params.actionLabel,
      metadata: params.metadata || {},
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    throw error;
  }

  return data;
}

/**
 * Notification templates
 */
export const notificationTemplates = {
  creditEarned: (amount: number) => ({
    type: "CREDIT_EARNED",
    priority: "HIGH" as const,
    title: "Credit Earned!",
    message: `You've earned ₹${amount.toLocaleString("en-IN")} in solar credits this month.`,
    actionUrl: "/dashboard",
    actionLabel: "View Dashboard",
  }),

  billPaid: (amount: number, creditsApplied: number) => ({
    type: "BILL_PAID",
    priority: "NORMAL" as const,
    title: "Bill Paid Successfully",
    message: `Your bill of ₹${amount.toLocaleString("en-IN")} has been paid. ₹${creditsApplied.toLocaleString("en-IN")} credits applied.`,
    actionUrl: "/bills",
    actionLabel: "View Bills",
  }),

  paymentSuccess: (amount: number, type: string) => ({
    type: "PAYMENT_SUCCESS",
    priority: "HIGH" as const,
    title: "Payment Successful",
    message: `Your payment of ₹${amount.toLocaleString("en-IN")} for ${type} has been processed successfully.`,
    actionUrl: "/dashboard",
    actionLabel: "View Dashboard",
  }),

  kycVerified: () => ({
    type: "SYSTEM",
    priority: "NORMAL" as const,
    title: "KYC Verified",
    message: "Your KYC verification has been completed successfully. You can now reserve solar capacity.",
    actionUrl: "/reserve",
    actionLabel: "Reserve Now",
  }),

  reservationConfirmed: (capacity: number, projectName: string) => ({
    type: "RESERVATION_CONFIRMED",
    priority: "HIGH" as const,
    title: "Reservation Confirmed!",
    message: `Your reservation of ${capacity} kW from ${projectName} has been confirmed.`,
    actionUrl: "/dashboard",
    actionLabel: "View Dashboard",
  }),
};

