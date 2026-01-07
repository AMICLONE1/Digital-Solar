"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Rupee } from "lucide-react";

export default function SavingsSummary() {
  const [data, setData] = useState<{
    totalSavings: number;
    currentMonthCredits: number;
    lifetimeSavings: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch savings data
    fetch("/api/dashboard/savings")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-charcoal/10 rounded w-1/2"></div>
          <div className="h-8 bg-charcoal/10 rounded w-3/4"></div>
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
        <h2 className="text-xl font-semibold text-charcoal">Savings Summary</h2>
        <TrendingUp className="text-forest" size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-charcoal/60">Current Month Credits</p>
          <p className="text-2xl font-bold text-forest flex items-center gap-1">
            <Rupee size={20} />
            {data?.currentMonthCredits?.toLocaleString("en-IN") || "0"}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-charcoal/60">Lifetime Savings</p>
          <p className="text-2xl font-bold text-charcoal flex items-center gap-1">
            <Rupee size={20} />
            {data?.lifetimeSavings?.toLocaleString("en-IN") || "0"}
          </p>
        </div>
      </div>

      {data && data.totalSavings > 0 && (
        <div className="pt-4 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/60">Total Active Savings</p>
          <p className="text-3xl font-bold text-forest flex items-center gap-1">
            <Rupee size={24} />
            {data.totalSavings.toLocaleString("en-IN")}
          </p>
        </div>
      )}
    </motion.div>
  );
}

