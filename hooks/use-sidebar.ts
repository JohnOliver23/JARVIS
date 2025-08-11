"use client"

import { usePathname } from "next/navigation"
import { useSupabaseActiveVisitorsQuery } from "@/hooks/use-supabase-visitors-query"
import { testSupabaseConnection } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { sidebarItems } from "@/constants/sidebar-items"
import type { SidebarHookReturn, SidebarItem, HeaderData } from "@/types/sidebar"

type ConnectionStatus = "connected" | "disconnected" | "checking"

export function useSidebar(): SidebarHookReturn {
  const pathname = usePathname()
  const { data: activeVisitors = [] } = useSupabaseActiveVisitorsQuery()
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("checking")

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testSupabaseConnection()
        setConnectionStatus(result.success ? "connected" : "disconnected")
      } catch {
        setConnectionStatus("disconnected")
      }
    }

    checkConnection()
    const interval = setInterval(checkConnection, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Connection status helpers
  const getConnectionStatusText = (): string => {
    switch (connectionStatus) {
      case "connected":
        return "Online"
      case "disconnected":
        return "Offline"
      case "checking":
        return "Conectando..."
      default:
        return "Desconhecido"
    }
  }

  const getConnectionIcon = (): ConnectionStatus => {
    return connectionStatus
  }

  // Navigation helpers
  const isActiveRoute = (href: string): boolean => {
    return pathname === href
  }

  // Visitors helpers
  const getActiveVisitorsCount = (): number => {
    return activeVisitors.length
  }

  // Sidebar items with dynamic data
  const getSidebarItems = (): SidebarItem[] => {
    return sidebarItems.map((item) => ({
      ...item,
      isActive: isActiveRoute(item.href),
      badgeCount: item.showBadge ? getActiveVisitorsCount() : undefined,
      showBadge: item.showBadge && getActiveVisitorsCount() > 0,
    }))
  }

  // Header data
  const getHeaderData = (): HeaderData => {
    return {
      title: "J.A.R.V.I.S.",
      connectionStatus,
      connectionText: getConnectionStatusText(),
      connectionIcon: getConnectionIcon(),
    }
  }

  return {
    // Estado
    pathname,
    activeVisitors,
    connectionStatus,

    // Métodos utilitários
    getConnectionStatusText,
    getConnectionIcon,
    isActiveRoute,
    getActiveVisitorsCount,
    getSidebarItems,
    getHeaderData,

    // Dados processados
    sidebarItems: getSidebarItems(),
    headerData: getHeaderData(),
  }
}
