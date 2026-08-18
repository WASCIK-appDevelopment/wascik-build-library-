"use client";

import { useState } from "react";

type ReadyProduct = {
  id: string;
  title: string;
  imageUrl?: string | null;
};

type Props = {
  product: ReadyProduct;
  ownerKey: string;
  onSaved: (imageUrl: string) => void;
};

const ACCEPTED_IMAGES = "image/jpeg,image/png,image/webp,image/gif";

/**
 * Show manual upload only after a product reaches the durable Ready state.
 * Search-result cards remain fast and disposable; owners can inspect the
 * affiliate destination before attaching a replacement image.
 */
export function ReadyProductImage({ product, ownerKey, onSaved }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  if (product.imageUrl) {
    return <img src={product.imageUrl} alt={product.title} width={64} height={64} />;
  }

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("productId", product.id);
      form.append("persistApproved", "true");

      const response = await fetch("/api/private/affiliate-images", {
        method: "POST",
        headers: { "x-owner-key": ownerKey },
        body: form,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      onSaved(data.imageUrl);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return <div>
    <label style={{ cursor: uploading ? "wait" : "pointer" }}>
      <input
        type="file"
        accept={ACCEPTED_IMAGES}
        disabled={uploading}
        hidden
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          if (file) void upload(file);
          event.currentTarget.value = "";
        }}
      />
      {uploading ? "Uploading…" : "No image — tap to upload"}
    </label>
    {error && <p role="alert">{error}</p>}
  </div>;
}
