"use client"

import { useEffect, useState } from "react"
import { MinimalHeader } from "@/components/minimal-header"
import { HeroSection } from "@/components/hero-section"
import { LinksList } from "@/components/links-list"
import { LinkEditor } from "@/components/link-editor"
import { type Link } from "@/lib/mock-data"
import { fetchLinks } from "@/services/links"

export default function Dashboard() {
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [activeTab, setActiveTab] = useState<string>("personal")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetchLinks({ page: 1, limit: 50 })
        if (!mounted) return
        setLinks(res.items)
      } catch (e: unknown) {
        console.error("Failed to load links", e)
        const msg = e instanceof Error ? e.message : "Failed to load links"
        if (mounted) setError(msg)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleLinkSelect = (link: Link) => {
    setSelectedLink(link)
  }

  const handleLinkUpdate = (updatedLink: Link) => {
    setLinks((prev) => prev.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
    setSelectedLink(updatedLink)
  }

  const handleCreateLink = () => {
    const newLink: Link = {
      id: Date.now().toString(),
      shortlink: "",
      longLink: "",
      createdBy: "sean_robenta@dlsu.edu.ph",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      committeeId: activeTab === "personal" ? null : activeTab,
      pinned: false,
      clicks: 0,
      lastClicked: null,
    }
    setLinks((prev) => [newLink, ...prev])
    setSelectedLink(newLink)
  }

  // Derive other tabs from existing committee IDs (excluding personal/null)
  const otherTabs = Array.from(
    new Set(
      links
        .map((l) => l.committeeId)
        .filter((id): id is string => !!id)
    )
  ).map((key) => ({ key, label: `${key.charAt(0).toUpperCase()}${key.slice(1)} Team` }))

  const filteredLinks = links.filter((link) => {
    const matchesTab = activeTab === "personal" ? link.committeeId === null : link.committeeId === activeTab

    const matchesSearch =
      searchQuery === "" ||
      link.shortlink.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.longLink.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const tabCounts = links.reduce<Record<string, number>>((acc, link) => {
    const key = link.committeeId ?? "personal"
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, { personal: 0 })

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <MinimalHeader />

      <HeroSection onCreateLink={handleCreateLink} />

      <div className="flex h-[calc(100vh-200px)] min-h-0">
        <div className="w-3/7 flex-shrink-0">
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading links…</div>
          ) : error ? (
            <div className="p-4 text-sm text-destructive">{error}</div>
          ) : (
            <LinksList
              links={filteredLinks}
              selectedLink={selectedLink}
              onLinkSelect={handleLinkSelect}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              tabCounts={tabCounts}
              otherTabs={otherTabs}
            />
          )}
        </div>

        {selectedLink && (
          <div className="flex-1 min-h-0 h-full">
            <LinkEditor link={selectedLink} onUpdate={handleLinkUpdate} onClose={() => setSelectedLink(null)} />
          </div>
        )}
      </div>
    </div>
  )
}
