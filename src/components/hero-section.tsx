"use client"

import { useEffect, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, MessageCircle } from "lucide-react"

interface HeroSectionProps {
  onCreateLink: () => void
}

export function HeroSection({ onCreateLink }: HeroSectionProps) {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [menuOpen])

  const userImage = session?.user?.image ?? "/placeholder-user.png"
  const userName = session?.user?.name ?? ""
  const userEmail = session?.user?.email ?? ""
  const initials = (userName || userEmail)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("") || "U"

  return (
    // <div className="bg-gradient-to-r from-background to-muted/20 px-6 py-8">
    <div className="bg-gradient-to-r from-yellow-500/20 via-muted/20 to-blue-950 px-6 py-12">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - User info and actions */}
        <div className="flex flex-row items-center gap-6">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Avatar className="h-26 w-26">
                <AvatarImage src={userImage} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-48 rounded-md border bg-card text-card-foreground shadow-md z-50"
              >
                <div className="px-3 py-2 text-sm text-muted-foreground truncate">
                  {userName || userEmail || "Signed in"}
                </div>
                <div className="border-t" />
                <button
                  role="menuitem"
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex flex-col2 items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Sean Denzel Robenta <Badge variant="outline">Research & Development</Badge></h1>
              </div>
              <p className="text-muted-foreground">Senior Developer</p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={onCreateLink} variant="outline" size="sm" className="bg-primary font-medium hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Create Link
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Mascot and chat bubble */}
        <div className="flex items-center gap-4">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex max-w-md items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">The Sandiganbayan ⚖️ allowed yesterday former San Juan 🏙️ mayor 👨‍💼 Jinggoy Estrada 😀 to undergo treatment 💉 for rectal bleeding 🩸, or hemorrhoids 🍑, at Makati Medical Center 🏥 (MMC) for five days 📅. </p>
                  <p className="text-sm font-medium">—Macky</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <span className="text-3xl">🤖</span>
          </div>
        </div>
      </div>
    </div>
  )
}
