"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { StatsCard } from "@/constants/stats-cards"
import type { VisitorStats } from "@/types/visitor"

interface StatCardProps {
  card: StatsCard
  stats: VisitorStats
}

export function StatCard({ card, stats }: StatCardProps) {
  return (
    <Card className="jarvis-card-glow hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <div className={`p-2 rounded-lg ${card.bgColor}`}>
          <card.icon className={`h-4 w-4 ${card.color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.getValue(stats)}</div>
        <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
      </CardContent>
    </Card>
  )
}
