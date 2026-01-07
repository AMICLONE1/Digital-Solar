"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { useToast, ToastContainer } from "@/components/ui/Toast";

type Step = "kyc" | "utility" | "complete";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("kyc");
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

  const validateKYC = () => {
    const errors: Record<string, string> = {};
    
    if (!name.trim()) {
      errors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!aadhaarNumber) {
      errors.aadhaarNumber = "Aadhaar number is required";
    } else if (aadhaarNumber.length !== 12) {
      errors.aadhaarNumber = "Aadhaar number must be 12 digits";
    } else if (!/^\d{12}$/.test(aadhaarNumber)) {
      errors.aadhaarNumber = "Aadhaar number must contain only digits";
    }

    if (!panNumber) {
      errors.panNumber = "PAN number is required";
    } else if (panNumber.length !== 10) {
      errors.panNumber = "PAN number must be 10 characters";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
      errors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateKYC()) {
      setError("Please fix the errors below");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          name: name.trim(),
          aadhaar_number: aadhaarNumber,
          pan_number: panNumber.toUpperCase(),
          kyc_status: "VERIFIED", // In production, verify via API
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast.success("KYC information saved successfully!");
      setCurrentStep("utility");
      setFieldErrors({});
    } catch (err: any) {
      const errorMessage = err.message || "KYC verification failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateUtility = () => {
    const errors: Record<string, string> = {};
    
    if (!utilityConsumerNumber.trim()) {
      errors.utilityConsumerNumber = "Utility consumer number is required";
    } else if (utilityConsumerNumber.trim().length < 5) {
      errors.utilityConsumerNumber = "Consumer number must be at least 5 characters";
    }

    if (!state) {
      errors.state = "Please select your state";
    }

    if (!discom) {
      errors.discom = "Please select your DISCOM";
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

      toast.success("Utility information saved successfully!");
      setCurrentStep("complete");
      setFieldErrors({});
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update utility information";
      setError(errorMessage);
      toast.error(errorMessage);
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
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
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

                <FormField
                  label="Full Name"
                  error={fieldErrors.name}
                  required
                  hint="Enter your full legal name as per Aadhaar"
                >
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                    }}
                    required
                    className={`w-full px-4 py-3 bg-offwhite border ${
                      fieldErrors.name ? "border-red-300" : "border-charcoal/10"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all`}
                  />
                </FormField>

                <FormField
                  label="Aadhaar Number"
                  error={fieldErrors.aadhaarNumber}
                  required
                  hint="12-digit Aadhaar number (numbers only)"
                >
                  <input
                    id="aadhaar"
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => {
                      setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12));
                      if (fieldErrors.aadhaarNumber) setFieldErrors({ ...fieldErrors, aadhaarNumber: "" });
                    }}
                    placeholder="12-digit Aadhaar"
                    required
                    maxLength={12}
                    className={`w-full px-4 py-3 bg-offwhite border ${
                      fieldErrors.aadhaarNumber ? "border-red-300" : "border-charcoal/10"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all`}
                  />
                </FormField>

                <FormField
                  label="PAN Number"
                  error={fieldErrors.panNumber}
                  required
                  hint="10-character PAN (e.g., ABCDE1234F)"
                >
                  <input
                    id="pan"
                    type="text"
                    value={panNumber}
                    onChange={(e) => {
                      setPanNumber(e.target.value.toUpperCase().slice(0, 10));
                      if (fieldErrors.panNumber) setFieldErrors({ ...fieldErrors, panNumber: "" });
                    }}
                    placeholder="ABCDE1234F"
                    required
                    maxLength={10}
                    className={`w-full px-4 py-3 bg-offwhite border ${
                      fieldErrors.panNumber ? "border-red-300" : "border-charcoal/10"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all uppercase`}
                  />
                </FormField>

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

                <FormField
                  label="Utility Consumer Number"
                  error={fieldErrors.utilityConsumerNumber}
                  required
                  hint="Your electricity bill consumer number"
                >
                  <input
                    id="consumer-number"
                    type="text"
                    value={utilityConsumerNumber}
                    onChange={(e) => {
                      setUtilityConsumerNumber(e.target.value);
                      if (fieldErrors.utilityConsumerNumber) setFieldErrors({ ...fieldErrors, utilityConsumerNumber: "" });
                    }}
                    required
                    className={`w-full px-4 py-3 bg-offwhite border ${
                      fieldErrors.utilityConsumerNumber ? "border-red-300" : "border-charcoal/10"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all`}
                  />
                </FormField>

                <FormField
                  label="State"
                  error={fieldErrors.state}
                  required
                >
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      if (e.target.value === "Maharashtra") setDiscom("MSEDCL");
                      else if (e.target.value === "Delhi") setDiscom("BSES");
                      else setDiscom("");
                      if (fieldErrors.state) setFieldErrors({ ...fieldErrors, state: "" });
                    }}
                    required
                    className={`w-full px-4 py-3 bg-offwhite border ${
                      fieldErrors.state ? "border-red-300" : "border-charcoal/10"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all`}
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </FormField>

                <FormField
                  label="DISCOM"
                  error={fieldErrors.discom}
                  required
                  hint="Your electricity distribution company"
                >
                  <select
                    id="discom"
                    value={discom}
                    onChange={(e) => {
                      setDiscom(e.target.value);
                      if (fieldErrors.discom) setFieldErrors({ ...fieldErrors, discom: "" });
                    }}
                    required
                    className={`w-full px-4 py-3 bg-offwhite border ${
                      fieldErrors.discom ? "border-red-300" : "border-charcoal/10"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all`}
                  >
                    <option value="">Select DISCOM</option>
                    <option value="MSEDCL">MSEDCL</option>
                    <option value="BSES">BSES</option>
                    <option value="BESCOM">BESCOM</option>
                    <option value="TANGEDCO">TANGEDCO</option>
                    <option value="DGVCL">DGVCL</option>
                  </select>
                </FormField>

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
                  onClick={() => router.push("/reserve")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg calm-transition font-semibold"
                >
                  Reserve Solar Capacity
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
