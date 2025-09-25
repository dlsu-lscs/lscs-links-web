"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MinimalHeader() {
  return (
    <div className="border-b border-border bg-header px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SL</span>
          </div>
          <span className="font-semibold text-header-foreground">ShortLink</span>
        </div>

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.png" />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">SR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}