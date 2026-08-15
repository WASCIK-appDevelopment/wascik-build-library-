"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  merchant: string;
  itemLabel?: string;
  analyticsEndpoint?: string;
  children: ReactNode;
};

const SESSION_KEY = "first-party-analytics-session-v1";

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

export default function TrackedOutboundLink({
  href,
  merchant,
  itemLabel,
  analyticsEndpoint = "/api/outbound-click",
  children,
  onClick,
  ...rest
}: Props) {
  const pathname = usePathname() || "/";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const payload = JSON.stringify({
      destinationUrl: href,
      merchant,
      itemLabel,
      sourcePath: pathname,
      sessionId: getSessionId(),
    });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(analyticsEndpoint, new Blob([payload], { type: "application/json" }));
      } else {
        void fetch(analyticsEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      // Analytics must never block the destination.
    }
  }

  return <a href={href} onClick={handleClick} data-first-party-tracked="true" {...rest}>{children}</a>;
}
