"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CurrentBillCard from "@/components/bills/CurrentBillCard";
import CreditsBreakdown from "@/components/bills/CreditsBreakdown";
import BillHistory from "@/components/bills/BillHistory";

export default function BillsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="text-charcoal">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-charcoal">Bills & Credits</h1>
          <p className="text-charcoal/70 mt-2">Manage your electricity bills and credits</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CurrentBillCard />
            <BillHistory />
          </div>

          {/* Right Column */}
          <div>
            <CreditsBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}

