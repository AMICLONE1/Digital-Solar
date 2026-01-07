"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import PasswordStrength from "@/components/ui/PasswordStrength";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Creating Account...");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    // Get referral code from URL
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralCode(ref);
    }
  }, [searchParams]);

  const handleSuccessfulLogin = async (userId: string) => {
    try {
      // Check if user needs onboarding
      const { data: profile } = await supabase
        .from("users")
        .select("kyc_status, utility_consumer_number")
        .eq("id", userId)
        .single();

      // If profile is incomplete, redirect to onboarding
      if (!profile || profile.kyc_status !== "VERIFIED" || !profile.utility_consumer_number) {
        console.log("Profile incomplete, redirecting to onboarding");
        window.location.href = "/onboarding";
        return;
      }

      // Profile is complete - check if user has reserved capacity
      const { data: allocations, error: allocError } = await supabase
        .from("allocations")
        .select("id")
        .eq("user_id", userId)
        .limit(1);

      if (allocError) {
        console.error("Error checking allocations:", allocError);
        // If we can't check, redirect to reserve page to let them start
        window.location.href = "/reserve";
        return;
      }

      // If user has allocations, go to dashboard; otherwise, go to reserve page
      const redirectPath = allocations && allocations.length > 0
        ? "/dashboard"
        : "/reserve";

      console.log("Redirecting to:", redirectPath, allocations?.length ? "(has reservations)" : "(no reservations)");
      
      // Force navigation with full page reload to ensure session is set
      window.location.href = redirectPath;
    } catch (err) {
      console.error("Profile check error:", err);
      // Still redirect to onboarding even if profile check fails
      window.location.href = "/onboarding";
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError("Authentication service is not configured. Please contact support.");
        setLoading(false);
        return;
      }

      console.log("Starting signup process...");
      setLoadingMessage("Creating your account...");
      
      // Step 1: Sign up the user
      const { data: signUpData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) {
        console.error("Signup error:", authError);
        if (authError.message.includes("already registered")) {
          setError("This email is already registered. Please try logging in instead.");
        } else {
          setError(authError.message || "Failed to create account");
        }
        setLoading(false);
        return;
      }

      if (!signUpData.user) {
        setError("Account creation failed. Please try again.");
        setLoading(false);
        return;
      }

      console.log("User created:", signUpData.user.id);
      console.log("Email confirmed:", signUpData.user.email_confirmed_at);

      // Step 2: Wait for user profile to be created by trigger
      setLoadingMessage("Setting up your profile...");
      let profileCreated = false;
      let retries = 0;
      const maxRetries = 10;

      while (!profileCreated && retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("id")
          .eq("id", signUpData.user.id)
          .single();

        if (profile && !profileError) {
          profileCreated = true;
          console.log("User profile created");
          break;
        }
        
        retries++;
        console.log(`Waiting for profile creation... (${retries}/${maxRetries})`);
      }

      // Step 3: Apply referral code if provided
      if (referralCode && signUpData.user) {
        try {
          console.log("Applying referral code:", referralCode);
          const response = await fetch("/api/referrals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referralCode }),
          });
          
          if (response.ok) {
            console.log("Referral code applied successfully");
          } else {
            console.warn("Failed to apply referral code (non-critical)");
          }
        } catch (refError) {
          console.warn("Referral code application failed (non-critical):", refError);
        }
      }

      // Step 4: Check if email confirmation is required
      if (signUpData.user.email_confirmed_at === null) {
        console.log("Email not confirmed, attempting auto-login anyway...");
        setLoadingMessage("Signing you in...");
        
        // Try to sign in - this will work if email confirmation is disabled
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (signInError) {
          console.error("Auto-login error:", signInError);
          
          if (signInError.message.includes("Email not confirmed") || signInError.message.includes("confirm")) {
            setError(
              "Please check your email and confirm your account. " +
              "If email confirmation is disabled in Supabase settings, you can log in directly."
            );
          } else {
            setError(`Auto-login failed: ${signInError.message}. Please try logging in manually.`);
          }
          setLoading(false);
          return;
        }

        if (signInData.user && signInData.session) {
          console.log("Auto-login successful! Session:", signInData.session);
          setLoadingMessage("Almost there...");
          // Successfully signed in - wait a moment for session to persist
          await new Promise((resolve) => setTimeout(resolve, 300));
          await handleSuccessfulLogin(signInData.user.id);
          return;
        }
      } else {
        // Email already confirmed, user is logged in
        console.log("Email already confirmed, user is logged in");
        if (signUpData.session) {
          console.log("Session available:", signUpData.session);
          setLoadingMessage("Almost there...");
          await new Promise((resolve) => setTimeout(resolve, 300));
          await handleSuccessfulLogin(signUpData.user.id);
          return;
        } else {
          // No session but email confirmed - try to sign in
          setLoadingMessage("Signing you in...");
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password,
          });
          
          if (signInData?.user && signInData?.session) {
            await handleSuccessfulLogin(signInData.user.id);
            return;
          }
        }
      }

      // If we get here, something went wrong
      setError("Account created but auto-login failed. Please try logging in manually.");
      setLoading(false);
    } catch (err: any) {
      console.error("Signup exception:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
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
          <h2 className="text-3xl font-heading font-bold text-charcoal">Welcome to PowerNetPro!</h2>
          <p className="text-charcoal/70">Your account is ready. Redirecting you to login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest/5 via-offwhite to-gold/5 px-4 py-12">
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
            Get Started
          </h1>
          <p className="text-charcoal/60">Create your account and start saving</p>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-5 border border-charcoal/5"
        >
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-charcoal">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                />
              </div>
            </div>

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

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-charcoal">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  className="w-full pl-12 pr-4 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                />
              </div>
              {password && <PasswordStrength password={password} />}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-charcoal">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
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
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-offwhite border-t-transparent rounded-full animate-spin"></span>
                  {loadingMessage}
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-charcoal/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-charcoal/50">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="block w-full px-6 py-3 bg-offwhite border-2 border-forest text-forest rounded-xl hover:bg-forest/5 transition-all font-semibold text-center"
          >
            Sign In Instead
          </Link>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-charcoal/50 mt-6">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-forest hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-forest hover:underline">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

