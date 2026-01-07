"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import { Copy, Check, Gift, Users } from "lucide-react";
import { useToast } from "@/components/ui";

interface Referral {
  id: string;
  referral_code: string;
  status: string;
  reward_amount: number;
  created_at: string;
}

export function ReferralSection() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [totalRewards, setTotalRewards] = useState(0);
  const supabase = createClient();
  const toast = useToast();

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's referral code
      const { data: userData } = await supabase
        .from("users")
        .select("referral_code")
        .eq("id", user.id)
        .single();

      if (userData?.referral_code) {
        setReferralCode(userData.referral_code);
      }

      // Get user's referrals
      const { data: referralData } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", user.id)
        .order("created_at", { ascending: false });

      if (referralData) {
        setReferrals(referralData);
        const total = referralData
          .filter((r) => r.status === "REWARDED")
          .reduce((sum, r) => sum + Number(r.reward_amount || 0), 0);
        setTotalRewards(total);
      }
    } catch (error) {
      console.error("Error fetching referral data:", error);
    }
  };

  const copyReferralLink = () => {
    if (!referralCode) return;

    const link = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");

    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralLink = () => {
    if (!referralCode) return;

    const link = `${window.location.origin}/signup?ref=${referralCode}`;
    const text = `Join PowerNetPro Digital Solar and save on your electricity bills! Use my referral code: ${referralCode}`;

    if (navigator.share) {
      navigator.share({
        title: "Join PowerNetPro Digital Solar",
        text,
        url: link,
      });
    } else {
      copyReferralLink();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-gold" />
          Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {referralCode ? (
          <>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Your Referral Code
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-2 bg-forest/10 rounded-lg border border-forest/20">
                  <code className="text-lg font-mono text-forest">{referralCode}</code>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  onClick={copyReferralLink}
                  leftIcon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" onClick={shareReferralLink} className="flex-1">
                Share Referral Link
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-charcoal/10">
              <div>
                <p className="text-sm text-charcoal/60">Total Referrals</p>
                <p className="text-2xl font-bold text-charcoal">
                  {referrals.filter((r) => r.status === "COMPLETED" || r.status === "REWARDED").length}
                </p>
              </div>
              <div>
                <p className="text-sm text-charcoal/60">Total Rewards</p>
                <p className="text-2xl font-bold text-gold">
                  ₹{totalRewards.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {referrals.length > 0 && (
              <div>
                <h4 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Referral History
                </h4>
                <div className="space-y-2">
                  {referrals.slice(0, 5).map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-3 bg-charcoal/5 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {referral.referral_code}
                        </p>
                        <p className="text-xs text-charcoal/60">
                          {new Date(referral.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          referral.status === "REWARDED" ? "text-success" : "text-charcoal/60"
                        }`}>
                          {referral.status}
                        </p>
                        {referral.reward_amount > 0 && (
                          <p className="text-xs text-gold">
                            ₹{Number(referral.reward_amount).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <Gift className="mx-auto h-12 w-12 mb-4 text-charcoal/20" />
            <p className="text-charcoal/60">Loading referral code...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

