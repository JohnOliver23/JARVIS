"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/hooks/use-sidebar"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { sidebarItems, headerData } = useSidebar()

  const renderConnectionIcon = () => {
    switch (headerData.connectionIcon) {
      case "connected":
        return <Wifi className="h-3 w-3 text-green-500" />
      case "disconnected":
        return <WifiOff className="h-3 w-3 text-red-500" />
      case "checking":
        return <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse" />
      default:
        return null
    }
  }

  return (
    <div className={cn("pb-12 min-h-screen jarvis-sidebar", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* Header */}
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 stark-glow" />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{headerData.title}</h2>
              <div className="flex items-center gap-1 mt-1">
                {renderConnectionIcon()}
                <span className="text-xs text-muted-foreground">{headerData.connectionText}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start mb-1 relative jarvis-sidebar-button border border-transparent",
                    item.isActive && "jarvis-sidebar-button active",
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                    {item.showBadge && item.badgeCount && (
                      <Badge variant="secondary" className="ml-auto h-5 w-5 p-0 text-xs">
                        {item.badgeCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
