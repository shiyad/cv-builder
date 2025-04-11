"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Copy,
  Eye,
  Link as LinkIcon,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function CVLinkManager({ cvId }: { cvId: string }) {
  const supabase = createClient();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<any[]>([]);
  const [creatingLink, setCreatingLink] = useState(false);
  const [open, setOpen] = useState(false);

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
    setOpen(false);
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

  if (loading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  if (!isPremium) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1">
            <LinkIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Share CV
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-0">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-1">
              Upgrade for Shareable Links
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Premium users can create trackable links to share their CVs
            </p>
            <Button
              asChild
              size="sm"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Link href="/pricing">Upgrade to Premium</Link>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Share CV
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-medium">Shareable Links</h3>
            <Button
              onClick={createShareableLink}
              disabled={creatingLink}
              size="sm"
              variant="outline"
              className="h-8 gap-1"
            >
              {creatingLink ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <LinkIcon className="h-3 w-3" />
              )}
              <span>New</span>
            </Button>
          </div>

          {links.length === 0 ? (
            <div className="text-center py-3 text-sm text-muted-foreground">
              No shareable links yet
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${
                        link.is_active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs truncate">
                          /cv/{link.slug}
                        </span>
                        <button
                          onClick={() => copyToClipboard(link.slug)}
                          className="text-muted-foreground hover:text-primary"
                          title="Copy link"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Eye className="h-3 w-3" /> {link.view_count}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(link.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => toggleLinkStatus(link.id, link.is_active)}
                  >
                    {link.is_active ? "Disable" : "Enable"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
