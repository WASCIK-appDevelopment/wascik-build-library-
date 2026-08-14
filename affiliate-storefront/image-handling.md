# Product and event image handling

## Local assets first

For reliable Next.js builds, store approved product images under `public/` and pass root-relative paths such as:

```ts
image: "/affiliate/merchant/product-name.webp"
```

This avoids remote-host outages, hotlinking failures, and `next/image` hostname restrictions.

## Clean screenshot workflow

1. Crop out phone status bars, app controls, prices, tracking dashboards, and unrelated merchant UI.
2. Preserve the complete product with comfortable white space.
3. Export photographs as WebP when practical.
4. Use descriptive lowercase filenames.
5. Write accurate alt text describing the product—not the screenshot.
6. Do not imply personal use or endorsement unless it is true.
7. Confirm image usage rights before publishing.

## Next.js configuration lesson

A root-relative public path should normally work without an `images.localPatterns` restriction. If a project uses `localPatterns`, confirm that every affiliate asset path matches the configured pattern. A mismatch can cause a runtime error even though the file exists.

## Product-card display

Use `object-contain` for products on clean backgrounds. Use `object-cover` for licensed event or editorial photography. Always set responsive `sizes` on `next/image`.
