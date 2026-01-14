import { getSession } from "next-auth/react";
import type { Link as UiLink } from "@/lib/mock-data";
import { normalizeCommitteeId } from "@/config/committees";

// Backend API Link shape (from docs)
type ApiLink = {
  _id: string;
  shortlink: string;
  longlink: string;
  committee_id: string | null;
  created_at: string;
  created_by: string;
  pinned: boolean;
};

type ListResponse = {
  status: string;
  total: number;
  page: number;
  totalPages: number;
  data: ApiLink[];
};

function mapApiLink(l: ApiLink): UiLink {
  return {
    id: l._id,
    shortlink: l.shortlink,
    longLink: l.longlink,
    createdBy: l.created_by,
    createdAt: l.created_at,
    updatedAt: l.created_at, // API doesn't expose updated_at in docs; use created_at as fallback
    committeeId: l.committee_id,
    pinned: l.pinned,
    clicks: 0,
    lastClicked: null,
  };
}

export async function fetchLinks({ page = 1, limit = 50 } = {}): Promise<{ items: UiLink[]; total: number; page: number; totalPages: number }> {
  const session = await getSession();
  const token = (session && typeof session === "object" ? (session as { apiToken?: string }).apiToken : undefined);
  
  // Use relative path on client to use Next.js proxy (bypassing CORS), absolute on server.
  const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL || "").replace(/\/$/, "");

  if (typeof window === "undefined" && !base) throw new Error("SERVER_API_URL is not configured. Set NEXT_PUBLIC_SERVER_API_URL in .env.local for client fetches.");
  const resp = await fetch(`${base}/admin/links?page=${page}&limit=${limit}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });
  if (!resp.ok) throw new Error(`GET /admin/links failed: ${resp.status} ${resp.statusText}`);
  const res = (await resp.json()) as ListResponse;
  return {
    items: res.data.map(mapApiLink),
    total: res.total,
    page: res.page,
    totalPages: res.totalPages,
  };
}

export type UpdateLinkPayload = Partial<{
  shortlink: string;
  longlink: string;
  pinned: boolean;
  committee_id: string | null;
}>;

export async function updateLink(id: string, payload: UpdateLinkPayload): Promise<UiLink> {
  const session = await getSession();
  const token = (session && typeof session === "object" ? (session as { apiToken?: string }).apiToken : undefined);
  
  // Use relative path on client to use Next.js proxy (bypassing CORS), absolute on server.
  const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL || "").replace(/\/$/, "");

  if (typeof window === "undefined" && !base) throw new Error("SERVER_API_URL is not configured. Set NEXT_PUBLIC_SERVER_API_URL in .env.local for client fetches.");
  const resp = await fetch(`${base}/admin/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      ...payload,
      committee_id: normalizeCommitteeId(payload.committee_id ?? null),
    }),
  });
  if (!resp.ok) throw new Error(`PUT /admin/links/${id} failed: ${resp.status} ${resp.statusText}`);
  const res = (await resp.json()) as { status: string; link: ApiLink };
  return mapApiLink(res.link);
}

export type CreateLinkPayload = {
  shortlink: string;
  longlink: string;
  pinned?: boolean;
  committee_id?: string | null;
};

export async function createLink(payload: CreateLinkPayload): Promise<UiLink> {
  const session = await getSession();
  const token = (session && typeof session === "object" ? (session as { apiToken?: string }).apiToken : undefined);
  
  // Use relative path on client to use Next.js proxy (bypassing CORS), absolute on server.
  const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL || "").replace(/\/$/, "");

  if (typeof window === "undefined" && !base) throw new Error("SERVER_API_URL is not configured. Set NEXT_PUBLIC_SERVER_API_URL in .env.local for client fetches.");
  const resp = await fetch(`${base}/admin/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      ...payload,
      committee_id: normalizeCommitteeId(payload.committee_id ?? null),
    }),
  });
  if (!resp.ok) throw new Error(`POST /admin/create failed: ${resp.status} ${resp.statusText}`);
  const res = (await resp.json()) as { status: string; link: ApiLink };
  return mapApiLink(res.link);
}

export async function deleteLink(id: string): Promise<void> {
  const session = await getSession();
  const token = (session && typeof session === "object" ? (session as { apiToken?: string }).apiToken : undefined);
  
  // Use relative path on client to use Next.js proxy (bypassing CORS), absolute on server.
  const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL || "").replace(/\/$/, "");

  if (typeof window === "undefined" && !base) throw new Error("SERVER_API_URL is not configured. Set NEXT_PUBLIC_SERVER_API_URL in .env.local for client fetches.");
  const resp = await fetch(`${base}/admin/links/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!resp.ok) throw new Error(`DELETE /admin/links/${id} failed: ${resp.status} ${resp.statusText}`);
  // Backend responds with { status: 'ok', message: 'Link deleted successfully' }
}
