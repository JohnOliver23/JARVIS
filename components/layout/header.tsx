"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, RefreshCw } from "lucide-react"
import { useHeader } from "@/hooks/use-header"

export function Header() {
  const { isRefreshing, handleRefresh, handleNotifications } = useHeader()

  return (
    <header className="jarvis-header supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 lg:px-6">
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Atualizar dados"
            className="hover:bg-gray-800/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotifications}
            title="Notificações"
            className="hover:bg-gray-800/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
