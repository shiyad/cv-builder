// components/cv-link-manager.tsx
"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Copy, Eye, Link as LinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export function CVLinkManager({ cvId }: { cvId: string }) {
  const supabase = createClient();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<any[]>([]);
  const [creatingLink, setCreatingLink] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("users")
        .select("is_premium")
        .eq("id", user.id)
        .single();

      setIsPremium(profile?.is_premium || false);

      const { data: cvLinks } = await supabase
        .from("cv_links")
        .select("*")
        .eq("cv_id", cvId)
        .order("created_at", { ascending: false });

      setLinks(cvLinks || []);
      setLoading(false);
    };

    fetchData();
  }, [cvId]);

  const createShareableLink = async () => {
    setCreatingLink(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const slug = Math.random().toString(36).substring(2, 10);

    const { data, error } = await supabase
      .from("cv_links")
      .insert([
        {
          cv_id: cvId,
          user_id: user.id,
          slug,
        },
      ])
      .select();

    if (error) {
      toast.error("Failed to create link");
    } else {
      setLinks([data[0], ...links]);
      toast.success("Shareable link created");
    }
    setCreatingLink(false);
  };

  const copyToClipboard = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/cv/${slug}`);
    toast.success("Link copied to clipboard");
  };

  const toggleLinkStatus = async (linkId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("cv_links")
      .update({ is_active: !currentStatus })
      .eq("id", linkId);

    if (!error) {
      setLinks(
        links.map((link) =>
          link.id === linkId ? { ...link, is_active: !currentStatus } : link
        )
      );
    }
  };

  if (loading)
    return (
      <div className="h-32 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!isPremium)
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold mb-2">
          Upgrade for Shareable Links
        </h3>
        <p className="text-gray-600 mb-4">
          Premium users can create trackable links to share their CVs
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          <Link href="/pricing">Upgrade to Premium</Link>
        </Button>
      </div>
    );

  return (
    <div className="space-y-4">
      {links.length === 0 ? (
        <div className="flex items-center justify-between border p-4 rounded-lg bg-muted">
          <h3 className="text-base font-semibold text-foreground">
            <div className="text-center py-6 text-sm text-muted-foreground">
              No shareable links created yet.
            </div>
          </h3>
          <Button
            onClick={createShareableLink}
            disabled={creatingLink}
            className="gap-2"
            size="sm"
          >
            {creatingLink ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
            New Link
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between border rounded-lg p-3 hover:shadow-sm transition gap-2"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`h-3 w-3 mt-1 rounded-full ${
                    link.is_active ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                      {window.location.host}/cv/{link.slug}
                    </span>
                    <button
                      onClick={() => copyToClipboard(link.slug)}
                      className="text-muted-foreground hover:text-primary"
                      title="Copy link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {link.view_count} views
                    </span>
                    <span>
                      {new Date(link.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleLinkStatus(link.id, link.is_active)}
              >
                {link.is_active ? "Disable" : "Enable"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
