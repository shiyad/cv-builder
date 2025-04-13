"use client";

import { Crown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function PremiumBanner() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setIsPremium(false);
          return;
        }

        const { data, error } = await supabase
          .from("user_subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .single();

        if (!error && data?.status == "active") {
          setIsPremium(true);
        } else {
          setIsPremium(false);
        }
      } catch (error) {
        console.error("Error checking premium status:", error);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    checkPremiumStatus();
  }, []);

  if (loading || isPremium) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl p-4 mb-6 flex items-center justify-between shadow-md animate-fade-in">
      <div className="flex items-center">
        <Crown className="w-6 h-6 text-white mr-3" />
        <div>
          <h3 className="text-lg font-bold text-white">Premium Templates</h3>
          <p className="text-amber-100 text-sm">
            Unlock all professional designs
          </p>
        </div>
      </div>
      <Button
        variant="default"
        size="sm"
        className="bg-white text-amber-600 hover:bg-white/90"
        asChild
      >
        <Link href="/pricing">Upgrade</Link>
      </Button>
    </div>
  );
}
