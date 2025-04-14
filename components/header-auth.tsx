// components/auth-button.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AuthButtonProps {
  variant?: "public" | "protected";
  mobileView?: boolean;
}

export default function AuthButton({
  variant = "public",
  mobileView = false,
}: AuthButtonProps) {
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

  if (user) {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          mobileView ? "w-full justify-between" : ""
        )}
      >
        {variant === "protected" && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!mobileView && (
              <span className="text-sm font-medium">
                {user.email?.split("@")[0]}
              </span>
            )}
          </div>
        )}
        <Button
          variant={variant === "protected" ? "ghost" : "outline"}
          size={mobileView ? "lg" : "default"}
          className={cn(
            variant === "protected" ? "text-red-600 hover:text-red-700" : "",
            mobileView ? "w-full" : ""
          )}
          onClick={async () => {
            await supabase.auth.signOut();
            setUser(null); // Ensure state is updated immediately
            router.refresh();
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", mobileView ? "flex-col w-full" : "")}>
      <Button
        asChild
        variant={mobileView ? "outline" : "ghost"}
        size={mobileView ? "lg" : "default"}
        className={mobileView ? "w-full" : ""}
      >
        <Link href="/sign-in">Login</Link>
      </Button>
      <Button
        asChild
        size={mobileView ? "lg" : "default"}
        className={cn(
          "bg-blue-600 hover:bg-blue-700 text-white",
          mobileView ? "w-full" : ""
        )}
      >
        <Link href="/sign-up">
          {variant === "public" ? "Create CV Now" : "Sign Up"}
        </Link>
      </Button>
    </div>
  );
}
