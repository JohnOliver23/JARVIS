import type { LucideIcon } from "lucide-react"

export interface SidebarItem {
  title: string
  href: string
  icon: LucideIcon
  showBadge?: boolean
  isActive?: boolean
  badgeCount?: number
}

export interface HeaderData {
  title: string
  connectionStatus: "connected" | "disconnected" | "checking"
  connectionText: string
  connectionIcon: "connected" | "disconnected" | "checking"
}

export interface SidebarHookReturn {
  // Estado
  pathname: string
  activeVisitors: any[]
  connectionStatus: "connected" | "disconnected" | "checking"

  // Métodos utilitários
  getConnectionStatusText: () => string
  getConnectionIcon: () => "connected" | "disconnected" | "checking"
  isActiveRoute: (href: string) => boolean
  getActiveVisitorsCount: () => number
  getSidebarItems: () => SidebarItem[]
  getHeaderData: () => HeaderData

  // Dados processados
  sidebarItems: SidebarItem[]
  headerData: HeaderData
}
