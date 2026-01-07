"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initMonitoring, trackPageView } from "@/lib/monitoring";

/**
 * Monitoring Provider
 * Initializes monitoring services and tracks page views
 */
export function MonitoringProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize monitoring on mount
    initMonitoring();
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}

