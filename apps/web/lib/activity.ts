/**
 * Activity Logging Utilities
 * Helper functions for logging user activities
 */

import { api } from "./api/client";

export type ActivityCategory = "AUTH" | "RESERVATION" | "PAYMENT" | "BILL" | "PROFILE" | "SETTINGS";

export interface ActivityMetadata {
  [key: string]: any;
}

/**
 * Log user activity
 */
export async function logActivity(
  action: string,
  category?: ActivityCategory,
  metadata?: ActivityMetadata
) {
  try {
    await api.post("/api/activity", {
      action,
      category,
      metadata,
    });
  } catch (error) {
    // Don't throw - activity logging should not break the app
    console.warn("Failed to log activity:", error);
  }
}

/**
 * Activity logging helpers
 */
export const activityLogs = {
  signup: (method: string = "email") => {
    logActivity("USER_SIGNUP", "AUTH", { method });
  },
  login: (method: string = "email") => {
    logActivity("USER_LOGIN", "AUTH", { method });
  },
  logout: () => {
    logActivity("USER_LOGOUT", "AUTH");
  },
  reservationCreated: (capacity: number, projectId: string) => {
    logActivity("RESERVATION_CREATED", "RESERVATION", { capacity, projectId });
  },
  paymentInitiated: (amount: number, type: string) => {
    logActivity("PAYMENT_INITIATED", "PAYMENT", { amount, type });
  },
  paymentCompleted: (amount: number, transactionId: string) => {
    logActivity("PAYMENT_COMPLETED", "PAYMENT", { amount, transactionId });
  },
  billFetched: (discom: string, amount: number) => {
    logActivity("BILL_FETCHED", "BILL", { discom, amount });
  },
  billPaid: (billId: string, amount: number, creditsApplied: number) => {
    logActivity("BILL_PAID", "BILL", { billId, amount, creditsApplied });
  },
  profileUpdated: (fields: string[]) => {
    logActivity("PROFILE_UPDATED", "PROFILE", { fields });
  },
  preferencesUpdated: (preferences: string[]) => {
    logActivity("PREFERENCES_UPDATED", "SETTINGS", { preferences });
  },
  kycCompleted: () => {
    logActivity("KYC_COMPLETED", "PROFILE");
  },
  onboardingCompleted: () => {
    logActivity("ONBOARDING_COMPLETED", "PROFILE");
  },
};


