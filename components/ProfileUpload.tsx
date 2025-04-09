"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

export const ProfileUpload = ({
  currentImage,
  onUpload,
}: {
  currentImage?: string;
  onUpload: (url: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `profile_pictures/${fileName}`;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("cv-profile-pictures")
        .upload(filePath, file);

      debugger;

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("cv-profile-pictures").getPublicUrl(data.path);

      onUpload(publicUrl);
    } catch (error) {
      alert("Error uploading image!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!currentImage) return;

    try {
      // Extract file path from URL
      const filePath = currentImage.split("profile_pictures/")[1];

      const { error } = await supabase.storage
        .from("cv-profile-pictures")
        .remove([`profile_pictures/${filePath}`]);

      if (error) throw error;

      onUpload("");
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const displayUrl = previewUrl || currentImage;

  return (
    <div className="space-y-4">
      {displayUrl ? (
        <div className="relative group">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
            <Image
              src={displayUrl}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
          <ImagePlus className="w-8 h-8 text-gray-400" />
        </div>
      )}

      <div className="space-y-2">
        <Label
          htmlFor="profile-upload"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Button variant="outline" size="sm" asChild>
            <span>{displayUrl ? "Change Photo" : "Upload Photo"}</span>
          </Button>
        </Label>
        <Input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
        <p className="text-xs text-gray-500">
          {uploading ? "Uploading..." : "JPG, PNG up to 2MB"}
        </p>
      </div>
    </div>
  );
};
