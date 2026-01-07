"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

interface Bill {
  id: string;
  amount: number;
  creditsApplied: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  billNumber?: string;
}

export default function BillsTimeline() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bills")
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-charcoal/10 rounded w-1/2"></div>
          <div className="h-32 bg-charcoal/10 rounded"></div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="text-forest" size={20} />;
      case "overdue":
        return <Clock className="text-red-600" size={20} />;
      default:
        return <Clock className="text-gold" size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-lg shadow-sm p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-charcoal">Recent Bills</h2>
        <Link
          href="/bills"
          className="text-sm text-forest hover:underline font-medium"
        >
          View All
        </Link>
      </div>

      {bills.length === 0 ? (
        <div className="text-center py-8 text-charcoal/60">
          <FileText className="mx-auto mb-2 text-charcoal/30" size={32} />
          <p>No bills found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bills.slice(0, 5).map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-3 bg-offwhite rounded-lg hover:bg-offwhite-dark calm-transition"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(bill.status)}
                <div>
                  <p className="font-medium text-charcoal">
                    {bill.billNumber || `Bill #${bill.id.slice(0, 8)}`}
                  </p>
                  <p className="text-sm text-charcoal/60">
                    Due: {new Date(bill.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-charcoal">
                  ₹{(bill.amount - bill.creditsApplied).toLocaleString("en-IN")}
                </p>
                {bill.creditsApplied > 0 && (
                  <p className="text-xs text-forest">
                    -₹{bill.creditsApplied.toLocaleString("en-IN")} credits
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

