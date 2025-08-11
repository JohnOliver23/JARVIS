"use client"

import { Progress } from "@/components/ui/progress"
import { Building2, Users } from "lucide-react"
import { roomStatusMapper, getRoomStatus } from "@/constants/room-status-mapper"
import type { Room } from "@/types/visitor"

interface RoomOccupancyCardProps {
  room: Room
}

export function RoomOccupancyCard({ room }: RoomOccupancyCardProps) {
  const occupancyPercentage = (room.currentVisitors / room.maxCapacity) * 100
  const statusType = getRoomStatus(room.currentVisitors, room.maxCapacity)
  const statusConfig = roomStatusMapper[statusType]

  return (
    <div className="jarvis-card-inner space-y-3 p-4 rounded-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{room.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm font-mono">
            {room.currentVisitors}/{room.maxCapacity}
          </span>
        </div>
      </div>

      <Progress value={occupancyPercentage} className={`h-2 ${statusConfig.progressColor}`} />

      <div className="flex items-center gap-2">
        <statusConfig.statusIcon className="h-4 w-4" />
        <span className={`text-xs font-medium ${statusConfig.statusColor}`}>{statusConfig.statusText}</span>
      </div>
    </div>
  )
}
