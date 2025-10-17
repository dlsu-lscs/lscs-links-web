"use client"

import { useEffect, useRef, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MinimalHeader() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
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
    <div className="border-b border-border bg-header px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SL</span>
          </div>
          <span className="font-semibold text-header-foreground">ShortLink</span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={userImage} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 rounded-md border bg-card text-card-foreground shadow-md z-50"
            >
              <div className="px-3 py-2 text-xs text-muted-foreground truncate">
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
      </div>
    </div>
  )
}