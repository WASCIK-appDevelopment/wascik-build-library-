import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function ownerAuthorized(request: Request) {
  const expected = process.env.OWNER_CONSOLE_KEY?.trim();
  return Boolean(expected && request.headers.get("x-owner-key") === expected);
}

function storageHeaders(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}` };
}

/**
 * Example server-only route.
 * - Keep the storage service key off the client.
 * - Use a public product-image bucket or return signed URLs.
 * - Store the final URL on the durable Ready Product record.
 */
export async function POST(request: Request) {
  if (!ownerAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.AFFILIATE_IMAGE_BUCKET || "affiliate-product-images";
  if (!base || !key) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const productId = String(form.get("productId") || "").slice(0, 240);
  if (!(file instanceof File) || !productId) {
    return NextResponse.json({ error: "A product and photo are required." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type) || !file.size || file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Use a JPG, PNG, WebP, or GIF under 6 MB." }, { status: 400 });
  }

  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const objectPath = `manual/${randomUUID()}.${extension}`;
  const encoded = objectPath.split("/").map(encodeURIComponent).join("/");
  const headers = storageHeaders(key);

  const upload = await fetch(`${base}/storage/v1/object/${bucket}/${encoded}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": file.type, "x-upsert": "false" },
    body: await file.arrayBuffer(),
  });
  if (!upload.ok) {
    return NextResponse.json({ error: "Photo upload failed." }, { status: 502 });
  }

  const imageUrl = `${base}/storage/v1/object/public/${bucket}/${encoded}`;
  const update = await fetch(
    `${base}/rest/v1/approved_affiliate_products?id=eq.${encodeURIComponent(productId)}`,
    {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify({ image_url: imageUrl, updated_at: new Date().toISOString() }),
    },
  );
  const rows = await update.json().catch(() => []);
  if (!update.ok || !Array.isArray(rows) || rows.length !== 1) {
    return NextResponse.json({ error: "Uploaded, but the Ready Product was not updated." }, { status: 502 });
  }

  return NextResponse.json({ imageUrl });
}
