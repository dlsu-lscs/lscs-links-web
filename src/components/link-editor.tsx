"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Copy, ExternalLink, BarChart3, Edit, Check, ChevronDown, Info } from "lucide-react"
import type { Link } from "@/lib/mock-data"

interface LinkEditorProps {
  link: Link
  onUpdate: (link: Link) => void
  onClose: () => void
}

export function LinkEditor({ link, onUpdate, onClose }: LinkEditorProps) {
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

  const handleSave = () => {
    const updatedLink: Link = {
      ...link,
      ...formData,
      updatedAt: new Date().toISOString(),
    }
    onUpdate(updatedLink)
  }

  const handleCopyShortLink = () => {
    if (formData.shortlink) {
      navigator.clipboard.writeText(`https://short.ly/${formData.shortlink}`)
    }
  }

  const getCommitteeName = (committeeId: string | null) => {
    switch (committeeId) {
      case "marketing":
        return "Research and Development"
      case "product":
        return "Documentations and Logistics"
      default:
        return "Personal"
    }
  }

  const shortUrl = `https://lscs.info/${formData.shortlink || ""}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shortUrl)}&margin=15`

  return (
    <div className="flex-1 border-l border-border bg-background flex flex-col min-h-0">

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
                <Switch
                  id="pinned"
                  checked={formData.pinned}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, pinned: checked }))}
                />
                <Label htmlFor="pinned">Pinned</Label>
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
                      {[
                        { key: null as string | null, label: "Personal" },
                        { key: "marketing" as const, label: "Research and Development" },
                        { key: "product" as const, label: "Documentations and Logistics" },
                      ].map((opt) => (
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

              {/* Additional Information */}
              <div className="space-y-4">
                <Label className="inline-flex items-center gap-2">
                  QR Code and Custom Link Metadata
                </Label>
                <div className="flex items-center">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <span className="text-xs text-muted-foreground ml-2">
                  Custom Link Metadata changes how your link appears when shared on social media platforms.
                </span>
                </div>
                <div className="flex items-start gap-6">
                  {/* Left: QR code */}
                  <div className="flex-none">
                    <img
                      src={qrUrl}
                      alt="QR code"
                      width="auto"
                      className="flex-1 rounded-sm"
                    />
                    <div className="mt-2">
                      <Button
                        onClick={() => {window.open(qrUrl, "_blank")}}
                        variant="secondary"
                        size="lg" 
                        // download={`qr-${formData.shortlink || "link"}.png`}
                        className="text-sm text-primary w-full"
                      >
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Right: Preview card */}
                  <div className="flex-1 min-w-0">
                    <div className="rounded-t-md overflow-hidden border border-border bg-muted/20">
                      <img
                        src="https://placehold.co/800x400"
                        alt="Link preview"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="bg-card border border-border border-t-0 rounded-b-md p-3 flex items-start justify-between">
                      <div className="min-w-0 pr-2">
                        <div className="font-medium truncate">Preview title</div>
                        <div className="text-sm text-muted-foreground truncate">
                          Preview description goes here. This will describe the link target.
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" aria-label="Edit preview">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics (moved from deprecated card) */}
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

                        {/* Footer note */}
          <div className="text-xs text-muted-foreground pt-4">
            Last updated by {link.createdBy} {formatRelativeTime(link.updatedAt)}.
          </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
