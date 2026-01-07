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
    
    // Prevent form submission if already loading
    if (loading) {
      return;
    }
    
    setLoading(true);
    setError("");

    // Store form values to prevent them from being cleared
    const emailValue = email.trim().toLowerCase();
    const passwordValue = password;

    try {
      console.log("Attempting login for:", emailValue);
      
      // Check if Supabase client is properly configured
      if (!supabase || typeof supabase.auth?.signInWithPassword !== "function") {
        setError("Authentication service is not properly configured. Please check your environment variables.");
        setLoading(false);
        return;
      }
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: emailValue,
        password: passwordValue,
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

      if (data.user && data.session) {
        console.log("✅ Login successful! User:", data.user.id);
        console.log("✅ Session:", data.session ? "Present" : "Missing");
        
        // Ensure user record exists (non-blocking, in background)
        supabase
          .from("users")
          .select("id")
          .eq("id", data.user.id)
          .maybeSingle()
          .then(({ data: existingUser, error: userCheckError }) => {
            if (!existingUser && !userCheckError) {
              supabase
                .from("users")
                .insert({
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || null,
                })
                .catch((createError) => {
                  console.error("Error creating user profile:", createError);
                });
            }
          })
          .catch((err) => {
            console.error("Error checking user profile:", err);
          });

        // Determine redirect path - do this in background, redirect immediately
        let redirectPath = "/reserve"; // Default: go to reserve page
        
        // Start async check but don't wait - redirect immediately with default path
        Promise.race([
          Promise.all([
            supabase
              .from("allocations")
              .select("id")
              .eq("user_id", data.user.id)
              .limit(1),
            supabase
              .from("users")
              .select("utility_consumer_number")
              .eq("id", data.user.id)
              .maybeSingle()
          ]),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 500)) // 500ms timeout - faster
        ])
        .then((checkUserData) => {
          if (checkUserData && Array.isArray(checkUserData)) {
            const [allocationsResult, profileResult] = checkUserData;
            const hasReservations = allocationsResult?.data && allocationsResult.data.length > 0;
            const hasUtility = profileResult?.data?.utility_consumer_number;

            let newPath = "/reserve";
            if (hasReservations && hasUtility) {
              newPath = "/dashboard";
            } else if (hasReservations && !hasUtility) {
              newPath = "/connect";
            }
            
            // Only redirect if we're still on login page
            if (typeof window !== "undefined" && window.location.pathname === "/login") {
              console.log("🔄 Updating redirect path to:", newPath);
              window.location.replace(newPath);
            }
          }
        })
        .catch((dbError) => {
          console.log("DB check failed, using default redirect:", dbError);
        });

        console.log("🚀 REDIRECTING IMMEDIATELY to:", redirectPath);
        console.log("📍 Current pathname:", typeof window !== "undefined" ? window.location.pathname : "SSR");
        
        // IMMEDIATE redirect - try multiple methods to ensure it works
        if (typeof window !== "undefined") {
          console.log("✅ Attempting redirect using multiple methods");
          
          // Method 1: Use replace() - most reliable
          try {
            window.location.replace(redirectPath);
            console.log("✅ window.location.replace() called");
          } catch (e) {
            console.error("❌ window.location.replace() failed:", e);
          }
          
          // Method 2: Also try href immediately
          try {
            window.location.href = redirectPath;
            console.log("✅ window.location.href also set");
          } catch (e) {
            console.error("❌ window.location.href failed:", e);
          }
          
          // Method 3: Try router as well
          try {
            router.replace(redirectPath);
            console.log("✅ router.replace() also called");
          } catch (e) {
            console.error("❌ router.replace() failed:", e);
          }
          
          // Method 4: Last resort - use assign after short delay
          setTimeout(() => {
            if (window.location.pathname === "/login") {
              console.log("⚠️ Still on login page, trying window.location.assign()");
              try {
                window.location.assign(redirectPath);
              } catch (e) {
                console.error("❌ All redirect methods failed:", e);
                setError(`Redirect failed. Please navigate to: ${redirectPath}`);
                setLoading(false);
              }
            }
          }, 200);
        } else {
          // Fallback to router if window is not available (SSR)
          console.log("⚠️ Window not available, using router");
          router.replace(redirectPath);
          router.refresh();
        }
        
        // Exit early - redirect is happening
        return;
      } else if (data.user && !data.session) {
        console.error("❌ No session after login!");
        setError("Login successful but session not created. Please try again.");
        setLoading(false);
        return;
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
                          email: emailValue,
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
