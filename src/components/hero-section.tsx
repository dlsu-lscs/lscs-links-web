"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, MessageCircle } from "lucide-react"

interface HeroSectionProps {
  onCreateLink: () => void
}

export function HeroSection({ onCreateLink }: HeroSectionProps) {
  return (
    // <div className="bg-gradient-to-r from-background to-muted/20 px-6 py-8">
    <div className="bg-gradient-to-r from-yellow-500/20 via-muted/20 to-blue-950 px-6 py-12">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - User info and actions */}
        <div className="flex flex-row items-center gap-6">
          <Avatar className="h-26 w-26">
            <AvatarImage src="/placeholder-user.png" />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">SR</AvatarFallback>
          </Avatar>

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
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Need help creating links?</p>
                  <p className="text-sm font-medium">Ask me anything!</p>
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
