"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Plus } from "lucide-react"

interface DashboardHeaderProps {
  onCreateLink: () => void
}

export function DashboardHeader({ onCreateLink }: DashboardHeaderProps) {
  return (
    <div className="border-b border-border bg-header px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-user.png" />
            <AvatarFallback className="bg-secondary text-secondary-foreground">SR</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold text-header-foreground">Sean Robenta</h1>
            <p className="text-sm text-muted-foreground">Senior Developer</p>
            <p className="text-xs text-muted-foreground">Engineering Department</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onCreateLink} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Link
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
