"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, TreePine } from "lucide-react";

export default function EnvironmentalImpact() {
  const [data, setData] = useState<{
    co2Saved: number;
    treesEquivalent: number;
    energyGenerated: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/environmental-impact")
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
          <div className="h-20 bg-charcoal/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-forest/10 to-forest/5 rounded-lg shadow-sm p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-charcoal">Environmental Impact</h2>
        <Leaf className="text-forest" size={24} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TreePine className="text-forest" size={20} />
            <span className="text-charcoal/70">CO₂ Saved</span>
          </div>
          <span className="text-xl font-bold text-forest">
            {data?.co2Saved?.toFixed(1) || "0"} kg
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TreePine className="text-forest" size={20} />
            <span className="text-charcoal/70">Trees Equivalent</span>
          </div>
          <span className="text-xl font-bold text-forest">
            {data?.treesEquivalent?.toFixed(0) || "0"}
          </span>
        </div>

        <div className="pt-4 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/60 mb-1">Energy Generated</p>
          <p className="text-2xl font-bold text-charcoal">
            {data?.energyGenerated?.toLocaleString("en-IN") || "0"} kWh
          </p>
        </div>
      </div>
    </motion.div>
  );
}

