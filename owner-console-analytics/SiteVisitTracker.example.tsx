"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "first-party-site-session-v1";

function getSessionId() {
  try {
    const current = sessionStorage.getItem(SESSION_KEY);
    if (current) return current;
    const next = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return "";
  }
}

export default function SiteVisitTracker({
  endpoint = "/api/site-visit",
  includePaths = ["/"],
}: {
  endpoint?: string;
  includePaths?: string[];
}) {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (!includePaths.includes(pathname)) return;

    const payload = JSON.stringify({
      path: pathname,
      sessionId: getSessionId(),
      referrer: document.referrer || null,
    });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, new Blob([payload], { type: "application/json" }));
      } else {
        void fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      // Analytics failure should never break the page.
    }
  }, [endpoint, includePaths, pathname]);

  return null;
}
