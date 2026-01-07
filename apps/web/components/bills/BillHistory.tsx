"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Bill {
  id: string;
  billNumber?: string;
  amount: number;
  creditsApplied: number;
  dueDate: string;
  status: string;
  discom: string;
  paidAt?: string;
}

export default function BillHistory() {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <CheckCircle className="text-forest" size={20} />;
      case "OVERDUE":
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-gold" size={20} />;
    }
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-charcoal">Bill History</h2>

      {bills.length === 0 ? (
        <div className="text-center py-8 text-charcoal/60">
          <p>No bills found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-4 bg-offwhite rounded-lg hover:bg-offwhite-dark calm-transition"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(bill.status)}
                <div>
                  <p className="font-medium text-charcoal">
                    {bill.billNumber || `Bill #${bill.id.slice(0, 8)}`}
                  </p>
                  <p className="text-sm text-charcoal/60">
                    {bill.discom} • Due: {new Date(bill.dueDate).toLocaleDateString()}
                  </p>
                  {bill.paidAt && (
                    <p className="text-xs text-forest">
                      Paid: {new Date(bill.paidAt).toLocaleDateString()}
                    </p>
                  )}
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

