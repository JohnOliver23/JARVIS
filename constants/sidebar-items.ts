import { Users, UserPlus, History, BarChart3, Building2 } from "lucide-react"
import type { SidebarItem } from "@/types/sidebar"

export const sidebarItems: Omit<SidebarItem, "isActive" | "badgeCount">[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Visitantes Ativos",
    href: "/visitors/active",
    icon: Users,
    showBadge: true,
  },
  {
    title: "Novo Visitante",
    href: "/visitors/new",
    icon: UserPlus,
  },
  {
    title: "Histórico",
    href: "/visitors/history",
    icon: History,
  },
  {
    title: "Salas",
    href: "/rooms",
    icon: Building2,
  },
]
