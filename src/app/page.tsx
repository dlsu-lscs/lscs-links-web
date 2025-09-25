"use client"

import { useState } from "react"
import { MinimalHeader } from "@/components/minimal-header"
import { HeroSection } from "@/components/hero-section"
import { LinksList } from "@/components/links-list"
import { LinkEditor } from "@/components/link-editor"
import { mockLinks, type Link } from "@/lib/mock-data"

export default function Dashboard() {
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)
  const [links, setLinks] = useState<Link[]>(mockLinks)
  const [activeTab, setActiveTab] = useState<"personal" | "marketing" | "product">("personal")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchQuery, setSearchQuery] = useState("")

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

  const filteredLinks = links.filter((link) => {
    const matchesTab = activeTab === "personal" ? link.committeeId === null : link.committeeId === activeTab

    const matchesSearch =
      searchQuery === "" ||
      link.shortlink.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.longLink.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const tabCounts = {
    personal: links.filter((link) => link.committeeId === null).length,
    marketing: links.filter((link) => link.committeeId === "marketing").length,
    product: links.filter((link) => link.committeeId === "product").length,
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <MinimalHeader />

      <HeroSection onCreateLink={handleCreateLink} />

      <div className="flex h-[calc(100vh-200px)]">
        <div className="w-3/7 flex-shrink-0">
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
          />
        </div>

        {selectedLink && (
          <div className="flex-1">
            <LinkEditor link={selectedLink} onUpdate={handleLinkUpdate} onClose={() => setSelectedLink(null)} />
          </div>
        )}
      </div>
    </div>
  )
}
