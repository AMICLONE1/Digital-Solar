/**
 * PowerNetPro Monitoring & Analytics
 * Centralized monitoring setup for error tracking, analytics, and performance
 * 
 * Note: Sentry and PostHog are optional dependencies.
 * If not installed, functions will gracefully degrade.
 */

import type { ComponentType } from "react";

// Lazy-loaded modules (will only load if packages are installed)
let SentryModule: any = null;
let PostHogModule: any = null;
let posthogInstance: any = null;

/**
 * Lazy load Sentry if available
 * Uses runtime evaluation to avoid webpack static analysis
 */
async function getSentry() {
  if (SentryModule !== null) return SentryModule === false ? null : SentryModule;
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return null;

  try {
    // Dynamic import with string concatenation to prevent webpack static analysis
    const sentryModule = "@sentry" + "/nextjs";
    SentryModule = await import(/* webpackIgnore: true */ sentryModule);
    return SentryModule;
  } catch (e) {
    // Package not installed - that's okay
    SentryModule = false; // Cache the failure
    return null;
  }
}

/**
 * Lazy load PostHog if available
 * Uses runtime evaluation to avoid webpack static analysis
 */
async function getPostHog() {
  if (PostHogModule !== null) return PostHogModule === false ? null : PostHogModule;
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return null;

  try {
    // Dynamic import with string concatenation to prevent webpack static analysis
    const posthogModule = "posthog" + "-js";
    PostHogModule = await import(/* webpackIgnore: true */ posthogModule);
    return PostHogModule.default || PostHogModule;
  } catch (e) {
    // Package not installed - that's okay
    PostHogModule = false; // Cache the failure
    return null;
  }
}

/**
 * Initialize monitoring services
 */
export async function initMonitoring() {
  if (typeof window === "undefined") return;

  // Initialize PostHog
  const posthog = await getPostHog();
  if (posthog && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    try {
      posthogInstance = posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        loaded: (ph: any) => {
          if (process.env.NODE_ENV === "development") {
            console.log("PostHog initialized");
          }
        },
      });
    } catch (error) {
      console.warn("PostHog initialization failed:", error);
    }
  }
}

/**
 * Track errors
 */
export async function captureError(error: Error, context?: Record<string, any>) {
  try {
    const Sentry = await getSentry();
    if (Sentry && Sentry.captureException) {
      Sentry.captureException(error, {
        contexts: {
          custom: context || {},
        },
      });
    }
  } catch (e) {
    // Ignore errors
  }
  console.error("Error captured:", error, context);
}

/**
 * Track events
 */
export async function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  try {
    if (posthogInstance) {
      posthogInstance.capture(eventName, properties);
    }
  } catch (e) {
    // Ignore errors
  }
  
  // Also log in development
  if (process.env.NODE_ENV === "development") {
    console.log("Event tracked:", eventName, properties);
  }
}

/**
 * Identify user for analytics
 */
export async function identifyUser(userId: string, traits?: Record<string, any>) {
  try {
    if (posthogInstance) {
      posthogInstance.identify(userId, traits);
    }
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Reset user (on logout)
 */
export function resetUser() {
  try {
    if (posthogInstance) {
      posthogInstance.reset();
    }
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Track page views
 */
export async function trackPageView(path: string) {
  try {
    if (posthogInstance) {
      posthogInstance.capture("$pageview", {
        path,
      });
    }
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Performance monitoring
 */
export async function trackPerformance(
  metricName: string,
  value: number,
  unit: string = "ms"
) {
  try {
    if (posthogInstance) {
      posthogInstance.capture("performance_metric", {
        metric: metricName,
        value,
        unit,
      });
    }
  } catch (e) {
    // Ignore errors
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
export async function withErrorBoundary<T extends ComponentType<any>>(
  Component: T
): Promise<T> {
  try {
    const Sentry = await getSentry();
    if (Sentry && Sentry.withErrorBoundary) {
      // Sentry's withErrorBoundary will handle the fallback UI
      return Sentry.withErrorBoundary(Component);
    }
  } catch (e) {
    // Ignore errors
  }
  return Component;
}
