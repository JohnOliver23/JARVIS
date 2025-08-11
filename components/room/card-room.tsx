"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";
import { Room } from "@/types/visitor";

interface CardRoomProps {
  room: Room;
}

export function CardRoom({ room }: CardRoomProps) {
  const occupancyPercentage = (room.currentVisitors / room.maxCapacity) * 100;
  const isNearCapacity = occupancyPercentage >= 80;
  const isFull = occupancyPercentage >= 100;

  return (
    <Card
      key={room.id}
      className="jarvis-card-glow hover:shadow-md transition-all duration-200"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5 text-blue-500" />
          {room.name}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Capacidade da sala</span>
          <Badge
            // Removed variant prop to use custom classes
            className={cn(
              "ml-2 jarvis-card-inner",
              isFull
                ? "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
                : isNearCapacity
                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400"
                : "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400"
            )}
          >
            {isFull ? "Lotada" : isNearCapacity ? "Quase cheia" : "Disponível"}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Ocupação atual</span>
          </div>
          <span className="font-mono text-sm jarvis-card-inner px-2 py-1 rounded">
            {room.currentVisitors}/{room.maxCapacity}
          </span>
        </div>
        <Progress
          value={occupancyPercentage}
          className={`h-2 ${
            isFull
              ? "[&>div]:bg-red-500"
              : isNearCapacity
              ? "[&>div]:bg-yellow-500"
              : "[&>div]:bg-green-500"
          }`}
        />
        <div className="text-xs text-muted-foreground">
          {occupancyPercentage.toFixed(0)}% da capacidade utilizada
        </div>
      </CardContent>
    </Card>
  );
}
