// app/api/cv/[id]/delete/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  const { error } = await supabase.from("cvs").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
