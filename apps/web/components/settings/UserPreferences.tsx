"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import { useToast } from "@/components/ui";
import { activityLogs } from "@/lib/activity";
import { api } from "@/lib/api/client";

interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  currency: "INR" | "USD" | "EUR";
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
}

export function UserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const toast = useToast();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await api.get<UserPreferences>("/api/users/preferences");
      if (response.success && response.data) {
        setPreferences(response.data);
      } else {
        // Set defaults
        setPreferences({
          theme: "light",
          language: "en",
          currency: "INR",
          email_notifications: true,
          sms_notifications: false,
          push_notifications: true,
        });
      }
    } catch (error) {
      console.error("Error fetching preferences:", error);
      setPreferences({
        theme: "light",
        language: "en",
        currency: "INR",
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!preferences) return;

    setSaving(true);
    try {
      const response = await api.patch("/api/users/preferences", preferences);
      if (response.success) {
        toast.success("Preferences saved successfully!");
        activityLogs.preferencesUpdated(Object.keys(preferences));
      } else {
        toast.error(response.error?.message || "Failed to save preferences");
      }
    } catch (error) {
      toast.error("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-charcoal/10 rounded w-1/3"></div>
            <div className="h-20 bg-charcoal/10 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!preferences) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Theme</label>
          <select
            value={preferences.theme}
            onChange={(e) =>
              setPreferences({ ...preferences, theme: e.target.value as any })
            }
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg bg-white text-charcoal focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Language</label>
          <select
            value={preferences.language}
            onChange={(e) =>
              setPreferences({ ...preferences, language: e.target.value })
            }
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg bg-white text-charcoal focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Currency</label>
          <select
            value={preferences.currency}
            onChange={(e) =>
              setPreferences({ ...preferences, currency: e.target.value as any })
            }
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg bg-white text-charcoal focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-charcoal">Notifications</h3>
          
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-charcoal">Email Notifications</span>
            <input
              type="checkbox"
              checked={preferences.email_notifications}
              onChange={(e) =>
                setPreferences({ ...preferences, email_notifications: e.target.checked })
              }
              className="w-5 h-5 text-forest focus:ring-forest rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-charcoal">SMS Notifications</span>
            <input
              type="checkbox"
              checked={preferences.sms_notifications}
              onChange={(e) =>
                setPreferences({ ...preferences, sms_notifications: e.target.checked })
              }
              className="w-5 h-5 text-forest focus:ring-forest rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-charcoal">Push Notifications</span>
            <input
              type="checkbox"
              checked={preferences.push_notifications}
              onChange={(e) =>
                setPreferences({ ...preferences, push_notifications: e.target.checked })
              }
              className="w-5 h-5 text-forest focus:ring-forest rounded"
            />
          </label>
        </div>

        <Button
          variant="primary"
          onClick={savePreferences}
          isLoading={saving}
          className="w-full"
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}


