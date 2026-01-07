"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CreditData {
  month: string;
  credits: number;
}

export default function MonthlyCreditGraph() {
  const [data, setData] = useState<CreditData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/credits-history")
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
        <div className="h-64 animate-pulse bg-charcoal/10 rounded"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-charcoal mb-6">Monthly Credits</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2C" opacity={0.1} />
            <XAxis dataKey="month" stroke="#2C2C2C" />
            <YAxis stroke="#2C2C2C" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FAF9F6",
                border: "1px solid #2C2C2C",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
            />
            <Line
              type="monotone"
              dataKey="credits"
              stroke="#1B5E20"
              strokeWidth={3}
              dot={{ fill: "#1B5E20", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

