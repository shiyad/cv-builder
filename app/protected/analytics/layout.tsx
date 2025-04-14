import { Header } from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full flex flex-col">
      <Header variant="protected" />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
