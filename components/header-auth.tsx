// components/auth-button.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check existing session and set up listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Directly set user to the session user if logged in or null if logged out
      setUser(session?.user ?? null);
      setLoading(false);

      // Refresh server components when auth changes
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        // Re-render UI by updating state
        setLoading(false); // Ensure loading is false to show correct UI
      }
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <div className="text-sm text-red-500 font-medium">
          Configuration required: Please update .env.local file
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="h-10 w-24 animate-pulse bg-gray-200 rounded" />;
  }

  return user ? (
    <div className="flex items-center gap-4">
      <span className="hidden sm:inline">Welcome, {user.email}</span>
      <Button
        variant="outline"
        className="px-4 py-2"
        onClick={async () => {
          await supabase.auth.signOut();
          setUser(null); // Ensure state is updated immediately
          router.refresh();
        }}
      >
        Sign out
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild variant={"outline"} className="px-6 py-2">
        <Link href="/sign-in">Login</Link>
      </Button>
      <Button
        asChild
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Link href="/sign-up">Create CV Now</Link>
      </Button>
    </div>
  );
}
