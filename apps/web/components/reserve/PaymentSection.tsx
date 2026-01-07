"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  ratePerKwh: number;
}

interface PaymentSectionProps {
  project: Project;
  capacity: number;
}

// Simplified pricing: ₹50,000 per kW (one-time)
const PRICE_PER_KW = 50000;

export default function PaymentSection({ project, capacity }: PaymentSectionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = capacity * PRICE_PER_KW;

  const handleReserve = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          capacity,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Reservation failed");
      }

      const data = await res.json();
      // Redirect to payment page or success page
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        router.push(`/reserve/success?allocationId=${data.allocationId}`);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-8">
      <div>
        <h2 className="text-xl font-semibold text-charcoal mb-2">Reservation Summary</h2>
        <p className="text-sm text-charcoal/60">{project.name}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-charcoal/70">
          <span>Capacity</span>
          <span className="font-medium">{capacity} kW</span>
        </div>
        <div className="flex justify-between text-charcoal/70">
          <span>Rate per kWh</span>
          <span className="font-medium">₹{project.ratePerKwh}</span>
        </div>
        <div className="pt-3 border-t border-charcoal/10">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-charcoal">Total Amount</span>
            <span className="text-2xl font-bold text-forest">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <motion.button
        onClick={handleReserve}
        disabled={loading || capacity <= 0}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full px-6 py-4 bg-forest text-offwhite rounded-lg hover:bg-forest-light calm-transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            <CreditCard size={20} />
            Reserve & Pay
            <Lock size={16} />
          </>
        )}
      </motion.button>

      <div className="text-xs text-charcoal/50 space-y-1">
        <p>• One-time payment for lifetime capacity</p>
        <p>• Credits applied monthly to your bill</p>
        <p>• Secure payment processing</p>
      </div>
    </div>
  );
}

