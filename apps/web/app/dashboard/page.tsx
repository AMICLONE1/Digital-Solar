"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import SavingsSummary from "@/components/dashboard/SavingsSummary";
import MonthlyCreditGraph from "@/components/dashboard/MonthlyCreditGraph";
import ProjectHealthIndicator from "@/components/dashboard/ProjectHealthIndicator";
import EnvironmentalImpact from "@/components/dashboard/EnvironmentalImpact";
import BillsTimeline from "@/components/dashboard/BillsTimeline";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { ReferralSection } from "@/components/referrals/ReferralSection";
import { ExportButton } from "@/components/export/ExportButton";
import { LogOut, Settings, Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useToast, ToastContainer } from "@/components/ui/Toast";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // Get user profile
    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    setUser({ ...user, ...profile });
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    setMounted(true);
    fetchUser();
  }, [router, supabase]);

  useEffect(() => {
    if (!user?.id) return;

    // Set up real-time subscription for user updates
    const channel = supabase
      .channel(`user-updates-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          console.log("User updated:", payload);
          setUser((prev: any) => ({ ...prev, ...payload.new }));
        }
      )
      .subscribe();

    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      setRefreshing(true);
      fetchUser();
      setLastRefresh(new Date());
    }, 30000);

    return () => {
      clearInterval(refreshInterval);
      supabase.removeChannel(channel);
    };
  }, [user?.id, supabase]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUser();
    setLastRefresh(new Date());
    toast.success("Dashboard refreshed");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-charcoal/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-offwhite to-forest/5">
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-charcoal/10 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-forest to-forest-light rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-offwhite" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-charcoal">Dashboard</h1>
                <p className="text-sm text-charcoal/60">
                  Welcome back, {user?.name || user?.email}
                  {mounted && lastRefresh && (
                    <span className="text-xs text-charcoal/40 ml-2">
                      • Updated {lastRefresh.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 rounded-lg transition-all disabled:opacity-50"
                title="Refresh data"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
              </button>
              <Link
                href="/settings"
                className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 rounded-lg transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-charcoal">Your Savings</h2>
              <ExportButton type="savings-report" />
            </div>
            <SavingsSummary />
            <MonthlyCreditGraph />
            <BillsTimeline />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <NotificationCenter />
            <ReferralSection />
            <ProjectHealthIndicator />
            <EnvironmentalImpact />
          </div>
        </div>
      </div>
    </div>
  );
}
