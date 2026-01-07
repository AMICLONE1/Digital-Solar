"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, RefreshCw, CreditCard } from "lucide-react";

interface Bill {
  id: string;
  billNumber?: string;
  amount: number;
  creditsApplied: number;
  dueDate: string;
  status: string;
  discom: string;
}

export default function CurrentBillCard() {
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [paying, setPaying] = useState(false);

  const fetchCurrentBill = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/bills/fetch", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setBill(data);
      }
    } catch (error) {
      console.error("Failed to fetch bill:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    // Try to get latest bill
    fetch("/api/bills")
      .then((res) => res.json())
      .then((bills) => {
        if (bills.length > 0) {
          setBill(bills[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePay = async () => {
    if (!bill) return;

    setPaying(true);
    try {
      const res = await fetch("/api/bills/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billId: bill.id,
          applyCredits: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBill(data.bill);
        // Refresh page to update credits
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to pay bill:", error);
    } finally {
      setPaying(false);
    }
  };

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

  const remainingAmount = bill ? bill.amount - bill.creditsApplied : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-charcoal">Current Bill</h2>
        <button
          onClick={fetchCurrentBill}
          disabled={fetching}
          className="flex items-center gap-2 text-sm text-forest hover:text-forest-light calm-transition disabled:opacity-50"
        >
          <RefreshCw size={16} className={fetching ? "animate-spin" : ""} />
          {fetching ? "Fetching..." : "Refresh"}
        </button>
      </div>

      {!bill ? (
        <div className="text-center py-8 text-charcoal/60">
          <FileText className="mx-auto mb-2 text-charcoal/30" size={32} />
          <p>No bill found</p>
          <button
            onClick={fetchCurrentBill}
            className="mt-4 text-forest hover:underline"
          >
            Fetch from BBPS
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-offwhite rounded-lg">
              <div>
                <p className="text-sm text-charcoal/60">Bill Number</p>
                <p className="font-medium text-charcoal">{bill.billNumber || "N/A"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-charcoal/60">DISCOM</p>
                <p className="font-medium text-charcoal">{bill.discom}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-charcoal/70">
              <Calendar size={16} />
              <span>Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
            </div>

            <div className="pt-4 border-t border-charcoal/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-charcoal/70">Bill Amount</span>
                <span className="text-xl font-bold text-charcoal">
                  ₹{bill.amount.toLocaleString("en-IN")}
                </span>
              </div>
              {bill.creditsApplied > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/70">Credits Applied</span>
                  <span className="text-lg font-semibold text-forest">
                    -₹{bill.creditsApplied.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-charcoal/10">
                <span className="text-lg font-semibold text-charcoal">Amount to Pay</span>
                <span className="text-2xl font-bold text-forest">
                  ₹{remainingAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {remainingAmount > 0 && (
            <button
              onClick={handlePay}
              disabled={paying || bill.status === "PAID"}
              className="w-full px-6 py-3 bg-forest text-offwhite rounded-lg hover:bg-forest-light calm-transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              {paying ? "Processing..." : bill.status === "PAID" ? "Paid" : "Pay Balance"}
            </button>
          )}

          {bill.status === "PAID" && (
            <div className="p-3 bg-forest/10 border border-forest/20 rounded-lg text-center">
              <p className="text-forest font-medium">Bill Paid Successfully</p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

