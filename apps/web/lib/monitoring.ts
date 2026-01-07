/**
 * PowerNetPro Monitoring & Analytics
 * Centralized monitoring setup for error tracking, analytics, and performance
 */

import type { ComponentType } from "react";

// Error Tracking (Sentry) - Optional
let Sentry: any = null;
if (typeof window !== "undefined") {
  try {
    // Only load if DSN is provided
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry = require("@sentry/nextjs");
    }
  } catch (e) {
    // Sentry not installed - that's okay
  }
}

// Analytics (PostHog) - Optional
let posthog: any = null;
if (typeof window !== "undefined") {
  try {
    // Only load if key is provided
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog = require("posthog-js").default;
    }
  } catch (e) {
    // PostHog not installed - that's okay
  }
}

/**
 * Initialize monitoring services
 */
export function initMonitoring() {
  if (typeof window === "undefined") return;

  // Initialize PostHog
  if (posthog && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      loaded: (posthog: any) => {
        if (process.env.NODE_ENV === "development") {
          console.log("PostHog initialized");
        }
      },
    });
  }
}

/**
 * Track errors
 */
export function captureError(error: Error, context?: Record<string, any>) {
  if (Sentry && Sentry.captureException) {
    Sentry.captureException(error, {
      contexts: {
        custom: context || {},
      },
    });
  }
  console.error("Error captured:", error, context);
}

/**
 * Track events
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (posthog) {
    posthog.capture(eventName, properties);
  }
  
  // Also log in development
  if (process.env.NODE_ENV === "development") {
    console.log("Event tracked:", eventName, properties);
  }
}

/**
 * Identify user for analytics
 */
export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (posthog) {
    posthog.identify(userId, traits);
  }
}

/**
 * Reset user (on logout)
 */
export function resetUser() {
  if (posthog) {
    posthog.reset();
  }
}

/**
 * Track page views
 */
export function trackPageView(path: string) {
  if (posthog) {
    posthog.capture("$pageview", {
      path,
    });
  }
}

/**
 * Performance monitoring
 */
export function trackPerformance(
  metricName: string,
  value: number,
  unit: string = "ms"
) {
  if (posthog) {
    posthog.capture("performance_metric", {
      metric: metricName,
      value,
      unit,
    });
  }
}

/**
 * Track user actions
 */
export const trackActions = {
  signup: (method: string = "email") => {
    trackEvent("user_signed_up", { method });
  },
  login: (method: string = "email") => {
    trackEvent("user_logged_in", { method });
  },
  reservationCreated: (amount: number, capacity: number) => {
    trackEvent("reservation_created", { amount, capacity });
  },
  paymentCompleted: (amount: number, type: string) => {
    trackEvent("payment_completed", { amount, type });
  },
  billPaid: (amount: number, creditsApplied: number) => {
    trackEvent("bill_paid", { amount, creditsApplied });
  },
  creditEarned: (amount: number) => {
    trackEvent("credit_earned", { amount });
  },
  kycCompleted: () => {
    trackEvent("kyc_completed");
  },
  onboardingCompleted: () => {
    trackEvent("onboarding_completed");
  },
};

/**
 * Error boundary helper
 * Note: For React components, use the ErrorBoundary component instead
 * This is a utility wrapper for Sentry integration
 */
export function withErrorBoundary<T extends ComponentType<any>>(
  Component: T
): T {
  if (Sentry && Sentry.withErrorBoundary) {
    // Sentry's withErrorBoundary will handle the fallback UI
    return Sentry.withErrorBoundary(Component);
  }
  return Component;
}

