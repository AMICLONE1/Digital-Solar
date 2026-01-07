"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // User is already logged in, redirect to dashboard
          router.push("/dashboard");
          router.refresh();
        }
      } catch (err) {
        console.error("Auth check error:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login for:", email.trim().toLowerCase());
      
      // Check if Supabase client is properly configured
      if (!supabase || typeof supabase.auth?.signInWithPassword !== "function") {
        setError("Authentication service is not properly configured. Please check your environment variables.");
        setLoading(false);
        return;
      }
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        // Handle specific error cases
        if (authError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials and try again.");
        } else if (authError.message.includes("Email not confirmed")) {
          setError("Please verify your email address. Check your inbox for a confirmation link.");
        } else if (authError.message.includes("Too many requests")) {
          setError("Too many login attempts. Please wait a few minutes and try again.");
        } else {
          setError(authError.message || "Failed to sign in. Please try again.");
        }
        console.error("Login error:", authError);
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log("Login successful! User:", data.user.id);
        console.log("Session:", data.session ? "Present" : "Missing");
        console.log("Email confirmed:", data.user.email_confirmed_at);

        // Check if user needs email confirmation
        if (data.user.email_confirmed_at === null) {
          // User exists but email not confirmed
          // Try to proceed anyway if email confirmation is disabled
          console.log("Email not confirmed, but attempting to proceed...");
          
          // Check if we have a session despite email not being confirmed
          if (!data.session) {
            setError("Please verify your email address. We can resend the confirmation email if needed.");
            setLoading(false);
            return;
          }
        }

        // Verify session exists
        if (!data.session) {
          console.error("No session after login!");
          setError("Login successful but session not created. Please try again.");
          setLoading(false);
          return;
        }

        // Wait a moment for session to persist
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Verify session is still there
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (!currentSession) {
          console.error("Session lost after login!");
          setError("Session not persisting. Please check Supabase configuration.");
          setLoading(false);
          return;
        }

        console.log("Session verified, redirecting...");

        // Successfully logged in
        // Check if user needs onboarding or has reservations
        try {
          // First, ensure user profile exists in users table
          const { data: existingProfile } = await supabase
            .from("users")
            .select("id, kyc_status, utility_consumer_number")
            .eq("id", data.user.id)
            .single();

          // If profile doesn't exist, create a basic one
          if (!existingProfile) {
            console.log("User profile not found, creating basic profile...");
            const { error: createError } = await supabase
              .from("users")
              .insert({
                id: data.user.id,
                email: data.user.email,
                kyc_status: "PENDING",
              });

            if (createError) {
              console.error("Error creating user profile:", createError);
              // Continue anyway - redirect to onboarding
            }
          }

          // Get profile (either existing or newly created)
          const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("kyc_status, utility_consumer_number")
            .eq("id", data.user.id)
            .single();

          // If profile is incomplete or doesn't exist, redirect to onboarding
          if (profileError || !profile || profile.kyc_status !== "VERIFIED" || !profile.utility_consumer_number) {
            console.log("Profile incomplete or missing, redirecting to onboarding");
            await new Promise((resolve) => setTimeout(resolve, 300));
            window.location.href = "/onboarding";
            return;
          }

          // Profile is complete - check if user has reserved capacity
          const { data: allocations, error: allocError } = await supabase
            .from("allocations")
            .select("id")
            .eq("user_id", data.user.id)
            .limit(1);

          if (allocError) {
            console.error("Error checking allocations:", allocError);
            // If we can't check, redirect to reserve page to let them start
            await new Promise((resolve) => setTimeout(resolve, 300));
            window.location.href = "/reserve";
            return;
          }

          // If user has allocations, go to dashboard; otherwise, go to reserve page
          const redirectPath = allocations && allocations.length > 0
            ? "/dashboard"
            : "/reserve";

          console.log("Redirecting to:", redirectPath, allocations?.length ? "(has reservations)" : "(no reservations)");
          
          // Small delay to ensure session is fully persisted
          await new Promise((resolve) => setTimeout(resolve, 300));
          
          // Use window.location for reliable redirect
          window.location.href = redirectPath;
        } catch (profileError: any) {
          console.error("Profile check error:", profileError);
          // Still redirect even if profile check fails - send to onboarding
          await new Promise((resolve) => setTimeout(resolve, 300));
          window.location.href = "/onboarding";
        }
      } else {
        console.error("Login failed: No user returned");
        setError("Login failed. Please check your credentials and try again.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Login exception:", err);
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      
      // Check if it's a Supabase configuration error
      if (errorMessage.includes("Supabase not configured") || errorMessage.includes("URL and Key are required")) {
        setError("Authentication service is not configured. Please contact support or check your environment variables.");
      } else {
        setError(errorMessage);
      }
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest/5 via-offwhite to-gold/5">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-charcoal/60">Checking authentication...</p>
        </div>
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
            Welcome Back
          </h1>
          <p className="text-charcoal/60">Sign in to continue your solar journey</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-charcoal/5"
        >
          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-charcoal">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-forest hover:text-forest-light hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-3 bg-offwhite border border-charcoal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 hover:text-charcoal/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 text-sm space-y-2"
              >
                <div className="font-semibold">Login Failed</div>
                <div>{error}</div>
                {error.includes("verify your email") && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const { error: resendError } = await supabase.auth.resend({
                          type: "signup",
                          email: email.trim().toLowerCase(),
                        });
                        if (resendError) {
                          setError("Failed to resend email. Please try again later.");
                        } else {
                          setError("Confirmation email sent! Please check your inbox.");
                        }
                      } catch (err) {
                        setError("Failed to resend email. Please try again later.");
                      }
                    }}
                    className="text-red-600 underline text-xs hover:text-red-700"
                  >
                    Resend confirmation email
                  </button>
                )}
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
                "Signing in..."
              ) : (
                <>
                  Sign In
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
              <span className="px-4 bg-white text-charcoal/50">New to PowerNetPro?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/signup"
            className="block w-full px-6 py-3 bg-offwhite border-2 border-forest text-forest rounded-xl hover:bg-forest/5 transition-all font-semibold text-center"
          >
            Create Account
          </Link>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-charcoal/50 mt-6">
          By continuing, you agree to our{" "}
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
