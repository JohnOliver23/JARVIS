import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"

export type RoomStatusType = "full" | "nearCapacity" | "available"

export interface RoomStatusConfig {
  statusIcon: typeof CheckCircle
  statusColor: string
  statusText: string
  progressColor: string
}

export const roomStatusMapper: Record<RoomStatusType, RoomStatusConfig> = {
  full: {
    statusIcon: AlertTriangle,
    statusColor: "text-red-600 dark:text-red-400",
    statusText: "Sala lotada",
    progressColor: "[&>div]:bg-red-500",
  },
  nearCapacity: {
    statusIcon: AlertCircle,
    statusColor: "text-yellow-600 dark:text-yellow-400",
    statusText: "Próximo da capacidade",
    progressColor: "[&>div]:bg-yellow-500",
  },
  available: {
    statusIcon: CheckCircle,
    statusColor: "text-green-600 dark:text-green-400",
    statusText: "Disponível",
    progressColor: "[&>div]:bg-green-500",
  },
}

export const getRoomStatus = (currentVisitors: number, maxCapacity: number): RoomStatusType => {
  const occupancyPercentage = (currentVisitors / maxCapacity) * 100

  if (occupancyPercentage >= 100) return "full"
  if (occupancyPercentage >= 80) return "nearCapacity"
  return "available"
}
