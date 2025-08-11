import { Users, UserCheck, TrendingUp, TrendingDown } from "lucide-react"
import type { VisitorStats } from "@/types/visitor"

export interface StatsCard {
  title: string
  getValue: (stats: VisitorStats) => number
  description: string
  icon: typeof Users
  color: string
  bgColor: string
}

export const statsCards: StatsCard[] = [
  {
    title: "Total de Visitantes",
    getValue: (stats) => stats.totalVisitors,
    description: "Todos os visitantes registrados",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Visitantes Ativos",
    getValue: (stats) => stats.activeVisitors,
    description: "Atualmente na torre",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Entradas Hoje",
    getValue: (stats) => stats.todayEntries,
    description: "Novos visitantes hoje",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Saídas Hoje",
    getValue: (stats) => stats.todayExits,
    description: "Visitantes que saíram hoje",
    icon: TrendingDown,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]
