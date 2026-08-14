"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export type RepresentativeWidgetProps = {
  title?: string;
  greeting?: string;
  chatEndpoint?: string;
  shopEndpoint?: string;
  affiliatePrefix?: string;
  position?: "left" | "right";
};

type Recommendation = {
  id: string | number;
  merchant: string;
  title: string;
  description: string;
  affiliateUrl: string;
  reason?: string;
};

export default function RepresentativeWidget({
  title = "Digital Representative",
  greeting = "Hi. What can I help you with today?",
  chatEndpoint = "/api/assistant/chat",
  shopEndpoint = "/api/assistant/shop",
  affiliatePrefix = "/affiliate-services",
  position = "right",
}: RepresentativeWidgetProps) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(greeting);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [disclosure, setDisclosure] = useState("");
  const [loading, setLoading] = useState(false);

  const shoppingMode = useMemo(() => pathname.startsWith(affiliatePrefix), [pathname, affiliatePrefix]);

  async function send(event: FormEvent) {
    event.preventDefault();
    const input = message.trim();
    if (!input || loading) return;

    setLoading(true);
    setRecommendations([]);
    setDisclosure("");

    try {
      const endpoint = shoppingMode ? shopEndpoint : chatEndpoint;
      const payload = shoppingMode ? { query: input, pathname } : { message: input, pathname };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The representative could not respond.");

      setReply(shoppingMode ? data.guidance || "Here are some relevant options." : data.text || "How else can I help?");
      if (shoppingMode) {
        setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
        setDisclosure(typeof data.disclosure === "string" ? data.disclosure : "");
      }
      setMessage("");
    } catch (error) {
      setReply(error instanceof Error ? error.message : "The representative could not respond.");
    } finally {
      setLoading(false);
    }
  }

  const side = position === "left" ? { left: 18 } : { right: 18 };

  return (
    <aside style={{ position: "fixed", bottom: 18, zIndex: 70, ...side, width: "min(390px, calc(100vw - 36px))" }}>
      {open ? (
        <div style={{ borderRadius: 24, overflow: "hidden", background: "#07111f", color: "white", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 22px 70px rgba(0,0,0,.4)" }}>
          <header style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", padding: 15, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div><strong>{title}</strong><small style={{ display: "block", marginTop: 2, color: "#80d8ff" }}>{shoppingMode ? "SHOPPING GUIDE" : "WEBSITE REPRESENTATIVE"}</small></div>
            <button onClick={() => setOpen(false)} type="button" aria-label="Close" style={{ border: 0, background: "transparent", color: "white", fontSize: 22, cursor: "pointer" }}>×</button>
          </header>

          <div style={{ maxHeight: "58vh", overflowY: "auto", padding: 15 }}>
            <div style={{ padding: 13, borderRadius: 16, background: "rgba(255,255,255,.055)", lineHeight: 1.55 }}>{reply}</div>
            {recommendations.map((item) => (
              <article key={`${item.merchant}-${item.id}`} style={{ marginTop: 10, padding: 13, borderRadius: 15, border: "1px solid rgba(255,255,255,.08)" }}>
                <small style={{ color: "#80d8ff", fontWeight: 800 }}>{item.merchant}</small>
                <strong style={{ display: "block", marginTop: 4 }}>{item.title}</strong>
                <p style={{ color: "#a7b7c8", fontSize: 12, lineHeight: 1.5 }}>{item.reason || item.description}</p>
                <a href={item.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" style={{ color: "white", fontWeight: 800 }}>View option →</a>
              </article>
            ))}
            {disclosure ? <p style={{ color: "#8191a4", fontSize: 10, lineHeight: 1.4 }}>{disclosure}</p> : null}
          </div>

          <form onSubmit={send} style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={shoppingMode ? "What are you shopping for?" : "Ask a question..."} style={{ flex: 1, minWidth: 0, borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)", color: "white", padding: "11px 14px" }} />
            <button type="submit" disabled={loading} style={{ width: 42, height: 42, borderRadius: 99, border: 0, background: "#2674f2", color: "white", cursor: "pointer" }}>{loading ? "…" : "→"}</button>
          </form>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} style={{ marginLeft: position === "right" ? "auto" : 0, display: "flex", gap: 9, alignItems: "center", borderRadius: 999, border: "1px solid rgba(255,255,255,.14)", background: "#07111f", color: "white", padding: "9px 15px 9px 9px", cursor: "pointer", boxShadow: "0 18px 50px rgba(0,0,0,.3)" }}>
          <span style={{ width: 38, height: 38, borderRadius: 99, display: "grid", placeItems: "center", background: "#2674f2", fontWeight: 900 }}>AI</span>
          <span style={{ textAlign: "left" }}><strong style={{ display: "block", fontSize: 13 }}>Ask us</strong><small style={{ color: "#9eafc0" }}>{shoppingMode ? "Find the right product" : "How can I help?"}</small></span>
        </button>
      )}
    </aside>
  );
}
