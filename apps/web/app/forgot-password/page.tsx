"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowLeft, Sparkles, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message || "Failed to send reset email");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest/5 via-offwhite to-gold/5 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-forest rounded-full"
          >
            <CheckCircle className="w-10 h-10 text-offwhite" />
          </motion.div>
          <h2 className="text-3xl font-heading font-bold text-charcoal">Check Your Email</h2>
          <p className="text-charcoal/70">
            We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest/5 via-offwhite to-gold/5 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest to-forest-light rounded-2xl mb-4 shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-offwhite" />
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-2">
            Reset Password
          </h1>
          <p className="text-charcoal/60">Enter your email to receive a password reset link</p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-charcoal/5"
        >
          <form onSubmit={handleReset} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-charcoal">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-forest to-forest-light text-offwhite rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </motion.button>
          </form>

          {/* Back to Login */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-charcoal/60 hover:text-forest calm-transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

