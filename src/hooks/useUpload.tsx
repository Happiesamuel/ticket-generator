import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export default function useUpload(
  value: UseFormSetValue<{
    name: string;
    email: string;
    about: string;
    profilePhoto: string;
  }>
) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "happie");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/doh9vxrsf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setAvatarUrl(data.secure_url);
        localStorage.setItem("profilePhoto", data.secure_url);
        value("profilePhoto", data.secure_url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };
  return { avatarUrl, uploading, uploadToCloudinary, setAvatarUrl };
}
