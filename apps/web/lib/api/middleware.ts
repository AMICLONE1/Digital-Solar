/**
 * API Middleware Utilities
 * Common middleware functions for API routes
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Rate limiting configuration
 */
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per window
};

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting middleware
 */
export function rateLimit(req: NextRequest): NextResponse | null {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const key = `rate_limit_${ip}`;

  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return null;
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return NextResponse.json(
      { error: { message: "Too many requests", code: "RATE_LIMIT_EXCEEDED" } },
      { status: 429 }
    );
  }

  record.count++;
  rateLimitStore.set(key, record);
  return null;
}

/**
 * Authentication middleware
 */
export async function requireAuth(req: NextRequest): Promise<{
  user: any;
  supabase: ReturnType<typeof createClient>;
} | null> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return { user, supabase };
}

/**
 * CORS headers
 */
export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_URL || "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

/**
 * Error response helper
 */
export function errorResponse(
  message: string,
  code?: string,
  status: number = 400,
  details?: any
) {
  return NextResponse.json(
    {
      error: {
        message,
        code,
        details,
      },
    },
    { status, headers: corsHeaders() }
  );
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(),
  });
}

/**
 * Validate request body
 */
export function validateBody<T>(
  body: any,
  schema: (data: any) => data is T
): { valid: false; error: NextResponse } | { valid: true; data: T } {
  if (!schema(body)) {
    return {
      valid: false,
      error: errorResponse("Invalid request body", "VALIDATION_ERROR", 400),
    };
  }
  return { valid: true, data: body };
}

