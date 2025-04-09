import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-[calc(100vh-405px)] flex items-center justify-center p-4">
      <form className="w-full max-w-md bg-background p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-medium text-center mb-2">Sign in</h1>
        <p className="text-sm text-foreground text-center mb-8">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="mt-1 w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
              className="mt-1 w-full"
            />
          </div>

          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            className="w-full mt-6"
          >
            Sign in
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
