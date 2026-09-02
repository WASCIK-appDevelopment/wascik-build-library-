export type PostReadyTextInput = {
  primaryCopy: string;
  hashtags?: string[];
  requiredCta?: string;
  requiredHashtags?: string[];
};

function normalizeHashtag(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("#")
    ? trimmed.replace(/\s+/g, "")
    : `#${trimmed.replace(/\s+/g, "")}`;
}

export function buildPostReadyText({
  primaryCopy,
  hashtags = [],
  requiredCta,
  requiredHashtags = [],
}: PostReadyTextInput) {
  const copy = primaryCopy.trim();
  const sections = copy ? [copy] : [];

  if (
    requiredCta?.trim() &&
    !copy.toLocaleLowerCase().includes(requiredCta.trim().toLocaleLowerCase())
  ) {
    sections.push(requiredCta.trim());
  }

  const tagsAlreadyInCopy = new Set(
    (copy.match(/#[\p{L}\p{N}_]+/gu) || []).map((tag) => tag.toLocaleLowerCase()),
  );
  const seen = new Set<string>();
  const postTags = [...hashtags, ...requiredHashtags]
    .map(normalizeHashtag)
    .filter(Boolean)
    .filter((tag) => {
      const key = tag.toLocaleLowerCase();
      if (tagsAlreadyInCopy.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  if (postTags.length) sections.push(postTags.join(" "));
  return sections.join("\n\n");
}

export function downloadPostReadyText(
  text: string,
  filename = "social-ad.txt",
) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
