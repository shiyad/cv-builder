// actions/upgrade-to-premium.ts
"use server";

import { createClient } from "@/utils/supabase/server";

export async function upgradeToPremium(userId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_premium: true })
    .eq("id", userId);

  if (error) {
    console.error("Upgrade error:", error);
    return { error: error.message };
  }

  return { success: true };
}
