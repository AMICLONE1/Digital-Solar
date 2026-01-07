"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Sparkles, Zap, Link2, CreditCard } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { useToast, ToastContainer } from "@/components/ui/Toast";

type Step = "reserve" | "utility" | "complete";

/**
 * Onboarding flow inspired by SundayGrids
 * Step 1: Reserve Solar (Join a project)
 * Step 2: Link Utility Provider (Add billing details)
 * Step 3: Complete - Ready to offset bills
 */
export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("reserve");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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
      
      // Check if user already has reservations and utility linked
      const { data: allocations } = await supabase
        .from("allocations")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);
      
      const { data: profile } = await supabase
        .from("users")
        .select("utility_consumer_number")
        .eq("id", user.id)
        .single();

      // If user has both, skip to complete
      if (allocations && allocations.length > 0 && profile?.utility_consumer_number) {
        setCurrentStep("complete");
      } else if (allocations && allocations.length > 0) {
        // Has reservations but no utility - go to utility step
        setCurrentStep("utility");
      } else {
        // No reservations - start with reserve
        setCurrentStep("reserve");
      }
    };
    getUser();
  }, [router, supabase]);

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

  const validateUtility = () => {
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

  const handleUtilitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUtility()) {
      setError("Please fix the errors below");
      return;
    }

    setLoading(true);
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

      toast.success("Utility information linked successfully!");
      setCurrentStep("complete");
      setFieldErrors({});
    } catch (err: any) {
      const errorMessage = err.message || "Failed to link utility information";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { 
      id: "reserve", 
      label: "Reserve Solar", 
      icon: Zap,
      description: "Join a solar project",
      completed: currentStep !== "reserve" 
    },
    { 
      id: "utility", 
      label: "Link Utility", 
      icon: Link2,
      description: "Add billing details",
      completed: currentStep === "complete" 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-offwhite to-forest/5 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
      <div className="max-w-4xl mx-auto">
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
            Get Started with Digital Solar
          </h1>
          <p className="text-charcoal/60">Just 2 simple steps to start saving</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold calm-transition ${
                        step.completed
                          ? "bg-forest text-offwhite shadow-lg"
                          : currentStep === step.id
                            ? "bg-forest text-offwhite ring-4 ring-forest/20 shadow-lg"
                            : "bg-charcoal/10 text-charcoal/50"
                      }`}
                    >
                      {step.completed ? <Check size={24} /> : <Icon size={24} />}
                    </motion.div>
                    <span
                      className={`mt-3 text-sm font-medium text-center ${
                        currentStep === step.id ? "text-forest" : "text-charcoal/50"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-xs text-charcoal/40 mt-1">{step.description}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 calm-transition ${
                        step.completed ? "bg-forest" : "bg-charcoal/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-charcoal/5"
        >
          <AnimatePresence mode="wait">
            {currentStep === "reserve" && (
              <motion.div
                key="reserve"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-6"
              >
                <Zap className="w-16 h-16 text-forest mx-auto" />
                <div>
                  <h2 className="text-3xl font-heading font-bold text-charcoal mb-2">
                    Step 1: Reserve Solar Capacity
                  </h2>
                  <p className="text-charcoal/70 mb-6">
                    Join a solar project and reserve the capacity you need to offset your monthly power bill.
                  </p>
                </div>
                <motion.button
                  onClick={() => router.push("/reserve")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg calm-transition font-semibold inline-flex items-center gap-2"
                >
                  Browse Projects
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
                <p className="text-sm text-charcoal/50">
                  You can skip this step and link your utility first, then reserve later
                </p>
                <button
                  onClick={() => setCurrentStep("utility")}
                  className="text-sm text-forest hover:underline"
                >
                  Skip to Link Utility →
                </button>
              </motion.div>
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
                <div className="text-center mb-6">
                  <Link2 className="w-12 h-12 text-forest mx-auto mb-3" />
                  <h2 className="text-2xl font-heading font-bold text-charcoal mb-2">
                    Step 2: Link Your Power Provider
                  </h2>
                  <p className="text-charcoal/70">
                    Add your billing details to use credits from your digital solar
                  </p>
                </div>

                <FormField
                  label="Consumer Number"
                  value={utilityConsumerNumber}
                  onChange={(e) => setUtilityConsumerNumber(e.target.value)}
                  error={fieldErrors.utilityConsumerNumber}
                  placeholder="Enter your consumer number"
                  required
                />

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Other">Other</option>
                  </select>
                  {fieldErrors.state && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    DISCOM <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={discom}
                    onChange={(e) => setDiscom(e.target.value)}
                    className="w-full px-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select DISCOM</option>
                    {state === "Karnataka" && (
                      <>
                        <option value="BESCOM">BESCOM</option>
                        <option value="MESCOM">MESCOM</option>
                        <option value="HESCOM">HESCOM</option>
                        <option value="GESCOM">GESCOM</option>
                      </>
                    )}
                    {state === "Maharashtra" && (
                      <>
                        <option value="MSEDCL">MSEDCL</option>
                        <option value="BEST">BEST</option>
                        <option value="Tata Power">Tata Power</option>
                      </>
                    )}
                    {state === "Tamil Nadu" && (
                      <>
                        <option value="TNEB">TNEB</option>
                        <option value="TANGEDCO">TANGEDCO</option>
                      </>
                    )}
                    {state === "Delhi" && (
                      <>
                        <option value="BSES">BSES</option>
                        <option value="TPDDL">TPDDL</option>
                        <option value="NDPL">NDPL</option>
                      </>
                    )}
                    {state === "Gujarat" && (
                      <>
                        <option value="DGVCL">DGVCL</option>
                        <option value="MGVCL">MGVCL</option>
                        <option value="PGVCL">PGVCL</option>
                        <option value="UGVCL">UGVCL</option>
                      </>
                    )}
                    {state === "Telangana" && (
                      <>
                        <option value="TSNPDCL">TSNPDCL</option>
                        <option value="TSSPDCL">TSSPDCL</option>
                      </>
                    )}
                    {state === "Kerala" && (
                      <>
                        <option value="KSEB">KSEB</option>
                      </>
                    )}
                    {!state && (
                      <option value="" disabled>Select state first</option>
                    )}
                  </select>
                  {fieldErrors.discom && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.discom}</p>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Linking..." : "Link Utility Provider"}
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.form>
            )}

            {currentStep === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
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
                    You&apos;re All Set!
                  </h2>
                  <p className="text-charcoal/70 mb-6">
                    Start offsetting your power bills with digital solar credits
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={() => router.push("/reserve")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg calm-transition font-semibold"
                  >
                    Reserve Solar
                  </motion.button>
                  <motion.button
                    onClick={() => router.push("/dashboard")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border-2 border-forest text-forest rounded-xl hover:bg-forest/5 calm-transition font-semibold"
                  >
                    Go to Dashboard
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
