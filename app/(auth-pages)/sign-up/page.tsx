import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <FormMessage message={searchParams} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-405px)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-background p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-foreground">
              Already have an account?{" "}
              <Link
                className="text-primary font-medium hover:underline"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1 w-full"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Your password"
                  minLength={6}
                  required
                  className="mt-1 w-full"
                />
              </div>
            </div>

            <SubmitButton
              formAction={signUpAction}
              pendingText="Creating account..."
              className="w-full"
            >
              Sign up
            </SubmitButton>

            <FormMessage message={searchParams} />
          </form>
        </div>

        <SmtpMessage />
      </div>
    </div>
  );
}
