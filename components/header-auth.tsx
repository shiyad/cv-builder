import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <div>
          <div className="text-sm text-red-500 font-medium">
            Configuration required: Please update .env.local file
          </div>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4">
      <span className="hidden sm:inline">Welcome, {user.email}</span>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"} className="px-4 py-2">
          Sign out
        </Button>
      </form>
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
