import { createHash } from "crypto";
import type { ConversationTurn, LeadProfile } from "./leadQualification";

export type SupabaseLeadConfig = {
  supabaseUrl: string;
  supabaseServerKey: string;
  keyKind: "secret" | "service_role";
  table?: string;
};

export type PersistLeadInput = {
  profile: LeadProfile;
  pathname: string;
  summary: string;
  conversation: ConversationTurn[];
  qualificationScore?: number;
  qualificationStatus?: string;
  sessionId?: string;
  referrer?: string;
};

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function captureKey(input: PersistLeadInput) {
  const source = [
    clean(input.sessionId, 160),
    clean(input.profile.email, 320).toLowerCase(),
    clean(input.profile.phone, 80),
    clean(input.profile.business, 180).toLowerCase(),
    clean(input.profile.projectType, 120).toLowerCase(),
  ].filter(Boolean).join("|");
  return source ? createHash("sha256").update(source).digest("hex") : undefined;
}

export async function persistQualifiedLead(config: SupabaseLeadConfig, input: PersistLeadInput) {
  const email = clean(input.profile.email, 320);
  const phone = clean(input.profile.phone, 80);
  const business = clean(input.profile.business, 180);
  const projectType = clean(input.profile.projectType, 120);
  if (!business || !projectType || (!email && !phone)) {
    return { saved: false as const, reason: "lead_not_handoff_ready" };
  }

  const record = {
    capture_key: captureKey(input) ?? null,
    session_id: clean(input.sessionId, 160) || null,
    status: "new",
    name: clean(input.profile.name, 160) || null,
    email: email || null,
    phone: phone || null,
    business,
    project_type: projectType,
    goals: Array.isArray(input.profile.goals) ? input.profile.goals.slice(0, 20) : [],
    features: Array.isArray(input.profile.features) ? input.profile.features.slice(0, 20) : [],
    budget: clean(input.profile.budget, 160) || null,
    timeline: clean(input.profile.timeline, 160) || null,
    source_page: clean(input.pathname, 500) || "/",
    source_path: clean(input.pathname, 500) || "/",
    source_referrer: clean(input.referrer, 1000) || null,
    summary: clean(input.summary, 1600),
    conversation: input.conversation.slice(-12),
    qualification_score: typeof input.qualificationScore === "number" ? Math.max(0, Math.min(100, Math.round(input.qualificationScore))) : null,
    qualification_status: clean(input.qualificationStatus, 80) || null,
  };

  const headers: Record<string, string> = {
    apikey: config.supabaseServerKey,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  };
  if (config.keyKind === "service_role") headers.Authorization = `Bearer ${config.supabaseServerKey}`;

  const table = config.table || "leads";
  const endpoint = `${config.supabaseUrl}/rest/v1/${table}?on_conflict=capture_key`;
  const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(record) });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return { saved: false as const, reason: "database_insert_failed", status: response.status, detail };
  }
  const rows = (await response.json().catch(() => [])) as Array<{ id?: string }>;
  return { saved: true as const, leadId: rows[0]?.id };
}
