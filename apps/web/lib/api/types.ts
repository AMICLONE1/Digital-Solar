/**
 * PowerNetPro API Types
 * Type definitions for API requests and responses
 */

// User Types
export interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  kyc_status: "PENDING" | "IN_PROGRESS" | "VERIFIED" | "REJECTED";
  role: "USER" | "ADMIN" | "OPS" | "FINANCE";
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  user_id: string;
  theme: "light" | "dark" | "system";
  notifications: Record<string, boolean>;
  language: string;
  currency: "INR" | "USD" | "EUR";
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
}

// Project Types
export interface Project {
  id: string;
  spv_id: string;
  name: string;
  total_kw: number;
  rate_per_kwh: number;
  location: string;
  state: string;
  status: "DRAFT" | "ACTIVE" | "FULLY_ALLOCATED" | "ARCHIVED";
  description?: string;
  available_capacity?: number;
  created_at: string;
}

// Allocation Types
export interface Allocation {
  id: string;
  user_id: string;
  capacity_block_id: string;
  payment_id?: string;
  created_at: string;
  project?: Project;
  capacity_kw?: number;
}

// Credit Types
export interface CreditLedger {
  id: string;
  user_id: string;
  amount: number;
  type: "EARNED" | "APPLIED" | "EXPIRED";
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  month?: number;
  year?: number;
  description?: string;
  created_at: string;
}

// Bill Types
export interface Bill {
  id: string;
  user_id: string;
  discom: string;
  bill_number?: string;
  amount: number;
  credits_applied: number;
  due_date: string;
  status: "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";
  bbps_bill_id?: string;
  fetched_at?: string;
  paid_at?: string;
  created_at: string;
}

// Payment Types
export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  type: "RESERVATION" | "BILL_PAYMENT" | "REFUND";
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED";
  transaction_id?: string;
  gateway?: string;
  gateway_order_id?: string;
  gateway_payment_id?: string;
  created_at: string;
}

// Dashboard Types
export interface SavingsSummary {
  total_credits_earned: number;
  total_credits_applied: number;
  available_credits: number;
  lifetime_savings: number;
  monthly_savings: number;
  co2_saved: number;
}

export interface MonthlyCredit {
  month: number;
  year: number;
  credits: number;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  title: string;
  message: string;
  read: boolean;
  read_at?: string;
  action_url?: string;
  action_label?: string;
  created_at: string;
}

// API Request Types
export interface CreateReservationRequest {
  project_id: string;
  capacity_kw: number;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
}

export interface UpdatePreferencesRequest {
  theme?: "light" | "dark" | "system";
  language?: string;
  email_notifications?: boolean;
  sms_notifications?: boolean;
  push_notifications?: boolean;
}

export interface FetchBillRequest {
  consumer_number: string;
  discom: string;
  state: string;
}

export interface PayBillRequest {
  bill_id: string;
  apply_credits: boolean;
  payment_method?: string;
}

