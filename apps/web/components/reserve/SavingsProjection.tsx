"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Project {
  id: string;
  name: string;
  ratePerKwh: number;
}

interface SavingsProjectionProps {
  project: Project;
  capacity: number;
}

export default function SavingsProjection({ project, capacity }: SavingsProjectionProps) {
  // Calculate projected savings
  const avgGenerationPerKw = 120; // kWh per kW per month
  const monthlySavings = capacity * avgGenerationPerKw * project.ratePerKwh;

  const chartData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleDateString("en-US", { month: "short" }),
      savings: monthlySavings * (i + 1),
    }));
  }, [monthlySavings]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-semibold text-charcoal">12-Month Savings Projection</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
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
            <Bar dataKey="savings" fill="#1B5E20" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="pt-4 border-t border-charcoal/10">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-charcoal/60">Monthly Savings</p>
            <p className="text-xl font-bold text-forest">
              ₹{monthlySavings.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-charcoal/60">Annual Savings</p>
            <p className="text-xl font-bold text-charcoal">
              ₹{(monthlySavings * 12).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <p className="text-xs text-charcoal/50 mt-4">
          * Projections based on average generation. Actual savings may vary.
        </p>
      </div>
    </div>
  );
}

