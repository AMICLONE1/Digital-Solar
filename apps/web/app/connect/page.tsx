"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Link2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import FormField from "@/components/ui/FormField";

/**
 * Connect Page - Link Utility Provider
 * SundayGrids-style utility linking page
 * Step 2 in the user journey: Link power provider after reserving solar
 */
export default function ConnectPage() {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form state
  const [utilityConsumerNumber, setUtilityConsumerNumber] = useState("");
  const [state, setState] = useState("");
  const [discom, setDiscom] = useState("");
  const [isLinked, setIsLinked] = useState(false);

  // Available states and DISCOMs (simplified list)
  const states = [
    "Karnataka", "Maharashtra", "Delhi", "Tamil Nadu", "Gujarat", 
    "Rajasthan", "Punjab", "Haryana", "Uttar Pradesh", "West Bengal"
  ];

  const discoms = [
    "BESCOM", "TPDDL", "BSES", "Adani Electricity", "MSEDCL", 
    "TNEB", "KSEB", "Torrent Power", "TSGENCO", "Other"
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }
      
      setUser(user);

      // Check if utility is already linked
      const { data: profile } = await supabase
        .from("users")
        .select("utility_consumer_number, state, discom")
        .eq("id", user.id)
        .single();

      if (profile?.utility_consumer_number) {
        setIsLinked(true);
        setUtilityConsumerNumber(profile.utility_consumer_number);
        setState(profile.state || "");
        setDiscom(profile.discom || "");
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, supabase]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!utilityConsumerNumber.trim()) {
      errors.utilityConsumerNumber = "Consumer number is required";
    }

    if (!state) {
      errors.state = "State is required";
    }

    if (!discom) {
      errors.discom = "DISCOM is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          utility_consumer_number: utilityConsumerNumber.trim(),
          state,
          discom,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast.success("Utility provider linked successfully!");
      setIsLinked(true);
      
      // Redirect to dashboard after linking
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to link utility provider";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest to-forest-light rounded-2xl mb-4 shadow-lg">
            <Link2 className="w-8 h-8 text-offwhite" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-2">
            Link Power Provider
          </h1>
          <p className="text-lg text-charcoal/70">
            Connect your billing details to use credits from your digital solar
          </p>
        </motion.div>

        {/* Success State */}
        {isLinked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 mb-1">Utility Provider Linked</h3>
                <p className="text-green-700 text-sm mb-4">
                  Your utility provider is connected. You can now pay bills and use credits.
                </p>
                <div className="space-y-1 text-sm text-green-800">
                  <p><strong>Consumer Number:</strong> {utilityConsumerNumber}</p>
                  <p><strong>State:</strong> {state}</p>
                  <p><strong>DISCOM:</strong> {discom}</p>
                </div>
                <motion.button
                  onClick={() => router.push("/dashboard")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-medium flex items-center gap-2"
                >
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        {!isLinked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-charcoal/5"
          >
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Select from 70+ power providers across India</p>
                  <p>Pay bills with Bharat BillPay for utilities like BESCOM, TPDDL, BSES, Adani, MSEDCL, TNEB, KSEB, Torrent Power, Telangana.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <FormField
                label="Consumer Number"
                required
                error={fieldErrors.utilityConsumerNumber}
              >
                <input
                  type="text"
                  value={utilityConsumerNumber}
                  onChange={(e) => setUtilityConsumerNumber(e.target.value)}
                  placeholder="Enter your utility consumer number"
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                />
              </FormField>

              <FormField
                label="State"
                required
                error={fieldErrors.state}
              >
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="DISCOM (Power Distribution Company)"
                required
                error={fieldErrors.discom}
              >
                <select
                  value={discom}
                  onChange={(e) => setDiscom(e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                >
                  <option value="">Select DISCOM</option>
                  {discoms.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </FormField>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-offwhite border-t-transparent rounded-full animate-spin" />
                    Linking...
                  </>
                ) : (
                  <>
                    Link Utility Provider <Link2 className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 pt-6 border-t border-charcoal/10">
              <p className="text-sm text-charcoal/60 text-center">
                Need help? <a href="/contact" className="text-forest hover:underline">Contact Support</a>
              </p>
            </div>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-charcoal/10">
            <h3 className="font-semibold text-charcoal mb-2">Multiple Billers</h3>
            <p className="text-sm text-charcoal/70">Link multiple utility accounts to use credits</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-charcoal/10">
            <h3 className="font-semibold text-charcoal mb-2">Secure & Safe</h3>
            <p className="text-sm text-charcoal/70">Your billing information is encrypted and secure</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-charcoal/10">
            <h3 className="font-semibold text-charcoal mb-2">Easy Payments</h3>
            <p className="text-sm text-charcoal/70">Pay bills through our platform with automatic credit application</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

