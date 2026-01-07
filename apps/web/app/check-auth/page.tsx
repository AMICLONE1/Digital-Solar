"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function CheckAuthPage() {
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState<{
    isAuthenticated: boolean;
    user: any;
    session: any;
    error?: string;
  } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        // Check user
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (sessionError || userError) {
          setAuthStatus({
            isAuthenticated: false,
            user: null,
            session: null,
            error: sessionError?.message || userError?.message,
          });
        } else {
          setAuthStatus({
            isAuthenticated: !!(sessionData?.session && userData?.user),
            user: userData?.user || null,
            session: sessionData?.session || null,
          });
        }
      } catch (error: any) {
        setAuthStatus({
          isAuthenticated: false,
          user: null,
          session: null,
          error: error.message || "Unknown error",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      checkAuth();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest/5 via-offwhite to-gold/5">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-forest animate-spin mx-auto" />
          <p className="text-charcoal/60">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  if (!authStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest/5 via-offwhite to-gold/5">
        <div className="text-center">
          <p className="text-charcoal">Unable to check authentication status</p>
        </div>
      </div>
    );
  }

  const { isAuthenticated, user, session, error } = authStatus;

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest/5 via-offwhite to-gold/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-charcoal/5"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
              Authentication Status
            </h1>
            <p className="text-charcoal/60">Current login state</p>
          </div>

          {/* Status Card */}
          <div className="mb-6">
            <div
              className={`p-6 rounded-xl border-2 ${
                isAuthenticated
                  ? "bg-forest/10 border-forest"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                {isAuthenticated ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-forest" />
                    <span className="text-2xl font-bold text-forest">
                      LOGGED IN
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-500" />
                    <span className="text-2xl font-bold text-red-600">
                      NOT LOGGED IN
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* User Details */}
          {isAuthenticated && user && (
            <div className="space-y-4 mb-6">
              <h2 className="text-xl font-semibold text-charcoal">User Information</h2>
              <div className="bg-offwhite rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">User ID:</span>
                  <span className="text-charcoal font-mono text-sm">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Email:</span>
                  <span className="text-charcoal">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Email Confirmed:</span>
                  <span className={user.email_confirmed_at ? "text-forest" : "text-red-500"}>
                    {user.email_confirmed_at ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Created At:</span>
                  <span className="text-charcoal text-sm">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Session Details */}
          {isAuthenticated && session && (
            <div className="space-y-4 mb-6">
              <h2 className="text-xl font-semibold text-charcoal">Session Information</h2>
              <div className="bg-offwhite rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Access Token:</span>
                  <span className="text-charcoal font-mono text-xs">
                    {session.access_token
                      ? `${session.access_token.substring(0, 20)}...`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Expires At:</span>
                  <span className="text-charcoal text-sm">
                    {session.expires_at
                      ? new Date(session.expires_at * 1000).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Token Type:</span>
                  <span className="text-charcoal">{session.token_type || "N/A"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            {isAuthenticated ? (
              <motion.button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-semibold"
              >
                Sign Out
              </motion.button>
            ) : (
              <motion.button
                onClick={() => (window.location.href = "/login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-forest text-white rounded-xl hover:bg-forest-light transition-all font-semibold"
              >
                Go to Login
              </motion.button>
            )}
            <motion.button
              onClick={() => (window.location.href = "/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-charcoal/10 text-charcoal rounded-xl hover:bg-charcoal/20 transition-all font-semibold"
            >
              Go Home
            </motion.button>
          </div>

          {/* Console Check Instructions */}
          <div className="mt-8 p-4 bg-charcoal/5 rounded-lg">
            <p className="text-sm text-charcoal/70 mb-2">
              <strong>Quick Console Check:</strong> Open browser console (F12) and run:
            </p>
            <code className="text-xs bg-charcoal/10 p-2 rounded block text-charcoal">
              fetch('/api/auth/check').then(r => r.json()).then(console.log)
            </code>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
