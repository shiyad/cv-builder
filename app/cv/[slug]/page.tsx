// app/cv/[slug]/page.tsx
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SharedCVPage(ctx: { params: { slug: string } }) {
  const { params } = ctx; // ✅ Step 1: awaitable context wrapper
  const { slug } = await params; // ✅ Step 2: await before destructuring

  // ✅ THEN start async work
  const supabase = await createClient();
  const headersList = await headers();

  const { data: cvLink } = await supabase
    .from("cv_links")
    .select("*, user_cvs(*), users(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!cvLink) return notFound();

  // Record the view
  await supabase.from("cv_link_views").insert([
    {
      link_id: cvLink.id,
      viewer_ip: headersList.get("x-forwarded-for"),
      viewer_user_agent: headersList.get("user-agent"),
      referrer: headersList.get("referer"),
    },
  ]);

  // Increment view count
  await supabase
    .from("cv_links")
    .update({ view_count: cvLink.view_count + 1 })
    .eq("id", cvLink.id);

  // Redirect to the CV viewer with a special flag
  return redirect(`/cv/shared/${cvLink.user_cvs.template_id}?shared=true`);
}
