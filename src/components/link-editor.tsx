"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Copy, ExternalLink, BarChart3 } from "lucide-react"
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
  })

  useEffect(() => {
    setFormData({
      shortlink: link.shortlink,
      longLink: link.longLink,
      pinned: link.pinned,
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
        return "Marketing Team"
      case "product":
        return "Product Team"
      default:
        return "Personal"
    }
  }

  return (
    <div className="flex-1 border-l border-border bg-card flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Edit Link</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Link Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Link Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortlink">Short Link</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                    short.ly/
                  </span>
                  <Input
                    id="shortlink"
                    value={formData.shortlink}
                    onChange={(e) => setFormData((prev) => ({ ...prev, shortlink: e.target.value }))}
                    placeholder="techsummit2025"
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="longLink">Destination URL</Label>
                <Input
                  id="longLink"
                  value={formData.longLink}
                  onChange={(e) => setFormData((prev) => ({ ...prev, longLink: e.target.value }))}
                  placeholder="https://docs.google.com/..."
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pinned">Pin to top</Label>
                <Switch
                  id="pinned"
                  checked={formData.pinned}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, pinned: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Link Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Link Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Created By</Label>
                <Input value={link.createdBy} disabled />
              </div>

              <div className="space-y-2">
                <Label>Committee</Label>
                <div className="flex items-center gap-2">
                  <Input value={getCommitteeName(link.committeeId)} disabled />
                  <Badge variant="outline">{link.committeeId === null ? "Personal" : "Team"}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Created</Label>
                  <Input value={new Date(link.createdAt).toLocaleDateString()} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Updated</Label>
                  <Input value={new Date(link.updatedAt).toLocaleDateString()} disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>

            {formData.shortlink && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopyShortLink} className="flex-1 bg-transparent">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
