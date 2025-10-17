import { getSession } from "next-auth/react";
import type { Link as UiLink } from "@/lib/mock-data";

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
  const base = (process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL || "").replace(/\/$/, "");
  if (!base) throw new Error("SERVER_API_URL is not configured. Set NEXT_PUBLIC_SERVER_API_URL in .env.local for client fetches.");
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
  const base = (process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL || "").replace(/\/$/, "");
  if (!base) throw new Error("SERVER_API_URL is not configured. Set NEXT_PUBLIC_SERVER_API_URL in .env.local for client fetches.");
  const resp = await fetch(`${base}/admin/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error(`PUT /admin/links/${id} failed: ${resp.status} ${resp.statusText}`);
  const res = (await resp.json()) as { status: string; link: ApiLink };
  return mapApiLink(res.link);
}
