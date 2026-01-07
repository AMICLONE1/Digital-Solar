"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function CreditsBreakdown() {
  const [data, setData] = useState<{
    available: number;
    earned: number;
    applied: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/credits/available").then((res) => res.json()),
      fetch("/api/credits/ledger?type=EARNED&limit=100").then((res) => res.json()),
      fetch("/api/credits/ledger?type=APPLIED&limit=100").then((res) => res.json()),
    ])
      .then(([available, earned, applied]) => {
        const earnedTotal = earned.reduce((sum: number, e: any) => sum + e.amount, 0);
        const appliedTotal = applied.reduce((sum: number, e: any) => sum + e.amount, 0);

        setData({
          available: available.available || 0,
          earned: earnedTotal,
          applied: appliedTotal,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-charcoal/10 rounded w-1/2"></div>
          <div className="h-20 bg-charcoal/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-charcoal">Credits Breakdown</h2>
        <Wallet className="text-forest" size={24} />
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-forest/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-charcoal/70">Available Credits</span>
            <TrendingUp className="text-forest" size={16} />
          </div>
          <p className="text-2xl font-bold text-forest">
            ₹{data?.available.toLocaleString("en-IN") || "0"}
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-charcoal/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-forest" size={16} />
              <span className="text-sm text-charcoal/70">Total Earned</span>
            </div>
            <span className="font-semibold text-charcoal">
              ₹{data?.earned.toLocaleString("en-IN") || "0"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingDown className="text-charcoal/50" size={16} />
              <span className="text-sm text-charcoal/70">Total Applied</span>
            </div>
            <span className="font-semibold text-charcoal/70">
              ₹{data?.applied.toLocaleString("en-IN") || "0"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

