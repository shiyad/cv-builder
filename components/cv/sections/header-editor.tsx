// components/cv/sections/header-editor.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { toast } from "react-hot-toast";

export function CVHeaderEditor({
  data,
  onChange,
}: {
  data: any;
  onChange: (value: any) => void;
}) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!e.target.files?.[0]) {
        throw new Error("Please select an image to upload.");
      }

      const file = e.target.files[0];

      // Validate file
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size must be less than 2MB");
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Only JPG, PNG, or WebP images are allowed");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to upload photos");

      // Create preview
      setPreviewUrl(URL.createObjectURL(file));

      // Upload to user-specific folder
      const { error: uploadError } = await supabase.storage
        .from("cv-photos")
        .upload(`${user.id}/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("cv-photos")
        .getPublicUrl(`${user.id}/${fileName}`);

      handleChange("photoUrl", publicUrl);
      toast.success("Profile photo uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload photo");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const removePhoto = async () => {
    try {
      if (!data.photoUrl) return;

      // Extract filename from URL
      const urlParts = data.photoUrl.split("/");
      const fileName = urlParts
        .slice(urlParts.indexOf("cv-photos") + 1)
        .join("/");

      // Delete from storage
      const { error } = await supabase.storage
        .from("cv-photos")
        .remove([fileName]);

      if (error) throw error;

      handleChange("photoUrl", "");
      setPreviewUrl(null);
      toast.success("Photo removed successfully");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to remove photo");
    }
  };

  return (
    <div className="space-y-4">
      {/* Photo Upload Section */}
      <div>
        <Label>Profile Photo</Label>
        <div className="mt-2 flex items-center gap-4">
          {data.photoUrl || previewUrl ? (
            <div className="relative group">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 relative">
                <Image
                  src={previewUrl || data.photoUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  unoptimized={!!previewUrl} // Local preview doesn't need optimization
                />
              </div>
              <button
                type="button"
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center">
                No photo
              </span>
            </div>
          )}

          <div>
            <input
              type="file"
              id="photo-upload"
              accept="image/png, image/jpeg, image/webp"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading}
            />
            <label
              htmlFor="photo-upload"
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                uploading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer border-gray-300 shadow-sm"
              }`}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {uploading ? "Uploading..." : "Upload Photo"}
            </label>
            <p className="mt-1 text-xs text-gray-500">
              JPG, PNG, or WebP. Max 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Rest of your form fields */}
      <div>
        <Label>Full Name</Label>
        <Input
          value={data.fullName || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label>Professional Title</Label>
        <Input
          value={data.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Software Engineer"
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={data.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john@example.com"
        />
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          type="tel"
          value={data.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
    </div>
  );
}
