// components/share-button.tsx
"use client";

import { Share2 } from "lucide-react";

export function ShareButton({ shareLink }: { shareLink: string }) {
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}${shareLink}`);
    alert("Link copied to clipboard!");
  };

  return (
    <button
      onClick={handleShare}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-500"
      title="Share this guide"
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}
