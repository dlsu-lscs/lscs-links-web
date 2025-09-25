"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, List, Grid3X3, Pin, ExternalLink, QrCode, ChevronLeft, ChevronRight } from "lucide-react"
import type { Link } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"

interface LinksListProps {
  links: Link[]
  selectedLink: Link | null
  onLinkSelect: (link: Link) => void
  activeTab: "personal" | "marketing" | "product"
  onTabChange: (tab: "personal" | "marketing" | "product") => void
  viewMode: "list" | "grid"
  onViewModeChange: (mode: "list" | "grid") => void
  searchQuery: string
  onSearchChange: (query: string) => void
  tabCounts: { personal: number; marketing: number; product: number }
}

export function LinksList({
  links,
  selectedLink,
  onLinkSelect,
  activeTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  tabCounts,
}: LinksListProps) {
  const sortedLinks = [...links].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  const tabsRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const handleResize = () => checkScrollButtons()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200
      tabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 300)
    }
  }

  return (
    <div className="h-full border-r border-border bg-card flex flex-col">
      <div className="border-b border-border p-4">
        <div className="relative flex items-center">
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm"
              onClick={() => scrollTabs("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          <div
            ref={tabsRef}
            className="flex space-x-1 overflow-x-auto scrollbar-hide scroll-smooth px-8"
            onScroll={checkScrollButtons}
          >
            <Button
              variant={activeTab === "personal" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onTabChange("personal")}
              className="relative whitespace-nowrap flex-shrink-0"
            >
              Personal
                <Badge variant="destructive" className="ml-2 bg-info text-info-foreground text-xs">
                  NEW!
                </Badge>
              <Badge variant="outline" className="ml-2 text-xs">
                {tabCounts.personal}
              </Badge>
            </Button>
            <Button
              variant={activeTab === "marketing" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onTabChange("marketing")}
              className="whitespace-nowrap flex-shrink-0"
            >
              Marketing Team
              <Badge variant="outline" className="ml-2 text-xs">
                {tabCounts.marketing}
              </Badge>
            </Button>
            <Button
              variant={activeTab === "product" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onTabChange("product")}
              className="whitespace-nowrap flex-shrink-0"
            >
              Product Team
              <Badge variant="outline" className="ml-2 text-xs">
                {tabCounts.product}
              </Badge>
            </Button>
          </div>

          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm"
              onClick={() => scrollTabs("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex border border-border rounded-md">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="rounded-r-none border-0 h-10"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="rounded-l-none border-0 h-10"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>
      </div>

      {/* Links List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className={cn("space-y-2", viewMode === "grid" && "grid grid-cols-2 gap-2 space-y-0")}>
          {sortedLinks.map((link) => (
            <Card
              key={link.id}
              className={cn(
                "p-3 cursor-pointer transition-colors hover:bg-accent/50 relative",
                selectedLink?.id === link.id && "bg-accent border-primary",
              )}
              onClick={() => onLinkSelect(link)}
            >
              {link.pinned && <Pin className="absolute top-2 right-2 h-3 w-3 text-warning fill-current" />}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{link.shortlink || "Untitled Link"}</p>
                    <p className="text-xs text-muted-foreground truncate">{link.longLink || "No URL set"}</p>
                  </div>
                </div>

                {viewMode === "list" && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{link.clicks} clicks</span>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      <QrCode className="h-3 w-3" />
                    </div>
                  </div>
                )}

                {viewMode === "grid" && (
                  <div className="flex justify-center py-4 bg-muted/20 rounded">
                    <QrCode className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {sortedLinks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No links found</p>
            <p className="text-sm">Try adjusting your search or create a new link</p>
          </div>
        )}
      </div>
    </div>
  )
}
