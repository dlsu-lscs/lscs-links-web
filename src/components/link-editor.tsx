"use client"

import { useState, useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Edit, Check, ChevronDown, Hammer } from "lucide-react"
import type { Link } from "@/lib/mock-data"
import { getCommitteeName, COMMITTEES, normalizeCommitteeId } from "@/config/committees"
import { updateLink, createLink, deleteLink } from "@/services/links"

interface LinkEditorProps {
  link: Link
  onUpdate: (link: Link) => void
  onClose: () => void
  onDelete: (id: string) => void
}

export function LinkEditor({ link, onUpdate, onClose, onDelete }: LinkEditorProps) {
  const { data: session } = useSession()
  type MemberJwt = {
    email: string
    sub: string
    committee_id?: string | null
    committee_name?: string | null
    position_id?: string | null
    position_name?: string | null
  }
  function decodeJwtPayload<T = unknown>(token?: string | null): T | null {
    if (!token) return null
    const parts = token.split(".")
    if (parts.length < 2) return null
    try {
      const base = parts[1].replace(/-/g, "+").replace(/_/g, "/")
      const padded = base + "===".slice((base.length + 3) % 4)
      const json = atob(padded)
      return JSON.parse(json) as T
    } catch {
      return null
    }
  }
  const payload = useMemo(() => decodeJwtPayload<MemberJwt>(session?.apiToken ?? null), [session])
  const isExec = (payload?.position_id === "PRES" || payload?.position_id === "EVP")
  const availableCommittees = useMemo(() => {
    if (isExec) {
      return [
        { key: null as string | null, label: "Personal" },
        ...COMMITTEES.map((c) => ({ key: c.id as string | null, label: c.name })),
      ]
    }
    const cid = payload?.committee_id ?? null
    // Non-exec: always show Personal; if user has a committee, also show that committee.
    if (cid) {
      return [
        { key: null as string | null, label: "Personal" },
        { key: cid as string | null, label: getCommitteeName(cid) },
      ]
    }
    return [{ key: null as string | null, label: "Personal" }]
  }, [isExec, payload?.committee_id])
  const [formData, setFormData] = useState({
    shortlink: link.shortlink,
    longLink: link.longLink,
    pinned: link.pinned,
    committeeId: link.committeeId,
  })

  const [isEditingShortlink, setIsEditingShortlink] = useState(false)
  const [isEditingLonglink, setIsEditingLonglink] = useState(false)
  const [isCommitteeOpen, setIsCommitteeOpen] = useState(false)

  // simple relative time formatter
  const formatRelativeTime = (iso: string) => {
    const diffMs = Date.now() - new Date(iso).getTime()
    const sec = Math.max(1, Math.floor(diffMs / 1000))
    const units: [number, Intl.RelativeTimeFormatUnit][] = [
      [60, "second"],
      [60, "minute"],
      [24, "hour"],
      [7, "day"],
      [4.34524, "week"],
      [12, "month"],
      [Number.POSITIVE_INFINITY, "year"],
    ]
    let value = sec
    let unit: Intl.RelativeTimeFormatUnit = "second"
    for (const [step, name] of units) {
      if (value < step) { unit = name; break }
      value = Math.floor(value / step)
    }
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "always" })
    return rtf.format(-value, unit)
  }

  useEffect(() => {
    setFormData({
      shortlink: link.shortlink,
      longLink: link.longLink,
      pinned: link.pinned,
      committeeId: link.committeeId,
    })
  }, [link])

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleSave = async () => {
    try {
      setSaving(true)
      setSaveError(null)
      const payload = {
        shortlink: formData.shortlink,
        longlink: formData.longLink,
        pinned: formData.pinned,
        committee_id: normalizeCommitteeId(formData.committeeId),
      }
      const isTemp = String(link.id).startsWith("tmp-")
      const saved = isTemp ? await createLink(payload) : await updateLink(link.id, payload)
      onUpdate({ ...saved, clicks: link.clicks, lastClicked: link.lastClicked })
    } catch (e: unknown) {
      console.error("Failed to save link", e)
      const msg = e instanceof Error ? e.message : "Failed to save link"
      setSaveError(msg)
    } finally {
      setSaving(false)
    }
  }
  const shortUrl = `https://lscs.info/${formData.shortlink || ""}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shortUrl)}&margin=15`

  return (
    <div className="h-full flex-1 border-l border-border bg-background flex flex-col min-h-0">

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6 gap-12">
          {/* Link Form */}
          <Card className="bg-background">
            <CardHeader className="relative">
                            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-2 top-2"
              >
                <X className="h-4 w-4" />
              </Button> 
              <div className="absolute right-12 top-2 flex items-center gap-2">
                {saveError && (
                  <span className="text-xs text-destructive">{saveError}</span>
                )}
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>
              <CardTitle className="text-xl space-y-1">           
                <div className="flex">
                  <span className="inline-flex items-center text-muted-foreground font-bold">
                    lscs.info/
                  </span>
                  {isEditingShortlink ? (
                    <input
                      id="shortlink"
                      type="text"
                      value={formData.shortlink}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, shortlink: e.target.value }))
                      }
                      placeholder="..."
                      className="border-none hover:border-1 font-bold focus:border-none focus:bg-accent/20 focus-visible:border-none hover:bg-accent/20 !pl-0 !text-lg !w-auto flex-none outline-none bg-transparent rounded-sm"
                      style={{ width: `${Math.max(3, (formData.shortlink?.length || 0) + 1)}ch` }}
                    />
                  ) : (
                    <div
                      className="inline-flex items-center font-bold !pl-0 !text-lg !w-auto flex-none bg-transparent"
                      title={formData.shortlink || "..."}
                    >
                      {formData.shortlink || "..."}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingShortlink((v) => !v)}
                    aria-label={isEditingShortlink ? "Stop editing shortlink" : "Edit shortlink"}
                    className="ml-1"
                  >
                                   {isEditingShortlink ?
                  (<Check className="h-4 w-4" />)
                  :
                    (<Edit className="h-4 w-4" />
                    )}
                  </Button>
                  
                </div>
                
              <div className="flex items-center gap-2">
                {/* <Switch
                  id="pinned"
                  checked={formData.pinned}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, pinned: checked }))}
                />
                <Label htmlFor="pinned">Pinned</Label> */}
              </div></CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              <div className="space-y-2">
                <Label htmlFor="longLink">Destination URL</Label>
                <div className="flex items-center gap-2">
                  {isEditingLonglink ? (
                    <Input
                      id="longLink"
                      value={formData.longLink}
                      onChange={(e) => setFormData((prev) => ({ ...prev, longLink: e.target.value }))}
                      placeholder="https://docs.google.com/..."
                      className="flex-1"
                    />
                  ) : (
                    <div
                      className="truncate text-sm text-foreground"
                      title={formData.longLink || "https://docs.google.com/..."}
                    >
                      {formData.longLink || "https://docs.google.com/..."}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingLonglink((v) => !v)}
                    aria-label={isEditingLonglink ? "Stop editing destination URL" : "Edit destination URL"}
                  >
                    {isEditingLonglink ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Edit className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Committee */}
              <div className="space-y-2">
                <Label>Committee</Label>
                
                <div className="relative flex items-center gap-2">
                  <div className="truncate text-sm text-foreground">
                    {formData.committeeId === null ? "Personal" : getCommitteeName(formData.committeeId)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-haspopup="menu"
                    aria-expanded={isCommitteeOpen}
                    onClick={() => setIsCommitteeOpen((v) => !v)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  {isCommitteeOpen && (
                    <div className="absolute top-full mt-1 z-20 w-48 rounded-md border border-border bg-popover p-1 shadow-md">
                      {availableCommittees.map((opt) => (
                        <button
                          key={String(opt.key)}
                          className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent/50 rounded"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, committeeId: opt.key }))
                            setIsCommitteeOpen(false)
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Owner */}
              <div className="space-y-4">
                <Label>Owner</Label>
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt="Owner avatar" />
                    <AvatarFallback>
                      {(link.createdBy || "").slice(0, 2).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="truncate text-sm text-foreground" title={link.createdBy}>
                      {link.createdBy}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Created on {new Date(link.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information (coming soon) */}
              <div className="space-y-2">
                <Label className="inline-flex items-center gap-2">
                  <Hammer className="h-4 w-4" /> Coming soon!
                </Label>
                <div className="relative">
                  <div className="pointer-events-none select-none blur-sm">
                    <div className="rounded-md border border-border p-4 bg-muted/30">
                      <div className="flex items-start gap-6">
                        <div className="flex-none">
                          <img src={qrUrl} alt="QR code" width="auto" className="flex-1 rounded-sm" />
                          <div className="mt-2">
                            <Button variant="secondary" size="sm" className="text-sm text-primary" disabled>
                              Download
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="rounded-t-md overflow-hidden border border-border bg-muted/20">
                            <img src="https://placehold.co/800x400" alt="Preview" className="w-full h-40 object-cover" />
                          </div>
                          <div className="bg-card border border-border border-t-0 rounded-b-md p-3 flex items-start justify-between">
                            <div className="min-w-0 pr-2">
                              <div className="font-medium truncate">Preview title</div>
                              <div className="text-sm text-muted-foreground truncate">Preview description goes here.</div>
                            </div>
                            <Button variant="ghost" size="icon" aria-label="Edit preview" disabled>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground bg-background/80 px-3 py-1 rounded-md border">Feature coming soon</span>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="space-y-2">
                <Label>Analytics</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded">
                    <div className="text-2xl font-bold">{link.clicks}</div>
                    <div className="text-sm text-muted-foreground">Total Clicks</div>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded">
                    <div className="text-2xl font-bold">{link.lastClicked ? "1d" : "-"}</div>
                    <div className="text-sm text-muted-foreground">Last Click</div>
                  </div>
                </div>
              </div>

              {/* Delete action */}
              <div className="pt-4">
                {deleteError && (
                  <div className="text-xs text-destructive mb-2">{deleteError}</div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border border-destructive text-destructive"
                  onClick={() => setConfirmOpen(true)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting…" : "Delete link"}
                </Button>
              </div>

                        {/* Footer note */}
          <div className="text-xs text-muted-foreground pt-4">
            Last updated by {link.createdBy} {formatRelativeTime(link.updatedAt)}.
          </div>
            </CardContent>
          </Card>

        </div>
      </div>
      {/* Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => !deleting && setConfirmOpen(false)} />
          <div className="relative z-10 w-[90%] max-w-sm rounded-md border bg-card p-4 shadow-lg">
            <div className="text-base font-semibold mb-1">Delete link?</div>
            <div className="text-sm text-muted-foreground mb-4">
              This action cannot be undone. Are you sure you want to delete <span className="font-medium">lscs.info/{formData.shortlink || link.shortlink}</span>?
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setConfirmOpen(false)} disabled={deleting}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  try {
                    setDeleteError(null)
                    setDeleting(true)
                    setConfirmOpen(true)
                    // If it's a temp link (not created yet), just close the editor.
                    if (String(link.id).startsWith("tmp-")) {
                      onDelete(link.id)
                      onClose()
                      return
                    }
                    await deleteLink(link.id)
                    onDelete(link.id)
                  } catch (e: unknown) {
                    console.error("Failed to delete link", e)
                    const msg = e instanceof Error ? e.message : "Failed to delete link"
                    setDeleteError(msg)
                  } finally {
                    setDeleting(false)
                    setConfirmOpen(false)
                  }
                }}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
