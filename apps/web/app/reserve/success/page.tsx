"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home, Zap } from "lucide-react";
import Link from "next/link";

/**
 * Reservation Success Page
 * Shown after successful solar capacity reservation
 */
export default function ReserveSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allocationId = searchParams.get("allocationId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-offwhite to-forest/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-charcoal/5 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-heading font-bold text-charcoal mb-4"
          >
            Solar Capacity Reserved!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 mb-8"
          >
            Congratulations! You've successfully reserved solar capacity. Your credits will start generating once the project begins production.
          </motion.p>

          {allocationId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-offwhite p-4 rounded-xl border border-charcoal/10 mb-8"
            >
              <p className="text-sm text-charcoal/60 mb-1">Reservation ID</p>
              <p className="font-mono text-sm text-charcoal font-semibold">{allocationId}</p>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h2 className="text-xl font-semibold text-charcoal mb-4">Next Steps</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Link Your Utility Provider</p>
                  <p className="text-sm text-blue-700">
                    Connect your billing details to start using credits on your power bills.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 mb-1">Monitor Your Solar</p>
                  <p className="text-sm text-green-700">
                    Track real-time production and savings in your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/connect"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg calm-transition font-semibold flex items-center justify-center gap-2"
            >
              Link Utility Provider
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 px-6 py-3 border-2 border-forest text-forest rounded-xl hover:bg-forest/5 calm-transition font-semibold flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

