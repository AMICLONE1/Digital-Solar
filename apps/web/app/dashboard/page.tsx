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
import { LogOut, Settings, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
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
    };

    getUser();
  }, [router, supabase]);

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
                <p className="text-sm text-charcoal/60">Welcome back, {user?.name || user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 rounded-lg transition-all"
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
            <SavingsSummary />
            <MonthlyCreditGraph />
            <BillsTimeline />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ProjectHealthIndicator />
            <EnvironmentalImpact />
          </div>
        </div>
      </div>
    </div>
  );
}
