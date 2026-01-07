"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Sparkles } from "lucide-react";

type Step = "kyc" | "utility" | "complete";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState<Step>("kyc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
    };
    getUser();
  }, [router, supabase]);

  // KYC Form State
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [name, setName] = useState("");

  // Utility Form State
  const [utilityConsumerNumber, setUtilityConsumerNumber] = useState("");
  const [state, setState] = useState("");
  const [discom, setDiscom] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="text-charcoal">Loading...</div>
      </div>
    );
  }

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          name,
          aadhaar_number: aadhaarNumber,
          pan_number: panNumber,
          kyc_status: "VERIFIED", // In production, verify via API
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setCurrentStep("utility");
    } catch (err: any) {
      setError(err.message || "KYC verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUtilitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          utility_consumer_number: utilityConsumerNumber,
          state,
          discom,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setCurrentStep("complete");
    } catch (err: any) {
      setError(err.message || "Failed to update utility information");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: "kyc", label: "KYC Verification", completed: currentStep !== "kyc" },
    { id: "utility", label: "Utility Connection", completed: currentStep === "complete" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-offwhite to-forest/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest to-forest-light rounded-2xl mb-4 shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-offwhite" />
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-2">
            Complete Your Profile
          </h1>
          <p className="text-charcoal/60">Just a few steps to get started</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold calm-transition ${
                      step.completed
                        ? "bg-forest text-offwhite shadow-lg"
                        : currentStep === step.id
                          ? "bg-forest text-offwhite ring-4 ring-forest/20 shadow-lg"
                          : "bg-charcoal/10 text-charcoal/50"
                    }`}
                  >
                    {step.completed ? <Check size={20} /> : index + 1}
                  </motion.div>
                  <span
                    className={`mt-3 text-sm font-medium ${
                      currentStep === step.id ? "text-forest" : "text-charcoal/50"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 calm-transition ${
                      step.completed ? "bg-forest" : "bg-charcoal/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-charcoal/5"
        >
          <AnimatePresence mode="wait">
            {currentStep === "kyc" && (
              <motion.form
                key="kyc"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleKYCSubmit}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-bold text-charcoal mb-2">
                    KYC Verification
                  </h2>
                  <p className="text-charcoal/70">
                    Verify your identity to start using Digital Solar
                  </p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="aadhaar"
                    className="block text-sm font-semibold text-charcoal mb-2"
                  >
                    Aadhaar Number
                  </label>
                  <input
                    id="aadhaar"
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
                    placeholder="12-digit Aadhaar"
                    required
                    maxLength={12}
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="pan" className="block text-sm font-semibold text-charcoal mb-2">
                    PAN Number
                  </label>
                  <input
                    id="pan"
                    type="text"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase().slice(0, 10))}
                    placeholder="ABCDE1234F"
                    required
                    maxLength={10}
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all uppercase"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg calm-transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                  {!loading && <ChevronRight size={20} />}
                </motion.button>
              </motion.form>
            )}

            {currentStep === "utility" && (
              <motion.form
                key="utility"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleUtilitySubmit}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-bold text-charcoal mb-2">
                    Utility Connection
                  </h2>
                  <p className="text-charcoal/70">
                    Connect your electricity bill to apply credits automatically
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="consumer-number"
                    className="block text-sm font-semibold text-charcoal mb-2"
                  >
                    Utility Consumer Number
                  </label>
                  <input
                    id="consumer-number"
                    type="text"
                    value={utilityConsumerNumber}
                    onChange={(e) => setUtilityConsumerNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-charcoal mb-2">
                    State
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      if (e.target.value === "Maharashtra") setDiscom("MSEDCL");
                      else if (e.target.value === "Delhi") setDiscom("BSES");
                      else setDiscom("");
                    }}
                    required
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="discom" className="block text-sm font-semibold text-charcoal mb-2">
                    DISCOM
                  </label>
                  <select
                    id="discom"
                    value={discom}
                    onChange={(e) => setDiscom(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                  >
                    <option value="">Select DISCOM</option>
                    <option value="MSEDCL">MSEDCL</option>
                    <option value="BSES">BSES</option>
                    <option value="BESCOM">BESCOM</option>
                    <option value="TANGEDCO">TANGEDCO</option>
                    <option value="DGVCL">DGVCL</option>
                  </select>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg calm-transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Saving..." : "Complete Setup"}
                  {!loading && <ChevronRight size={20} />}
                </motion.button>
              </motion.form>
            )}

            {currentStep === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto shadow-lg"
                >
                  <Check size={40} className="text-offwhite" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-heading font-bold text-charcoal mb-2">
                    Setup Complete!
                  </h2>
                  <p className="text-charcoal/70">
                    You&apos;re all set to start reserving solar capacity and saving on your bills.
                  </p>
                </div>
                <motion.button
                  onClick={() => router.push("/dashboard")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg calm-transition font-semibold"
                >
                  Go to Dashboard
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
