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

type Recommendation = { id: string | number; merchant: string; title: string; description: string; affiliateUrl: string; reason?: string };

export default function RepresentativeWidget({
  title = "Digital Representative",
  greeting = "Hi. What can I help you with today?",
  chatEndpoint = "/api/assistant/chat",
  shopEndpoint = "/api/assistant/shop",
  affiliatePrefix = "/affiliate-services",
  position = "right",
}: RepresentativeWidgetProps) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(true);
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
    setLoading(true); setRecommendations([]); setDisclosure("");
    try {
      const response = await fetch(shoppingMode ? shopEndpoint : chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shoppingMode ? { query: input, pathname } : { message: input, pathname }),
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
    } finally { setLoading(false); }
  }

  const side = position === "left" ? { left: 14 } : { right: 14 };
  const tailSide = position === "left" ? "left" : "right";

  return (
    <aside style={{ position: "fixed", bottom: 8, zIndex: 70, ...side, width: "min(430px,calc(100vw - 24px))", pointerEvents: "none" }}>
      {open ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px", alignItems: "end", gap: 8, pointerEvents: "auto" }}>
          <div style={{ paddingBottom: 50 }}>
            <div style={{ position: "relative", borderRadius: 24, background: "#07111f", color: "white", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 22px 70px rgba(0,0,0,.4)" }}>
              <span aria-hidden="true" style={{ position: "absolute", bottom: 34, [tailSide]: -12, width: 22, height: 22, background: "#07111f", transform: "rotate(45deg)" }} />
              <header style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: 14 }}>
                <div><strong>{title}</strong><small style={{ display: "block", color: "#80d8ff" }}>{shoppingMode ? "SHOPPING GUIDE" : "WEBSITE REPRESENTATIVE"}</small></div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Minimize representative" style={{ border: 0, background: "transparent", color: "white", fontSize: 20 }}>−</button>
              </header>
              <div style={{ maxHeight: "45vh", overflowY: "auto", padding: "0 14px 12px" }}>
                <div style={{ padding: 13, borderRadius: 17, background: "rgba(255,255,255,.055)", lineHeight: 1.5 }}>{loading ? "Give me a second..." : reply}</div>
                {recommendations.map((item) => (
                  <article key={`${item.merchant}-${item.id}`} style={{ marginTop: 9, padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,.08)" }}>
                    <small style={{ color: "#80d8ff" }}>{item.merchant}</small><strong style={{ display: "block" }}>{item.title}</strong>
                    <p style={{ color: "#a7b7c8", fontSize: 12 }}>{item.reason || item.description}</p>
                    <a href={item.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" style={{ color: "white", fontWeight: 800 }}>View option →</a>
                  </article>
                ))}
                {disclosure ? <p style={{ color: "#8191a4", fontSize: 10 }}>{disclosure}</p> : null}
              </div>
              <form onSubmit={send} style={{ display: "flex", gap: 8, padding: 11, borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={shoppingMode ? "What are you shopping for?" : "Type your reply..."} style={{ flex: 1, minWidth: 0, borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)", color: "white", padding: "10px 13px" }} />
                <button type="submit" disabled={loading} style={{ width: 40, height: 40, borderRadius: 99, border: 0, background: "#2674f2", color: "white" }}>{loading ? "…" : "→"}</button>
              </form>
            </div>
          </div>
          <div aria-hidden="true" style={{ position: "relative", height: 250 }}>
            <span style={{ position: "absolute", top: 0, left: 31, width: 46, height: 55, borderRadius: "48%", background: "#b98565" }} />
            <span style={{ position: "absolute", top: -4, left: 25, width: 58, height: 32, borderRadius: "55% 55% 30% 30%", background: "#29364b" }} />
            <span style={{ position: "absolute", top: 54, left: 18, width: 72, height: 112, borderRadius: "22px 22px 13px 13px", background: "linear-gradient(165deg,#17263d,#07111f)", border: "1px solid rgba(89,183,255,.35)" }} />
            <span style={{ position: "absolute", top: 165, left: 28, width: 22, height: 80, background: "#050a13" }} />
            <span style={{ position: "absolute", top: 165, right: 28, width: 22, height: 80, background: "#050a13" }} />
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} style={{ pointerEvents: "auto", marginLeft: position === "right" ? "auto" : 0, borderRadius: 18, border: "1px solid rgba(255,255,255,.14)", background: "#07111f", color: "white", padding: "10px 13px" }}>Talk to our representative</button>
      )}
    </aside>
  );
}
